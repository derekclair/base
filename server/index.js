/* @flow */

import express from 'express';
import history from 'connect-history-api-fallback';
import proxy from 'http-proxy-middleware';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import winston from 'winston';
import { blue } from 'chalk';

import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
import ProgressBarWebpackPlugin from 'progress-bar-webpack-plugin';

import config from '../webpack.config.js';

import './api.js';

/******************************************************************************/

// console.log('\n\RUNNING: ~/server/index.js\n');

/******************************************************************************/

const PORT = process.env.PORT || 3000;

const GRAPHQL_PORT = process.env.GRAPHQL_PORT || 3030;
const GRAPHQL_PATH = '/subscriptions';

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

/*******************************************************************************
 * Express Server
 ******************************************************************************/

const app = express();

/******************************************************************************/

app.use(GRAPHQL_PATH, proxy({
	target: `http://localhost:${GRAPHQL_PORT}`,
	changeOrigin: true,
	ws: true,
	logLevel: 'debug',
	logProvider: logger,
}));


const gqlProxy = proxy({
	target: `http://localhost:${GRAPHQL_PORT}`,
	changeOrigin: true,
	logLevel: 'debug',
	logProvider: logger,
});

app.use('/graphiql', gqlProxy);
app.use('/graphql', gqlProxy);
app.use('/schema', gqlProxy);

app.use(history({ logger }));

/******************************************************************************/

app.use(devMiddleware);

app.use(webpackHotMiddleware(compiler.compilers.find(c => c.name === 'client'), {
	// dynamicPublicPath: true,
	// log: console.log,
	log: logger,
}));

/******************************************************************************/

app.listen(PORT, () => {
	console.log(blue(`\nSERVER: running on port:${PORT}`)); // eslint-disable-line no-console
});

/******************************************************************************/

require('./graphql.js');
