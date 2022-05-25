const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const mode = process.env.NODE_ENV === "production" ? "production" : "development";
const target = process.env.NODE_ENV === "production" ? "browserslist" : "web";

module.exports = {
  mode: mode,
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: false,
      favicon: './src/assets/favicon.ico',
    })
  ],

  output: {
    path: path.resolve(__dirname, "dist")
  },

  module: {
    rules: [
      {
        test: /\.(sc|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
          "postcss-loader"
        ],
      },{
        test: /\.(js)$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ],
  },

  target: target,
  devtool: "source-map",

  devServer: {
    static: './dist'
  }
};
