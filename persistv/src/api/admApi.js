import request from '@/utils/request'
import Qs from 'qs'

export function getPermissionInfos (req) {
  return getM('http://yyums.4366.com/admin/p/gets.do', req);
}

export function getPermissionPInfos (req) {
  return getM('http://yyums.4366.com/admin/p/p/gets.do', req);
}

export function getPermissionInitInfos () {
  return getM('http://yyums.4366.com/admin/p/getInit.do', );
}

export function delPermissionRelation (req) {
  return postM('http://yyums.4366.com/admin/p/del.do', req);
}

export function assignPermissionRelation (req) {
  return postM('http://yyums.4366.com/admin/p/assign.do', req);
}

function getM(url, req) {
  return request.get(url, {params: req ? req : {}})
}

function postM(url, req) {
  return request.post(url, req ? Qs.stringify(req) : {})
}
