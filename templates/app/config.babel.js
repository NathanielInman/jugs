import webpack       from 'webpack';
import autoprefixer  from 'autoprefixer';
import poststylus    from 'poststylus';
import BrowserSync   from 'browser-sync-webpack-plugin';
import indexTemplate from 'html-webpack-template-pug';
import HtmlPlugin    from 'html-webpack-plugin';
import {index}       from './index.manifest';

export default {
  watch: true,
  entry:{
    app: ['./src/app/app.js'],
    vendor: ['ion-cloud']
  },
  output:{
    path: __dirname+'/dist',
    publicPath: '/',
    sourceMapFilename: '[hash].map',
    filename:'[chunkhash].js'
  },
  devtool: 'source-map',
  plugins:[
    new webpack.optimize.CommonsChunkPlugin('vendor'),
    new webpack.optimize.UglifyJsPlugin({
      mangle: false,
      compress: {warnings: false},
      output: {comments: false},
      sourceMap: true
    }),
    new webpack.DefinePlugin({'process.env': {NODE_ENV: '"production"'}}),
    new webpack.LoaderOptionsPlugin({
      options: {stylus: {use: [poststylus(['autoprefixer'])]}}
    }),
    new HtmlPlugin({
      inject: false,
      template: indexTemplate,
      mobile: true,
      injectExtras: index,
      title: '<%= name %>'
    }),
    new BrowserSync({
      host: 'localhost',
      port: 8000,
      server: { baseDir: ['./dist'] }
    })
  ],
  module:{
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader','eslint-loader'],
        exclude: /node_modules/
      },
      {test: /\.styl$/, use: ['style-loader','css-loader','stylus-loader']},
      {test: /\.pug/, use: 'pug-loader'},
      {test: /\.css$/, use: ['style-loader','css-loader']},
      {
        test: /\.svg$/,
        use: [{
          loader: 'url-loader',
          options: {limit: '65000',mimetype: 'image/svg+xml'}
        }]
      },
      {
        test: /\.woff$/,
        use: [{
          loader: 'url-loader',
          options: {limit: '65000',mimetype: 'application/font-woff'}
        }]
      },
      {
        test: /\.woff2$/,
        use: [{
          loader: 'url-loader',
          options: {limit: '65000',mimetype: 'application/font-woff2'}
        }]
      },
      {
        test: /\.[ot]tf$/,
        use: [{
          loader: 'url-loader',
          options: {limit: '65000',mimetype: 'application/octet-stream'}
        }]
      },
      {
        test: /\.eot$/,
        use: [{
          loader: 'url-loader',
          options: {limit: '65000',mimetype: 'application/vnd.ms-fontobject'}
        }]
      }
    ] //end rules
  } //end module
};

