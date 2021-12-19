const packageJsonFile = require('../../../package.json')

const version = {
  name: '--version',
  run() {
    console.info(packageJsonFile.version)
  }
}

module.exports = {
  version
}
