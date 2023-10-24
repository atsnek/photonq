import { useColorModeValue } from '@chakra-ui/react';
import SearchMenu from '../../features/search/components/SearchMenu';

export interface ToolbarProps {}

export const Toolbar: React.FC<ToolbarProps> = () => {
  const borderColor = useColorModeValue('gray.300', 'gray.700');
  return <SearchMenu />;
};
