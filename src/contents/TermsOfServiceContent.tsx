import { FC } from 'react';
import BaseContentLayout from '../shared/containers/BaseContentLayout';
import { Field } from '@atsnek/jaen';

/**
 * Content for the contact page.
 */
const TermsOfServiceContent: FC = () => {
  return (
    <BaseContentLayout>
      <Field.Editor name="terms-of-service" />
    </BaseContentLayout>
  );
};

export default TermsOfServiceContent;
1;
