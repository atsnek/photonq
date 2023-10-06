import { FC } from 'react';
import BaseContentLayout from '../shared/containers/BaseContentLayout';
import { Field } from '@atsnek/jaen';

/**
 * Content for the contact page.
 */
const ImprintContent: FC = () => {
  return (
    <BaseContentLayout>
      <Field.Editor name="imprint" />
    </BaseContentLayout>
  );
};

export default ImprintContent;
1;
