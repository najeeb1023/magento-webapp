import { transports, format } from "winston";
import winston from "winston";

const customFormat = winston.format.printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`;
  });

export function options(scenarioName: string){
    return {
        transports: [
            new transports.File({
                filename: `test-results/logs/${scenarioName}/log.log`,
                level: 'info',
                format: format.combine(
                    customFormat
                )
            }),
        ]
    };
}; 