import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import { FC, memo } from 'react';
import MemoizedLinks from '../../../../shared/components/MemoizedLink';
import RightNav from '../../../../shared/containers/navigation/RightNav';
import TableOfContent from '../../../../shared/containers/navigation/components/TableOfContent';
import { useNavOffset } from '../../../../shared/hooks/use-nav-offset';
import { useAuthenticationContext } from '@atsnek/jaen';
import { MdastRoot } from '@atsnek/jaen-fields-mdx/dist/MdxField/components/types';

// Example links - these would probably be fetched from a CMS or other data source
const links = [
  {
    name: 'Question? Give us feedback',
    href: '/contact'
  },
  {
    name: 'Edit this page on Jaen',
    href: '/cms/pages',
    unAuthOnly: true
  }
];

interface IRightNavPostReaderProps {
  postContent?: MdastRoot;
  canEdit?: boolean;
}

//! This causes an hydration error (TableOfContent is the polluter)
//! probably goes away when we connect it's central hook it with the backend
/**
 * Right navigation for reading a post.
 */
const RightNavPostReader: FC<IRightNavPostReaderProps> = ({
  postContent,
  canEdit
}) => {
  const navTopOffset = useNavOffset();

  const isAuthenticated = useAuthenticationContext().user !== null;

  const MemoizedToc = memo(
    () => <TableOfContent fieldContent={postContent} />,
    () => false
  );

  return (
    <Box position="sticky" top={`calc(0px + ${navTopOffset})`}>
      <RightNav>
        <Text
          color="rightNav.titleTop.color"
          fontWeight="semibold"
          fontSize="sm"
        >
          On This Page
        </Text>
        <Flex as="nav" direction="column" mt={5}>
          <MemoizedToc />
        </Flex>
        <Box
          mt={7}
          pt={7}
          borderTop="1px solid"
          borderTopColor="components.separator.borderColor"
          fontSize="xs"
        >
          <VStack rowGap={1} textAlign="left">
            <MemoizedLinks
              links={links.filter(
                link => !link.unAuthOnly || (!canEdit && !isAuthenticated)
              )}
              props={{
                variant: 'right-bottom-nav',
                w: '100%',
                display: 'block'
              }}
            />
          </VStack>
        </Box>
      </RightNav>
    </Box>
  );
};

export default RightNavPostReader;
