import { Sequelize } from "sequelize-typescript";

const sequelize = new Sequelize({
    database: "arch", // 数据库名称
    dialect: "mysql", // 使用的数据库类型
    username: "root", // 用户名
    password: "123456", // 密码
    port: 3306, // 端口号
    host: '43.136.113.63',
    models: [`${__dirname}/**/*.model.ts`, `${__dirname}/**/*.model.js`], // 数据库模板存放地址
});

sequelize.sync({ force: false });

// 导出相应模块
export { sequelize };
export { Sequelize };
export default sequelize.models;
