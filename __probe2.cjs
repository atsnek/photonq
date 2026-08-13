const React = require('react');
const {createElement: h} = React;
const {renderToStaticMarkup} = require('react-dom/server');
const C = require('@chakra-ui/react');
const {ChakraProvider, defaultSystem, List, Icon} = C;

const TbUsers = (props) => h(Icon, Object.assign({
  asChild: false, boxSize: '1em', viewBox: '0 0 24 24', fill: 'none',
  strokeWidth: 2, stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round'
}, props), h('path', {d: 'M9 7', key: 'a'}));

const app = h(ChakraProvider, {value: defaultSystem},
  h(List.Root, null,
    // A: plain indicator span with the same props (no asChild)
    h(List.Item, null, h(List.Indicator, {display:'inline', verticalAlign:'text-bottom', minHeight:'auto'}, 'x')),
    // B: asChild + Icon as=
    h(List.Item, null, h(List.Indicator, {asChild:true, display:'inline', verticalAlign:'text-bottom', minHeight:'auto'}, h(Icon, {as: TbUsers}))),
    // C: props moved onto the icon itself
    h(List.Item, null, h(List.Indicator, {asChild:true}, h(TbUsers, {display:'inline', verticalAlign:'text-bottom', minHeight:'auto'}))),
    // D: css prop on indicator instead of style props
    h(List.Item, null, h(List.Indicator, {asChild:true, css:{display:'inline', verticalAlign:'text-bottom', minHeight:'auto'}}, h(TbUsers)))
  )
);
const html = renderToStaticMarkup(app);
const dom = html.slice(html.indexOf('<ul'));
console.log('=== DOM ===');
console.log(dom.replace(/></g, '>\n<'));
console.log('=== RULES ===');
const classes = [...new Set((dom.match(/css-[a-z0-9]+/g)||[]))];
for (const c of classes) {
  console.log('--- .' + c);
  const re = new RegExp('\\.' + c + '\\{[^}]*\\}', 'g');
  (html.match(re)||[]).forEach(r => console.log('   ' + r));
}
