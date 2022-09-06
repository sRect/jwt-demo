const nedb = require("nedb");
const path = require("path");
const { DB_COllECTION_NAME } = require("./conf");

const db = {};
// https://www.w3cschool.cn/nedbintro/nedbintro-asrf27md.html
// 初始化user集合
db[DB_COllECTION_NAME.user] = new nedb({
  filename: path.resolve(__dirname, `./${DB_COllECTION_NAME.user}.db`), // 指定数据存储的文件位置
  autoload: true, // 自动加载数据库
});

// 初始化home集合
db[DB_COllECTION_NAME.home] = new nedb({
  filename: path.resolve(__dirname, `./${DB_COllECTION_NAME.home}.db`),
  autoload: true, // 自动加载数据库
});

module.exports = db;
