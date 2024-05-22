const fs = require("fs");
const path = require("path");

const currentFileName = path.basename(__filename);

const db = {};

const filesNames = fs.readdirSync(__dirname);
const filteredArray = filesNames.filter((currentFile) => /.js$/.test(currentFile) && currentFile !== currentFileName);

filteredArray.forEach((currentFile) => {
  const absPathToFile = path.resolve(__dirname, currentFile);

  const Model = require(absPathToFile);
  Model._client = client;
  db[Model._tableName] = Model;
});
