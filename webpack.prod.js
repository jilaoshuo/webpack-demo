const merge = require('webpack-merge'),
	UglifyJSPlugin = require('uglifyjs-webpack-plugin'),
	common = require('./webpack.common.js');

module.exports = merge(common, {
	plugins: [
		new UglifyJSPlugin(), //js压缩
	]
});