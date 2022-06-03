'use strict';

const express = require(`express`);
const path = require(`path`);
const fs = require(`fs`);
const {MOCK_FILE_NAME} = require(`../../constants`);
const apiRoutes = require('../api/index');
// const article = require('../api/articles')

const API_PORT = 3000;

const server = {
  name: `--server`,
  run() {
    console.error('--server run')
    const app = express();
    app.use(express.json());
    app.use('/api', apiRoutes);
    app.listen(API_PORT, () => {
      console.info(`Api server was started on port ${API_PORT}`);
    });
  }
};

module.exports = {
  server
};
