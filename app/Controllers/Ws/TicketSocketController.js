
const users = [];

// Join user to chat
function userJoin(id, username, ticket){
  const user =  {id, username, ticket};
  console.log('New user has joined to chat')
  users.push(user);

  return user;
}

// Get current user
function getCurrentUser(id){
  return users.find(user => user.id === id);
}

module.exports = {
  userJoin,
  getCurrentUser
}