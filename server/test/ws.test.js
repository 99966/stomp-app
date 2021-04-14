import {WsStompServer} from "../middleware/stompServer";
import Koa from 'koa'

var http = require("http");

(async _ => {

    const server = new Koa()
    server.use(async ctx => {
        console.log(111)
    })

    // var stompServer = new StompServer({server: server, path: '/stomp'});

    // stompServer.subscribe("/**", function(msg, headers) {
    //     var topic = headers.destination;
    //     console.log(topic, "->", msg);
    // });
    var app = WsStompServer(server)
    app.listen(61614);

})()
