
const bodyParser = require('body-parser');
const express = require('express');
const webpack = require('webpack');

const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');

const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin');

const config = require('./webpack.config.js');

/******************************************************************************/

const PORT = 3000;

/******************************************************************************/

const compiler = webpack(config);

compiler.apply(new FriendlyErrorsWebpackPlugin());
compiler.apply(new ProgressBarWebpackPlugin());

/******************************************************************************/

const app = express();

app.use(bodyParser.json());

app.use(webpackDevMiddleware(compiler, {
	noInfo: true,
	// quiet: true,
	// quiet: false,

	ignored: /node_modules/,
	hot: true,
	// inline: true,

	publicPath: '/',
	clientLogLevel: 'none',
	stats: { color: true },
}));


app.use(webpackHotMiddleware(compiler.compilers.find(c => c.name === 'client'), {
	log: console.log,
}));


app.use(webpackHotServerMiddleware(compiler, {
	chunkName: 'server',
}));


app.listen(PORT, () => {
	console.log(`SERVER: running on port: ${PORT}`);
});

