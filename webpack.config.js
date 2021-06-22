const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  //...
  entry: "./server.js",
  module: {
    rules: [{ test: /\.txt$/, use: 'raw-loader' }],
  },
  plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
  mode: "production",
  resolve: {
    alias: {
      // a list of module name aliases
      // aliases are imported relative to the current context
      module: "new-module",
      // alias "module" -> "new-module" and "module/path/file" -> "new-module/path/file"
      "only-module$": "new-module",
      // alias "only-module" -> "new-module", but not "only-module/path/file" -> "new-module/path/file"
      module: path.resolve(__dirname, "app/third/module.js"),
      // alias "module" -> "./app/third/module.js" and "module/file" results in error
      module: path.resolve(__dirname, "app/third"),
      // alias "module" -> "./app/third" and "module/file" -> "./app/third/file"
      [path.resolve(__dirname, "app/module.js")]: path.resolve(
        __dirname,
        "app/alternative-module.js"
      ),
      // alias "./app/module.js" -> "./app/alternative-module.js"
    },
    fallback: {
      path: false,
      http: false,
      util: false,
      crypto: false,
      assert: false,
      url: false,
      stream: false,
      os: false,
      https: false,
      zlib: false,
      buffer: false,
      fs: false,
      querystring: false,
      tls: false,
      net: false,
      dns: false,
      child_process: false,
      nock: false,
      "aws-sdk": false,
      "mock-aws-s3": false,
    },
  },
};
