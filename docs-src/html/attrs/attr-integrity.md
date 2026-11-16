---
id: attr-integrity
kind: attribute
cat: attrs
chip: integrity
title: خاصية سلامة الملف
en: HTML integrity attribute (SRI)
status: stable
support: all
size: compact
mdn: Attributes/integrity
summary: خاصية integrity (SRI) بتحط بصمة هاش للملف الخارجي (script أو link)، والمتصفح بيرفض تشغيله لو اتغيّر. بتحميك لو CDN اتخترق، وبتتطلب crossorigin.
keywords: integrity, SRI, Subresource Integrity, sha384, hash, CDN, script, link, crossorigin, أمان, بصمة
related: script, link, attr-crossorigin, attr-src, attr-rel
---

## intro

لما بتحمّل مكتبة (زي jQuery أو Bootstrap) من **CDN**، إنت بتثق إن الملف مش هيتغيّر. لو الـ CDN اتخترق وحد حط كود خبيث في الملف، موقعك كله هيشغّله! `integrity` (اختصار **SRI** = Subresource Integrity) بتحل ده: بتحط **بصمة (hash)** للملف الأصلي (`sha384-...`)، والمتصفح **بيحسب بصمة الملف اللي نزل** ويقارنها. لو متطابقتش **بيرفض تشغيله**. بتتكتب على [[script]] و[[link]] ولازم معاها [[attr-crossorigin]] `anonymous`. وبتتولّد البصمة بأدوات زي `openssl` أو موقع srihash.org. وبتتغيّر لو غيّرت الإصدار.

## try

```html
<pre dir="ltr" style="background:#0f172a;color:#e2e8f0;padding:10px;border-radius:8px;white-space:pre-wrap">&lt;script src="https://cdn.example.com/lib@1.0.0.js"
  integrity="sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/uxy9rx7HNQlGYl1kPzQho1wx4JwY8wC"
  crossorigin="anonymous"&gt;&lt;/script&gt;</pre>
```

## syntax

```html nolive
<script src="https://cdn.example.com/lib.js"
  integrity="sha384-HASH"
  crossorigin="anonymous"></script>
```

- `integrity="sha384-…"` — بصمة الملف.
- `crossorigin="anonymous"` — **مطلوبة** معاها.
- لو الملف اتغيّر المتصفح يرفضه.

## use

- تحميل مكتبات من CDN بأمان.
- حماية من اختراق مورد خارجي.

## avoid

- متحطش integrity على ملف بيتحدّث تلقائياً (latest).

## examples

### 1) سكربت
مثال على script.

```html nolive
<script src="https://cdn.jsdelivr.net/npm/lib@1.0.0/dist/lib.min.js" integrity="sha384-HASH…" crossorigin="anonymous"></script>
```

- ثبّت رقم الإصدار.
- ولّد البصمة له.
- لو الملف اتغيّر المتصفح بيرفض.

### 2) ستايل
مثال على link.

```html nolive
<link rel="stylesheet" href="https://cdn.example.com/lib.css" integrity="sha384-HASH…" crossorigin="anonymous">
```

- نفس الفكرة لملفات CSS.
- مع `rel="stylesheet"`.
- crossorigin ضروري.

### 3) توليد البصمة
أمر shell.

```html nolive
# في الطرفية:
curl -s https://cdn.example.com/lib.js | openssl dgst -sha384 -binary | openssl base64 -A
```

- بنحوّل الناتج لـ base64.
- بنكتبه بعد `sha384-`.
- أو استخدم srihash.org.

## mistakes

### integrity من غير crossorigin
```html bad
<script src="https://cdn.com/a.js" integrity="sha384-…"></script>
```
```html good
<script src="https://cdn.com/a.js" integrity="sha384-…" crossorigin="anonymous"></script>
```
ليه؟ الفحص مبيشتغلش بدون CORS.

## a11y

- مالهاش علاقة مباشرة بالإتاحة.
- تأكد إن الصفحة بتشتغل لو رفض المتصفح الملف (بديل).

## quiz

### SRI يعني؟
- [x] Subresource Integrity
- [ ] Secure Resource Index
- [ ] Static Resource ID
- [ ] Safe Request Info
سلامة الموارد الفرعية.

### لازم معاها؟
- [x] `crossorigin="anonymous"`
- [ ] `defer`
- [ ] `async`
- [ ] `type`
CORS.

## refs

- [MDN: integrity](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/integrity)
- [MDN: SRI](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity)
