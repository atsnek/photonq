import { Box } from '@chakra-ui/react';
import { Field } from '@atsnek/jaen';
import { FC } from 'react';

export interface ISectionLabelProps {
  label: string;
  labelFieldname: string;
  centered?: boolean;
}

/**
 * Component for displaying a gray section label.
 */
const SectionLabel: FC<ISectionLabelProps> = ({
  label,
  labelFieldname,
  centered
}) => {
  return (
    <Box
      w="fit-content"
      bgColor="pq.components.sectionLabel.bgColor"
      px={3}
      borderRadius="md"
      marginX={centered ? 'auto' : 0}
    >
      <Field.Text name={labelFieldname} defaultValue={label} />
    </Box>
  );
};

export default SectionLabel;
