import { createLogger, format, transports } from 'winston';
import { allColors } from 'winston/lib/winston/config';

const { combine, timestamp, printf, colorize, splat } = format;

const createCustomLogger = (scenarioName: string) => {
  const customFormat = printf(({ timestamp, level, message,}) => {
  return `  [${timestamp}] ${level} ${message}`;
  });

  return createLogger({
    level: 'info',
    format: combine(
    timestamp(
      {
        format: 'DD-M-YY HH:mm:ss',
      },
    ),
    colorize(allColors),
    splat(),
    customFormat
  ),
    transports: [
    new transports.Console({
      format: combine(
        splat(),
      )
    }),
    new transports.File({
      filename: `test-results/logs/${scenarioName}/log.log`,
      level: 'info',
      format: format.combine(
        timestamp({
          format: ' DD-M-YY HH:mm:ss'
        }),
        format.align(),
        splat(),
        customFormat
      ),
    }),
  ],
  });

};

export default createCustomLogger;