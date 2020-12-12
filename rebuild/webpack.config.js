const path = require("path");

module.exports = {
  entry: {
    background: "./src/extension/background/background.js",
    content: "./src/extension/content/content.js",
    popup: "./src/extension/popup/popup.js",
  },
  output: {
    path: path.resolve("dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      { test: /\.jsx?$/, loader: "babel-loader", exclude: /node_modules/ },
    ],
  },
};
