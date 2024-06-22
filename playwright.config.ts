import { LaunchOptions } from "@playwright/test";
import createCustomLogger from "./logger/logger";

let scenarioName;
const logger = createCustomLogger(scenarioName);

export const config: LaunchOptions = {
  timeout: 600000,
  headless: false,
  // args:['--window-position=-1070,-100'], // customized for left-sided portrait monitor.
  slowMo: 300,
  logger: {
    isEnabled: (name, severity) => name === 'api',
    log: (name, timestamp, message, ) => {
      logger.info(`[${timestamp}] ${name} ${message}`)
    },
  }
}