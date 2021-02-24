const status = require("../status");
const db = require('../../db');

async function deleteProject(ctx, next) {
  const query = ctx.request.query;

  if (query.tab) {
    const result = await db.deleteProject(query.tab);

    if (result.error) {
      ctx.status = 404;
      ctx.body = Object.assign({}, status['404'], {params: {error: result.error}});
    } else {
      ctx.body = Object.assign({}, status['200'], {params: {info: result.info}});
    }
  } else {
    await next();
  }
}

module.exports = deleteProject;