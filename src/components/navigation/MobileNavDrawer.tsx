import { Box, Collapsible, Flex, Spacer } from '@chakra-ui/react';
import { Global } from '@emotion/react';
import { useLocation } from '@reach/router';
import { FaLink } from '@react-icons/all-files/fa/FaLink';
import { FC } from 'react';
import { useMenuStructureContext } from '../../contexts/menu-structure';
import TbUsers from '../icons/tabler/TbUsers';
import SearchMenu from '../search-menu';
import NavbarControls from './NavbarControls';
import PageDirectory from './page-directory/PageDirectory';

interface MobileNavDrawerProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

/**
 * The mobile navigation drawer.
 * This is used for mobile devices and contains all core menus and search functionalities.
 */
const MobileNavDrawer: FC<MobileNavDrawerProps> = ({
  isOpen,
  onOpen,
  onClose
}) => {
  const { menuStructure } = useMenuStructureContext();
  const { pathname } = useLocation();

  return (
    <>
      <Global
        styles={{
          body: {
            overflow: isOpen ? 'hidden' : 'auto'
          }
        }}
      />
      <Box position="fixed" top={`calc(64px)`} left={0} zIndex={3}>
        <Collapsible.Root open={isOpen}>
          <Collapsible.Content>
            {/* The drawer hangs from the 64px bar, so it is the visible
                height less the bar. It used `100vh` less use-nav-offset's
                85px, which left a 21px strip at the bottom where the page
                showed through and ran into the last entry. `dvh` follows the
                height the browser currently shows, where `vh` on a phone is
                the height with its toolbar hidden. */}
            <Flex
              direction="column"
              w="100vw"
              h="calc(100dvh - 64px)"
              bg="shared.body.bgColor"
              pt={9}
              px={9}
              overflowY="scroll"
            >
              <SearchMenu />
              <Box mt={5}>
                <PageDirectory
                  isMobile
                  closeMobileDrawer={onClose}
                  data={menuStructure}
                  baseMenuItems={[
                    {
                      name: 'Community Research',
                      icon: <TbUsers />,
                      items: [
                        {
                          name: 'Experiments',
                          href: '/experiments',
                          isActive: pathname?.startsWith('/experiments')
                        }
                      ]
                    },
                    {
                      name: 'More',
                      icon: <FaLink />,
                      items: [
                        {
                          name: 'PhotonQ',
                          href: '/'
                        }
                      ]
                    }
                  ]}
                  path={pathname}
                />
              </Box>
              <Spacer />
              <NavbarControls isMobile />
            </Flex>
          </Collapsible.Content>
        </Collapsible.Root>
      </Box>
    </>
  );
};

export default MobileNavDrawer;
