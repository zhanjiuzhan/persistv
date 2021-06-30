import JSEncrypt from 'jsencrypt/bin/jsencrypt'

export function encrypt (plainText, publicKey) {
  const jsEncrypt = new JSEncrypt()
  jsEncrypt.setPublicKey(publicKey)
  return jsEncrypt.encrypt(plainText)
}
