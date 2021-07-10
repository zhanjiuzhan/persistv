export function SessionStorageUtil (opt) {
  this.option = Object.assign({
    expireTime: 'infinite',
    timeInterval: 0.5 * 60 * 60 * 1000
  }, opt)
  this.sessionStorage = sessionStorage
  this.expireTime = this.option.expireTime
  this.timeInterval = this.option.timeInterval
}

SessionStorageUtil.prototype.setItem = function (key, value) {
  this.sessionStorage.setItem(key, value)
}

SessionStorageUtil.prototype.getItem = function (key) {
  const { expireTime, timeInterval } = this.option
  if (expireTime === 'infinite') {
    return this.sessionStorage.getItem(key)
  } else {
    const currentDate = new Date()
    if (expireTime - currentDate > timeInterval) {
      return this.sessionStorage.getItem(key)
    } else {
      this.sessionStorage.removeItem(key)
      return null
    }
  }
}

SessionStorageUtil.prototype.setExpireTime = function (time) {
  this.expireTime = time
}

SessionStorageUtil.prototype.setTimeInterval = function (interval) {
  this.timeInterval = interval
}
