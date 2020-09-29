const users = [];

function joinUser(ticketId, userId) {
  const user = { ticketId, userId };

  if (!users.includes(user))
    users.push(user);

  return user;
}

function getRoom(ticketId) {
  const room = users.find(room => room.ticketId == ticketId);

  if (!room)
    return null;

  return room;
}

module.exports = {
  joinUser,
  getRoom
} 