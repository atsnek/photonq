/**
 * Get the platform of the user
 * @returns {string} platform  - The platform of the user
 */
export function getPlatform() {
  const userAgent =
    typeof window !== 'undefined' && typeof window.navigator !== 'undefined'
      ? window.navigator.userAgent
      : '';

  const platforms = [
    { pattern: /Mac/, platform: 'mac' },
    { pattern: /Windows/, platform: 'windows' },
    {
      pattern: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/,
      platform: 'mobile'
    }
  ];

  const { platform } = platforms.find(({ pattern }) =>
    pattern.test(userAgent)
  ) || {
    platform: 'Unknown'
  };

  return platform;
}

/**
 * Checks if the user is on a touch device
 * @returns {boolean} isTouchDevice - Whether the user is on a touch device or not
 */
export function isTouchDevice() {
  return (
    typeof window !== 'undefined' &&
    ('ontouchstart' in window || navigator.maxTouchPoints)
  );
}

/**
 * Filters out whitespace items from an array
 * @param items  - The array to filter
 * @returns  - The filtered array
 */
export function filterWhitespaceItems(items: string[]) {
  return items.filter(item => /\S/.test(item));
}

/**
 * Formats a number to a short string with a suffix (e.g. 1.5k)
 * @param number  - The number to format
 * @param precision  - The precision of the number
 * @returns  - The formatted number
 */
export function formatNumber(number: number, precision = 2) {
  if (!number) {
    number = 0;
  }

  const suffixes = ['', 'k', 'm', 'b', 't'];
  const suffixNum = number >= 1000 ? Math.floor(('' + number).length / 3) : 0;
  let shortNumber = parseFloat(
    (suffixNum !== 0 ? number / Math.pow(1000, suffixNum) : number).toPrecision(
      precision
    )
  );
  if (shortNumber % 1 !== 0) {
    shortNumber = parseFloat(shortNumber.toFixed(1));
  }
  return shortNumber + suffixes[suffixNum];
}
