﻿import { Action, combineActions, handleActions } from "redux-actions";

import { handleActionError } from "../actionHelper";
import { actionTypes } from "./actions";

/**
 * Initial state of `counter`.
 */
export const INITIAL_STATE: CounterState = { value: 0 };

/**
 * Represents the state of `counter`.
 */
export interface CounterState
{
    readonly value: number;
}

/**
 * Reducer of `counter`, which is composed of different reducers.
 */
export default handleActions(
    {
        [combineActions(actionTypes.increase, actionTypes.increaseAsync)]: (state: CounterState, action: Action<number>) =>
        {
            if (action.error)
            {
                return handleActionError(state, action);
            }
            else
            {
                return {
                    ...state,
                    value: state.value + action.payload!
                };
            }
        },
        [combineActions(actionTypes.decrease, actionTypes.decreaseAsync)]: (state: CounterState, action: Action<number>) =>
        {
            if (action.error)
            {
                return handleActionError(state, action);
            }
            else
            {
                return {
                    ...state,
                    value: state.value - action.payload!
                };
            }
        }
    },
    INITIAL_STATE
);
