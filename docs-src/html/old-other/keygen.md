---
id: keygen
kind: element
cat: old-other
tag: keygen
title: مولّد المفاتيح (keygen)
en: HTML keygen element (obsolete)
status: obsolete
display: inline-block
void: yes
support: none
size: compact
summary: عنصر keygen كان بيولّد زوج مفاتيح تشفير في المتصفح لشهادات العميل. اتشال من كل المتصفحات لأسباب أمنية، والبديل واجهة Web Crypto بالجافاسكربت.
keywords: keygen, مفتاح, تشفير, شهادة, certificate, Web Crypto, crypto.subtle, قديم, obsolete, CSR
related: input, form, button
---

## intro

`<keygen>` كان جزء من الفورمات: لما المستخدم يبعت الفورم، المتصفح **يولّد زوج مفاتيح (عام وخاص)** على جهازه، ويبعت المفتاح العام للسيرفر عشان يصدّر **شهادة عميل (Client Certificate)**. كان ده بيستخدم في تسجيل الدخول بالشهادات.

لكن العنصر كان **مش معياري** (اخترعه Netscape) و**ضعيف أمنياً** (خوارزميات قديمة، ومفيش تحكم)، فكل المتصفحات شالته (كروم 57 وفايرفوكس 69). والبديل الحديث: **Web Crypto API** (`crypto.subtle.generateKey`) في جافاسكربت، وبتحكم كامل في الخوارزمية والتصدير، ولا تحتاج عنصر HTML.

> [!warn] ده عنصر قديم، متستخدموش.

> [!key] `<keygen>` اتشال. ولّد المفاتيح بـ `crypto.subtle.generateKey` في JavaScript.

## instead

استخدم Web Crypto API: ولّد زوج المفاتيح بـ `crypto.subtle.generateKey` وصدّر المفتاح العام وابعته للسيرفر. المفتاح الخاص يفضل على جهاز المستخدم (غير قابل للتصدير).

```html
<button id="g" type="button">ولّد مفتاح</button>
<p id="o"></p>
<script>
  document.getElementById('g').onclick = async () => {
    const o = document.getElementById('o');
    if (!window.crypto || !crypto.subtle) { o.textContent = 'Web Crypto محتاج HTTPS'; return; }
    const kp = await crypto.subtle.generateKey({ name: 'ECDSA', namedCurve: 'P-256' }, false, ['sign', 'verify']);
    const pub = await crypto.subtle.exportKey('jwk', kp.publicKey);
    o.textContent = 'اتولّد مفتاح عام نوعه ' + pub.kty + ' منحنى ' + pub.crv;
  };
</script>
```

## examples

### 1) الكود القديم (مش شغال)
فورم بـ keygen.

```html nolive
<form action="/cert" method="post">
  <keygen name="pubkey" keytype="rsa">
  <button>اطلب شهادة</button>
</form>
```

- المتصفح كان بيعرض قائمة لاختيار قوة المفتاح.
- الحقل `pubkey` كان بيتبعت مع الفورم.
- اتشال كلياً من كل المتصفحات الرئيسية.

### 2) توليد مفتاح بـ Web Crypto
حديث وآمن.

```html
<button id="g" type="button">ولّد مفتاح RSA صغير للتجربة</button>
<p id="o"></p>
<script>
  document.getElementById('g').onclick = async () => {
    const o = document.getElementById('o');
    if (!window.crypto || !crypto.subtle) { o.textContent = 'محتاج سياق آمن (HTTPS)'; return; }
    const k = await crypto.subtle.generateKey({ name: 'AES-GCM', length: 256 }, true, ['encrypt', 'decrypt']);
    const raw = await crypto.subtle.exportKey('raw', k);
    o.textContent = 'مفتاح AES طوله ' + raw.byteLength * 8 + ' بت';
  };
</script>
```

- `crypto.subtle` متاح بس في **السياق الآمن** (HTTPS).
- الدالة غير متزامنة (`async/await`).
- مفيش عنصر HTML: كله جافاسكربت.

## refs

- [MDN: keygen](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/keygen)
