const server = use("Server");
const io = use("socket.io")(server.getInstance());

const { joinUser, getRoom } = use("./../app/Controllers/Ws/TicketSocketController");

io.on("connection", function (socket) {

  socket.on("joinTicket", ({ ticketId, userId }) => {
    if (!ticketId || !userId) {
      return;
    }

    const userRoom = joinUser(ticketId, userId);

    if (userRoom)
      socket.join(userRoom);
  });

  socket.on("chatMessages", ({ ticketId, message }) => {
    const usersRoom = getRoom(ticketId);

    if (usersRoom)
      io.to(usersRoom).emit("newMessage", message);
  });

  socket.on("notificate", data => {
    io.emit("hasNotification", data);
  });

  socket.on("ticketChange", () => {
    io.emit("ticketHasChanged");
  });

  socket.on('ticketFinished', ({ ticketId }) => {
    const usersRoom = getRoom(ticketId);

    if (usersRoom) {
      io.to(usersRoom).emit('ticketHasFinished');

      socket.leave(usersRoom);
    }
  });
});