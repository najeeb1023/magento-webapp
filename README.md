# Magento WebApp Test Automation Framework

[![v4.0.0](https://github.com/najeeb1023/magento-webapp/actions/workflows/release.yaml/badge.svg)](https://github.com/najeeb1023/magento-webapp/actions/workflows/release.yaml)
![License](https://img.shields.io/badge/license-MIT-green)
[![TestRail](https://img.shields.io/badge/TestRail-Integrated-blue)](https://www.testrail.io)


## Overview

This repository contains a test automation framework for the Luma web application using Playwright and Cucumber.  
The framework is designed with Page Object Model (POM) and Facade design patterns to ensure maintainability and scalability.

## Features

- **Playwright Integration**: Fast and reliable end-to-end testing.
- **Cucumber Support**: BDD testing approach with Gherkin syntax.
- **POM Design Pattern**: Enhances test maintenance and reusability.
- **Facade Design Pattern**: Simplifies complex interactions with a unified interface.
- **CI/CD Integration**: Seamless integration with CI pipelines.
- **TestRail Integration**: Automated TestRail synchronization with TestRail.io, automatically creating and updating test cases. Test results (pass/fail) are visualized as pie charts, providing clear insight into test coverage and stability.

## CI/CD and TestRail Integration

The project includes integration with CI/CD pipelines, automatically triggering tests on each commit. The results are pushed to TestRail, where a new test run is created. Test outcomes are displayed as pie charts, giving a quick overview of the test suite's health.

## Project Structure

├── .github/workflows # GitHub Actions workflows  
├── config # Configuration files  
├── logger # Custom logging utilities  
├── src/test # Test scripts and page objects  
├── package.json # Project dependencies and scripts  
├── playwright.config.ts # Playwright configuration  
├── tsconfig.json # TypeScript configuration  

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:  
- git clone https://github.com/najeeb1023/magento-webapp.git

2. Install dependencies:  
- npm i

3. To run the project:  
* cucumber:luma - To run all the test scenarios.  
* cucumber:luma:tags - Add your scenario tag in the end using -> @tag.  
* cucumber:luma:debug - After attatching the debugger you can easily debug the desired scenario.  