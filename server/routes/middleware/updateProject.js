const status = require("../status");
const db = require('../../db');

module.exports = updateProject;

async function updateProject(ctx, next) {
  const body = ctx.request.body,
        query = ctx.request.query;
  let result = await db.updateProject(body.data, query);

  if (result.error) {
    ctx.status = 404
    ctx.type = 'json';
    ctx.body = Object.assign({}, status['404'], {params: {error: result.error}});
  } else {
    ctx.type = 'json';
    ctx.body = Object.assign({}, status['200'], {params: {text: result.text}});
  }
  
  await next();
}