const fs = require('fs');
const {resolve} = require('path');

module.exports = deleteFile;

async function deleteFile(ctx, next) {
  const query = ctx.request.query;

  try {
    if (query) {
      const _basePath = resolve(__dirname, `../../static/upload`);
      const isExist = fs.existsSync(_basePath);
      
      if (!isExist) {
        throw new Error(`'${_basePath}' is not a valid folder`);
      }
      fs.unlinkSync(`${_basePath}/${query.tab}`);

      ctx.type = 'json';
      ctx.body = {code: 200, msg: 'ok', params: {}, sucess: true};
    }
  } catch (error) {
    // console.log(error)
    ctx.status = 404;
    ctx.type = 'json';
    ctx.body = {code: 404, msg: 'not found', params: {}, sucess: true};
  }
}