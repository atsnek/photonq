import { FC } from 'react';
import SectionLabel, { ISectionLabelProps } from './SectionLabel';
import { Box, BoxProps, Center, Heading } from '@chakra-ui/react';
import { Field } from '@atsnek/jaen';
import { TextFieldProps } from '@atsnek/jaen/dist/fields/TextField';

interface ISectionTitleProps extends ISectionLabelProps {
  title: string;
  parentProps?: BoxProps;
  alignItems?: boolean;
  titleProps?: TextFieldProps;
}

/**
 * Component for displaying a section title with a section label.
 */
const SectionTitle: FC<ISectionTitleProps> = ({
  label,
  labelFieldname,
  title,
  parentProps,
  alignItems,
  titleProps
}) => {
  return (
    <Box textAlign={alignItems ? 'center' : 'inherit'} {...parentProps}>
      <SectionLabel label={label} labelFieldname={labelFieldname} centered={alignItems} />
      <Field.Text
        fontSize="4xl"
        fontWeight={400}
        name="FeatureSectionTitle"
        mt={5}
        defaultValue={title}
        color="pq.components.sectionTitle.color"
        {...titleProps}
      />
    </Box>
  );
};

export default SectionTitle;
