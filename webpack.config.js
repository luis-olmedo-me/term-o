const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = (_env, { watch, mode }) => ({
  entry: {
    background: './src/apps/background/background.js',
    content: './src/apps/content/content.js',
    sidepanel: './src/apps/sidepanel/sidepanel.js',
    sandbox: './src/apps/sandbox/sandbox.js',
    configuration: './src/apps/configuration/configuration.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build')
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    alias: {
      '@sidepanel': path.resolve(__dirname, 'src/apps/sidepanel'),
      '@background': path.resolve(__dirname, 'src/apps/background'),
      '@configuration': path.resolve(__dirname, 'src/apps/configuration'),
      '@content': path.resolve(__dirname, 'src/apps/content'),
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
        { from: './src/apps/sidepanel/sidepanel.html', to: './sidepanel.html' },
        { from: './src/apps/sandbox/sandbox.html', to: './sandbox.html' },
        { from: './src/apps/configuration/configuration.html', to: './configuration.html' }
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
