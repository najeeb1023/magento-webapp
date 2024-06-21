import { createLogger, format, transports } from 'winston';
import { allColors } from 'winston/lib/winston/config';

const { combine, timestamp, printf, colorize } = format;

const createCustomLogger = (scenarioName: string) => {
  const customFormat = printf(({ timestamp, level, message }) => {
  return `    [${timestamp}] ${level} ${message}`;
  });

  return createLogger({
    level: 'info',
    format: combine(
    timestamp(
      {
        format: 'DD-M-YY HH:mm:ss',
      }
    ),
    colorize(allColors),
    customFormat
  ),
    transports: [
    new transports.Console(),
    new transports.File({
      filename: `test-results/logs/${scenarioName}/log.log`,
      level: 'info',
      format: format.combine(
        timestamp({
          format: ' DD-M-YY HH:mm:ss'
        }),
        format.align(),
        customFormat
      ),
    }),
  ],
  });

};

export default createCustomLogger;