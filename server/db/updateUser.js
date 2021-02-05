const {UsersTable} = require('../config/db');
const createHash = require('../utils/createHash');

async function updateUser(user) {
  const {username, password, email} = user;
  if (!username || !password || !email) {
    return {error: 'not vliad value'}
  }
  try {
    await UsersTable.update({
      username, 
      email, 
      password: createHash(password), 
      updateTime: new Date()
    }, {where: {username}});
  } catch(error) {
    return {error: 'search db error'};
  }

  return {text: 'update data success'};
}

module.exports = updateUser;
