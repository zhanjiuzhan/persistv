import request from '@/utils/request'
import Qs from 'qs'

/**
 * 初始化相关
 * @param req
 */
export function getInitInfos () {
  return getM('http://yyums.4366.com/admin/getInit.do', );
}

/**
 * 用户相关
 */
export function getUserInfos (req) {
  return getM('http://yyums.4366.com/admin/u/gets.do', req);
}

export function addUserInfos (req) {
  return postM('http://yyums.4366.com/admin/u/add.do', req);
}

/**
 * 项目相关
 */
export function getProjectInfo (req) {
  return getM('http://yyums.4366.com/admin/pr/gets.do', req);
}

export function getUserByProject (req) {
  return getM('http://yyums.4366.com/admin/pr/get/user.do', req);
}

export function assignUserToProject (req) {
  return postM('http://yyums.4366.com/admin/pr/addUser.do', req);
}

export function delUserFromProject (req) {
  return postM('http://yyums.4366.com/admin/pr/delUser.do', req);
}

export function addProject (req) {
  return postM('http://yyums.4366.com/admin/pr/add.do', req);
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
