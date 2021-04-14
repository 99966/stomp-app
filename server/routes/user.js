import {Controller, Get, Log} from "../decorator/router";
import {getOneUser} from "../service/Socket";

@Controller('/api/users')
export default class UserRouter {
    @Get('/:id')
    @Log
    async getMovieList (ctx, next) {

        const movies = await getOneUser(1)

        ctx.body = {
            data: movies,
            success: true
        }
    }
}
