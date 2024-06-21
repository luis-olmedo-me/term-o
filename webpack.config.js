const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = (_env, { watch, mode }) => ({
  entry: {
    background: './src-new/scripts/background/background.js',
    content: './src-new/scripts/content/content.js',
    popup: './src-new/scripts/popup/popup.js',
    sidepanel: './src-new/scripts/sidepanel/sidepanel.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build')
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    alias: {
      '@src': path.resolve(__dirname, 'src-new'),
      react: 'preact/compat'
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{ loader: 'babel-loader' }]
      }
    ]
  },
  plugins: [
    new CopyPlugin([
      { from: './src/manifest.json', to: './manifest.json' },
      { from: './src/images', to: './images' }
    ]),
    ...(watch ? [] : [new CleanWebpackPlugin()])
  ],
  optimization: { minimize: mode === 'production' },
  performance: { maxEntrypointSize: 512000, maxAssetSize: 512000 },
  watchOptions: {
    aggregateTimeout: 200,
    ignored: /node_modules/
  }
})
