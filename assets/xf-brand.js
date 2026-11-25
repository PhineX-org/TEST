/* X Code — brand marks.
   XFB.mark()        → the dragon logo (the dragon glyph is Font Awesome Free 6 "dragon", CC BY 4.0 — https://fontawesome.com/license/free)
   XFB.logo('html')  → modern badge for a language / tool (html css js tailwind php python react git docs code …)
   The badges are ORIGINAL glyph designs (not the official trademarks): to use an official SVG instead,
   replace the entry in GLYPH below — every page on the site renders its logos from this one file. */
(function () {
  'use strict';
  var NAME = 'X Code', TAG = 'اتعلّم · ابني · احترف';
  var S = function (p, w) { return '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="' + (w || 2.7) + '" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + p + '</svg>'; };
  var GLYPH = {
    html: S('<path d="M11 9.5 4.8 16l6.2 6.5M21 9.5l6.2 6.5-6.2 6.5M18.4 7.5l-4.8 17"/>'),
    css: S('<path d="M12.5 6.5c-3.2 0-3.5 2-3.5 4.3v1.6c0 1.8-.8 3.6-2.8 3.6 2 0 2.8 1.8 2.8 3.6v1.6c0 2.3.3 4.3 3.5 4.3M19.5 6.5c3.2 0 3.5 2 3.5 4.3v1.6c0 1.8.8 3.6 2.8 3.6-2 0-2.8 1.8-2.8 3.6v1.6c0 2.3-.3 4.3-3.5 4.3"/><circle cx="16" cy="16" r="1.5" fill="currentColor" stroke="none"/>'),
    js: S('<path d="M12.2 8.5v10.4c0 3-3.6 3.6-5.2 1.2M25.6 11.4c-.9-2.6-6-2.9-6 .4 0 3.7 6.5 3 6.5 7 0 3.5-5.5 4-7.5 1.4" />', 2.8),
    tailwind: S('<path d="M5.5 12H19a3 3 0 1 0-3-3M5.5 17.5H25a3 3 0 1 1-3 3M5.5 23H14"/>'),
    php: S('<path d="M10.5 9.5 4.5 16l6 6.5M17.6 12.2c0-4 6.6-4 6.6-.2 0 2.9-3.3 2.6-3.3 5.8"/><circle cx="20.9" cy="22.4" r="1.25" fill="currentColor" stroke="none"/>'),
    python: S('<path d="M8 9.5 15 16l-7 6.5M17.5 23.5H26"/><circle cx="25" cy="8" r="2.3" fill="currentColor" stroke="none"/>'),
    react: S('<circle cx="16" cy="9" r="2.7"/><circle cx="8.6" cy="22" r="2.7"/><circle cx="23.4" cy="22" r="2.7"/><path d="M14.7 11.3 10 19.7M17.3 11.3 22 19.7M11.4 22h9.2"/>', 2.3),
    git: S('<circle cx="9.5" cy="8.5" r="2.6"/><circle cx="9.5" cy="23.5" r="2.6"/><circle cx="22.5" cy="13.5" r="2.6"/><path d="M9.5 11.1v9.8M22.5 16.1c0 4.4-13 1.8-13 4.8"/>', 2.3),
    docs: S('<path d="M6 6.5A2.5 2.5 0 0 1 8.5 4H25v19H8.5A2.5 2.5 0 0 0 6 25.5Z"/><path d="M6 25.5A2.5 2.5 0 0 0 8.5 28H25v-5M12 10h8M12 14.5h5"/>', 2.3),
    code: S('<path d="M11 9.5 4.8 16l6.2 6.5M21 9.5l6.2 6.5-6.2 6.5"/>'),
    rocket: S('<path d="M16 4c4.5 2.6 6.6 7 6 12.5l-3 3h-6l-3-3C9.4 11 11.5 6.6 16 4Z"/><circle cx="16" cy="12.5" r="1.9"/><path d="M10 20 6.5 24l4.5-.5M22 20l3.5 4-4.5-.5M14 24.5l2 3.5 2-3.5"/>', 2.2),
    project: S('<path d="M5 9.5 16 4l11 5.5v13L16 28 5 22.5Z"/><path d="M5 9.5 16 15l11-5.5M16 15v13"/>', 2.3)
  };
  var ALIAS = { 'tw': 'tailwind', 'py': 'python', 'js': 'js', 'javascript': 'js', 'jsx': 'react', 'ts': 'js' };
  function logo(name, cls) {
    name = ALIAS[name] || name;
    var g = GLYPH[name] || GLYPH.code;
    return '<span class="lgo lgo-' + (GLYPH[name] ? name : 'code') + (cls ? ' ' + cls : '') + '" aria-hidden="true">' + g + '</span>';
  }
  /* the dragon mark (flipped so it faces the page content in RTL) */
  var DRAGON = 'M352 124.5l-51.9-13c-6.5-1.6-11.3-7.1-12-13.8s2.8-13.1 8.7-16.1l40.8-20.4L294.4 28.8c-5.5-4.1-7.8-11.3-5.6-17.9S297.1 0 304 0L416 0l32 0 16 0c30.2 0 58.7 14.2 76.8 38.4l57.6 76.8c6.2 8.3 9.6 18.4 9.6 28.8c0 26.5-21.5 48-48 48l-21.5 0c-17 0-33.3-6.7-45.3-18.7L480 160l-32 0 0 21.5c0 24.8 12.8 47.9 33.8 61.1l106.6 66.6c32.1 20.1 51.6 55.2 51.6 93.1C640 462.9 590.9 512 530.2 512L496 512l-64 0L32.3 512c-3.3 0-6.6-.4-9.6-1.4C13.5 507.8 6 501 2.4 492.1C1 488.7 .2 485.2 0 481.4c-.2-3.7 .3-7.3 1.3-10.7c2.8-9.2 9.6-16.7 18.6-20.4c3-1.2 6.2-2 9.5-2.2L433.3 412c8.3-.7 14.7-7.7 14.7-16.1c0-4.3-1.7-8.4-4.7-11.4l-44.4-44.4c-30-30-46.9-70.7-46.9-113.1l0-45.5 0-57zM512 72.3c0-.1 0-.2 0-.3s0-.2 0-.3l0 .6zm-1.3 7.4L464.3 68.1c-.2 1.3-.3 2.6-.3 3.9c0 13.3 10.7 24 24 24c10.6 0 19.5-6.8 22.7-16.3zM130.9 116.5c16.3-14.5 40.4-16.2 58.5-4.1l130.6 87 0 27.5c0 32.8 8.4 64.8 24 93l-232 0c-6.7 0-12.7-4.2-15-10.4s-.5-13.3 4.6-17.7L171 232.3 18.4 255.8c-7 1.1-13.9-2.6-16.9-9s-1.5-14.1 3.8-18.8L130.9 116.5z';
  function mark(cls) {
    return '<span class="xmark' + (cls ? ' ' + cls : '') + '" aria-hidden="true"><svg viewBox="0 0 640 512" fill="currentColor" aria-hidden="true" focusable="false"><path transform="translate(640 0) scale(-1 1)" d="' + DRAGON + '"/></svg></span>';
  }
  window.XFB = { name: NAME, tag: TAG, logo: logo, mark: mark, names: Object.keys(GLYPH) };
})();
