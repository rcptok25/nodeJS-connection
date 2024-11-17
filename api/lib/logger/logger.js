const { format, createLogger, transports } = require("winston");

const { LOG_LEVEL } = require("../../config");

const formats = format.combine(
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }),
  format.simple(),
  format.splat(),
  format.printf(
    (info) =>
      `${info.timestamp} ${info.level.toUpperCase()}: [user: ${
        info.user
      }] [location: ${info.location}] [procType: ${info.proc_type}] [log: ${
        info.log
      }]`
  )
);

const logger = createLogger({
  level: LOG_LEVEL,
  transports: [new transports.Console({ format: formats })],
});

module.exports = logger;
