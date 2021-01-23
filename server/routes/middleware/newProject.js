const status = require('../status');
const {addNewProject} = require('../../db');

module.exports = newProject;

async function newProject(ctx, next) {
  const body = ctx.request.body;

  const result = await addNewProject(body.data);

  if (result.error) {
    const response = Object.assign({}, status['404'], {params: {error: result.error}});
    ctx.status = 404;
    ctx.type = 'json';
    ctx.body = response;
  } else {
    ctx.type = 'json';
    ctx.body = status['200'];
  }

  await next();
}