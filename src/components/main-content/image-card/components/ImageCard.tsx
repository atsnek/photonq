import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Card, CardProps, LinkBox, LinkOverlay } from '@chakra-ui/react';
import { FC } from 'react';
import { IMainContentComponentBaseProps } from '../../types/mainContent';
import { TImageData } from '../types/imageCard';
import { useContentManagement, useEditingContext } from 'jaen';
import { TLinkData } from '../../../types';
import JaenImage from '../../../JaenImage';
import { Link } from 'gatsby-plugin-jaen';

interface IImageCardProps extends IMainContentComponentBaseProps {
  id: string;
  image: TImageData;
  link: TLinkData;
  size?: CardProps['maxW'];
}

/**
 * Component for displaying an card with an image and a link
 */
const ImageCard: FC<IImageCardProps> = ({
  baseProps,
  id,
  image,
  link,
  size = 'md'
}) => {
  const cms = useContentManagement();

  let isEditing = false;

  try {
    const editingContext = useEditingContext();
    isEditing = editingContext.isEditing;
  } catch (e) {
    console.log('error', e);

    isEditing = cms.isEditing;
  }

  return (
    <LinkBox>
      <Card
        {...baseProps}
        maxW={size}
        bgColor="components.imageCard.bgColor"
        border="1px solid"
        borderColor="components.imageCard.borderColor"
        _hover={{
          bgColor: 'components.imageCard.hover.bgColor',
          boxShadow: 'components.imageCard.hover.boxShadow',
          borderColor: 'components.imageCard.hover.borderColor',
          '& .sd-cmp-image-card-link-icon': {
            marginLeft: 3
          }
        }}
        overflow="hidden"
        transition="border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out, background-color 0.2s ease-in-out"
        w="full"
        display="flex"
      >
        <JaenImage
          name={id + '-image'}
          defaultValue={image.src}
          alt={image.alt}
          style={{
            width: '100%',
            height: 'var(--chakra-sizes-xs)',
            objectFit: 'cover'
          }}
        />
        <Box p={4}>
          <Link
            as={isEditing ? undefined : LinkOverlay}
            fontSize="16px"
            fontWeight="semibold"
            to={link.href}
          >
            {link.name}
            <ArrowForwardIcon
              className="sd-cmp-image-card-link-icon"
              ml={2}
              transition="margin .15s ease-in-out"
            />
          </Link>
        </Box>
      </Card>
    </LinkBox>
  );
};

ImageCard.defaultProps = {
  baseProps: {
    mt: 8
  },
  //@ts-expect-error
  id: () => `${(Math.random() + 1).toString(36).substring(7)}`,
  image: {
    src: 'https://picsum.photos/200',
    alt: 'Placeholder image'
  },
  link: {
    href: '#',
    name: 'Placeholder link'
  }
};

export default ImageCard;
