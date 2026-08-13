import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { ChakraProvider, Tabs, Icon } from '@chakra-ui/react';
import { system } from './src/styles/theme/system';
import TbUser from './src/components/icons/tabler/TbUser';

const triggerProps = {
  fontSize: 'sm',
  fontWeight: 'normal',
  height: 'auto',
  color: 'inherit',
  transitionProperty: 'common',
  transitionDuration: '200ms',
  _active: { bg: { base: 'gray.200', _dark: 'whiteAlpha.300' } },
  _selected: {
    color: { base: 'brand.600', _dark: 'brand.300' },
    _horizontal: {
      '--indicator-color': 'currentColor',
      '--indicator-offset-y': '-2px'
    }
  }
} as const;

const html = renderToStaticMarkup(
  <ChakraProvider value={system}>
    <Tabs.Root value="0" fitted>
      <Tabs.List
        borderBottomWidth="2px"
        borderColor={{ base: 'gray.200', _dark: 'whiteAlpha.300' }}
        minH="auto"
      >
        <Tabs.Trigger value="0" {...(triggerProps as any)}>
          <Icon as={TbUser} />
          Overview
        </Tabs.Trigger>
        <Tabs.Trigger value="1" {...(triggerProps as any)}>Experiments</Tabs.Trigger>
      </Tabs.List>
      <Tabs.ContentGroup mt="12">
        <Tabs.Content value="0" p="4">hello</Tabs.Content>
      </Tabs.ContentGroup>
    </Tabs.Root>
  </ChakraProvider>
);
console.log(html);
