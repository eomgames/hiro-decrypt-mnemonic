# hiro mnemonic decryptor

## https://github.com/eomgames/hiro-decrypt-mnemonic

you will need the contents of your `config.json`

ex (replacing "your_user"):
```
Win: C:\Users\your_user\AppData\Roaming\so.hiro.StacksWallet\config.json
Mac: /Users/your_user/Library/Application Support/so.hiro.StacksWallet/config.json
```

It will look something like this:
```
{
	"persist:root": "{\"stacksNode\":\"{\\\"ids\\\":[],\\\"entities\\\":{},\\\"selectedApiId\\\":\\\"default\\\"}\",\"settings\":\"{\\\"diagnosticPermission\\\":false}\",\"_persist\":\"{\\\"version\\\":-1,\\\"rehydrated\\\":true}\"}",
	"stxAddress": "SP1SD4WTGF0DJF6BWZAEA3XXAPN9AXCBB0D6QWW7H",
	"salt": "57c67c2d687d678f1233360d3123ebfb",
	"encryptedMnemonic": "fedce1e1e882cea24024fa8e7f85ecc5aba60981db123456a4394d59d668f0689d3deb5d380b2cc882b362873f5910cb15af12517e87a73c5ceea7d627c6ee89477bb376dd5824f50cd88166beaef80850b237b829683009a6817912324990608fe568c37d5ac8e001389b4c10e2820b59926ccc140be0f5225aee7a3d501c4a1ca0c9b5a73d49c11bf931010699573f4b5ed2b03dbab13d647ef886b1asdfg8bf0572fe65ef3cdb7c34"
}
```

Once loaded into browser there are three fields that need to be filled:
- Password
- Salt
- Encrypted Mnemonic

After filling, click decrypt and wait!

## run locally
1. clone repo
2. cd into `hiro-decrypt-mnemonic`
3. run `npm install`
4. run `npm run dev`
5. open browser to http://localhost:3000

## attribution
I did use some functions directly from https://github.com/hirosystems/stacks-wallet/blob/7caaf3f5e059ef34d94dc0800ccd2629ed8db2e3/app/store/keys/keys.actions.ts#L102
