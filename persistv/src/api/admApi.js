import request from '@/utils/request'
import Qs from 'qs'

/**
 * 初始化相关
 * @param req
 */
export function getPermissionInitInfos () {
  return getM('http://yyums.4366.com/admin/p/getInit.do', );
}

/**
 * 权限相关
 * @param req
 */
export function getPermInfos (req) {
  return getM('http://yyums.4366.com/admin/p/gets.do', req);
}

export function delPermInfos (req) {
  return getM('http://yyums.4366.com/admin/p/delPermInfo.do', req);
}

export function refreshPerm (req) {
  return getM('http://yyums.4366.com/server/permission/refresh.do', req);
}

export function assignPermToRole (req) {
  return postM('http://yyums.4366.com/admin/p/assignPermToRole.do', req);
}

export function upPermAndAssignInfo (req) {
  return postM('http://yyums.4366.com/admin/p/upPermAndAssignInfo.do', req);
}

export function delAssign (req) {
  return postM('http://yyums.4366.com/admin/p/delAssign.do', req);
}

/**
 * 功能点相关
 * @param parameters
 */
export function getPointInfo (parameters) {
  return getM('http://yyums.4366.com/admin/p/p/gets.do', parameters);
}

export function delPointInfo (parameters) {
  return getM('http://yyums.4366.com/admin/p/p/del.do', parameters);
}

export function addPoint (req) {
  return postM('http://yyums.4366.com/admin/p/p/add.do', req);
}

export function upPoint (req) {
  return postM('http://yyums.4366.com/admin/p/p/update.do', req);
}



function getM(url, req) {
  return request.get(url, {params: req ? req : {}})
}

function postM(url, req) {
  return request.post(url, req ? Qs.stringify(req) : {})
}
