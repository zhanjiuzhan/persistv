import JSEncrypt from 'jsencrypt/bin/jsencrypt'

const publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCLBQvE8TmoqojcIvjxVFjFOWDqpZc04R8kINo9u1YsNATQwgVANr1cU0f7YBo45bkgmqozMx62gO2bUIp77Q9I0e8MKpiFKrZ5YJAwIutqUxdwADZ7i0ZkRnV1/0MvMe0/tUus5uNteUfot6DMDORTSZK/s9CH9Z1bbhLKMchp4wIDAQAB'

export function encrypt (plainText) {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(publicKey)
  return encryptor.encrypt(plainText)
}
