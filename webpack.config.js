const path = require('path');
const webpack = require('webpack');
module.exports = {
	entry: './src/es.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'index.js'
	}
}