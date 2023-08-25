/**
 * Type that makes all properties of T optional except for the ones in K
 */
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
