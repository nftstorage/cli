import enquirer from 'enquirer'
import { config, getClient, API } from './lib.js'

/**
 * Set the token and optionally the api to use
 * @param {object} opts
 * @param {boolean} [opts.delete]
 * @param {string} [opts.api]
 * @param {string} [opts.token]
 */
export async function token ({ delete: del, token, api = API }) {
  if (del) {
    config.delete('token')
    config.delete('api')
    console.log('API token deleted')
    return
  }

  const url = new URL(api)
  if (!token) {
    const response = await enquirer.prompt({
      type: 'input',
      name: 'token',
      message: `Paste your API token for ${url.hostname}`
    })
    token = response.token
  }
  config.set('token', token)
  config.set('api', api)
  console.log('API token saved')
}

/**
 * Print out all the uploads in your account by data created
 *
 * @param {object} [opts]
 * @param {boolean} [opts.json]
 * @param {boolean} [opts.cid]
 * @param {string} [opts.api]
 * @param {string} [opts.token]
 * @param {number} [opts.size] number of results to return per page
 * @param {string} [opts.before] list items uploaded before this iso date string
 */
export async function list (opts = {}) {
  const client = getClient(opts)
  let count = 0
  let bytes = 0
  for await (const item of client.list({ before: opts.before, size: opts.size })) {
    if (opts.json) {
      console.log(JSON.stringify(item))
    } else if (opts.cid) {
      console.log(item.cid)
    } else {
      if (count === 0) {
        console.log(`  Content ID${Array.from(item.cid).slice(0, -10).fill(' ').join('')}  Name`)
      }
      console.log(`${item.cid}  ${item.name}`)
    }
    bytes += item.size
    count++
  }
  if (!opts.json && !opts.cid) {
    if (count === 0) {
      console.log('No uploads!')
    } else {
      console.log(`  ${count} item${count === 1 ? '' : 's'} – ${filesize(bytes)} stored `)
    }
  }
}

function filesize (bytes) {
  const size = bytes / 1024 / 1024
  return `${size.toFixed(1)}MB`
}
