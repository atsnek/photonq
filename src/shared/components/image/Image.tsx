import { ChangeEvent, FC, useRef } from 'react';
import {
  Box,
  Center,
  Input,
  Image as ChImage,
  ImageProps as ChImageProps,
  Spinner
} from '@chakra-ui/react';
import TbPhotoEdit from '../icons/tabler/TbPhotoEdit';

interface ImageProps extends ChImageProps {
  handleImageChange?: (src: File) => void;
  editable?: boolean;
  isUploading?: boolean;
}

/**
 * (Static) Image component that can not be edited using Jaen but with the os-native file selector.
 */
const Image: FC<ImageProps> = ({ editable, handleImageChange, isUploading, ...props }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const image = <ChImage objectFit="cover" {...props} />;
  if (!editable) {
    return image;
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget?.files || e.currentTarget.files?.length === 0) return;
    const file = e.currentTarget.files[0];
    if (handleImageChange) handleImageChange(file);
  };

  return (
    <Box
      position="relative"
      __css={
        !isUploading
          ? {
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
            }
          : {}
      }
      boxSize={props.boxSize}
      cursor={editable ? 'pointer' : 'default'}
      onClick={() => inputRef.current?.click()}
      borderRadius={props.borderRadius ?? 'full'}
      overflow="hidden"
    >
      <Input
        ref={inputRef}
        type="file"
        accept=".jpg,.jpeg,.png,.gif"
        display="none"
        visibility="hidden"
        zIndex={-9999}
        onChange={handleChange}
        disabled={isUploading}
      />
      {image}
      {isUploading && (
        <Center position="absolute" top={0} w="100%" h="100%" backdropFilter="blur(5px)">
          <Spinner color="brand.300" />
        </Center>
      )}
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
