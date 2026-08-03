const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

const rooms = {};

io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  socket.on("join-room", ({ roomId, username }) => {
    socket.join(roomId);

    if (!rooms[roomId]) {
      rooms[roomId] = [];
    }

    rooms[roomId].push({
      id: socket.id,
      username
    });

    io.to(roomId).emit("room-users", rooms[roomId]);

    socket.on("send-message", (message) => {
      io.to(roomId).emit("receive-message", {
        username,
        message,
        time: new Date().toLocaleTimeString()
      });
    });

    socket.on("disconnect", () => {
      if (rooms[roomId]) {
        rooms[roomId] = rooms[roomId].filter(
          user => user.id !== socket.id
        );

        io.to(roomId).emit("room-users", rooms[roomId]);
      }
    });
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
