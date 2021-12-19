'use strict';

const {help} = require(`./help`);
const {generate} = require(`./generate`);
const {version} = require(`./version`);

const Index = {
  [generate.name]: generate,
  [help.name]: help,
  [version.name]: version,
};

module.exports = {
  Cli: Index,
};
