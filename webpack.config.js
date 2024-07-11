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
    modules: [path.resolve(__dirname, 'src-new'), 'node_modules'],
    alias: {
      '@sidepanel': path.resolve(__dirname, 'src-new/scripts/sidepanel'),
      '@background': path.resolve(__dirname, 'src-new/scripts/background'),
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
    new CopyPlugin({
      patterns: [
        { from: './src-new/manifest.json', to: './manifest.json' },
        { from: './src-new/images', to: './images' },
        { from: './src-new/sidepanel.html', to: './sidepanel.html' }
      ]
    }),
    ...(watch ? [] : [new CleanWebpackPlugin()])
  ],
  optimization: { minimize: mode === 'production' },
  performance: { maxEntrypointSize: 512000, maxAssetSize: 512000 },
  watchOptions: {
    aggregateTimeout: 200,
    ignored: /node_modules/
  }
})
