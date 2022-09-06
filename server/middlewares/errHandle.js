const handler = async (ctx, next) => {
  // 全局处理错误
  try {
    await next();
  } catch (err) {
    const code = err.statusCode || err.status || 500;

    if (code === 401) {
      ctx.sendError(code, "访问被拒绝，未授权");
    } else {
      ctx.response.status = code;
      ctx.response.body = {
        message: err.message,
      };
    }

    ctx.app.emit("error", err, ctx); // 释放error
  }
};

module.exports = handler;
