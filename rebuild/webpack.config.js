const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    background: "./src/projects/background/background.js",
    content: "./src/projects/content/content.js",
    popup: "./src/projects/popup/popup.js",
  },
  output: {
    path: path.resolve("extension"),
    filename: "[name].js",
  },
  module: {
    rules: [
      { test: /\.jsx?$/, loader: "babel-loader", exclude: /node_modules/ },
    ],
  },
};
