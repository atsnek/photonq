import * as React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {ChakraProvider, List, Icon} from '@chakra-ui/react';
import {system} from './src/styles/theme/system';
import TbUsers from './src/components/icons/tabler/TbUsers';
import TbUserShare from './src/components/icons/tabler/TbUserShare';
import TbEye from './src/components/icons/tabler/TbEye';
import {FaFlask} from '@react-icons/all-files/fa/FaFlask';

const app = (
  <ChakraProvider value={system}>
    <List.Root fontSize="sm" marginInlineStart="0">
      <List.Item>
        <List.Indicator asChild display="inline" verticalAlign="text-bottom" minHeight="auto">
          <TbUsers />
        </List.Indicator>
        Followers
      </List.Item>
      <List.Item>
        <List.Indicator asChild display="inline" verticalAlign="text-bottom" minHeight="auto">
          <TbUserShare />
        </List.Indicator>
        Following
      </List.Item>
      <List.Item>
        <List.Indicator asChild display="inline" verticalAlign="text-bottom" minHeight="auto">
          <TbEye />
        </List.Indicator>
        Views
      </List.Item>
      <List.Item>
        <List.Indicator asChild display="inline" verticalAlign="text-bottom" minHeight="auto">
          <FaFlask />
        </List.Indicator>
        Experiments
      </List.Item>
    </List.Root>
  </ChakraProvider>
);

const html = renderToStaticMarkup(app);
const dom = html.slice(html.indexOf('<ul'));
console.log(dom.replace(/></g, '>\n<'));
