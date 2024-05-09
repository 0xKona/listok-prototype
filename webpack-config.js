import * as url from 'url';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

const webpackConfig = {
  mode: 'development',
  entry: './client/src/index.tsx',
  output: {
    path: path.resolve(__dirname + '/dist/'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        resolve: {
          extensions: ['.ts', '.tsx', '.js', 'jsx', '.json'],
        },
        use: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack', 'url-loader']
      },
    ]
  },
  devtool: false,
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/dist/index.ejs'
    })
  ],
};

export default webpackConfig

