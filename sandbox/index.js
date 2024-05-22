const fs = require("fs");
const path = require("path");

const currentFileName = path.basename(__filename);

const db = {};

fs.readdirSync(__dirname)
  .filter((currentFile) => /.js$/.test(currentFile) && currentFile !== currentFileName)
  .forEach((currentFile) => {
    const absPathToFile = path.resolve(__dirname, currentFile);

    const Model = require(absPathToFile);
    Model._client = client;
    db[Model.name] = Model;
  });
