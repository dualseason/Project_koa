import Koa from "koa";
import statics from "koa-static"; // 静态文件
import { loadControllers } from "koa-router-ts"; // 引入路由控制器
import Logger from "koa-logger"; // 日志
import moment from "moment"; // 时间格式化
import bodyParser from "koa-bodyparser"; // post请求
import path from "path";
import cors from "koa2-cors"; // 跨域处理

// init db models
import "./models"; // 加载数据库模板文件

const staticPath = "./static";  // 静态文件地址
const logger = new Logger(str => { // 日志时间格式化处理
    console.log(moment().format("YYYY-MM-DD HH:mm:ss") + str);
});

// 实例化koa
const app = new Koa();

// 加载中间件
app.use(bodyParser());
app.use(logger);
app.use(statics(path.join(__dirname, staticPath)));
// 实例化路由
const router = loadControllers(path.join(__dirname, "controllers"), {
    recurse: true,
});
// 设置路由api前缀
router.prefix("/api/v1");

app.use(router.routes()).use(router.allowedMethods());
// 设置跨域
app.use(
    cors({
        origin: (ctx: any) => {
            if (ctx.url === "/test") {
                return "*";
            }
            return "http:localhost:8000"; // 允许http:localhost:8000请求跨域
        },
        maxAge: 5,
        credentials: true,
        allowMethods: ["GET", "POST", "PUT", "DELETE"],
        allowHeaders: ["Content-Type", "Authorization", "Accept"],
        exposeHeaders: ["WWW-Authenticate", "Server-Authorization"],
    })
);

const PORT = process.env.PORT || 8044;
app.listen(PORT);
