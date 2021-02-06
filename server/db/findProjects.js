const log = require('loglevel');
const {ProjectTable} = require('../config/db');

async function findProjects(query) {
  let attributes = ['id', 'projectTitle', 'createTime', 'updateTime', 'status', 'timeRange'],
      results = null,
      titles = null;

  //获取项目内容
  if (query?.id) {
    const where = {id: query.id};
    attributes = ['value'];
    try {
      results = await ProjectTable.findAll({where, attributes});
    } catch (error) {
      log.error(error);
      return {error: 'search db error'};
    }

    //查询结果大于一，数据存储出现问题
    if (results.length > 1) {
      return {error: 'internal data storage error'};
    } 

    const {dataValues: {value}} = results[0];

    return {project: value};
  }
  
  //获取除项目内容外的所有值
  try {
    results = await ProjectTable.findAll({attributes});
  } catch (error) {
    log.error(error);
    return {error: 'search db error'};
  }

  if (results.length > 0) {
    titles = results.map(m => {
      const {dataValues: {id, projectTitle, createTime, updateTime, status, timeRange}} = m;
      return {
        id,
        projectTitle,
        createTime,
        updateTime,
        status,
        timeRange
      }
    });
  }

  return {titles};
}

module.exports = findProjects;

