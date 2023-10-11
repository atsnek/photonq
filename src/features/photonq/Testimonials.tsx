'use client';

import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  Container,
  Avatar,
  useColorModeValue,
  LinkBox,
  LinkOverlay
} from '@chakra-ui/react';
import Link from '../../shared/components/Link';

interface Props {
  children: React.ReactNode;
}

export const Testimonial = (props: Props) => {
  const { children } = props;

  return <Box maxW="xs">{children}</Box>;
};

export const TestimonialContent = (props: Props) => {
  const { children } = props;

  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow="4px 2px 16px -12px rgba(0,0,0,0.25)"
      p={8}
      rounded={'xl'}
      align={'center'}
      pos={'relative'}
      _after={{
        content: `""`,
        w: 0,
        h: 0,
        borderLeft: 'solid transparent',
        borderLeftWidth: 16,
        borderRight: 'solid transparent',
        borderRightWidth: 16,
        borderTop: 'solid',
        borderTopWidth: 16,
        borderTopColor: useColorModeValue('white', 'gray.800'),
        pos: 'absolute',
        bottom: '-16px',
        left: '50%',
        transform: 'translateX(-50%)'
      }}
    >
      {children}
    </Stack>
  );
};

export const TestimonialHeading = (props: Props) => {
  const { children } = props;

  return (
    <Heading as={'h3'} fontSize={'xl'}>
      {children}
    </Heading>
  );
};

export const TestimonialText = (props: Props) => {
  const { children } = props;

  return (
    <Text textAlign={'center'} fontSize={'sm'}>
      {children}
    </Text>
  );
};

export interface TestimonialAvatarProps {
  src: string;
  name: string;
  title: string;
  to: string;
}

export const TestimonialAvatar: React.FC<TestimonialAvatarProps> = ({ src, name, title, to }) => {
  return (
    <LinkBox as={Flex} align={'center'} mt={8} direction={'column'}>
      <Avatar src={src} mb={2} />
      <Stack spacing={-1} align={'center'}>
        <Text fontWeight={600}>{name}</Text>
        <LinkOverlay as={Link} fontSize={'sm'} href={to} isExternal>
          {title}
        </LinkOverlay>
      </Stack>
    </LinkBox>
  );
};
