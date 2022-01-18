# egg-web-serve

'基于eggjs的node + mySql + egg-sequelize服务器一个开箱即用的应用模板'

## 快速开始

<!-- add docs here for user -->
[egg]: https://eggjs.org
see [egg docs][egg] for more detail.

> 在`config/config.default.js`,配置自己数据库连接

### 开发

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
$ open http://localhost:7001/admin  # 文章录入界面
```

### 部署

```bash
$ npm start
$ npm stop
```
<!-- 
### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail. -->

### 插入种子数据

在`database/config.json`配置数据库连接,运行命令

```bash
# 执行所有的种子文件, 数据插入
npx sequelize db:seed:all
```


### 主要目录结构
```
egg-project
├── package.json
├── app.js (主入口文件, 可自定义程序启动)
├── app
|   ├── router.js (路由,用于配置 URL 路由规则)
│   ├── controller (用于解析用户的输入，处理后返回相应的结果)
│   |   └── home.js
│   ├── service  ( 用于编写业务逻辑层，可选，建议使用)
│   |   └── user.js
│   ├── middleware (用于编写中间件，可选)
│   |   └── response_time.js
│   ├── public (用于放置静态资源，可选)
│   |   └── reset.css
│   ├── view (用于放置模板文件，可选)
│   |   └── index.html
│   └── extend (用于框架的扩展)
│       ├── helper.js (可选)
├── config
|   ├── plugin.js (用于配置需要加载的插件)
|   ├── config.default.js (用于编写配置文件, 数据库配置)
│   ├── config.prod.js (用于生产环境配置文件,自动合并default)

```

### sequelize
- 创建一个 一对一 关系, hasOne 和 belongsTo 关联一起使用;
- 创建一个 一对多 关系, hasMany he belongsTo 关联一起使用;
- 创建一个 多对多 关系, 两个 belongsToMany 调用一起使用.
> 更多sequelize使用，参考[中文文档](https://demopark.github.io/sequelize-docs-Zh-CN/)
<!-- https://demopark.github.io/sequelize-docs-Zh-CN/ -->