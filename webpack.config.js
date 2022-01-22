const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'development',
  entry: {
    background: './src/projects/background/background.js',
    content: './src/projects/content/content.js',
    popup: './src/projects/popup/popup.js'
  },
  output: {
    path: path.resolve('extension/scripts'),
    filename: '[name].js'
  },
  module: {
    rules: [
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.s?css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: './[name].css'
    })
  ],
  resolve: {
    alias: {
      libs: path.resolve(__dirname, 'src/libs'),
      modules: path.resolve(__dirname, 'src/modules'),
      projects: path.resolve(__dirname, 'src/projects'),
      src: path.resolve(__dirname, 'src')
    }
  }
}
