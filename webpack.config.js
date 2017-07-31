
const fs = require('fs-extra');
const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

/******************************************************************************/

const DIST_DIR = path.join(__dirname, 'dist');
// const CLIENT_DIR = path.join(__dirname, 'client');
// const SERVER_DIR = path.join(__dirname, 'server');
// const PUBLIC_DIR = path.join(__dirname, 'public');


/*******************************************************************************
 * CLIENT
 ******************************************************************************/

const CLIENT_CONFIG = {
	name: 'client',
	target: 'web',
	entry: {
		client: [
			'react-hot-loader/patch',
			'webpack-hot-middleware/client',
			'./client',
		],
	},
	output: {
		path: DIST_DIR,
		// filename: '[name].bundle.js',
		filename: 'client.js',
		publicPath: '/',
	},

	plugins: [
		// new BundleAnalyzerPlugin(),  // OPTIONAL Bundle analyzer

		new HtmlWebpackPlugin({
			inject: true,
			template: path.resolve(__dirname, 'public', 'index.html'),
		}),

		// new ExtractTextPlugin('dist/styles.css'),

		// new webpack.LoaderOptionsPlugin({ debug: true }),

		new webpack.NamedModulesPlugin(),

		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),

	],

	// devtool: 'eval', // Babel transpiled code, as [eval]uated by the browser.
	devtool: 'source-map', // Un-transpiled sourcecode.
	// devtool: 'inline-source-map',
	// devtool: 'cheap-module-source-map',

	module: {
		loaders: [{
			test: /\.(js|jsx)$/,
			loaders: [
				'react-hot-loader/webpack',
				'babel-loader',
				// 'eslint-loader',
			],
			exclude: /node_modules/,
			// }, {
			// 	test: /\.scss$/,
			// 	loader: ExtractTextPlugin.extract('style', 'css!sass')
			// }, {
			// 	test: /\.css$/,
			// 	loader: 'style!css'
		}],
	}, // END: module

	node: {
		fs: 'empty',
		// process: false,
	},

	// eslint: {
	// 	configFile: './.eslintrc.js'
	// },

	bail: false,
};

/*******************************************************************************
 * SERVER
 ******************************************************************************/

const SERVER_CONFIG = {
	name: 'server',
	target: 'node',
	entry: {
		server: './server',
	},
	output: {
		path: DIST_DIR,
		filename: '[name].bundle].js',
	},

	devtool: 'source-map',

	externals: fs.readdirSync('node_modules')
		.filter(x => !x.includes('.bin') && !x.includes('react-loadable'))
		.reduce((obj, mod) => {
			obj[mod] = `commonjs ${mod}`; // eslint-disable-line
			return obj;
		}, {}),

	node: {
		process: false,
	},

	bail: false,
};

/******************************************************************************/

module.exports = [SERVER_CONFIG, CLIENT_CONFIG];
