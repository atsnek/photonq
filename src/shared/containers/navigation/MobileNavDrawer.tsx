import { Box, Collapse, Flex, Spacer } from '@chakra-ui/react';
import React, { FC } from 'react';
import PageDirectory from './components/PageDirectory';
import NavbarControls from './components/NavbarControls';
import { Global } from '@emotion/react';
import SearchMenu from '../../../features/search/components/SearchMenu';
import { useNavOffset } from '../../hooks/use-nav-offset';
import { useMenuContext } from '../../contexts/menu';

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
  const { menuStructure } = useMenuContext();
  const navOffset = useNavOffset();

  return (
    <>
      <Global
        styles={{
          body: {
            overflow: isOpen ? 'hidden' : 'auto'
          }
        }}
      />
      <Box
        position="fixed"
        top={`calc(64px + ${navOffset})`}
        left={0}
        zIndex={1}
      >
        <Collapse in={isOpen} animateOpacity>
          <Flex
            direction="column"
            w="100vw"
            h={`calc(100vh - ${navOffset} - 64px)`}
            bg="shared.body.bgColor"
            pt={9}
            px={9}
          >
            <SearchMenu
              styleProps={{
                menu: {
                  matchWidth: true
                }
              }}
              onItemClickCapture={onClose}
            />
            <Box mt={5}>
              <PageDirectory
                isMobile
                closeMobileDrawer={onClose}
                data={menuStructure}
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
