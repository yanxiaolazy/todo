const { getType } = require('mime');
const db = require('../../db');
const status = require('../status');

async function deleteUser(ctx, next) {
  const query = ctx.request.query,
        result = db.deleteUser(query.id);

  if (result.error) {
    ctx.status = 502;
    ctx.type = getType('json');
    ctx.body = Object.assign(status['502'], {params: {error: result.error}});
  } else {
    ctx.status = 200;
    ctx.type = getType('json');
    ctx.body = Object.assign(status['200'], {params: {text: result.text}});
  }
  await next();
}

module.exports = deleteUser;