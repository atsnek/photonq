import { FC, memo } from 'react';
import { Box, Flex, Stack, VStack, Text as ChText } from '@chakra-ui/react';
import { useNavOffset } from '../shared/hooks/use-nav-offset';
import MemoizedLinks from '../shared/components/MemoizedLink';
import TableOfContent from '../shared/containers/navigation/components/TableOfContent';
import MainBottomNav from '../shared/containers/navigation/MainBottomNav';
import RightNav from '../shared/containers/navigation/RightNav';
import MdxEditor from '../shared/components/MdxEditor';

// Example links - these would probably be fetched from a CMS or other data source
const links = [
  {
    name: 'Question? Give us feedback',
    href: 'https://snek.at/'
  },
  {
    name: 'Edit this page on Jaen',
    href: '/admin/#/pages'
  }
];

export interface DocContentProps {}

export const DocContent: FC<DocContentProps> = () => {
  const navTopOffset = useNavOffset();

  // This can be memoized since it doesn't change and switching pages re-renders most of the app anyway.
  const MemoizedToc = memo(TableOfContent, () => false);

  return (
    <>
      <Stack spacing={{ base: 0, xl: 12 }} direction="row">
        <Box maxW="900px" w="full">
          <MdxEditor />
          <MainBottomNav />
        </Box>

        <Box position="sticky" top={`calc(0px + ${navTopOffset})`}>
          <RightNav>
            <ChText color="rightNav.titleTop.color" fontWeight="semibold">
              On This Page
            </ChText>
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
                  links={links}
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
      </Stack>
    </>
  );
};
