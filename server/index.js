import {join} from 'path'
import http from 'http'
import Koa from 'koa'
import koaBodyParser from 'koa-bodyparser'
import R from 'ramda'
import chalk from 'chalk'
import {sequelize} from "./middleware/database";
import {socket} from "./middleware/websocket";
import { systemLogger } from "../config/logger";

const MIDDLEWARES = ['router','log']
const useMiddlewares = async (app) => {
    R.map(
        R.compose(
            R.forEachObjIndexed(
                e => e(app)
            ),
            require,
            name => join(__dirname, `./middleware/${name}`)
        )
    )(MIDDLEWARES)
}

async function start() {
    const app = new Koa()
    app.use(koaBodyParser())
    const port = 3000
    app.on('error', err => {systemLogger.error(err); });

    await useMiddlewares(app)
    const server = http.createServer(app.callback())
    socket(server)
    try {
        await sequelize.sync()
        server.listen(port, () => {
            console.log(
                process.env.NODE_ENV === 'development'
                    ? `Open ${chalk.green('http://localhost:' + port)}`
                    : `Server started at  port ${port}`
            )
        })
    } catch (e) {
        console.log(e)
    }
}

start()
