/* eslint-disable no-undef */
function respond(statusCode, message) {
  res.statusCode = statusCode || 200;
  res.write(message || '');
  res.end();
}
exports.respond = respond;
