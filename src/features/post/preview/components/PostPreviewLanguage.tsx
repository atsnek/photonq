import { Badge } from '@chakra-ui/react';
import { FC } from 'react';
import { EnPostLanguage, TPostPreview } from '../../types/post';

export interface IPostpreviewLanguageProps {
  language: EnPostLanguage;
}

/**
 * Badge for displaying the language of a post.
 */
const PostPreviewLanguage: FC<IPostpreviewLanguageProps> = ({ language }) => {
  return (
    <Badge colorScheme="gray" borderRadius="md">
      {language}
    </Badge>
  );
};

export default PostPreviewLanguage;
