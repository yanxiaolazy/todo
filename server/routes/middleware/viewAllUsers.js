const mime = require('mime');
const db = require('../../db');
const status = require('../status');

async function viewAllUsers(ctx, next) {
  const result = await db.findAllUsers();

  if (result.error) {
    ctx.status = 404;
    ctx.type = mime.getType('json');
    ctx.body = Object.assign(status['404'], {params: {error:result.error}});
  } else {
    ctx.type = mime.getType('json');
    ctx.body = Object.assign(status['200'], {params: {users: result.users}});
  }

  await next();
}

module.exports = viewAllUsers;


