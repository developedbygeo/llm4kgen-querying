import { resolve } from 'path';
import { createLogger, format, transports } from 'winston';

const LOG_PATH = resolve(__dirname, '..', 'logs', 'app.log');

export const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level.toUpperCase()}]: ${message}`;
        })
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: LOG_PATH }), // Optional file logging
    ],
});
