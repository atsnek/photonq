import { useMemo } from 'react';
import { useField } from '@atsnek/jaen';
import { TableOfContentItem } from '../types/navigation';
import { MdastRoot } from '@atsnek/jaen-fields-mdx/dist/MdxField/components/types';

export const useTocNavigation = (mdxFieldName?: string, fieldContent?: any) => {
  let value: MdastRoot | undefined = undefined;
  if (mdxFieldName && !fieldContent) {
    const field = useField<MdastRoot>(mdxFieldName, 'IMA:MdxField');
    value = field.value || field.staticValue;
  } else {
    value = fieldContent;
  }

  const headings = useMemo(() => {
    if (!value) {
      return [];
    }

    const headings: TableOfContentItem[] = [];

    const takenIds: {
      [key: string]: number;
    } = {};

    value.children.forEach(node => {
      if (node.type === 'heading') {
        // @ts-expect-error
        const text = node.children[0]?.value || '';
        let id = text
          .toLowerCase()
          .replace(/ |%/g, '-') // Removed spaces and % from the id
          .replace(/\p{Extended_Pictographic}/u, ''); // Remove emojis from the id

        if (takenIds[id]) {
          takenIds[id] += 1;
          id = `${id}-${takenIds[id]}`;
        }

        headings.push({
          id,
          level: node.depth,
          text
        });
      }
    });

    return headings;
  }, [value]);

  return headings;
};
