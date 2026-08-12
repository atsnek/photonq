/**
 * The Gatsby shadow that hands jaen this site's brand palette.
 *
 * The path is fixed by gatsby-plugin-jaen and must not move: jaen imports
 * `./theme` from its own theme directory, and a shadow at any other path would
 * silently orphan itself, leaving the CMS chrome on jaen's default pink.
 *
 * In v3 this must export a SystemContext rather than a theme object, and jaen
 * asserts that with isValidSystem. A config-shaped export cannot fail loudly:
 * mergeConfigs would deep-merge a v2 extendTheme() result, find every key at
 * the wrong nesting level, drop it without a word, and build a site that is
 * correct in every respect except its colour.
 */
import { system } from '../../styles/theme/system';

export default system;
