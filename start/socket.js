const server = use("Server");
const io = use("socket.io")(server.getInstance());

const { joinUser, getRoom } = use("./../app/Controllers/Ws/TicketSocketController");

io.on("connection", function (socket) {

  // When join on chat ticket
  socket.on("joinTicket", ({ ticketId, userId }) => {
    if (!ticketId || !userId) {
      return;
    }

    const userRoom = joinUser(ticketId, userId);

    if (userRoom)
      socket.join(userRoom);
  });

  // Listen for chatMessages
  socket.on("chatMessages", ({ ticketId, message }) => {
    const usersRoom = getRoom(ticketId);

    if (usersRoom)
      io.to(usersRoom).emit("newMessage", message);
  });

  socket.on('ticketChanged', ({ ticketId }) => {
    const usersRoom = getRoom(ticketId);

    console.log(usersRoom);

    if (usersRoom) {
      io.to(usersRoom).emit('ticketHasChanged');

      socket.leave(usersRoom);
    }
  });
});
