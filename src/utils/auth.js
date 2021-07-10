import {
  REFRESH_TOKEN,
  TOKEN,
} from '@/config/const'
import { SessionStorageUtil } from './sessionStorageUtil'

const tokenSessionStorage = new SessionStorageUtil()
const refreshTokenSessionStorage = new SessionStorageUtil()

export function getToken () {
  return tokenSessionStorage.getItem(TOKEN)
}

export function setToken (token, expireTime) {
  tokenSessionStorage.setExpireTime(expireTime)
  tokenSessionStorage.setItem(TOKEN, token)
}

export function setRefreshToken(refreshToken) {
  refreshTokenSessionStorage.setItem(REFRESH_TOKEN, refreshToken)
}

export function getRefreshToken() {
  refreshTokenSessionStorage.getItem(REFRESH_TOKEN)
}
