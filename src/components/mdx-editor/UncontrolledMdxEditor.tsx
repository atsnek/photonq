import { FC } from 'react';
import {
  MdxFieldProps,
  UncontrolledMdxField,
  useInjectMdxPropContext
} from 'jaen-fields-mdx';
import { mdxEditorComponents } from './MdxEditor';
import Heading from '../main-content/heading/components/Heading';
import {
  AspectRatio,
  Box,
  Flex,
  Icon,
  Image,
  Stack,
  Text
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import { useMediaModal } from 'jaen';

const InjectImage: React.FC<{ id: string; src: string; alt: string }> = ({
  id,
  src,
  alt
}) => {
  const inject = useInjectMdxPropContext();

  const context = useMediaModal({
    id,
    onSelect: media => {
      inject?.injectProp('src', id, media.url);
    }
  });

  const handleImageClick = () => {
    if (inject) {
      context.toggleModal();
    }
  };

  return (
    <Box position="relative" cursor={inject ? 'pointer' : 'default'}>
      <AspectRatio>
        <Image
          src={src}
          alt={alt}
          style={{ objectFit: 'contain' }}
          transition="filter 0.3s"
        />
      </AspectRatio>
      {inject && (
        <Flex
          position="absolute"
          top="0"
          right="0"
          bottom="0"
          left="0"
          alignItems="center"
          justifyContent="center"
          opacity="0"
          onClick={handleImageClick}
          transition="opacity 0.3s"
          bg="rgba(0, 0, 0, 0.2)"
          _hover={{
            opacity: 1
          }}
        >
          <Icon as={EditIcon} w={8} h={8} color="brand.500" />
        </Flex>
      )}
      {alt && (
        <Text mt={2} fontSize="sm" color="gray.600" textAlign="center">
          {alt}
        </Text>
      )}
    </Box>
  );
};

InjectImage.defaultProps = {
  id: () => `image-${(Math.random() + 1).toString(36).substring(7)}`,
  src: 'https://placehold.co/600x400',
  alt: 'This is a placeholder image'
};

const experimentEditorComponents: MdxFieldProps['components'] = {
  ...mdxEditorComponents,
  img: InjectImage,
  Image: InjectImage
};

delete experimentEditorComponents.Filesystem;
delete experimentEditorComponents.DocsIndex;

interface IUncontrolledMdxEditorProps
  extends Omit<Parameters<typeof UncontrolledMdxField>[0], 'components'> {}

/**
 * Standalone MDX editor without automatic loading/saving by Jaen.
 */
const UncontrolledMdxEditor: FC<IUncontrolledMdxEditorProps> = ({
  ...props
}) => {
  return (
    <Stack
      sx={{
        '.cm-editor': {
          height: '60dvh'
        }
      }}
    >
      <UncontrolledMdxField
        {...props}
        components={{
          h1: props => (
            <Heading
              id={props.id}
              variant="h1"
              noAnchor
              children={props.children}
            />
          ),
          h2: props => (
            <Heading
              id={props.id}
              variant="h2"
              noAnchor
              children={props.children}
            />
          ),
          h3: props => (
            <Heading
              id={props.id}
              variant="h3"
              noAnchor
              children={props.children}
            />
          ),
          h4: props => (
            <Heading
              id={props.id}
              variant="h4"
              noAnchor
              children={props.children}
            />
          ),
          h5: props => (
            <Heading
              id={props.id}
              variant="h5"
              noAnchor
              children={props.children}
            />
          ),
          h6: props => (
            <Heading
              id={props.id}
              variant="h6"
              noAnchor
              children={props.children}
            />
          ),
          wrapper: ({ children }) => <Stack>{children}</Stack>,
          ...experimentEditorComponents
        }}
      />
    </Stack>
  );
};

export default UncontrolledMdxEditor;
