const path = require('path');
const fs = require('fs');
const status = require('../status');

async function viewAllMedias(ctx, next) {
  const _staticPath = path.resolve(__dirname, '../../static/upload'),
        files = fs.readdirSync(_staticPath),
        position = files.indexOf('todo.png'),
        query = ctx.request.query

  //delete default image
  if (Number.isInteger(position)) {
    files.splice(position, 1);
  }
  //排序
  files.sort();

  if (!query.page) {
    ctx.body = Object.assign({}, status['200'], {params: {data: files.slice(0, 20), total: files.length}});
  } else {
    const {page, pageSize} = query,
          start = (page - 1) * pageSize,
          end = page * pageSize

    ctx.body = Object.assign({}, status['200'], {params: {data: files.slice(start, end)}});
  }
}

module.exports = viewAllMedias;

