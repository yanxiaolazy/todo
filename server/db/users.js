const {Op} = require('sequelize');
const jwt = require('jsonwebtoken');
const log = require('loglevel');
const {UsersTable, secret} = require('../config/db');
const createHash = require('../utils/createHash');

async function login(username, password, remember) {
  if (!username || !password) {
    return {error: 'not valid username or password or email'}
  }

  const where = {[Op.and]: [{username}]};
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
    return {info: 'wrong user name or password'};
  }

  const {dataValues} = results[0],
  //获取盐值
        salt = dataValues.password.split('$')[1];

  if (createHash(password, salt) === dataValues.password) {
    return {
      token: createToken(username, remember), 
      admin: dataValues.admin,
      email: dataValues.email
    }
  }

  return {info: 'wrong user name or password'};
}

function createToken(username, remember) {
  const payload = {
    expiresIn: remember ? '48h' : '24h',
    notBefore: Date.now(),
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

