# nft.storage CLI

## Getting started 

Install the CLI from npm 

```console
$ npm install -g nft.storage-cli
```

Login in and create a token on https://classic-api.nft.storage and pass it to `nftstorage token` to save it.

```console
$ nftstorage token
? Paste your API token for api.nft.storage › <your token here>

API token saved
```

## Commands

### `nftstorage token`

Paste in a token to save a new one. Pass in `--delete` to remove a previously saved token.

- `--api` URL for the nft.storage API. Default: https://api.nft.storage
- `--delete` Delete a previously saved token

### `nftstorage list`

List all the uploads in your account.

- `--json` Format as newline delimted JSON
- `--cid` Only print the root CID per upload
