import { ChangeEvent, FC, useRef, useState } from 'react';
import {
  Box,
  Center,
  Input,
  Image as ChImage,
  ImageProps as ChImageProps
} from '@chakra-ui/react';
import TbPhotoEdit from '../icons/tabler/TbPhotoEdit';

interface ImageProps extends ChImageProps {
  handleImageChange?: (src: File) => void;
  editable?: boolean;
}

/**
 * (Static) Image component that can not be edited using Jaen but with the os-native file selector.
 */
const Image: FC<ImageProps> = ({ editable, handleImageChange, ...props }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  // const [imageSrc, setImageSrc] = useState<ImageProps['src']>(props.src);

  const image = <ChImage {...props} />;
  if (!editable) {
    return image;
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget?.files || e.currentTarget.files?.length === 0) return;
    const file = e.currentTarget.files[0];
    if (handleImageChange) handleImageChange(file);
    // setImageSrc(URL.createObjectURL(file));
  };

  return (
    <Box
      position="relative"
      __css={{
        '&:hover': {
          '.image-edit-icon-color-layer': {
            opacity: 0.3
          },
          '.image-edit-icon-container': {
            opacity: 1
          },
          img: {
            transform: 'scale(1.05)'
          }
        }
      }}
      cursor={editable ? 'pointer' : 'default'}
      onClick={() => inputRef.current?.click()}
    >
      <Input
        ref={inputRef}
        type="file"
        accept="image/*"
        display="none"
        visibility="hidden"
        zIndex={-9999}
        onChange={handleChange}
      />
      {image}
      <Box
        className="image-edit-icon-color-layer"
        position="absolute"
        top={0}
        left={0}
        boxSize="full"
        bgColor="components.image.edit.container.bgColor"
        opacity={0}
        transition="opacity 0.2s ease-in-out"
      />
      <Center
        className="image-edit-icon-container"
        position="absolute"
        top={0}
        left={0}
        boxSize="full"
        opacity={0}
        transition="opacity 0.2s ease-in-out"
      >
        <TbPhotoEdit fontSize="3xl" color="white" />
      </Center>
    </Box>
  );
};

export default Image;
