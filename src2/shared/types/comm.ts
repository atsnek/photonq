/**
 * Type for debouncing data
 */
export type TDebounceData = {
  timeout?: NodeJS.Timeout;
  state: 'inactive' | 'loading' | 'error' | 'success';
};

/**
 * States for fetching data from the backend
 */
export type TCommDataState = 'inactive' | 'loading' | 'error' | 'success';
