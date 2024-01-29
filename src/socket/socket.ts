import http from 'http';
import { Server } from 'socket.io';

const { log } = console;

const socket = (server: http.Server) => {
  const io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173", "http://localhost:5500"],
      methods: ["GET", "POST", "OPTIONS"],
      credentials: true
    }
  });

  io.on('connection', socket => {
    log(`connected!`, socket.id);
    const { request: req } = socket;
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress?.slice(7);
    // log(request);
    // log(request.headers);
    // log(req.connection.remoteAddress);
    // log(request.rawHeaders);
    console.log(ip);

    socket.emit("test", `ip: ${ip}`);

    
    
    
    socket.on('disconnect', (e) => {
      log('Disconnect', socket.id, e);
    });
  });
};

export default socket;