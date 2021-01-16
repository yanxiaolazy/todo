const status = require('../status');

module.exports = newProject;

async function newProject(ctx, next) {
  const body = ctx.request.body;

  console.log(body);

  ctx.type = 'json';
  ctx.body = status['200'];

  await next();
}