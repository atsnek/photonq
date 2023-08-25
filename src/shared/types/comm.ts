/**
 * Type for debouncing data
 */
export type TDebounceData = {
  timeout?: NodeJS.Timeout;
  state: 'inactive' | 'loading' | 'error' | 'success';
};
