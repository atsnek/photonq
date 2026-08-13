const React = require('react');
const {createElement: h} = React;
const {renderToStaticMarkup} = require('react-dom/server');
const C = require('@chakra-ui/react');
const {ChakraProvider, createSystem, defaultConfig, defineConfig, List, Icon} = C;
const {FaFlask} = require('@react-icons/all-files/fa/FaFlask');

const sys = createSystem(defaultConfig, defineConfig({
  cssVarsPrefix: 'chakra',
  disableLayers: true,
  theme: {slotRecipes: {list: {slots:['root','item','indicator'], base: {root: {display:'block', marginInlineStart:'1em'}}}}}
}));

const TbUsers = (props) => h(Icon, Object.assign({
  asChild: false, boxSize: '1em', viewBox: '0 0 24 24', fill: 'none',
  strokeWidth: 2, stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round'
}, props), h('path', {d: 'M9 7', key: 'a'}));

const IND = {asChild:true, display:'inline', verticalAlign:'text-bottom', minHeight:'auto'};

const app = h(ChakraProvider, {value: sys},
  h(List.Root, {fontSize:'sm', marginInlineStart:'0'},
    h(List.Item, null, h(List.Indicator, IND, h(TbUsers)), 'Followers'),
    h(List.Item, null, h(List.Indicator, IND, h(FaFlask)), 'Experiments')
  )
);
const html = renderToStaticMarkup(app);
const dom = html.slice(html.indexOf('<ul'));
console.log(dom.replace(/></g, '>\n<'));
