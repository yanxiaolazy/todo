const log = require('loglevel');
const {ProjectTable} = require('../config/db');

async function updateProject(project, query) {
  if (!query) {
    return {error: 'not valid data'};
  }

  const where = {id: query.id},  
        {projectTitle, ...other} = project;
  let results;

  try {
    results = await ProjectTable.update({
      projectTitle,
      value: JSON.stringify(other),
      updateTime: new Date()
    }, {where});
  } catch(error) {
    log.error(error);
    return {error: 'search db error'};
  }

  return {text: 'update data success'}
}

module.exports = updateProject;

