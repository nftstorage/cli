# nft.storage CLI
## Product Decommission Notice

### Important Update

Hello from NFT.Storage!

As of June 30, 2024, we have officially decommissioned NFT.Storage Classic uploads. This means that NFT.Storage Classic, including NFTUp, the Classic web app, Classic APIs, Classic SDK, and Pinning API, will no longer accept new uploads/pins.

### What This Means for You

**Service Termination:** NFT.Storage Classic will no longer accept new uploads. However, retrieval of existing data remains operational.

**Data Access:** Don't forget, we're still keeping a copy of your NFT.Storage Classic data available in the NFT.Storage Gateway and in the decentralized Filecoin Network. However, over time, latency and availability may degrade.

**Support:** We’ll be working with the newly formed NFT.Storage community to determine what changes, if any, will impact NFT.Storage Classic data latency and availability in the future. Join the community [Join the community](https://nft.storage/join-us) to have your say. We will keep you informed by email and on Twitter/X.

### Transition to the New Version

For the new version of NFT.Storage, first mint your NFTs, then send us the NFT data—metadata and imagery CIDs, blockchain(s) minted on, contract address, and token IDs. We will preserve these in long-term Filecoin storage. Note that you need to upload the data to IPFS separately. Your NFTs will also be included in the NFT Token Checker, a tool for block explorers, marketplaces, and wallets to show verification that NFT collections, tokens, and CIDs are preserved by NFT.Storage.

### Recommended Hot Storage Alternatives

We’re excited to announce our partnerships with Pinata and Lighthouse for hot storage solutions. As an NFT.Storage user, you support our platform when you choose Pinata and Lighthouse and use our referral links, helping to sustain our valuable public goods. [Learn more here](https://nft.storage/blog/announcing-our-new-partnerships-with-pinata-and-lighthouse).

**Pinata:** Offers flexible plans and powerful, easy-to-use tools for managing your data on IPFS. Use code NFTSTORAGE50 at checkout to enjoy 50% off your first month. [Sign up today](https://pinata.cloud).

**Lighthouse:** An IPFS provider with unique payment options for NFT longevity. They offer affordability and flexibility for all your IPFS needs, including a pay-once and store-forever option. [Sign up today](https://lighthouse.storage).

### Contact Us

For any questions or assistance, contact us [contact us](https://nft.storage/contact-us). Together, we look forward to a promising future for NFT.Storage and the broader NFT ecosystem.

Best regards,  
The NFT.Storage Team

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
