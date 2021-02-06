const {Op} = require('sequelize');
const jwt = require('jsonwebtoken');
const log = require('loglevel');
const {UsersTable, secret} = require('../config/db');
const createHash = require('../utils/createHash');

async function login(username, password, email) {
  if (!username || !password || !email) {
    return {error: 'not valid username or password or email'}
  }

  const where = {[Op.and]: [{username}, {email}]};
  let results;
  
  try {
    results = await UsersTable.findAll({where});
  } catch (error) {
    log.error(error);
    return {error: 'search db error'};
  }

  //查询结果大于一，数据存储出现问题
  if (results.length > 1) {
    return {error: 'internal data storage error'};
  } 

  if (results.length === 0) {
    return {error: 'wrong user name or password'};
  }

  const {dataValues} = results[0],
  //获取盐值
        salt = dataValues.password.split('$')[1];

  if (createHash(password, salt) === dataValues.password) {
    return {
      token: createToken(username), 
      admin: dataValues.admin
    }
  }

  return {error: 'wrong user name or password'};
}

function createToken(username) {
  const payload = {
    expiresIn: '24h',
    notBefore: 0,
    audience: 'yanxiaolazy',
    issuer: 'yanxiaolazy',
    subject: 'yanxiaolazy',
    header: {
      typ: 'JWT',
      alg: 'HS256'
    },
    username
  };

  return jwt.sign(payload, secret);
}

module.exports = login;

