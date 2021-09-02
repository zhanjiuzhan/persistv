import request from '@/utils/request'

export const getBackupStrategy = () => {
  return request.get('/sys/backup-strategy')
}

export const setBackupStrategy = (data) => {
  return request.post('/sys/backup-strategy', data)
}

export const getBackupRecords = () => {
  return request.get('/sys/db-backup-record/page')
}

export const recoverBackup = (id) => {
  return request.put(`/sys/db-backup-record/${id}`)
}

export const deleteBackup = (id) => {
  return request.delete(`/sys/db-backup-record/${id}`)
}
