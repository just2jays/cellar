const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');
 
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./public/index.html",
      filename: "./index.html"
    })
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
