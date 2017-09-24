var path = require('path');
module.exports = {
    entry: './src/assets/js/init.js',
    output: {
		path: path.join(__dirname, 'dist/assets'),
		publicPath: '../dist/',
		filename: '[name].bundle.js',
		chunkFilename: '[id].bundle.js'
	},
    module: {
        loaders: [
            { test: path.join(__dirname, 'es6'),
              loader: 'babel-loader' }
        ]
    }
};