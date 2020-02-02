module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    libraryTarget: "umd"
  },
  resolve: {
    extensions: [".js", ".jsx"],
    modules: ["node_modules", "src", "src/components", "src/utilities"]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  externals: {
    react: "react"
  }
};
