const { UsersTable } = require("../config/db");

async function deleteUser(id) {
  if (!id) {
    return {error: 'not valid params `id`'};
  }
  const where = {id};

  try {
    await UsersTable.destroy({where});

    return {text: `delete ${id}`};
  } catch (error) {
    return {error: 'search db error'};
  }
}

module.exports = deleteUser;
