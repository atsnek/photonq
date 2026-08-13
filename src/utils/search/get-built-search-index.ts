import { SearchIndex } from '../../hooks/use-search/types.js';

/**
 * The single request for /search-index.json, shared by every caller.
 *
 * useDocsSearch used to cache the parsed index in a `useRef`, and a ref is
 * per hook instance. SearchMenu renders more than once per page (TopNav
 * mounts it for the desktop bar and again inside MobileNavDrawer), so every
 * mount ran its own `useEffect`, saw its own empty ref and pulled its own
 * copy of the whole index. Two mounts, two downloads of a byte-identical
 * file.
 *
 * A module-level promise fixes both halves of that: it is shared across
 * mounts, and because it is stored before it settles, a second caller that
 * arrives while the first request is still in flight awaits the same
 * response instead of starting a competing one.
 */
let indexPromise: Promise<SearchIndex> | null = null;

const fetchBuiltSearchIndex = async (): Promise<SearchIndex> => {
  const res = await fetch('/search-index.json', {
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!res.ok) {
    throw new Error('Failed to retrieve the built search index data.');
  }

  return (await res.json()) as SearchIndex;
};

/**
 * Retrieves the built search index from a JSON file.
 *
 * Fetched at most once per document. Every later call resolves from the
 * cached promise.
 * @returns {Promise<SearchIndex>} A promise that resolves to the built search index data.
 */
export async function getBuiltSearchIndex(): Promise<SearchIndex> {
  if (!indexPromise) {
    indexPromise = fetchBuiltSearchIndex().catch(err => {
      // A failed attempt must not stay cached, or one flaky response would
      // leave search empty for the rest of the session. Callers already
      // waiting on this promise still get the empty index they got before.
      indexPromise = null;

      console.error(
        'Error occurred while retrieving the built search index:',
        err
      );

      return {};
    });
  }

  return indexPromise;
}
