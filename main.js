
const bodyParser = require('body-parser');
const { blue } = require('chalk');
const cors = require('cors');
const express = require('express');
const history = require('connect-history-api-fallback');
const proxy = require('http-proxy-middleware');
const webpack = require('webpack');
const winston = require('winston');

const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');

const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin');

const config = require('./webpack.config.js');

/******************************************************************************/

const PORT = process.env.PORT || 3000;

const CORS_PATH = '*';

/******************************************************************************/

function logger(provider) { // eslint-disable-line no-unused-vars
	// const logger = new (winston.Logger)();

	// return {
	// 	log: logger.log,
	// 	debug: logger.debug,
	// 	info: logger.info,
	// 	warn: logger.warn,
	// 	error: logger.error,
	// };

	return winston;
}

/*******************************************************************************
 * Webpack Compiler
 ******************************************************************************/

const compiler = webpack(config);

compiler.apply(new FriendlyErrorsWebpackPlugin());
compiler.apply(new ProgressBarWebpackPlugin());

const devMiddleware = webpackDevMiddleware(compiler, {
	noInfo: true,
	// quiet: true,
	// quiet: false,

	hot: true,
	inline: true,
	historyApiFallback: true,

	publicPath: '/',
	ignored: /node_modules/,
	stats: { color: true },
	clientLogLevel: 'none',
});

const hotServerMiddleware = webpackHotServerMiddleware(compiler, {
	chunkName: 'server',
	// debug: true,
	// appRendererOptions: {},
});

/*******************************************************************************
 * Express Server
 ******************************************************************************/

const app = express();

app.use(CORS_PATH, cors({ origin: 'http://localhost:3000' }));

app.use(bodyParser.json());

app.use(history({ logger }));

/******************************************************************************/

app.use(devMiddleware);

app.use(webpackHotMiddleware(compiler.compilers.find(c => c.name === 'client'), {
	// dynamicPublicPath: true,
	// log: console.log,
	log: logger,
}));

// app.use(hotServerMiddleware);

app.use((req, res, next) => {
	// devMiddleware.waitUntilValid(() => webpackHothotServerMiddleware(req, res, next));
	devMiddleware.waitUntilValid(() => hotServerMiddleware);
	return next();
});

/******************************************************************************/

app.listen(PORT, () => {
	console.log(blue(`\nSERVER: running on port:${PORT}`));
});

