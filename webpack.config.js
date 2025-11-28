const CopyPlugin = require('copy-webpack-plugin')
const glob = require('glob')
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const entries = Object.fromEntries(
  glob.sync('./src/apps/*/index.js').map(file => {
    const name = file.replace('./src/apps/', '').replace('/index.js', '')
    return [name, file]
  })
)

module.exports = (_env, { watch, mode }) => ({
  entry: entries,
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
      '@web-components': path.resolve(__dirname, 'src/apps/web-components'),
      '@content': path.resolve(__dirname, 'src/apps/content'),
      '@src': path.resolve(__dirname, 'src'),
      react: 'preact/compat'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{ loader: 'babel-loader' }]
      },
      {
        test: /\.raw\.\w+$/i,
        type: 'asset/source'
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
        { from: './src/apps/offscreen/offscreen.html', to: './offscreen.html' },
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
