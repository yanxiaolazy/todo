const status = require('../status');
const db = require('../../db');

module.exports = viewProject;

async function viewProject(ctx, next) {
  const query = ctx.request.query;
  const result = await db.findProjects(query);

  if (result.error) {
    const code = 502;
    ctx.status = code;
    ctx.type = 'json';
    ctx.body = Object.assign({}, status[code], {params: {error: result.error}});
  } else if (result.titles) {
    ctx.type = 'json';
    ctx.body = Object.assign({}, status['200'], {params: {titles: result.titles}});
  } else {
    ctx.type = 'json';
    ctx.body = Object.assign({}, status['200'], {params: {project: result.project}});
  }

  await next();
}