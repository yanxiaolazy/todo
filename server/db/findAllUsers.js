const {UsersTable} = require('../config/db');

async function findAllUsers() {
  let results = null;

  try {
    results = await UsersTable.findAll();
  } catch (error) {
    return {error: 'search db error'};
  }

  if (results.length < 1) {
    //默认有个'admin'用户
    return {error: 'internal data storage error'};
  }

  const users = results.map(result => {
    const {id, username, email, admin} = result.dataValues;

    return {id, username, email, admin};
  });

  return {users};
}
module.exports = findAllUsers;


