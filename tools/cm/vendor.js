/* wraps vendored browser builds as JS strings so they can be inlined into the sandboxed preview iframes (works from file://) */
const fs = require('fs'), path = require('path');
const out = path.resolve(__dirname, '../../learn/vendor');
function wrap(name, src) { fs.writeFileSync(path.join(out, name + '.str.js'), 'XF.vendor=XF.vendor||{};XF.vendor[' + JSON.stringify(name) + ']=' + JSON.stringify(src) + ';\n'); console.log('vendor', name, (src.length / 1024 | 0) + 'kb'); }
wrap('tailwind', fs.readFileSync(path.join(__dirname, 'node_modules/@tailwindcss/browser/dist/index.global.js'), 'utf8'));
