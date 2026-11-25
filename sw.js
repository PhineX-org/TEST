/* X Code — offline service worker
 *
 * This worker is NOT registered automatically. assets/offline.js registers it only after
 * the visitor presses the "download for offline" button, and unregisters it when they
 * remove the offline copy. Until then the site behaves like any normal website.
 *
 * Strategy: network first (so you always see the newest version when you are online),
 * and when the network is missing or too slow, answer from the copy the visitor downloaded.
 * The worker never adds anything to the cache by itself — the page fills it explicitly.
 */
'use strict';

var PREFIX = 'xcode-offline-';
var SLOW_MS = 3500;                       // "lie-fi": online but the server does not answer in time

self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  // the version file must always come from the network (the page handles "offline" itself)
  if (/\/offline-manifest\.json$/.test(url.pathname)) return;
  e.respondWith(answer(req, url));
});

function candidates(url) {
  var list = [url.origin + url.pathname];
  if (/\/$/.test(url.pathname)) list.push(url.origin + url.pathname + 'index.html');
  else if (!/\.[a-z0-9]+$/i.test(url.pathname)) list.push(url.origin + url.pathname + '/index.html');
  return list;
}

function fromCache(url) {
  return caches.keys().then(function (names) {
    names = names.filter(function (n) { return n.indexOf(PREFIX) === 0; }).sort().reverse();
    var list = candidates(url);
    var chain = Promise.resolve(null);
    names.forEach(function (name) {
      list.forEach(function (u) {
        chain = chain.then(function (hit) {
          if (hit) return hit;
          return caches.open(name).then(function (c) { return c.match(u); });
        });
      });
    });
    return chain;
  });
}

// <audio>/<video> ask for byte ranges; a cached 200 must be sliced into a proper 206 for them to play
function ranged(req, hit) {
  var m = /^bytes=(\d*)-(\d*)$/.exec(req.headers.get('range') || '');
  if (!m || !hit || hit.status !== 200) return hit;
  return hit.arrayBuffer().then(function (buf) {
    var size = buf.byteLength;
    var start = m[1] === '' ? Math.max(0, size - parseInt(m[2], 10)) : parseInt(m[1], 10);
    var end = m[1] === '' || m[2] === '' ? size - 1 : Math.min(parseInt(m[2], 10), size - 1);
    if (isNaN(start) || start >= size) return new Response(null, { status: 416, headers: { 'Content-Range': 'bytes */' + size } });
    return new Response(buf.slice(start, end + 1), {
      status: 206,
      headers: {
        'Content-Type': hit.headers.get('Content-Type') || 'application/octet-stream',
        'Content-Range': 'bytes ' + start + '-' + end + '/' + size,
        'Content-Length': String(end - start + 1)
      }
    });
  });
}

function answer(req, url) {
  var net = fetch(req);
  var timed = new Promise(function (resolve) {
    setTimeout(function () { resolve('slow'); }, SLOW_MS);
  });
  return Promise.race([net, timed]).then(function (r) {
    if (r !== 'slow') return r;
    // slow network: use the offline copy if we have the file, otherwise keep waiting for the network
    return fromCache(url).then(function (hit) { return hit ? ranged(req, hit) : net; });
  }).catch(function () {
    return fromCache(url).then(function (hit) {
      if (hit) return ranged(req, hit);
      if (req.mode === 'navigate') {
        return fromCache(new URL(self.registration.scope + 'index.html')).then(function (home) {
          return home || offlinePage();
        });
      }
      return Response.error();
    });
  });
}

function offlinePage() {
  return new Response(
    '<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<title>أوفلاين</title><body style="font-family:system-ui,Tahoma,sans-serif;background:#1d1916;color:#f3e9da;' +
    'display:grid;place-items:center;min-height:100vh;margin:0;text-align:center;padding:24px" dir="rtl">' +
    '<div><h1 style="margin:0 0 8px">مفيش اتصال بالإنترنت</h1><p style="opacity:.8;margin:0">الصفحة دي لسه متحمّلتش للنسخة الأوفلاين. ارجع للصفحة الرئيسية أو اتصل بالنت وجرّب تاني.</p></div>',
    { status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
  );
}
