const sendHandle = () => {
  // 处理请求成功
  const render = (ctx) => {
    return (data, msg = "请求成功") => {
      ctx.set("Content-Type", "application/json");
      ctx.body = {
        code: 200,
        data,
        msg,
      };
    };
  };

  // 处理请求失败
  const handleError = (ctx) => {
    return (code, msg = "请求失败") => {
      ctx.set("Content-Type", "application/json");
      ctx.body = {
        code,
        data: null,
        msg,
      };
    };
  };

  return async (ctx, next) => {
    ctx.send = render(ctx);
    ctx.sendError = handleError(ctx);

    await next();
  };
};

module.exports = sendHandle;
