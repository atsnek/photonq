import { useColorModeValue } from '@chakra-ui/react';
import SearchMenu from '../../features/search/components/SearchMenu';

export interface ToolbarProps {}

export const Toolbar: React.FC<ToolbarProps> = () => {
  const borderColor = useColorModeValue('gray.300', 'gray.700');
  return (
    <SearchMenu
      styleProps={{
        input: {
          parent: { borderColor: borderColor, borderRadius: 'lg' },
          kbd: { mt: 1, mr: 2 }
        },
        menuList: {
          width: { base: 0, md: '500px', lg: '700px' },
          zIndex: 9999,
          backgroundColor: 'var(--chakra-colors-features-search-menuList-bgColor)' // Otherwise, the color is not applied
        }
      }}
    />
  );
};
