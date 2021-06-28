import {
  REFRESH_TOKEN,
  TOKEN,
  EXPIRE_TIME,
} from '@/config/const'

export function getToken () {
  expireToken()
  return sessionStorage.getItem(TOKEN)
}

export function setToken (token) {
  sessionStorage.setItem(TOKEN, token)
}

export function removeToken() {
  sessionStorage.removeItem(TOKEN)
}

export function setRefreshToken(refreshToken) {
  sessionStorage.setItem(REFRESH_TOKEN, refreshToken)
}

export function getRefreshToken() {
  sessionStorage.getItem(REFRESH_TOKEN)
}

export function setExpireTime(time) {
  time = new Date(time)
  sessionStorage.setItem(EXPIRE_TIME, time)
}

export function removeExpireTime() {
  sessionStorage.removeItem(EXPIRE_TIME)
}

export function getExpireTime() {
  sessionStorage.getItem(EXPIRE_TIME)
}

const expireToken = () => {
  const currentTime = new Date()
  const expireTime = getExpireTime()
  // 提前半小时过期，去取得最新token
  const advanceTimeInterval = 0.5 * 60 * 60 * 1000
  if (expireTime - currentTime <= advanceTimeInterval) {
    removeToken()
  }
}
