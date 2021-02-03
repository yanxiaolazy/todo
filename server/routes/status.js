//'success' 代表请求是否成功到达服务器
module.exports = {
  '200': {code: 200, msg: 'ok', params: {}, success: true},
  '400': {code: 400, msg: 'bad request', params: {}, success: true},
  '401': {code: 401, msg: 'unauthorized', params: {}, success: true},
  '403': {code: 403, msg: 'forbidden', params: {}, success: true},
  '404': {code: 404, msg: 'not found', params: {}, sucess: true},
  '502': {code: 502, msg: 'bad gateway', params: {}, sucess: true}
}