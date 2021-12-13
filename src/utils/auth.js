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

export function removeToken () {
  return tokenSessionStorage.removeItem(TOKEN)
}

export function setRefreshToken(refreshToken) {
  refreshTokenSessionStorage.setItem(REFRESH_TOKEN, refreshToken)
}

export function getRefreshToken() {
  return refreshTokenSessionStorage.getItem(REFRESH_TOKEN)
}

export function removeRefreshToken() {
  refreshTokenSessionStorage.removeItem(REFRESH_TOKEN)
}
