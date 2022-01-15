### egg 框架使用 Sequelize-cli

> 为什么要使用 sequelize-cli? 就像你使用 Git/SVN 来管理源代码的更改一样,你可以使用迁移来跟踪数据库的更改。
> 此项目用 sequelize 管理 mysql 数据库

#### 安装

```bash
npm install mysql2 egg-squelize squelize-cli -S
```

**egg-squelize 配置详见[egg 文档](https://eggjs.org/zh-cn/tutorials/sequelize.html)**

#### Sequelize-cli 常用命令快览

```bash
# npx sequelize init 快速初始化迁移配置
npx sequelize init:config  # 数据库配置
npx sequelize init:migrations # 迁移文件夹
npx sequelize init:seeders # 种子数据文件夹


# 创建模型, egg框架可以不操作
npx sequelize model:create --name ${filename} --attributes username:STRING

#  生成一个 migration 文件
npx sequelize migration:generate --name=${filename}


# 执行 migrate 进行数据库变更 迁移 npx sequelize db:migrate 在数据库中生成表
# 升级数据库
npx sequelize db:migrate
# 如果有问题需要回滚，可以通过 `db:migrate:undo` 回退一个变更
# npx sequelize db:migrate:undo
# 可以通过 `db:migrate:undo:all` 回退到初始状态
# npx sequelize db:migrate:undo:all

#  生成一个seed文件(种子数据文件)
npx sequelize seed:generate --name makeUser

# 执行所有的种子文件, 数据插入
npx sequelize db:seed:all

```

#### 初始配置

- 在 egg 项目中，我们希望将所有数据库 Migrations 相关的内容都放在 database 目录下，所以我们在项目根目录下新建一个 .sequelizerc 配置文件：

```js
"use strict";

const path = require("path");

module.exports = {
  config: path.join(__dirname, "database/config.json"),
  "migrations-path": path.join(__dirname, "database/migrations"),
  "seeders-path": path.join(__dirname, "database/seeders"),
  "models-path": path.join(__dirname, "app/model"),
};
```

- 初始化 Migrations 配置文件和目录

```bash
npx sequelize init:config
npx sequelize init:migrations
npx sequelize init:seeders
```

- 命令执行之后会生成 `config,migrations,seeders` 文件夹

  > `npx sequelize init ` 会生成`config,migrations,seeders,models`文件夹,因为`egg框架`有自己的`model约定`所以这里不生成`models`

- 执行完后会生成` database/config.json` 文件和 `database/migrations` 目录，我们修改一下 `database/config.json` 中的内容，将其改成我们项目中使用的数据库配置：

```json
{
  "development": {
    "username": "root",
    "password": null,
    "database": "egg-sequelize-doc-default",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "egg-sequelize-doc-unittest",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

此时 `sequelize-cli` 和相关的配置也都初始化好了，我们可以开始编写项目的第一个 `Migration` 文件来创建我们的一个 `user` 表了。

```bash
npx sequelize migration:generate --name=init-users
```

执行完后会在 `database/migrations` 目录下生成一个 `migration` 文件`(${timestamp}-init-users.js)`，我们修改它来处理初始化 `user` 表：

```js
"use strict";

module.exports = {
  // 在执行数据库升级时调用的函数，创建 users 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable("users", {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      username: STRING(30),
      password: STRING(32),
      phone: STRING(105),
      avator_url: STRING(100),
      create_time: DATE,
      update_time: DATE,
    });
  },
  // 在执行数据库降级时调用的函数，删除 users 表
  down: async (queryInterface) => {
    await queryInterface.dropTable("users");
  },
};
```

- 执行 migrate 进行数据库变更(如果数据库没有表，此时应该已经创建了)

```bash
# 升级数据库
npx sequelize db:migrate
# 如果有问题需要回滚，可以通过 `db:migrate:undo` 回退一个变更
# npx sequelize db:migrate:undo
# 可以通过 `db:migrate:undo:all` 回退到初始状态
# npx sequelize db:migrate:undo:all
# 撤销指定的文件 name 在数据库的SequelizeMeta表中
# npx sequelize db:migrate:undo --name 20200507073255-create-user
```

执行之后，我们的数据库初始化就完成了。

现在终于可以开始编写代码实现业务逻辑了，首先我们来在 `app/model/` 目录下编写 `user` 这个 Model：

```js
"use strict";

module.exports = (app) => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define("user", {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(30),
    age: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  });

  return User;
};
```

#### seed 种子文件

> 种子书库, 主要方便数据的操作

- 创建 seed 文件 `npx sequelize seed:generate --name makeUser` 在`seeders`文件夹下生成`${timestamp}-makeUser.js`文件，并对其进行设置

```js
"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert(
      "user",
      [
        {
          username: "admin",
          phone: "15623476282",
          password: "12345",
          avator_url: "/",
          create_time: "2022-01-15",
          update_time: "2022-01-15",
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */

    return queryInterface.bulkDelete("user", null, {});
  },
};
```

执行`npx sequelize db:seed:all`, 执行所有的种子文件, 数据插入成功

<!-- https://juejin.cn/post/6844904150761734157 -->
<!-- https://www.jianshu.com/p/d424c0a34870 -->
<!-- https://juejin.cn/post/6844904052313030664#heading-7 -->
