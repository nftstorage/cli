#!/usr/bin/env node

import sade from 'sade'
import process from 'process'

import { list, token } from './index.js'

const cli = sade('nftstorage')

cli.command('token')
  .option('--api', 'URL for the nft.storage API. Default: https://api.nft.storage')
  .option('--delete', 'Delete your saved token')
  .describe('Save an API token to use for all requests')
  .action(token)

cli.command('list')
  .describe('List all the uploads in your account')
  .option('--json', 'Format as newline delimted JSON')
  .option('--cid', 'Only print the root CID per upload')
  .alias('ls')
  .action(list)

cli.parse(process.argv)
