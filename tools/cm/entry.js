import { EditorState, Compartment } from '@codemirror/state';
import { EditorView, keymap, lineNumbers, highlightActiveLine, highlightActiveLineGutter, drawSelection, dropCursor, placeholder } from '@codemirror/view';
import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands';
import { syntaxHighlighting, HighlightStyle, indentOnInput, bracketMatching, indentUnit } from '@codemirror/language';
import { closeBrackets, closeBracketsKeymap, autocompletion, completionKeymap } from '@codemirror/autocomplete';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { php } from '@codemirror/lang-php';
import { tags as t } from '@lezer/highlight';

/* colours come from the site's CSS variables (--t-*), so the 3 themes just work */
const hl = HighlightStyle.define([
  { tag: [t.tagName, t.angleBracket], color: 'var(--t-tag)' },
  { tag: [t.attributeName, t.propertyName, t.labelName], color: 'var(--t-attr)' },
  { tag: [t.attributeValue, t.string, t.special(t.string)], color: 'var(--t-str)' },
  { tag: [t.comment, t.blockComment, t.lineComment], color: 'var(--t-com)', fontStyle: 'italic' },
  { tag: [t.keyword, t.controlKeyword, t.moduleKeyword, t.operatorKeyword, t.definitionKeyword], color: 'var(--t-kw)' },
  { tag: [t.number, t.bool, t.null, t.atom, t.unit], color: 'var(--t-num)' },
  { tag: [t.function(t.variableName), t.function(t.propertyName), t.className, t.typeName], color: 'var(--t-fn)' },
  { tag: [t.variableName, t.name], color: 'var(--code-text)' },
  { tag: [t.punctuation, t.separator, t.bracket, t.operator, t.derefOperator], color: 'var(--t-pun)' },
  { tag: [t.regexp, t.escape, t.character], color: 'var(--t-ent)' },
  { tag: t.heading, color: 'var(--t-tag)', fontWeight: '700' },
  { tag: t.invalid, color: 'var(--bad)' }
]);

const theme = EditorView.theme({
  '&': { color: 'var(--code-text)', backgroundColor: 'transparent', fontSize: '.86rem', height: '100%' },
  '&.cm-focused': { outline: 'none' },
  '.cm-scroller': { fontFamily: "'JetBrains Mono','Fira Code',ui-monospace,Menlo,Consolas,monospace", lineHeight: '1.75', overflow: 'auto' },
  '.cm-content': { caretColor: 'var(--ac)', padding: '10px 0' },
  '.cm-line': { padding: '0 12px 0 6px' },
  '.cm-cursor, .cm-dropCursor': { borderLeftColor: 'var(--ac)', borderLeftWidth: '2px' },
  '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, ::selection': { backgroundColor: 'var(--ac-l) !important' },
  '.cm-gutters': { backgroundColor: 'transparent', color: 'var(--muted)', border: 'none', paddingInlineEnd: '2px' },
  '.cm-activeLineGutter': { backgroundColor: 'transparent', color: 'var(--ac)' },
  '.cm-activeLine': { backgroundColor: 'var(--ac-d)' },
  '.cm-matchingBracket, &.cm-focused .cm-matchingBracket': { backgroundColor: 'var(--ac-l)', outline: '1px solid var(--line2)' },
  '.cm-tooltip': { backgroundColor: 'var(--panel2)', border: '1px solid var(--line2)', borderRadius: '10px', color: 'var(--text)' },
  '.cm-tooltip-autocomplete ul li[aria-selected]': { backgroundColor: 'var(--ac)', color: 'var(--ac-ink)' },
  '.cm-placeholder': { color: 'var(--muted)' }
});

const LANGS = {
  html: () => html({ autoCloseTags: false, matchClosingTags: true }),
  css: () => css(),
  js: () => javascript(),
  javascript: () => javascript(),
  jsx: () => javascript({ jsx: true }),
  python: () => python(),
  php: () => php(),
  text: () => []
};

/* create(parent, {doc, lang, onChange, readOnly, complete, lines, placeholder}) */
function create(parent, o) {
  o = o || {};
  const langC = new Compartment(), roC = new Compartment();
  let silent = false;
  const exts = [
    o.lines === false ? [] : [lineNumbers(), highlightActiveLineGutter()],
    history(), drawSelection(), dropCursor(), indentOnInput(), bracketMatching(), closeBrackets(),
    highlightActiveLine(),
    indentUnit.of('  '),
    EditorState.tabSize.of(2),
    syntaxHighlighting(hl, { fallback: true }),
    theme,
    EditorView.lineWrapping,
    o.complete ? autocompletion({ activateOnTyping: true }) : [],
    keymap.of([...closeBracketsKeymap, ...defaultKeymap, ...historyKeymap, ...(o.complete ? completionKeymap : []), indentWithTab]),
    langC.of((LANGS[o.lang] || LANGS.text)()),
    roC.of(EditorState.readOnly.of(!!o.readOnly)),
    EditorView.contentAttributes.of({ spellcheck: 'false', autocapitalize: 'off', autocorrect: 'off', 'aria-label': o.label || 'محرر الكود', dir: 'ltr' }),
    o.placeholder ? placeholder(o.placeholder) : [],
    EditorView.updateListener.of(u => { if (u.docChanged && !silent && o.onChange) o.onChange(u.state.doc.toString()); })
  ];
  const view = new EditorView({ state: EditorState.create({ doc: o.doc || '', extensions: exts }), parent });
  return {
    view,
    get: () => view.state.doc.toString(),
    set(text, quiet) {
      silent = !!quiet;
      view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: text } });
      silent = false;
    },
    setLang(l) { view.dispatch({ effects: langC.reconfigure((LANGS[l] || LANGS.text)()) }); },
    setReadOnly(v) { view.dispatch({ effects: roC.reconfigure(EditorState.readOnly.of(!!v)) }); },
    focus() { view.focus(); },
    destroy() { view.destroy(); }
  };
}

window.XFEditor = { create };
