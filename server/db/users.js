const {UsersTable} = require('../config/db');
const {Op} = require('sequelize');
const  jwt = require('jsonwebtoken');

const secret = 'thisisasecret-yanxiaolazy';

async function login(username, password, email) {
  if (!username || !password || !email) {
    return {error: 'not valid username or password or email'}
  }

  const where = {[Op.and]: [{username}, {password}, {email}]};
  let results;
  
  try {
    results = await UsersTable.findAll({where});
  } catch (error) {
    return {error: 'search db error'};
  }

  //查询结果大于一，数据存储出现问题
  if (results.length > 1) {
    return {error: 'internal data storage error'};
  } 

  const {dataValues} = results[0]; 

  return {
    token: createToken(username), 
    admin: dataValues.admin
  }
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

function verifyToken(token) {
  let payload;

  try {
    payload = jwt.verify(token, secret);
  } catch(error) {

  }
  console.log(payload);

  return '待完善......'
}

module.exports = login;
exports = {
  verifyToken
}

