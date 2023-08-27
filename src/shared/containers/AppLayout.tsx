import React, {FC, ReactNode, useMemo} from 'react'
import TopNav, {
  TBrandImage,
  TMobileMenuButtonProps,
  TTopNavLinkProps,
  TTopNavWrapperProps
} from './navigation/TopNav'
import {Box, ChakraProvider, Flex, useDisclosure} from '@chakra-ui/react'
import Footer from './Footer'
import DocsLayout from './DocsLayout'
import {useLocation} from '@reach/router'
import ColorizedUniWienLogo from '../photonq/assets/icons/uni-wien-logo-colorized.svg'
import {TSearchMenuStyleProps} from '../../features/search/components/SearchMenu'
import {THamburgerMenuIconStylerProps} from '../components/HamburgerMenuIcon'
import {MenuContext} from '../contexts/menu'
import {useNavOffset} from '../hooks/use-nav-offset'
import {convertPageTreeToMenu} from '../utils/navigation'
import theme from '../../styles/theme/theme'
import Toast from '../components/toast/Toast'
import {useAuthenticationContext} from '@atsnek/jaen'

interface AppLayoutProps {
  children?: React.ReactNode
  isDocs?: boolean
  path?: string
  footer?: FC
  customTopNavDisclosure?: ReturnType<typeof useDisclosure>
  topNavProps?: {
    isVisible?: boolean
    wrapper?: TTopNavWrapperProps
    link?: TTopNavLinkProps
    colorMode?: 'light' | 'dark'
    hamburger?: THamburgerMenuIconStylerProps
    searchProps?: TSearchMenuStyleProps
    mobileMenuButtonProps?: TMobileMenuButtonProps
  }
  brandImage?: TBrandImage
}

/**
 * The global layout component.
 * This should not be directly used in pages, but used in gatsby.
 */
const AppLayout: FC<AppLayoutProps> = ({
  children,
  isDocs,
  path,
  footer,
  customTopNavDisclosure,
  topNavProps,
  brandImage
}) => {
  // const pageTree = useJaenPageTree(); //TODO: Implement this
  const location = useLocation()
  const topNavDisclosure = useDisclosure() // for the top nav mobile drawer
  const {isAuthenticated} = useAuthenticationContext()

  // This generates the menu structure from the page tree that is used over the whole app by accessing the context.
  // const menuStructure = useMemo(
  //   () => convertPageTreeToMenu(pageTree, location.pathname),
  //   [pageTree, path]
  // ); //TODO: Implement this

  const navTopOffset = useNavOffset()

  const FooterComp = footer ?? Footer

  return (
    <>
      {/* <MenuContext.Provider value={{ menuStructure }}> */}
      <Flex
        minW="210px"
        h="max(100%, 100vh)"
        minH="100vh"
        direction="column"
        pb={5}>
        {!isAuthenticated && topNavProps?.isVisible && (
          <TopNav
            drawerDisclosure={customTopNavDisclosure ?? topNavDisclosure}
            linkProps={topNavProps?.link}
            wrapperProps={topNavProps?.wrapper}
            colorMode={topNavProps?.colorMode}
            hamburgerIconProps={topNavProps?.hamburger}
            searchProps={topNavProps?.searchProps}
            mobileMenuButtonProps={topNavProps?.mobileMenuButtonProps}
            brandImage={brandImage}
          />
        )}
        {/*`mt={navTopOffset} */}
        <Box flex="1">
          {isDocs ? (
            <DocsLayout path={path}>{children}</DocsLayout>
          ) : (
            <>{children}</>
          )}
        </Box>
      </Flex>
      {/* </MenuContext.Provider> */}
      <FooterComp />
    </>
  )
}

export default AppLayout
