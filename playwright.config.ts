import { LaunchOptions } from "@playwright/test";

export const config: LaunchOptions = {
  timeout: 600000,
  headless: true,
  args:['--start-maximized'],
  slowMo: 300,
  logger: {
    isEnabled: (name, severity) => true,
    log: (name, severity, message, args) => console.log(`name = ${name} \n msg = ${message} \n severity = ${severity}`)
  }
}