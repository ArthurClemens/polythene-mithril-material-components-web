const config = require("./webpack.config.js");
const CompressionPlugin = require("compression-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

config.mode = "production";

config.optimization = {
  minimizer: [
    new TerserPlugin({
      sourceMap: true
    }),
    new OptimizeCSSAssetsPlugin({})
  ]
};

config.plugins.push(new CompressionPlugin());

module.exports = config;
