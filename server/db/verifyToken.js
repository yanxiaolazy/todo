const ms = require('ms');
const {UsersTable} = require('../config/db');
const status = require('../routes/status');

async function verifyToken(ctx, next) {
  const {user} = ctx.state;

  try {
    const {expiresIn, notBefore} = user; 

    if ((Date.now() - notBefore) < ms(expiresIn)) {
      const results = await UsersTable.findAll({where: {username: user.username}});

      if (results.length !== 1) {
        ctx.status = 401;
        ctx.body = Object.assign({}, status['401'], {params: {info: 'unauthorized'}});
      }

      //token验证成功时
      await next();
    } else {
      ctx.status = 401;
      ctx.body = Object.assign({}, status['401'], {params: {info: 'unauthorized'}});
    }
  } catch {
    // user不存在时
    await next();
  } 
}

module.exports = verifyToken;