import { MenuItem, MenuList, Portal } from '@chakra-ui/react';
import { FC, memo, useMemo, useRef } from 'react';
import { EnPostLanguage } from '../types/post';
import { CheckIcon } from '@chakra-ui/icons';

interface PostLanguageMenuListProps {
  currentLanguage: EnPostLanguage;
  changeLanguage: (language: EnPostLanguage) => void;
  compactMode?: boolean;
}

/**
 * Popover for selecting the language of a post.
 */
const PostLanguageMenuList: FC<PostLanguageMenuListProps> = ({
  currentLanguage,
  changeLanguage,
  compactMode
}) => {
  const items = useMemo(() => {
    return Object.values(EnPostLanguage).map(language => ({
      language,
      label: language[0].toUpperCase() + language.slice(1)
    }));
  }, []);

  return (
    <Portal>
      <MenuList
        {...(compactMode
          ? { fontSize: '14px', minW: 'fit-content' }
          : undefined)}
      >
        {items.map(({ language, label }) => (
          <MenuItem
            position="relative"
            key={language}
            onClick={() => changeLanguage(language)}
            pr={compactMode ? 10 : undefined}
          >
            {label}
            {language === currentLanguage && (
              <CheckIcon
                position="absolute"
                right={3}
                top="50%"
                transform="translateY(-50%)"
                boxSize="10px"
              />
            )}
          </MenuItem>
        ))}
      </MenuList>
    </Portal>
  );
};

export default memo(
  PostLanguageMenuList,
  (prev, next) => prev.currentLanguage === next.currentLanguage
);
