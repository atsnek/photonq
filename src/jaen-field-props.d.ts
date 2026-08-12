import type {HeadingProps} from '@chakra-ui/react'

/**
 * `Field.Text` spreads everything it does not consume onto its `as` wrapper,
 * and every section heading on this site is a `<Field.Text as={Heading} size>`.
 * jaen types the field off `TextProps`, which in v2 carried a `size` from
 * `ThemingProps<'Text'>`; v3's Text has no recipe and therefore no `size`, so
 * the prop the wrapper actually reads stopped type-checking at seven call
 * sites. Widening here rather than casting at each of them keeps the JSX
 * identical to v2, which is the point.
 *
 * Belongs in jaen's own `TextFieldProps`. Drop this file when it lands there.
 */
declare module 'jaen' {
  interface TextFieldProps {
    size?: HeadingProps['size']
  }
}
