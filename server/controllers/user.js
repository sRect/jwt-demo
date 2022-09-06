const jwt = require("jsonwebtoken");
const path = require("path");
const rootDir = process.cwd();
const { SECRET_KEY } = require(path.resolve(rootDir, "./server/config/index"));
const { findOne, insert } = require(path.resolve(
  rootDir,
  "./server/models/userModel"
));

class UserController {
  // 注册
  static async register(ctx) {
    const data = ctx.request.body;

    console.log("register data==>", data);

    const checkUser = await findOne({
      user: data.user,
    });

    console.log("checkUser==>", checkUser);

    if (checkUser) {
      return ctx.sendError(400, "用户已存在");
    }

    let result = await insert({ user: data.user, password: data.password });

    console.log("插入结果==>", result);

    if (result) {
      return ctx.send("注册成功");
    }
  }

  // 登录
  static async login(ctx) {
    const data = ctx.request.body;

    if (!data.user || !data.password) {
      return ctx.sendError(400, "参数不合法");
    }

    console.log(ctx);
    console.log("login data==>", data);

    const result = await findOne({
      user: data.user,
      password: data.password,
    });

    console.log("login result==>", result);

    if (result) {
      const token = jwt.sign(
        {
          user: data.user,
          _id: data._id,
        },
        SECRET_KEY,
        { expiresIn: "1h" }
      );

      return ctx.send(token, "登录成功");
    } else {
      return ctx.sendError(500);
    }
  }
}

module.exports = UserController;
