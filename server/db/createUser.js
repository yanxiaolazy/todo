const { Op } = require('sequelize');
const log = require('loglevel');
const {UsersTable} = require('../config/db');
const createHash = require('../utils/createHash');


async function createUser(values) {
  const {username, email, password} = values;

  if (!username || !email) {
    return {error: 'user input error'}
  }

  const where = {
    [Op.or]: [
      {username},
      {email}
    ]
  };

  try {
    const results = await UsersTable.findAll({where});

    if (results.length > 0) {
      return {exist: '用户名已存在/邮箱已存在'};
    }
  } catch (error) {
    log.error(error);
    return {error: 'search db error'};
  }

  try {
    UsersTable.create({
      username,
      email,
      password: createHash(password),
      createTime: new Date(),
      updateTime: new Date()
    });

    return {text: '新建用户成功'};
  } catch(error) {
    log.error(error);
    return {error: 'search db error'};
  }
}

module.exports = createUser;

