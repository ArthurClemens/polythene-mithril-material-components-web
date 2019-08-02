/* global process */
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackModules = require("webpack-modules");

const baseDir = process.cwd();

module.exports = {

  entry: {
    index: path.resolve(baseDir, "./src/index.js")
  },

  output: {
    path: path.resolve(baseDir, "./dist"),
    filename: "js/[name].js"
  },

  resolve: {
    extensions: [".mjs", ".js"],
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        type: "javascript/auto",
        use: [{
          loader: "babel-loader",
          options: {
            configFile: "./babel.config.js"
          }
        }]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              modules: true,
              sourceMap: true,
              localIdentName: "[local]"
            }
          },
          "css-loader",
        ]
      }
    ]
  },

  plugins: [
    new WebpackModules(),
    new MiniCssExtractPlugin({
      filename: "css/app.css"
    }),
  ],

  devtool: "source-map"

};
