const fs = require('fs');
const {resolve} = require('path');
const mime = require('mime');
const status = require("../status");

module.exports = viewFile;

async function viewFile(ctx, next) {
  const query = ctx.request.query,
        {tab} = query;

  if (!tab) {
    ctx.type = 404;
    ctx.body = status['404'];
  } else {
    const filePath = resolve(__dirname, `../../static/upload/${tab}`);

    ctx.type = mime.getType(tab);
    ctx.body = fs.readFileSync(filePath);
  }

  await next();
}