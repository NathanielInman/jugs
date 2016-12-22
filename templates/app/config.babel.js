import webpack       from 'webpack';
import commonsChunk  from 'webpack/lib/optimize/CommonsChunkPlugin';
import uglifyWebpack from 'webpack/lib/optimize/UglifyJsPlugin';
import autoprefixer  from 'autoprefixer';
import poststylus    from 'poststylus';
import BrowserSync   from 'browser-sync-webpack-plugin';

export default {
  watch: true,
  entry:{
    app: [
      './src/app/app.js'
    ],
    vendor: ['ion-cloud']
  },
//  devtool: 'source-map',
  plugins:[
    new commonsChunk('vendor.js'),
    new uglifyWebpack({minimize: true,mangle: false}),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new BrowserSync({
      host: 'localhost',
      port: 8000,
      server: { baseDir: ['./dist'] }
    })
  ],
  output:{
    path: './dist',
    publicPath: '/',
    filename:'[name].js',
  },
  module:{
    preLoaders: [
//      {test: /\.js$/, loader: 'source-map-loader'}
    ],
    loaders: [
      {test: /\.js$/,   loaders: ['babel-loader','eslint-loader'], exclude: /node_modules/},
      {test: /\.styl$/, loaders: ['style-loader','css-loader','stylus-loader']},
      {test: /\.jade$/, loader: 'jade-static'},
      {test: /\.css$/,  loaders: ['style-loader','css-loader']},
      {test: /\.svg$/,  loader: 'url',
        query:{limit: '65000',mimetype: 'image/svg+xml'}},
      {test: /\.woff$/, loader: 'url',
        query:{limit: '65000',mimetype: 'application/font-woff'}},
      {test: /\.woff2$/,loader: 'url',
        query:{limit: '65000',mimetype: 'application/font-woff2'}},
      {test: /\.[ot]tf$/, loader: 'url',
        query:{limit: '65000',mimetype: 'application/octet-stream'}},
      {test: /\.eot$/, loader: 'url',
        query:{limit: '65000',mimetype: 'application/vnd.ms-fontobject'}}
    ]
  },
  jade: {pretty: false},
  stylus: {use: [poststylus(['autoprefixer'])]}
};

