import { Field } from 'jaen';
import { JaenFieldProps } from 'jaen/dist/connectors/connect-field';
import { ImageFieldProps } from 'jaen/dist/fields/ImageField';
import { AspectRatio, Box } from '@chakra-ui/react';
import { FC } from 'react';

interface IImageProps {
  name: string;
  defaultValue: string;
  alt?: string;
}

/**
 * Component for displaying an jaen image
 */
export const JaenImage: FC<IImageProps & JaenFieldProps & ImageFieldProps> = ({
  name,
  defaultValue,
  alt,
  ...props
}: any) => {
  if (!name) {
    name = `image-${(Math.random() + 1).toString(36).substring(7)}`;
  }

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
};

JaenImage.defaultProps = {
  //@ts-expect-error
  name: () => `image-${(Math.random() + 1).toString(36).substring(7)}`,
  defaultValue: 'https://placehold.co/600x400'
};

export default JaenImage;
