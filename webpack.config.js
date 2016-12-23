const webpack = require('webpack')
const path = require('path')

module.exports = {
	entry: {
		index: './src/index.js',
		vendor: './src/vendor.js'
	},
	output: {
		filename: '[name].js',
		publicPath: './js/',
		path: path.join(__dirname, 'public')
	},
	resolve: {
		alias: {},
		modulesDirectories: [
			'node_modules',
			'web_modules'
		]
	},
	target: 'web',
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel!eslint',
				exclude: /node_modules|web_modules/
			},
			{
				test: /\.jade$/,
				loader: 'jade-loader'
			},
			{
				test: /\.styl$/,
				loader: 'style!css!stylus'
			},
			{
				test: /\.(vert|frag|glsl)$/,
				loader: 'raw!glslify'
			}
		]
	},
	stylus: {
		use: [require('nib')()]
	},
	eslint: {
		configFile: './.eslintrc',
		formatter: require('eslint-friendly-formatter'),
		failOnError: true
	},
	plugins: [
		new webpack.IgnorePlugin(/vertx/)
	]
}
