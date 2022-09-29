const path = require("path");
const fs = require("fs");
const Koa = require("koa");
const Router = require("@koa/router");
const static = require("koa-static");
const bodyParser = require("koa-bodyparser");
const koajwt = require("koa-jwt");

const app = new Koa();
const router = new Router();
const rootDir = process.cwd();

// const index = require(path.resolve(rootDir, "./server/routes/index"));
const login = require(path.resolve(rootDir, "./server/routes/login"));
const home = require(path.resolve(rootDir, "./server/routes/home"));

const sendHandle = require(path.resolve(
  rootDir,
  "./server/middlewares/sendHandle"
));
const errHandle = require(path.resolve(
  rootDir,
  "./server/middlewares/errHandle"
));
// const { SECRET_KEY } = require(path.resolve(rootDir, "./server/config/index"));
const RSA_PUBLIC_KEY = fs.readFileSync(
  path.resolve(rootDir, "./server/config/rsa/rsa_public_key.pem")
);

app.use(bodyParser());
app.use(static(path.resolve(rootDir, "./client")));
app.use(sendHandle());
app.use(errHandle);
// https://www.npmjs.com/package/koa-jwt
app.use(
  koajwt({ secret: RSA_PUBLIC_KEY, algorithms: ["RS256"] }).unless({
    path: [/\/api\/login/, /\/api\/register/],
  })
);

// 加载所有子路由
// router.use("/", index.routes());
router.use("/api", login.routes());
router.use("/api/home", home.routes());
// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods());

app.on("error", function (err) {
  console.error("logging error ", err.message);
  console.error(err);
});

app.listen(3000, () => {
  console.log("app is running at port 3000");
});
