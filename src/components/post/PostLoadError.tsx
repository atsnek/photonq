import { Button, Stack, StackProps, Text } from '@chakra-ui/react';
import { FC } from 'react';

interface PostLoadErrorProps extends StackProps {
  /** What failed to load, as it should read in the sentence. */
  subject: string;
  onRetry: () => void;
}

/**
 * Stands in for a list of experiments whose query failed.
 *
 * snek-query answers a failed request with its placeholder proxy, so without
 * this a failed list still rendered cards: an empty "@" handle, "Invalid Date",
 * an empty privacy pill and no stars, which read as broken data rather than as
 * a request that did not succeed. The social API does fail this way today: it
 * answers `user { profile }` with "Unexpected error." and nulls the whole
 * response.
 */
const PostLoadError: FC<PostLoadErrorProps> = ({
  subject,
  onRetry,
  ...props
}) => (
  <Stack align="center" gap="3" py="10" textAlign="center" {...props}>
    <Text color="shared.text.muted">
      {subject} could not be loaded right now.
    </Text>
    <Button
      variant="ghost-hover-outline"
      size="sm"
      borderRadius="lg"
      onClick={onRetry}
    >
      Try again
    </Button>
  </Stack>
);

export default PostLoadError;
