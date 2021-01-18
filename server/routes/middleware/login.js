const status = require('../status');

module .exports = login;


async function login(ctx, next) {
  const body = ctx.request.body,
        response = Object.assign({}, status['200'], {params: {admin: true}});
  
  ctx.type = 'json';
  ctx.body = response;
}