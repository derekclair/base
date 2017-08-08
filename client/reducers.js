/* @flow weak */

import type { Redux$Action } from './types.js.flow';

import {
	ACTION_ONE,
	ACTION_TWO,
} from './actions.js';

/******************************************************************************/

export default (state = [], { type, payload }: Redux$Action) => {
	switch (type) {
		case ACTION_ONE: {
			return [...state, {
				text: payload.text,
				completed: false,
			}];
		}
		case ACTION_TWO: {
			return [
				...state.slice(0, payload.index),
				Object.assign({}, state[payload.index], {
					completed: true,
				}),
				...state.slice(payload.index + 1)
			];
		}
		default: { return state; }
	}
};
