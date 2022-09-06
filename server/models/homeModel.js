const path = require("path");
const rootDir = process.cwd();
const db = require(path.resolve(rootDir, "./server/db/index"));
const { DB_COllECTION_NAME } = require(path.resolve(
  rootDir,
  "./server/db/conf"
));

// banner查询
const find = (query) => {
  return new Promise((resolve, reject) => {
    db[DB_COllECTION_NAME.home].find({ ...query }).exec((err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};

// 插入
const insert = (data) => {
  return new Promise((resolve, reject) => {
    db[DB_COllECTION_NAME.home].insert(data, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};

module.exports = {
  find,
  insert,
};
