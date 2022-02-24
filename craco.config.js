const webpack = require("webpack");

module.exports = {
  reactScriptsVersion: "react-scripts",
  webpack: {
    plugins: [
      new webpack.DefinePlugin({
        VERSION: JSON.stringify(require("./package.json").version),
        "process.env.API_URL": JSON.stringify(process.env.API_URL),
      }),
    ],
  },
};
