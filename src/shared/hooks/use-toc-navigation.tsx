import { useMemo } from 'react';
import { useField } from '@snek-at/jaen';
import { MdastRoot } from '@snek-at/jaen/dist/fields/MdxField/components/types';
import { TableOfContentItem } from '../types/navigation';

export const useTocNavigation = (mdxFieldName: string) => {
  const field = useField<MdastRoot>(mdxFieldName, 'IMA:MdxField');

  const value = field.value || field.staticValue;

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
        let id = text.toLowerCase().replace(/ /g, '-');

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
