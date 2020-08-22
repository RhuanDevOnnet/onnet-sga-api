const server = use("Server");
const io = use("socket.io")(server.getInstance());

const { userJoin, getCurrentUser } = use(
  "./../app/Controllers/Ws/TicketSocketController"
);

var connectedUsers = [];

io.on("connection", function (socket) {
  connectedUsers.push(socket.id);

  socket.on("joinTicket", (data) => {

    // Room's id = ticket.id + assunto
    if (!data) {
      console.log("Sem informação do usuario");
      return;
    }

    let roomName = `${data.ticketId}-${data.assunto}`;
    const user = userJoin(socket.id, data.username, roomName);

    socket.join(user.ticket);
  });

  // Listen for chatMessages
  socket.on("chatMessages", (msg) => {
    const user = getCurrentUser(socket.id);

    io.to(user.ticket).emit("newMessage", { data: msg });
  });

  // Change ticket for all the users room
  socket.on('ticketChanged', () => {
    const user = getCurrentUser(socket.id);

    io.to(user.ticket).emit("ticketHasChanged", {})
  });
});
