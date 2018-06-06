import webpack       from 'webpack';
import autoprefixer  from 'autoprefixer';
import poststylus    from 'poststylus';
import BrowserSync   from 'browser-sync-webpack-plugin';
import indexTemplate from 'html-webpack-template-pug';
import HtmlPlugin    from 'html-webpack-plugin';
import CleanWebpack  from 'clean-webpack-plugin';
import {index}       from './index.manifest';

const mode = process.env.NODE_ENV==='production'?'production':'development';

export default {
  mode,
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
    new CleanWebpack(['dist']),
    new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(mode)}),
    new webpack.LoaderOptionsPlugin({
      options: {stylus: {use: [poststylus(['autoprefixer'])]}}
    }),
    new HtmlPlugin({
      inject: false,
      template: indexTemplate,
      mobile: true,
      injectExtras: index,
      title: 'doom'
    }),
    new BrowserSync({
      host: 'localhost',
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
      {test: /\.css$/, use: ['style-loader','css-loader']}
    ] //end rules
  } //end module
};


