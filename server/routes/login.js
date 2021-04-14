import {Controller, Post, Log} from "../decorator/router";
import {findUserByPassword} from "../service/User";
import {sign} from 'jsonwebtoken'

@Controller('/api')
export default class LoginRouter {

  @Post('/login')
  @Log
  async login(ctx, next) {
    const {username, password} = ctx.request.body

    const user = await findUserByPassword({
      user_account: username,
      user_password: password
    })
    const options = {
      secret: 'aaafoo super sercret',
      timeout: 1000,
      handshake: true
    }

    if (user) {
      const profile = {
        username: username,
        info: 123
      };
      const token = sign(profile, options.secret, {expiresIn: 60 * 60 * 5});
      ctx.body = {
        data: {token: token},
        success: true
      }
    } else {
      ctx.body = {
        data: {},
        success: false
      }
    }


  }
}
