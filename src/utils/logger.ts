import winston from "winston";

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine( 
    winston.format.json(),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' })
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: 'src/log/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'src/log/combined.log' }),
  ],
});

export default logger;
