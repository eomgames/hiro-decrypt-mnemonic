import { Buffer } from 'buffer';
import * as argon2 from 'argon2-browser';

const algorithmName = 'AES-GCM';
const form = document.getElementById('form');
const statusDiv = document.getElementById('status');
const resultsDiv = document.getElementById('results');


function extractEncryptionKey(hash: Uint8Array) {
  return hash.slice(0, 32);
}

function extractEncryptionInitVector(hash: Uint8Array) {
  return hash.slice(32, hash.length);
}
  
async function deriveWebCryptoKey(derivedKeyHash: Uint8Array) {
  const format = 'raw';
  const key = extractEncryptionKey(derivedKeyHash);
  const extractable = false;
  const keyUsages: KeyUsage[] = ['encrypt', 'decrypt'];
  return window.crypto.subtle.importKey(format, key, algorithmName, extractable, keyUsages);
}
  
interface DecryptMnemonicArgs {
  encryptedMnemonic: string;
  derivedKeyHash: Uint8Array;
}
async function decryptMnemonic({ encryptedMnemonic, derivedKeyHash }: DecryptMnemonicArgs) {
  if (derivedKeyHash.length !== 48) throw new Error('Key must be of length 48');
  const key = await deriveWebCryptoKey(derivedKeyHash);
  const iv = extractEncryptionInitVector(derivedKeyHash);
  const algorithm = { name: algorithmName, iv };
  const encryptedBuffer = Buffer.from(encryptedMnemonic, 'hex');
  const decrypted = await window.crypto.subtle.decrypt(algorithm, key, encryptedBuffer);
  const textDecoder = new TextDecoder();
  return textDecoder.decode(decrypted);
}


form?.addEventListener('submit', async function handleClick(event) {
    event.preventDefault();
    const passwordInput = document.getElementById('password') as HTMLInputElement | null;
    const saltInput = document.getElementById('salt') as HTMLInputElement | null;
    const encryptedMnemonicInput = document.getElementById('encryptedMnemonic') as HTMLInputElement | null;
    const password = passwordInput?.value;
    const salt = saltInput?.value;
    const encryptedMnemonic = encryptedMnemonicInput?.value;
    if (password != null && salt != null) {
        const derivedKeyHash = await hashPassword(password, salt);
        if (derivedKeyHash != null && encryptedMnemonic != null) {
          if (statusDiv != null)
          statusDiv.insertAdjacentText('beforeend', ' Decrypting mnemonic.');
          var mnemonic = await decryptMnemonic({encryptedMnemonic, derivedKeyHash});
          if (statusDiv != null)
          statusDiv.insertAdjacentText('beforeend', ' Done decrypting mnemonic.');
          if (resultsDiv != null)
            resultsDiv.textContent = mnemonic;
        }
   
    }
});

async function hashPassword(password: string | Uint8Array, salt: string): Promise<Uint8Array>
{
    try {
      if (statusDiv != null)
        statusDiv.insertAdjacentText('beforeend', ' Please wait, calculating hash...');
        const hash = await argon2
        .hash({
            pass: password,
            salt,
            hashLen: 48,
            time: 44,
            mem: 1024 * 32,
            type: argon2.ArgonType.Argon2id,
          }
        );
        if (statusDiv != null)
        statusDiv.insertAdjacentText('beforeend', ' Done calculating hash.');
        return hash.hash;
    } catch {
        console.log('Error parsing with argon2');
        return new Uint8Array([]);
    }
}
