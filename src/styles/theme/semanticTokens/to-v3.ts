/**
 * Converts the site's semantic-token tree from its v2 shape to v3's.
 *
 * The 27 files under `semanticTokens/` and `components/main-content/*\/styles/`
 * are a readable, hand-maintained data structure, and they stay in that shape.
 * Only the assembly step changes, which keeps the diff at one file instead of
 * twenty-seven hand-edits, each with its own chance of introducing exactly the
 * silent error this migration is trying to avoid.
 *
 *   v2   {default: 'brand.500', _dark: 'brand.200'}
 *   v3   {value: {base: '{colors.brand.500}', _dark: '{colors.brand.200}'}}
 *
 * The token PATHS are unchanged by construction, which is what lets all 117
 * consuming call sites stay untouched: v3 resolves tokens by path, so the
 * camelCase-to-kebab change in the emitted variable name is invisible to them.
 */

/** The value forms measured across all 147 leaves in the real tree. */
const isTokenPath = (value: string): boolean =>
  // A dotted identifier chain and nothing else. Anything containing a bracket,
  // hash, percent or space is a literal colour or gradient; anything without a
  // dot is either a keyword (white, none) or a bare token name for a scale this
  // namespace does not own.
  /^[A-Za-z_][\w]*(\.[\w]+)+$/.test(value);

const toValue = (raw: string): string =>
  isTokenPath(raw) ? `{colors.${raw}}` : raw;

/**
 * A node is a LEAF exactly when it carries a `default` whose value is a string.
 *
 * The `typeof` half is not decoration. Six places in the real tree use `default`
 * as a path SEGMENT with siblings, and only one level further down is it a
 * value: filesystem's three `color.{default,lowContrast}` pairs, heading's
 * `link.color.{default,active}`, callout's `{default,info,warning,error}` and
 * shared's `text.{default,bright}`. Testing only for the key's presence would
 * collapse all six, silently taking their siblings with them, and
 * `Heading.tsx:126` reads one of those full paths.
 */
const isLeaf = (node: Record<string, unknown>): boolean =>
  'default' in node && typeof node.default === 'string';

type Tree = Record<string, unknown>;

export function toV3SemanticTokens(node: unknown): unknown {
  if (typeof node === 'string') {
    return { value: toValue(node) };
  }

  if (node === null || typeof node !== 'object' || Array.isArray(node)) {
    return node;
  }

  const tree = node as Tree;

  if (isLeaf(tree)) {
    const base = toValue(tree.default as string);
    const dark =
      typeof tree._dark === 'string' ? toValue(tree._dark) : undefined;

    return { value: dark === undefined ? base : { base, _dark: dark } };
  }

  const out: Tree = {};

  for (const [key, value] of Object.entries(tree)) {
    // `a: 'b'` appears four times, each with the comment "Remove after adding
    // another property (otherwise _focus won't work)". That was a v2 flattening
    // quirk; verified against v3.36.1, a lone `_focus` segment resolves fine.
    // `test: 'red.500'` in components/input.ts is a leftover of the same
    // debugging. Both are dropped rather than carried into a new namespace.
    if (
      (key === 'a' && value === 'b') ||
      (key === 'test' && value === 'red.500')
    ) {
      continue;
    }

    out[key] = toV3SemanticTokens(value);
  }

  return out;
}
