const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = (_env, { watch, mode }) => ({
  entry: {
    background: './src/scripts/background/background.js',
    content: './src/scripts/content/content.js',
    sidepanel: './src/scripts/sidepanel/sidepanel.js',
    sandbox: './src/scripts/sandbox/sandbox.js',
    configuration: './src/scripts/configuration/configuration.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build')
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    alias: {
      '@sidepanel': path.resolve(__dirname, 'src/scripts/sidepanel'),
      '@background': path.resolve(__dirname, 'src/scripts/background'),
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
    new CopyPlugin({
      patterns: [
        { from: './src/manifest.json', to: './manifest.json' },
        { from: './src/images/required', to: './images' },
        { from: './src/scripts/sidepanel/sidepanel.html', to: './sidepanel.html' },
        { from: './src/scripts/sandbox/sandbox.html', to: './sandbox.html' },
        { from: './src/scripts/configuration/configuration.html', to: './configuration.html' }
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
