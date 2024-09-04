import { Box, Collapse, Flex, Spacer } from '@chakra-ui/react';
import { Global } from '@emotion/react';
import { useLocation } from '@reach/router';
import { FaLink } from '@react-icons/all-files/fa/FaLink';
import { FC } from 'react';
import { useMenuStructureContext } from '../../contexts/menu-structure';
import useNavOffset from '../../hooks/use-nav-offset';
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
  const navOffset = useNavOffset();
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
        <Collapse in={isOpen} animateOpacity>
          <Flex
            direction="column"
            w="100vw"
            h={`calc(100vh - ${navOffset})`}
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
        </Collapse>
      </Box>
    </>
  );
};

export default MobileNavDrawer;
