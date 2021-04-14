import {authorize} from 'socketio-jwt'
import {genUniqueKey} from "../../utils";
import {create} from "../service/Socket";
import {
    Namespace,
    Connect,
    Use,
} from "../decorator/webSocket";

@Namespace('/user')
export default class UserSocket {
    //
    @Use({
        secret: 'aaafoo super sercret',
        timeout: 1000,
        handshake: true
    })
    async auth(opt) {
        return authorize
    }

    @Connect
    async connect(socket) {
        console.log('namespace /user connect')
        socket.uniqueKey = genUniqueKey()
        let counter = 0;
        setInterval(() => {
            socket.emit('delete user', ++counter);
        }, 5000);

        try {
            await create({
                id: socket.id,
                socket_id: socket.uniqueKey,
                message: 'connect',
                remote_ip: socket.handshake.address
            })
        } catch (e) {
            console.log(e)
        }

        socket.on('test', async data => {
            console.log(`>>>>> test ${data}`)
            await create({
                id: socket.id,
                socket_id: genUniqueKey(),
                message: `>>>> ${data}`,
                remote_ip: socket.handshake.address
            })
            let sendData = JSON.stringify({
                ...(JSON.parse(data)),
                server: 1
            })
            socket.emit('test', sendData, async () => {
                console.log(`<<<< test ${sendData}`)
                await create({
                    id: socket.id,
                    socket_id: genUniqueKey(),
                    message: `<<<< ${sendData}`,
                    remote_ip: socket.handshake.address
                })
            })
        })

        socket.on('disconnect', async reason => {
            const {id, handshake} = socket;
            await create({
                id: id,
                socket_status: 1,
                socket_id: genUniqueKey(),
                message: reason,
                remote_ip: handshake.address
            })
            console.log('adminNamespace disconnect')
            console.log('reason ', reason)

        })
    }


}
