/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  // const valid_map = ['admin', 'editor', 'shadow']
  // return valid_map.indexOf(str.trim()) >= 0
  return true
}


export function GetUrlRelativePath(url) {
  var arrUrl = url.split('//')
 
  var start = arrUrl[1].indexOf('/')
  var relUrl = arrUrl[1].substring(start)
 
  if (relUrl.indexOf('?') !== -1) {
    relUrl = relUrl.split('?')[0]
  }
  return relUrl
}
