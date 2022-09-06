const path = require("path");
const rootDir = process.cwd();
const { find, insert } = require(path.resolve(
  rootDir,
  "./server/models/homeModel"
));

class HomeController {
  // banner查询
  static async banner(ctx) {
    const data = ctx.request.body;

    console.log("banner request data==>", data);

    const result = await find({});

    console.log("banner result data==>", result);
    if (result && Array.isArray(result) && result.length) {
      return ctx.send(result[0]);
    } else {
      const insertRes = await insert({
        banner: ["https://7n.w3cschool.cn/statics/images/logonew2.png"],
      });

      console.log("图片插入成功==>");

      if (insertRes) {
        return await HomeController.banner(ctx);
      }
    }
  }
}

module.exports = HomeController;
