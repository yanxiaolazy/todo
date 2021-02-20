const mime = require('mime');
const db = require('../../db');
const status = require('../status');

async function newUser(ctx, next) {
  const body = ctx.request.body;
  const result = await db.createUser(body.user);

  if (result.error) {
    ctx.status = 502;
    ctx.type = mime.getType('json');
    ctx.body = Object.assign({}, status['502'], {params: {error: result.error}});
  } else if (result.exist) {
    ctx.status = 400;
    ctx.type = mime.getType('json');
    ctx.body = Object.assign({}, status['400'], {params: {exist: result.exist}});
  } else {
    ctx.type = mime.getType('json');
    ctx.body = Object({}, status['200'], {params: {info: result.text}});
  }
}

module.exports = newUser;
