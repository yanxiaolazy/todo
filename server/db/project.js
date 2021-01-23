const {ProjectTable} = require('../config/db');

async function addNewProject(project) {
  const {projectTitle, ...other} = project;

  if (typeof projectTitle !== 'string') {
    return {error: 'not valid data'};
  }

  //数据已经存在，更新
  // if (results.length === 1) {    
  //   try {
  //     await ProjectTable.update({
  //       value: JSON.stringify(other),
  //       updateTime: new Date()
  //     }, {where}); 
  //   } catch(error) {
  //     return {error: 'update data error in db'};
  //   }

  //   return {text: 'success'}
  // }
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
