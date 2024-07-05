const path = require("path")
module.exports = {  
  mode: 'development',
  entry: './src/js/app.js',
  output: {
    path: path.resolve(__dirname, 'build', 'js'),
    filename: 'index.js'
  },
 module: {  
    rules: [  
      {  
        test: /\.js$/,  
        exclude: /node_modules/,  
        use: {  
          loader: 'babel-loader',  
          options: {  
            presets: ['@babel/preset-env']  
          }  
        }  
      }  
    ]  
  },
devServer: {
    static: {
      directory: path.join(__dirname),
    },
    compress: true,
    port: 3000,
  },
};
