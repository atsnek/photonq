import { FC } from 'react';
import BaseContentLayout from '../shared/containers/BaseContentLayout';
import { Field } from '@atsnek/jaen';

/**
 * Content for the contact page.
 */
const PrivacyPolicyContent: FC = () => {
  return (
    <BaseContentLayout>
      <Field.Editor name="privacy-policy" />
    </BaseContentLayout>
  );
};

export default PrivacyPolicyContent;
1;
