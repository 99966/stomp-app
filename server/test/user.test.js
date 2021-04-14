require('@babel/register')()
import {create} from "../service/Socket";
import {genUniqueKey} from "../../utils";
import {findUserByPassword} from "../service/User";

(async _ => {
    // let user = await create({
    //     //     id: parseInt(Date.now()+''),
    //     //     socket_id: genUniqueKey(),
    //     //     message: 'connect',
    //     //     remote_ip: '127.0.0.1'
    //     // })
    //     // console.log('user',user)

    let user = await findUserByPassword({
        user_account: 'zhangsan',
        user_password: '12344'
    })

    console.log('user ',user)

    console.log(user.toJSON())
})()
