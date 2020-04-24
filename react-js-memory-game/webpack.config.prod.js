const HtmlWebPackPlugin = require('html-webpack-plugin'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin'),
  UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
  path = require('path')

const environment = process.env.NODE_ENV || 'production'

module.exports = {
  mode: 'production',
  devtool: 'cheap-module-eval-source-map',
  entry:  [path.join(path.join(__dirname, 'src'), 'index.js')],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  devServer: {
    inline: true,
    watchContentBase: true,
    contentBase: path.resolve(__dirname, 'dist'),
    // historyApiFallback: true,
    open: true,
    port: 3001,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
  },
  module: {
    rules: [
      // https://webpack.js.org/loaders/svg-inline-loader/
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },
      // https://webpack.js.org/loaders/css-loader/
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: environment === 'development',
            },
          },
          'css-loader',
          'postcss-loader',
        ]
      },
      // https://webpack.js.org/loaders/babel-loader/
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      { test: /\.js$/, use: ['source-map-loader'], enforce: 'pre'}
    ]
  },
  node: {
    console: true,
	  __dirname: true,
  },
  plugins:[
    new HtmlWebPackPlugin({template: './public/index.html', filename: 'index.html'}),
    new MiniCssExtractPlugin({template: './public/css/styles.css', filename: 'styles.css'}),
    new UglifyJsPlugin()
  ]
}
