/* @flow */

import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';

import messages from './messages.graphql';

/******************************************************************************/

const Query = ({ data }) => (
	<pre>
		{JSON.stringify(data, null, 2)}
	</pre>
);

/******************************************************************************/

Query.propTypes = {
	data: PropTypes.shape({
		messages: PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.string.isRequired,
		})),
	}),
};

export default graphql(messages)(Query);
