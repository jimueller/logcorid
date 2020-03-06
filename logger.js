const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf, errors, label } = format;
const rTracer = require("cls-rtracer");

// Custom format that logs correlation id

const corrIdFormat = printf(info => {
  const cid = rTracer.id();
  return cid
    ? `${info.timestamp} [${cid}] [${info.label}] ${info.message}`
    : `${info.timestamp} ${info.message}`;
});

module.exports = logger = createLogger({
  format: combine(
    timestamp(),
    errors({ stack: true }),
    label({ label: "classname" }),
    corrIdFormat
  ),
  transports: [new transports.Console()]
});
