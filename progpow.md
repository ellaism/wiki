<!-- TITLE: Progpow -->
<!-- SUBTITLE: A quick summary of Mtihani ProgPOW Testnet -->

# Mtihani ProgPOW Testnet

This testnet has mostly identical settings comparing Ellaism mainnet, but with ProgPOW transition happening at block 0. To use this, you need to first compile the ProgPOW branch of Parity Ethereum:

```bash
# Make sure you have Rust and git installed first.

git clone https://github.com/paritytech/parity-ethereum
cd parity-ethereum
git checkout andre/progpow
```

Then download [mtihani.json](https://gist.githubusercontent.com/ellaismer/62a8cd70b67c7c938388716e5addb4b6/raw/f7fab7a225e2f414304cb9ca72ec52155be75cb1/mtihani.json) and run the program:

```bash
cargo run --release -- --chain mtihani.json
```

You will also need to compile `ethminer` yourself using this repo (https://github.com/ifdefelse/ProgPOW). For instructions on compilation, refer to `ethminer`'s manual (https://github.com/ethereum-mining/ethminer/blob/master/docs/BUILD.md).