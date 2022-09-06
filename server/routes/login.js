const Router = require("@koa/router");
const path = require("path");
const router = new Router();

const rootDir = process.cwd();
const User = require(path.resolve(rootDir, "./server/controllers/user"));

router.post("/login", User.login);
router.post("/register", User.register);

module.exports = router;
