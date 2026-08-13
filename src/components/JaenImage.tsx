import { Field } from 'jaen';
// Both types used to come in through `jaen/dist/...`. jaen's package.json
// declares an `exports` map that lists only `.`, `./dist/types` and
// `./package.json`, and this branch's tsconfig resolves modules the way the
// bundler does, where that map is authoritative rather than advisory. The two
// deep paths therefore stop resolving; the package root re-exports both.
import { ImageFieldProps, JaenFieldProps } from 'jaen';
import { AspectRatio, Box } from '@chakra-ui/react';
import { FC } from 'react';

interface IImageProps {
  name: string;
  defaultValue: string;
  useAspectRatio?: boolean;
  alt?: string;
}

/**
 * Component for displaying an jaen image
 */
export const JaenImage: FC<IImageProps & JaenFieldProps & ImageFieldProps> = ({
  name,
  defaultValue,
  alt,
  useAspectRatio = true,
  ...props
}: any) => {
  if (!name) {
    name = `image-${(Math.random() + 1).toString(36).substring(7)}`;
  }

  if (useAspectRatio) {
    return (
      <AspectRatio {...props}>
        <Field.Image
          name={name}
          defaultValue={defaultValue}
          alt={alt}
          objectFit="contain"
        />
      </AspectRatio>
    );
  }

  return (
    <Box {...props}>
      <Field.Image name={name} defaultValue={defaultValue} alt={alt} />
    </Box>
  );
};

JaenImage.defaultProps = {
  //@ts-expect-error
  name: () => `image-${(Math.random() + 1).toString(36).substring(7)}`,
  defaultValue: 'https://placehold.co/600x400'
};

export default JaenImage;
