// const fs = require("fs");
// const path = require("path");
// const { promisify } = require("util");
// const Router = require("@koa/router");
// const router = new Router();

// const rootDir = process.cwd();
// const fsReadFile = promisify(fs.readFile);

// router.get("/", async (ctx, next) => {
//   ctx.response.type = "text/html";
//   ctx.response.body = await fsReadFile.readFile(
//     path.resolve(rootDir, "./client/index.html")
//   );
//   await next();
// });

// module.exports = router;
