import {WebSocket} from "../decorator/webSocket";
import {resolve} from 'path'

export const socket = (app) => {
  const socketsPath = resolve(__dirname, '../sockets')
  const instance = new WebSocket(app, socketsPath)

  instance.init()

}
