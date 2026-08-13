/**
 * Gatsby turns an imported asset into a URL string through url-loader, so these
 * imports are valid at build time and only TypeScript needs telling.
 *
 * Without this, the two university marks in the app footer and the hero image
 * are module-resolution errors, and every consumer of them collapses into
 * implicit any. It was equally true before the migration; it only became
 * visible once `tsc --noEmit` started being run as a gate.
 */
declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.webp' {
  const content: string;
  export default content;
}
