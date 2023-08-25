import { BoxProps, Center, Heading, Text, VStack } from '@chakra-ui/react';
import { FC } from 'react';
import TbSearch from '../../../../shared/components/icons/tabler/TbSearch';

interface IPostLIstNoResultsProps extends BoxProps {}

const PostListNoResults: FC<IPostLIstNoResultsProps> = ({ ...props }) => {
  return (
    <Center as={VStack} {...props} py={10} px="100px" borderRadius="lg">
      <TbSearch boxSize="75px" color="gray.200" />
      <Heading as="h3" size="md" mt={3} textAlign="center">
        No results found
      </Heading>
      <Text textAlign="center">
        Try other search terms to find what you're looking for.
      </Text>
    </Center>
  );
};

export default PostListNoResults;
