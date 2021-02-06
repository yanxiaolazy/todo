const log = require('loglevel');
const {UsersTable} = require('../config/db');

async function findAllUsers(tab) {
  let results = null,
      where = {
        username: tab
      }

  if (tab) {
    try {
      results = await UsersTable.findAll({where});

      if (results.length > 1) {
        return {error: 'internal data storage error'};
      }

      const {username, email} = results[0].dataValues;

      return {users: {username, email}};
    } catch (error) {
      log.error(error);
      return {error: 'search db error'};
    }
  } else {
    try {
      results = await UsersTable.findAll();

      if (results.length < 1) {
        //默认有个'admin'用户
        return {error: 'internal data storage error'};
      }
    
      const users = results.map(result => {
        const {id, username, email, admin} = result.dataValues;
    
        return {id, username, email, admin};
      });
    
      return {users};
    } catch (error) {
      log.error(error);
      return {error: 'search db error'};
    }
  }   
}
module.exports = findAllUsers;


