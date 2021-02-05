const path = require('path');
const Koa = require('koa');
const logger = require('koa-logger');
const cors = require('koa2-cors');
const bodyparser = require('koa-body');
const koajwt = require('koa-jwt');
const koaStatic = require('koa-static');
const {port, host, corsConf} = require('./config/app');
const route = require('./routes');
const {secret} = require('./config/db');

const app = new Koa();

app
  //跨域配置
  .use(cors(corsConf))
  //请求日志
  .use(logger())
  //解析请求数据
  .use(bodyparser({ multipart: true }))
  .use(koaStatic(path.resolve(__dirname, '../build')))
  //jwt验证
  .use(koajwt({secret}).unless({path: [/\/api\/login$/, /(?!api)/]}))
  //路由配置
  .use(route.routes())
  .use(route.allowedMethods());

//开启服务
app.listen(port, host, () => console.log(`server start at http://${host}:${port}`));
