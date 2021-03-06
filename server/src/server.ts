import { Server as SocketServer, Socket } from "socket.io";

enum SocketEvents {
  CONNECTION = "connection",
  ROTATION_MATRIX = "rotation",
  INTERACTABLES = "interactables",
}

const socketServer = new SocketServer({
  cors: { origin: "*", methods: ["GET", "POST"] },
});

socketServer.on(SocketEvents.CONNECTION, (socket: Socket) => {
  console.log("Got connection from socket ", socket.id);

  socket.on(SocketEvents.ROTATION_MATRIX, (data) => {
    socket.broadcast.emit(SocketEvents.ROTATION_MATRIX, data);
  });

  socket.on(SocketEvents.INTERACTABLES, (data) => {
    socket.broadcast.emit(SocketEvents.INTERACTABLES, data);
  });
});

socketServer.listen(7777);
