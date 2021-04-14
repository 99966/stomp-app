import SocketIo from 'socket.io'
import {normalizePath, change2Array} from "./router";
import glob from "glob";
import {resolve} from "path";

const namePrefix = Symbol('namePrefix')
const socketMap = new Map()
export class WebSocket {
    constructor(server, socketPath, path) {
        this.server = server;
        this.socketPath = socketPath;
        this.path = path;
        this.io = new SocketIo({
            path: path || ''
        })
    }

    init = async () => {
        const {server, path ,socketPath, io} = this;
        glob.sync(resolve(socketPath, './*.js')).forEach(require)
        for (let [conf, controller] of socketMap) {
            const {target, method, eventName} = conf
            const controllers = change2Array(controller);
            let prefixPath = target[namePrefix]
            if(prefixPath) prefixPath = normalizePath(prefixPath);
            const namespacePath = prefixPath;
            const namesapceio =  io.of(namespacePath);
            if(method === 'use'){
                for (let controller of controllers) {
                    const mid = await controller()
                    namesapceio[method](mid(eventName))
                }
            }else {
                if(eventName){
                    namesapceio[method](eventName, ...controllers)
                }
            }
        }
        io.attach(server, {
            path
        })
    }
}



export const Namespace = namespace => target => (target.prototype[namePrefix] = namespace)

export const setEvent = method => eventName => (target, key, descriptor) => {
    socketMap.set({
        target,
        method,
        eventName
    },target[key])
    return descriptor
}

export const On = setEvent('on')

export const Connect =  On('connect')

export const Use = setEvent('use')


