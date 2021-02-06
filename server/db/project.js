const log = require('loglevel');
const {ProjectTable} = require('../config/db');

async function addNewProject(project) {
  const {projectTitle, endTime} = project;

  if (typeof projectTitle !== 'string') {
    return {error: 'not valid data'};
  }

  const value = {
    project: {projectTitle},
    moduleItem: [],
    fileModule: [],
    textModule: []
  }

  //新建数据
  try {
    await ProjectTable.create({
      projectTitle, 
      createTime: new Date(), 
      updateTime: new Date(),
      value: JSON.stringify(value),
      timeRange: JSON.stringify(endTime)
    });
  } catch(error) {
    log.error(error);
    return {error: 'create data error in db'};
  }

  return {text: 'success'}
}

module.exports = addNewProject;
