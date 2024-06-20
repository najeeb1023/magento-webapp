import { LaunchOptions } from "@playwright/test";
import logger from './logger/logger'

export const config: LaunchOptions = {
  timeout: 600000,
  headless: true,
  args:['--start-maximized'],
  slowMo: 300,
  logger: {
    isEnabled: (name, severity) => name === 'api',
    log: (name, timestamp, message, ) => {
      logger.info(`[${timestamp}] ${message}`)
    },
  }
}