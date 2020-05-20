const server = use("Server");
const io = use("socket.io")(server.getInstance());
const { userJoin, getCurrentUser } = use(
  "./../app/Controllers/Ws/TicketSocketController"
);

var connectedUsers = [];

io.on("connection", function (socket) {
  connectedUsers.push(socket.id);

  console.log(connectedUsers);

  socket.on("joinTicket", (data) => {
    // id of room is ticket.id + assunto

    console.log(data);
    if (data == null || data == "") {
      console.log(" sem informação do usuario");
      return;
    }
    let roomName = `${data.ticketId}-${data.assunto}`;
    const user = userJoin(socket.id, data.username, roomName);
    console.log(user);
    socket.join(user.ticket);
  });

  // Listen for chatMessages

  socket.on("chatMessages", (msg) => {
    console.log(msg);

    const user = getCurrentUser(socket.id);

    const rooms = Object.keys(socket.rooms);
    console.log(rooms);

    
    io.to(user.ticket).emit("new message", { data: "duhsaudaih" });
  });

  socket.on('ticketChanges', (msg) => {

    console.log('teve mudança ')
    
    io.emit('ticketHasChanged');
    
  });
});
