const server = use("Server");
const io = use("socket.io")(server.getInstance());

const { userJoin, getCurrentUser } = use(
  "./../app/Controllers/Ws/TicketSocketController"
);

io.on("connection", function (socket) {
  socket.on("joinTicket", ({ idTicket, idUser }) => {

    if (!idTicket || !idUser)
      return;

    const room = roomJoin(idTicket, idUser);

    if (room != null)
      socket.join(room.ticket);
  });

  // Listen for chatMessages
  socket.on("chatMessages", ({ idTicket, message }) => {
    const room = getCurrentRoom(idTicket);

    if (room)
      io.to(room.idTicket).emit("newMessage", message);
  });

  // Change ticket for all the users room
  socket.on('ticketChanged', (idTicket) => {
    const room = getCurrentRoom(idTicket);

    if (room)
      io.to(room.idTicket).emit("ticketHasChanged");
  });
});
