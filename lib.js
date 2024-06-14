import Conf from 'conf'
import fs from 'fs'

export const API = 'https://api.nft.storage'

export const config = new Conf({
  projectName: 'nft.storage',
  projectVersion: getPkg().version,
  configFileMode: 0o600
})

export function getPkg () {
  return JSON.parse(fs.readFileSync(new URL('./package.json', import.meta.url)))
}

/**
 * @typedef {import('./interface.js').Service} Service
 */

/**
 * Get a new API client configured either from opts or config
 * @param {object} opts
 * @param {string} [opts.api]
 * @param {string} [opts.token]
 * @param {boolean} [opts.json]
 */
export function getClient ({
  api = config.get('api') || API,
  token = config.get('token'),
  json = false
}) {
  if (!token) {
    console.log('! run `nft token` to set an API token to use')
    process.exit(-1)
  }
  const endpoint = new URL(api)
  if (api !== API && !json) {
    // note if we're using something other than prod.
    console.log(`using ${endpoint.hostname}`)
  }
  return new NftStorage({ token, endpoint })
}

class NftStorage {
  constructor ({ token, endpoint }) {
    this.token = token
    this.endpoint = endpoint
  }

  /**
   * @hidden
   * @param {string} token
   * @returns {Record<string, string>}
   */
  static headers (token) {
    if (!token) throw new Error('missing token')
    return {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  }

  /**
   * @param {{before: string, size: number}} opts
   */
  async* list (opts) {
    const service = {
      token: this.token,
      endpoint: this.endpoint
    }
    /**
     * @param {Service} service
     * @param {{before: string, size: number, signal: any}} opts
     * @returns {Promise<Response>}
     */
    async function listPage ({ endpoint, token }, { before, size }) {
      const params = new URLSearchParams()
      // Only add params if defined
      if (before) {
        params.append('before', before)
      }
      if (size) {
        params.append('limit', String(size))
      }
      const url = new URL(`?${params}`, endpoint)
      return fetch(url.toString(), {
        method: 'GET',
        headers: {
          ...NftStorage.headers(token)
        },
      })
    }

    let count = 0
    const size = 100
    for await (const res of paginator(listPage, service, opts)) {
      for (const upload of res.value) {
        if (++count > size) {
          return
        }
        yield upload
      }
    }
  }
}

/**
 * Follow before with last item, to fetch all the things.
 *
 * @param {(service: Service, opts: any) => Promise<Response>} fn
 * @param {Service} service
 * @param {{}} opts
 */
async function * paginator (fn, service, opts) {
  let res = await fn(service, opts)
  if (!res.ok) {
    if (res.status === 429) {
      throw new Error('rate limited')
    }

    const errorMessage = await res.json()
    throw new Error(`${res.status} ${res.statusText} ${errorMessage ? '- ' + errorMessage.message : ''}`)
  }
  let body = await res.json()
  yield body

  // Iterate through next pages
  while (body && body.value.length) {
    // Get before timestamp with less 1ms
    const before = (new Date((new Date(body.value[body.value.length-1].created)).getTime() - 1)).toISOString()
    res = await fn(service, {
      ...opts,
      before
    })

    body = await res.json()

    yield body
  }
}
