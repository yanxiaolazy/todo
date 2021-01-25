const {ProjectTable} = require('../config/db');

async function addNewProject(project) {
  const {projectTitle, ...other} = project;

  if (typeof projectTitle !== 'string') {
    return {error: 'not valid data'};
  }

  //新建数据
  try {
    await ProjectTable.create({
      projectTitle, 
      createTime: new Date(), 
      updateTime: new Date(),
      value: JSON.stringify(other)
    });
  } catch(error) {
    return {error: 'create data error in db'};
  }

  return {text: 'success'}
}


module.exports = addNewProject;
