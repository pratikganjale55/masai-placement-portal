const winston = require("winston");
const { createLogger, transports, format } = winston;


const logger = createLogger({
  transports: [
    new transports.File({
      filename: "info.log",
      level: "info",
      format: format.combine(format.timestamp(), format.json()),
    }),
  ]
});

module.exports = logger;
