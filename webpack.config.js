const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');

const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: "./public/index.html",
  filename: "./index.html"
});

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: "[name]_[local]_[hash:base64]",
              sourceMap: true,
              minimize: true
            }
          }
        ]
      }
    ],
  },
  plugins: [
    htmlWebpackPlugin
  ],
  resolve: {
    alias: {
      Components: path.resolve(__dirname, 'src/js/components/'),
      Containers: path.resolve(__dirname, 'src/js/containers/')
    },
    extensions: [".js"],
    modules: [
      path.join(__dirname, 'node_modules'),
    ],
  },
};
