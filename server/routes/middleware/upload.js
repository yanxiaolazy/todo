const fs = require('fs');
const {resolve} = require('path');

module.exports = upload;

async function upload(ctx, next) {
  const {file} = ctx.request.files;
  
  try {
    const _basePath = resolve(__dirname, `../../static/upload`);
    const isExist = fs.existsSync(_basePath);

    if (isExist && file) {
      const reader = fs.createReadStream(file.path),
            _path =`${_basePath}/${file.name.toString()}`;
            stream = fs.createWriteStream(_path);
      reader.pipe(stream);

      ctx.type = 'json';
      ctx.body = {code: 200, msg: 'ok', params: {uploadTime: Date.now(), uploader: 'yanxiaolazy'}, sucess: true};
    } else {
      if (!isExist) {
        throw new Error(`'${_basePath}' is not a valid folder`);
      }
      throw new ReferenceError(`file is '${file}' `);
    }
  } catch (error) {
    console.log(error);
    ctx.status = 502;
    ctx.type = 'json';
    ctx.body = {code: 502, msg: 'bad gateway', params: {}, sucess: true};
  }
  await next();
}


