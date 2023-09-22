import {SearchIndex} from './types.js'

/**
 * Retrieves the built search index from a JSON file.
 * @returns {Promise<SearchIndex>} A promise that resolves to the built search index data.
 * @throws {Error} If the retrieval of search data fails.
 */
export async function getBuiltSearchIndex(): Promise<SearchIndex> {
  try {
    const res = await fetch('/search-index.json', {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!res.ok) {
      throw new Error('Failed to retrieve the built search index data.')
    }

    const data = await res.json()
    return data
  } catch (err) {
    console.error(
      'Error occurred while retrieving the built search index:',
      err
    )
    return {}
  }
}
