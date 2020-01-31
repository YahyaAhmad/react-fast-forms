module.exports = {
  entry: "./public/index.js",
  resolve: {
    extensions: [".js", ".jsx"],
    modules: ["node_modules", "src", "src/components", "src/utilities"]
  },
  output: {
    filename: "./main.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.js$/,
        use: ["source-map-loader"],
        enforce: "pre"
      }
    ]
  },
  devtool: "source-map",
  devServer: {
    publicPath: "/",
    contentBase: "./public",
    port: 9000,
    hot: true,
    watchContentBase: true
  }
};
