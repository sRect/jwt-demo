const path = require("path");
const rootDir = process.cwd();
const db = require(path.resolve(rootDir, "./server/db/index"));
const { DB_COllECTION_NAME } = require(path.resolve(
  rootDir,
  "./server/db/conf"
));

// 查询
const findOne = (query) => {
  return new Promise((resolve, reject) => {
    db[DB_COllECTION_NAME.user].findOne({ ...query }).exec((err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};

// 插入
const insert = (data) => {
  return new Promise((resolve, reject) => {
    db[DB_COllECTION_NAME.user].insert(data, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};

module.exports = {
  findOne,
  insert,
};
