const Router = require('@koa/router');
const {
  login, 
  upload, 
  newProject, 
  deleteFile,
  viewProject,
  updateProject,
  viewFile
} = require('./middleware');

const router = new Router({prefix: '/api'});

router
  .get('/view/project', viewProject)
//   .get('/view/date', viewDate);
.get('/view/file', viewFile)


router
  .post('/login', login)
  // .post('/logout', logout)
  .post('/upload', upload)
  // .post('/new/user', newUser)
  .post('/new/project', newProject)
  .post('/update/project', updateProject)
  // .post('/verify/username', verifyUsername)
  // .post('/verify/token', verifyToken)


// router
  .delete('/delete/file', deleteFile)
//   .delete('/delete/project', deleteProject)
//   .delete('/delete/user', deleteUser);


module.exports = router;
