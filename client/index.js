/* @noflow */

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from './App.jsx';

/******************************************************************************/

render(
	<AppContainer>
		<App />
	</AppContainer>,
	document.getElementById('root')
);

/******************************************************************************/

if (module.hot) {
	module.hot.accept('./App.jsx', () => {
		const NewApp = require('./App.jsx').default; // eslint-disable-line global-require

		render(
			<AppContainer>
				<NewApp />
			</AppContainer>,
			document.getElementById('root')
		);
	});
}

/******************************************************************************/

console.log('CLIENT: is running');
