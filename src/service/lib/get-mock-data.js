const fs = require(`fs`).promises;
const path = require('path');

const FILENAME = `mocks.json`;
let data = [];

module.exports.getMockData = async () => {
  if (data.length > 0) {
    return data;
  }

  try {
    const fileContent = await fs.readFile(path.join(__dirname, '..', FILENAME));
    data = JSON.parse(fileContent.toString());
  } catch (err) {
    console.error('getMockData: ', err);
    return (err);
  }

  return data;
};
