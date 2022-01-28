const packageJsonFile = require('../../../package.json')
const chalk = require("chalk");

const version = {
  name: '--version',
  run() {
    console.log(chalk.blue(packageJsonFile.version))
  }
}

module.exports = {
  version
}
