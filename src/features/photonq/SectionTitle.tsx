import { FC } from 'react';
import SectionLabel, { ISectionLabelProps } from './SectionLabel';
import { Box, BoxProps, Center, Heading } from '@chakra-ui/react';
import { Field } from '@atsnek/jaen';

interface ISectionTitleProps extends ISectionLabelProps {
  title: string;
  parentProps?: BoxProps;
  alignItems?: boolean;
}

/**
 * Component for displaying a section title with a section label.
 */
const SectionTitle: FC<ISectionTitleProps> = ({
  label,
  labelFieldname,
  title,
  parentProps,
  alignItems
}) => {
  return (
    <Box textAlign={alignItems ? 'center' : 'inherit'} {...parentProps}>
      <SectionLabel
        label={label}
        labelFieldname={labelFieldname}
        centered={alignItems}
      />
      <Field.Text
        fontSize="4xl"
        fontWeight={400}
        name="FeatureSectionTitle"
        mt={5}
        defaultValue={title}
      />
    </Box>
  );
};

export default SectionTitle;
