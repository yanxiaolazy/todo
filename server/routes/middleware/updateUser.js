const status = require('../status');
const db = require('../../db');

async function updateUser(ctx, next) {
  const body = ctx.request.body;
  const result = await db.updateUser(body.user);

  if (result.error) {
    ctx.status = 502;
    ctx.body = Object.assign(status['502'], {params: {error: result.error}});
  } else {
    ctx.body = Object.assign(status['200'], {params: {text: result.text}});
  }

  await next();
}

module.exports = updateUser;
