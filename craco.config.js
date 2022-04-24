const webpack = require("webpack");

module.exports = {
  reactScriptsVersion: "react-scripts",
  webpack: {
    plugins: [
      new webpack.DefinePlugin({
        VERSION: JSON.stringify(require("./package.json").version),
        FORM_APP_URL: JSON.stringify(process.env.FORM_APP_URL),
        BUILD_AT: JSON.stringify(new Date()),
        "process.env.SENTRY_DSN": JSON.stringify(process.env.SENTRY_DSN),
        "process.env.API_URL": JSON.stringify(process.env.API_URL),
      }),
    ],
  },
};
