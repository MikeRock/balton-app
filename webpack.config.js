
var webpack = require('webpack');
var path = require('path')

module.exports = {
  entry: {"bundle":["./src/app.js","./src/pco.js"]},
  output: {
    path: path.resolve(__dirname,"build"),
    filename: "[name].js"
  },
  module: {
    rules:[{
        test:/\.js$/,
        use: "babel-loader",
        exclude: /node_modules/ 
    },{
      test:/.css$/,
      exclude: /node_modules/,
      use: ["style-loader","css-loader"]
    }]
}
  
}