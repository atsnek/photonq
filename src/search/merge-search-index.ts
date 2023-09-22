import {SearchIndex} from './types.js'

/**
 * Merges two search indexes, overriding data keys in the first index with the corresponding values from the second index.
 * @param {SearchIndex} a - The first search index.
 * @param {SearchIndex} b - The second search index.
 * @returns {SearchIndex} The merged search index with overridden data keys.
 */
export const mergeSearchIndex = (
  a: SearchIndex,
  b: SearchIndex
): SearchIndex => {
  const result: SearchIndex = {...a}

  Object.keys(b).forEach(key => {
    const bValue = b[key]
    const aValue = result[key]

    if (bValue && aValue) {
      result[key] = {
        id: bValue.id || aValue.id,
        title: bValue.title || aValue.title,
        type: bValue.type || aValue.type,
        data: {
          ...(aValue.data || {}),
          ...(bValue.data || {})
        }
      }
    } else {
      const value = bValue || aValue

      if (value) {
        result[key] = value
      }
    }
  })

  return result
}
