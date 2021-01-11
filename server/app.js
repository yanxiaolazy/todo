const Koa = require('koa');
const logger = require('koa-logger');
const cors = require('koa2-cors');
const bodyparser = require('koa-bodyparser');
const {port, host, corsConf} = require('./config/app');
const route = require('./routes');

const app = new Koa();

app
  .use(cors(corsConf))
  .use(logger())
  .use(bodyparser())
  .use(route.routes())
  .use(route.allowedMethods())

app.listen(port, host, () => console.log(`server start at http://${host}:${port}`));
