import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

// 文件合并请求
export function merge(data) {
  return request({
    baseURL: '/shadow-api',
    url: '/slice/merge',
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
    params: {folderId},
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
    params: {folderId},
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
    params: {fileId},
  })
}

// 下载文件
export function downloadFile(fileId) {
  return request({
    baseURL: '/shadow-api',
    url: '/management/file/download',
    method: 'get',
    params: {fileId},
  })
}

// 预览文件
export function filePreview(fileId) {
  return request({
    baseURL: '/shadow-api',
    url: '/management/file/preview',
    method: 'get',
    params: {fileId},
  })
}
