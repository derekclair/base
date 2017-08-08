/* @flow */

import type { Redux$Action } from './types.js.flow';

export const ACTION_ONE: string = 'ACTION_ONE';
export const ACTION_TWO: string = 'ACTION_TWO';

export function actionOne(payload: any): Redux$Action {
	return { type: ACTION_ONE, payload };
}

export function actionTwo(payload: any): Redux$Action {
	return { type: ACTION_TWO, payload };
}
