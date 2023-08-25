import { FC } from 'react';
import { Box, Card, CardProps, Text } from '@chakra-ui/react';
import { IMainContentComponentBaseProps } from '../../types/mainContent';
import Link from '../../../../shared/components/Link';
import { TLinkData } from '../../../../shared/types/navigation';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { TImageData } from '../types/imageCard';
// import themeCardComponent from '../../../theme/components/card';
import JaenImage from '../../../../shared/components/JaenImage';
import { mainComponentBaseStyle } from '../../../../shared/containers/main/mainContent.vars';

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
  return (
    <Card
      {...baseProps}
      w="fit-content"
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
    >
      <Link href={link.href}>
        <JaenImage
          name={id + '-image'}
          defaultValue={image.src}
          alt={image.alt}
          style={{
            width: '100%',
            objectFit: 'cover'
          }}
        />
        <Box p={4}>
          <Text fontSize="16px" fontWeight="semibold">
            {link.name}
            <ArrowForwardIcon
              className="sd-cmp-image-card-link-icon"
              ml={2}
              transition="margin .15s ease-in-out"
            />
          </Text>
        </Box>
      </Link>
    </Card>
  );
};

ImageCard.defaultProps = {
  baseProps: mainComponentBaseStyle.baseProps,
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
