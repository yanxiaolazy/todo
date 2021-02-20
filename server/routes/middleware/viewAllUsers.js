const mime = require('mime');
const db = require('../../db');
const status = require('../status');

async function viewAllUsers(ctx, next) {
  const query = ctx.request.query;
  const result = await db.findAllUsers(query.tab);

  if (result.error) {
    ctx.status = 502;
    ctx.type = mime.getType('json');
    ctx.body = Object.assign({}, status['502'], {params: {error:result.error}});
  } else {
    ctx.type = mime.getType('json');
    ctx.body = Object.assign({}, status['200'], {params: {users: result.users}});
  }

  await next();
}

module.exports = viewAllUsers;


