import { Server } from 'socket.io';
import http from 'http';
import express from 'express';
import cors from 'cors';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
  }
});

io.on('connection', socket => {
  socket.on('SendMessage', data => {
    console.log(data);
    io.emit('listen', data); // Enviar a mensagem para todos os clientes conectados
  });
});

server.listen(3000, () => {
  console.log("SERVER IS RUNNING ON PORT 3000");
});
