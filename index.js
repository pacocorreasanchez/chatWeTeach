const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.get("/", function(req, res) {
  res.render("index.html");
});

io.sockets.on("connection", function(socket) {
  socket.on("username", function(username) {
    socket.username = username;
    io.emit("is_online", "🔵 <i>" + socket.username + " se une al chat..</i>");
  });

  socket.on("disconnect", function(username) {
    io.emit(
      "is_online",
      "🔴 <i>" + socket.username + " ha dejado el chat ..</i>"
    );
  });

  socket.on("chat_message", function(message) {
    io.emit(
      "chat_message",
      "<strong>" + socket.username + "</strong>: " + message
    );
  });
});
var PORT = process.env.PORT || 8080;
const server = http.listen(PORT, function() {
  console.log("oyendo en *:8080");
});