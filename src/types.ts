import { ActionCreatorsMapObject } from "redux";

/**
 * Represents the `Redux Action Types`. It's a mapped type of `EnumActionTypes`.
 */
export type ActionTypes<EnumActionTypes> = {
    [key in keyof EnumActionTypes]: string;
};

/**
 * Represents the base props of `React` component;
 */
export interface BaseReactProps
{
    /**
     * The class name of the component.
     */
    className?: string;
}

/**
 * Represents the base props of `Redux` component;
 */
export interface BaseReduxProps<ActionCreators extends ActionCreatorsMapObject> extends BaseReactProps
{
    /**
     * The action creators of the component.
     */
    actions: ActionCreators;
}

/**
 * Represents an enhanced `Error`.
 */
export interface EnhancedError extends Error
{
    /**
     * The error code, if available.
     */
    code?: number;

    /**
     * The request, if available.
     */
    request?: any;

    /**
     * The response, if available.
     */
    response?: any;

    /**
     * The meta data, if available.
     */
    meta?: any;
}