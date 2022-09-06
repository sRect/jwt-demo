const Router = require("@koa/router");
const path = require("path");
const router = new Router();

const rootDir = process.cwd();
const Home = require(path.resolve(rootDir, "./server/controllers/home"));

router.post("/banner", Home.banner);

module.exports = router;
