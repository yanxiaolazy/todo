const fs = require('fs');
const {resolve, extname, basename} = require('path');

module.exports = upload;

async function upload(ctx, next) {
  const {file} = ctx.request.files, 
        {uploader, uploadTime, todoStatus} = ctx.request.body
        _basePath = resolve(__dirname, `../../static/upload`),
        //检查目录是否存在
        isExist = fs.existsSync(_basePath);

  const _path = createFileExist(_basePath, file.name);

  try {
    if (uploader && uploadTime && isExist && file) {

      const reader = fs.createReadStream(file.path),
            stream = fs.createWriteStream(_path);
      reader.pipe(stream);
      //将_path存入数据库？

      ctx.type = 'json';
      ctx.body = {code: 200, msg: 'ok', params: {uploadTime, uploader, todoStatus, file: basename(_path)}, sucess: true};
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

const createFileExist = (function () {
  let count = 1;

  return (_basePath, name) => {
    let path = `${_basePath}/${name}`,
        //检查文件是否存在
        isAccess = true;
    const ext =  extname(name),
          base = basename(name, ext);
  
    while (isAccess) {
      try {
        fs.accessSync(path, fs.constants.F_OK);
      } catch (error) {
        // console.log(error)
        isAccess = false;
      }
      if (isAccess) {
        path=`${_basePath}/${base}-(${count})${ext}`;
        count++;
      }
    }

    count = 1;
    return path;
  }
}());


