const sessions = require('./sessions/sessions.service.js');
const users = require('./users/users.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(sessions);
  app.configure(users);
};
