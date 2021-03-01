const { ProjectTable } = require("../config/db");

async function deleteProject(id) {
  if (typeof id === 'undefined') {
    return {error: 'project not found'};
  }

  try {
    await ProjectTable.destroy({
      where: {
        id
      }
    });

    return {info: 'deleted project'};
  } catch (error) {
    console.log(error);
    return {error: 'search db error'};
  }
}

module.exports = deleteProject;