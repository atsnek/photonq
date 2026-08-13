const React = require('react');
const {createElement: h} = React;
const {renderToStaticMarkup} = require('react-dom/server');
const C = require('@chakra-ui/react');

const {ChakraProvider, defaultSystem, List, Icon} = C;

// Mimic src/components/icons/tabler/TbUsers.tsx
const TbUsers = (props) => h(Icon, Object.assign({
  asChild: false, boxSize: '1em', viewBox: '0 0 24 24', fill: 'none',
  strokeWidth: 2, stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round'
}, props), h('path', {d: 'M9 7', key: 'a'}));

// Mimic @react-icons/all-files FaFlask (plain svg component)
const FaFlask = (props) => h('svg', Object.assign({
  stroke: 'currentColor', fill: 'currentColor', strokeWidth: 0,
  viewBox: '0 0 384 512', height: '1em', width: '1em', xmlns: 'http://www.w3.org/2000/svg'
}, props), h('path', {d: 'M0 0', key: 'a'}));

const app = h(ChakraProvider, {value: defaultSystem},
  h(List.Root, {fontSize: 'sm', marginInlineStart: '0'},
    h(List.Item, null,
      h(List.Indicator, {asChild: true, display: 'inline', verticalAlign: 'text-bottom', minHeight: 'auto'},
        h(TbUsers)),
      'Followers'),
    h(List.Item, null,
      h(List.Indicator, {asChild: true, display: 'inline', verticalAlign: 'text-bottom', minHeight: 'auto'},
        h(FaFlask)),
      'Experiments')
  )
);

const html = renderToStaticMarkup(app);
console.log(html.replace(/></g, '>\n<'));
