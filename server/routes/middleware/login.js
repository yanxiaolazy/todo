const status = require('../status');
const db = require('../../db');

module .exports = login;

async function login(ctx, next) {
  const body = ctx.request.body,
        result = await db.login(body.login.username, body.login.password, body.login.email);
  
  if (result.error) {
    const response = Object.assign({}, status['502'], {params: {error: result.error}});
    ctx.status = 502;
    ctx.type = 'json';
    ctx.body = response;
  } else {
    const params = {
      admin: result.admin, 
      token: result.token
    };

    const response = Object.assign({}, status['200'], {params});
    ctx.type = 'json';
    ctx.body = response;
  }

  await next();
}