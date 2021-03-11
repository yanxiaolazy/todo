const status = require("../status");

async function loggerError(ctx, next) {
  const {error, errorInfo} = ctx.request.body;
  console.log('------------------------------ from client');
  console.log(new Date().toUTCString(), error, errorInfo);

  ctx.body = status['200'];
}

module.exports = loggerError;