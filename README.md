## TODO

### Installation

```bash
$ git clone https://github.com/yanxiaolazy/todo.git
```

### Development

安装依赖项

```bash
$ yarn install
```

启动客户端

```bash
$ yarn start
```

初始化数据库

```bash
$ yarn run db
```

注：确保连接到一个有效的数据库

启动服务端

```bash
$ yarn run dev
```

### Production

安装依赖项

```bash
$ yarn install
```
创建配置文件`config.js` 
用于导出一个有效的后端`url` 
```bash
$ vim ./src/utils/config.js
```
输入如下的内容
```js
export const baseURL = 'http://localhost:5000';//此处放上部署的url，以供登录等操作
```


打包项目

```bash
$ yarn run build
```

开启服务

```bash
$ docker-compose up -d --build
$ docker-compose restart
```

**每次更新项目后都需要重复这个过程** 

### Not implemented
* logout
* project progress
* home page

