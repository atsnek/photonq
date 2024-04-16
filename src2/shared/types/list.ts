import { TCommDataState } from "./comm";

/**
 * Type for a synchronous list of items
 */
export type TListData<T> = {
    items: T[];
}

/**
 * Type for an asynchronous list of items
 */
export type TAsyncListData<T> = TListData<T> & {
    state: TCommDataState;
}