const Router = require('@koa/router');
const {login} = require('./middleware');

const route = new Router({prefix: '/api'});

module.exports = route;

// route
//   .get('/view/project', viewProject)
//   .get('/view/date', viewDate);

route
  .post('/login', login)
  // .post('/logout', logout)
  // .post('/upload', upload)
  // .post('/new/user', newUser)
  // .post('/new/project', newProject)
  // .post('/verify/username', verifyUsername)
  // .post('/verify/token', verifyToken);


// route
//   .delete('/delete/file', deleteFile)
//   .delete('/delete/project', deleteProject)
//   .delete('/delete/image', deleteImage)
//   .delete('/delete/user', deleteUser);