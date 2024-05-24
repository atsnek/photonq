import { FC } from 'react';
import BaseContentLayout from '../shared/containers/BaseContentLayout';
import { Field } from '@atsnek/jaen';

/**
 * Content for the contact page.
 */
const LegalContent: FC = () => {
  return (
    <BaseContentLayout>
      <Field.Editor name="legal" />
    </BaseContentLayout>
  );
};

export default LegalContent;
1;
