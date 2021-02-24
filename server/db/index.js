const login = require('./users');
const addNewProject = require('./project');
const findProjects = require('./findProjects');
const updateProject = require('./updateProject');
const findAllUsers = require('./findAllUsers');
const createUser = require('./createUser');
const deleteUser = require('./deleteUser');
const updateUser = require('./updateUser');
const deleteProject = require('./deleteProject');

module.exports = {
  login,
  addNewProject,
  findProjects,
  updateProject,
  findAllUsers,
  createUser,
  deleteUser,
  updateUser,
  deleteProject
}
