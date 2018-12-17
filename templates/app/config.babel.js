import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import poststylus from 'poststylus';
import BrowserSync from 'browser-sync-webpack-plugin';
import indexTemplate from 'html-webpack-template-pug';
import HtmlPlugin from 'html-webpack-plugin';
import CleanPlugin from 'clean-webpack-plugin';
import CopyWebpack from 'copy-webpack-plugin';
import CssExtractPlugin from 'mini-css-extract-plugin';
import nodePath from 'path';
import {index} from './index.manifest';

const mode = process.env.NODE_ENV==='production'?'production':'development',
      path = nodePath.resolve(__dirname,'./dist');

export default {
  mode,
  watch: true,
  entry: ['./src/app.js'],
  output:{
    path,
    publicPath: '/',
    sourceMapFilename: '[hash].map',
    filename:'[chunkhash].js'
  },
  devtool: 'inline-source-map',
  plugins:[
    new CleanPlugin(['*.js','*.map','*.css'],{root: path}),
    new CopyWebpack([
      {from:'src/assets',to:''}
    ]),
    new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(mode)}),
    new webpack.LoaderOptionsPlugin({
      options: {stylus: {use: [poststylus(['autoprefixer'])]}}
    }),
    new HtmlPlugin(index),
    new BrowserSync({
      host: 'localhost',
      server: { baseDir: ['./dist'] }
    }),
    new CssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[name].[chunkhash].css'
    })
  ],
  module:{
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader','eslint-loader'],
        exclude: /node_modules/
      },
      {test: /\.css$/, use: [CssExtractPlugin.loader,'css-loader']},
      {test: /\.styl$/, use: [CssExtractPlugin.loader,'css-loader','stylus-loader']},
      {test: /\.pug/, use: 'pug-loader'}
    ] //end rules
  } //end module
};
