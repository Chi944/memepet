# Connect a browser wallet to MemePet

An injected wallet is a browser extension exposing a provider to the site.
Pasting a public address does not connect a signing account. Address-only/watch-only
accounts cannot approve adoption or care.

## Setup

1. Install a wallet from its official source, such as [OKX Wallet](https://web3.okx.com/download)
   or [MetaMask](https://support.metamask.io/start/getting-started-with-metamask/).
2. Create a separate demo wallet privately in the extension, or use an existing
   test wallet you control. Keep recovery information and passwords private.
3. Unlock the extension in the same browser profile as [MemePet](https://memepet.vercel.app/pet).
   Reload after installing it, then select Connect wallet.
4. Approve only the intended site/account connection. Keep security alerts enabled;
   leave any warning unapproved rather than bypassing it.
5. Verify **X Layer testnet, chain 1952**, and the account shown in the app.
   Review any add/switch-network prompt. Adoption/care use testnet OKB for gas.

A password may unlock data in its original wallet installation, but a public
address plus password cannot reconstruct a wallet in a fresh extension. Use
only the wallet's supported private recovery/import procedure. Never enter a
seed, private key, keystore or password into MemePet or send it in chat.

If no wallet is found, check the browser profile, installation and unlocked
state, then reload. An external Chrome wallet is not automatically available
inside an embedded browser. The app currently uses injected providers, not
QR/WalletConnect pairing. It prefers `window.ethereum` and falls back to
`window.okxwallet` when Ethereum injection is absent; automated compatibility
tests are separate from genuine wallet verification.

## Disconnect

Cancel any pending signature/transaction request, then use MemePet's Disconnect
control. Verify the resulting status: supported wallets can revoke account
access; unsupported wallets require removal through their site/dapp connection
settings. For MetaMask, see [official disconnect instructions](https://support.metamask.io/more-web3/dapps/disconnect-wallet-from-a-dapp/).
Each hosted/local origin is a separate permission. Disconnecting does not
reverse a confirmed transaction or revoke an existing token allowance.

MemePet adoption/care request zero transferred value and no token allowance;
check the actual account, network and registry for each prompt. Current wallet
results belong in [the walkthrough evidence](BROWSER_WALKTHROUGH.md), not a
permanent statement that an account is always connected or disconnected.

The earlier MetaMask warning and review closure are preserved in the
[dated audit trail](evidence/README.md). Review closure and successful connection
do not establish zero security risk. Original setup history is available in the
[pinned snapshot](https://github.com/Chi944/memepet/blob/19c3fac1f097955f2b6e409ab2f4ab988abc0cee/docs/qa/WALLET_SETUP.md).
