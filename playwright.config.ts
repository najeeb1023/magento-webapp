import { LaunchOptions } from "@playwright/test";
import createCustomLogger from "./logger/logger";

const logger = createCustomLogger();

export const config: LaunchOptions = {
  timeout: 150000,
  headless: true,
  // args:['--window-position=-1070,-100'], //* customized for left-sided portrait monitor.
  slowMo: 300,
  logger: {
    isEnabled: (name, severity) => name === 'api',
    log: (name, timestamp, message, ) => {
      logger.info(`[${timestamp}] ${name} ${message}`)
    },
  }
}