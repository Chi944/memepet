# Connect a browser wallet to MemePet

“Injected wallet” means a browser extension makes a wallet provider available to the site. It is not a field where you paste an address. An address-only/watch-only account cannot approve adoption or care transactions.

## Chrome setup

1. Install the Chrome extension using the [official OKX Wallet download page](https://web3.okx.com/download).
2. Open the extension. Create a separate demo wallet, or import a wallet you control privately inside the official extension. Set the password and back up recovery information yourself; never enter it into MemePet or send it in chat. See [OKX's setup guide](https://web3.okx.com/help/how-do-i-create-import-an-okx-wallet).
3. Unlock the wallet and open [MemePet's pet page](https://memepet.vercel.app/pet) in that same Chrome profile. Reload after installing/unlocking.
4. Click **Connect wallet**, select the intended account and approve the connection prompt in the extension.
5. If MemePet shows the wrong network, click **Switch network** and review the wallet prompt. This deployment uses **X Layer testnet, chain ID 1952**, with testnet OKB for gas. Use testnet assets for the demo.

If using the previously supplied address, verify that the extension's selected account is `0x2ec8471290793FeB64792861Ce3102d291ce1CA1`. Knowing that public address does not grant signing access. A phone wallet alone does not install a Chrome extension; MemePet currently uses browser-injected providers and has no QR/WalletConnect pairing flow.

If the site still says no wallet was found, confirm that the extension is installed in the browser profile containing MemePet, open/unlock it, and reload the page. A wallet in a different profile or in an external Chrome window is not shared with an embedded app browser.

## I have an address and a password

The password may unlock wallet data already saved in the original wallet app or extension. Open that original installation and unlock it there. A public address plus password alone cannot reconstruct a wallet in a fresh extension. Restoring requires the wallet's supported recovery method or the original saved wallet data; an OKX exchange login is separate from a self-custody wallet. Do not send passwords, recovery words, keys or wallet backup files in chat.

If the original wallet is unavailable, a separate new demo wallet can be created privately in the extension. It will have a different address and needs its own testnet gas; it does not restore the old address.

## Import the existing Foundry demo wallet

The deployment screenshot supplied on 22 September 2026 shows `--account memepet-xlayer-testnet` and a keystore password prompt. The corresponding file was confirmed to exist at `%USERPROFILE%\.foundry\keystores\memepet-xlayer-testnet`. Only file existence was checked; its contents were not opened or decrypted. The screenshot records a contract deployment, not a browser connection, adoption or care action.

MetaMask Extension documents encrypted JSON-file import. This provides a route for importing the Foundry keystore locally without exporting its private key into a terminal or chat:

1. Install MetaMask from its [official installation guide](https://support.metamask.io/start/getting-started-with-metamask/) in the Chrome profile used for MemePet. Complete initial setup privately if needed; keep any recovery information offline.
2. Open MetaMask's account selector, choose **Add wallet**, then **Import an account**.
3. On the import page, change **Select Type** to **JSON File** and choose the keystore file above. The Foundry filename may have no `.json` extension; use the full path in the file picker or its all-files filter if available.
4. Enter the keystore password used by Foundry, then click **Import**. This is the password protecting the file, which may differ from MetaMask's own unlock password. Enter it only in the official extension.
5. Verify the imported account's full address against `0x2ec8471290793FeB64792861Ce3102d291ce1CA1`. Import success and the address match have not yet been verified in the browser.
6. With that account selected and unlocked, reload MemePet in the same Chrome profile, click **Connect wallet**, and approve the connection. If prompted by MemePet, use **Switch network** for X Layer testnet (1952).

Source: [MetaMask's account and JSON-file import instructions](https://support.metamask.io/start/use-an-existing-wallet), checked 22 September 2026. If the extension reports an import error, share only the error text; keep the wallet file and password private. A successful import alone does not mark any transaction walkthrough step as passed.

## Provider compatibility

The app keeps the existing `window.ethereum` provider as first choice and falls back to OKX's documented `window.okxwallet` provider when it is absent. If both are present, the existing browser-default Ethereum provider is used. No address, signature, or transaction is synthesized by this fallback.

References: [OKX extension detection](https://web3.okx.com/onchainos/dev-docs/wallet/dapp-connect/web-detect-okx-wallet), [OKX EVM provider documentation](https://web3.okx.com/onchainos/dev-docs/wallet/dapp-connect/chains/evm/introduce).

## Verification boundary

Automated provider tests use mocks. They do not count as a real wallet walkthrough. The last genuine browser connection attempt returned **No injected wallet was found**; adoption, care, signature rejection and account-switch walkthrough steps remain unverified until performed with a real unlocked wallet.

### Compatibility update checks — 22 September 2026

- `npm run lint` — passed.
- `npm test` — passed, 79 tests across 16 files. Five new provider-selection tests cover OKX-only detection and connection, account/chain events and listener cleanup, network switching, Ethereum-provider precedence, and the missing-wallet error. These use mocked providers.
- `npm run build`, followed by `npm run typecheck` — passed using the existing public X Layer testnet deployment settings.
- Real Chrome inspection of the local production build at `http://127.0.0.1:3300/pet` — setup notice and official OKX download link rendered. Clicking **Connect wallet** genuinely returned **No injected wallet was found**. No wallet account or transaction was fabricated.
- Desktop screenshot visually inspected; at a 390px viewport, DOM measurements showed equal document client and scroll widths (375px), with no horizontal overflow. The viewport override was reset afterward.
- Independent code review — no actionable findings. No dependencies, deployment settings, or contract changes.
