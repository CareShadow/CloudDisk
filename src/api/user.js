import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/management/admin/login',
    method: 'post',
    params: data
  })
}

export function getInfo(token) {
  return request({
    url: '/management/admin/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/management/admin/logout',
    method: 'post'
  })
}

// 文件合并请求
export function merge(data) {
  return request({
    baseURL: '/shadow-api',
    url: '/management/slice/merge',
    timeout: 60000,
    method: 'post',
    params: data
  })
}

// 文件列表请求
export function getFileOrFolder(folderId) {
  return request({
    baseURL: '/shadow-api',
    url: '/management/file/list',
    method: 'get',
    params: { folderId },
  })
}

// 创建新文件夹 {parentFolderId, folderName}
export function createNewFolder(data) {
  return request({
    baseURL: '/shadow-api',
    url: '/management/folder/create',
    method: 'get',
    params: data,
  })
}

// 修改文件夹名称 {folderId, folderName}
export function renameFolder(data) {
  return request({
    baseURL: '/shadow-api',
    url: '/management/folder/rename',
    method: 'get',
    params: data,
  })
}


// 删除文件夹
export function deleteFolder(folderId) {
  return request({
    baseURL: '/shadow-api',
    url: '/management/folder/delete',
    method: 'get',
    params: { folderId },
  })
}

// 修改文件名 {fileId, filename}
export function renameFile(data) {
  return request({
    baseURL: '/shadow-api',
    url: '/management/file/rename',
    method: 'get',
    params: data,
  })
}

// 删除文件
export function deleteFile(fileId) {
  return request({
    baseURL: '/shadow-api',
    url: '/management/file/delete',
    method: 'get',
    params: { fileId },
  })
}

// 下载文件
export function downloadFile(fileId) {
  return request({
    baseURL: '/shadow-api',
    url: '/management/file/download',
    method: 'get',
    params: { fileId },
  })
}

// 预览文件
export function filePreview(fileId) {
  return request({
    baseURL: '/shadow-api',
    url: '/management/file/preview',
    method: 'get',
    params: { fileId },
  })
}

// 用户列表
export function getUserList() {
  return request({
    baseURL: '/shadow-api',
    url: '/management/user/list',
    method: 'get',
  })
}

// 更新用户角色
export function updateUserRole(data) {
  return request({
    baseURL: '/shadow-api',
    url: `/management/user/role_change/${data.userId}/${data.roleId}`,
    method: 'post',
  })
}

// 获取用户名字
export function getAllRoleName() {
  return request({
    baseURL: '/shadow-api',
    url: '/management/user/role_list',
    method: 'get'
  })
}

// 获取当前角色关联的资源
export function getRoleMapResource() {
  return request({
    baseURL: '/shadow-api',
    url: '/management/user/resource_list',
    method: 'get'
  })
}

// 获取全部可配置的资源
export function getAllResource() {
  return request({
    baseURL: '/shadow-api',
    url: '/management/user/resource',
    method: 'get'
  })
}

// 添加用户
export function addUser(username) {
  return request({
    baseURL: '/shadow-api',
    url: `/management/user/add/${username}`,
    method: 'post'
  })
}