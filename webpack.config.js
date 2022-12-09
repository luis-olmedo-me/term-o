const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = (_env, { watch, mode }) => ({
  entry: {
    popup: './src/projects/popup/popup.js',
    content: './src/projects/content/content.js',
    background: './src/projects/background/background.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build')
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    alias: {
      '@libs': path.resolve(__dirname, 'src/libs'),
      '@modules': path.resolve(__dirname, 'src/modules'),
      '@src': path.resolve(__dirname, 'src'),
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
