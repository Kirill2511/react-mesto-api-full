const winston = require('winston');
const expressWinston = require('express-winston');
const path = require('path');

const dirPathLogs = path.join(__dirname, '../logs');

module.exports.requestLogger = expressWinston.logger({
  transports: [
    new winston.transport.File({ filename: path.join(dirPathLogs, 'request.log') }),
  ],
  format: winston.format.json(),
});

module.exports.errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transport.File({ filename: path.join(dirPathLogs, 'error.log') }),
  ],
  format: winston.format.json(),
});
