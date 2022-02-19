'use strict';

const express = require(`express`);
const path = require(`path`);
const fs = require(`fs`);
const {MOCK_FILE_NAME} = require(`../../constants`);

const API_PORT = 3000;

const app = express();

app.get(`/posts`, (req, res) => {
  const mockPath = path.join(__dirname, `..`, MOCK_FILE_NAME);
  console.log(`mockPath: `, mockPath);

  let result = [];
  if (fs.existsSync(mockPath)) {
    const mockData = fs.readFileSync(mockPath).toJSON().data;
    if (mockData.some((obj) => typeof obj === `object`)) {
      result = mockData;
    }
  }
  res.json(result);
});


app.listen(API_PORT, () => {
  console.log(`Api server was started on port ${API_PORT}`);
});
