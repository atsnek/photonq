import { Box } from '@chakra-ui/react';
import { Field } from '@snek-at/jaen';
import { JaenFieldProps } from '@snek-at/jaen/dist/connectors/connectField';
import { ImageFieldProps } from '@snek-at/jaen/dist/fields/ImageField/ImageField';
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
    <Box {...props}>
      <Field.Image name={name} defaultValue={defaultValue} alt={alt} />
    </Box>
  );
};

JaenImage.defaultProps = {
  //@ts-expect-error
  name: () => `image-${(Math.random() + 1).toString(36).substring(7)}`,
  defaultValue: 'https://via.placeholder.com/150'
};

export default JaenImage;
