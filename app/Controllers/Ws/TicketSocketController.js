
const rooms = [];

// Join user to room
function roomJoin(idTicket, idUser) {
  const room = { idTicket, idUser };

  if (rooms.includes(room))
    return null;

  rooms.push(room);

  return room;
}

// Get current room
function getCurrentRoom(idTicket, idUser) {
  return rooms.find(room => room.idTicket === idTicket && room.idUser === idUser);
}

module.exports = {
  roomJoin,
  getCurrentRoom
}