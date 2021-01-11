module .exports = login;


async function login(ctx, next) {
  const body = ctx.request.body;

  ctx.type = 'json';
  ctx.body = JSON.stringify({body});
}