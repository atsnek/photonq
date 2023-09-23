import SearchMenu from '../../features/search/components/SearchMenu';

export interface ToolbarProps {}

export const Toolbar: React.FC<ToolbarProps> = () => {
  return (
    <SearchMenu
      styleProps={{
        input: {
          parent: { borderColor: undefined, borderRadius: undefined },
          kbd: { mt: 1, mr: 2 }
        },
        menuList: {
          width: { base: 0, md: '500px' },
          zIndex: 9999,
          backgroundColor:
            'var(--chakra-colors-features-search-menuList-bgColor)' // Otherwise, the color is not applied
        }
      }}
    />
  );
};
