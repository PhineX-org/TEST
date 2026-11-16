---
id: nobr
kind: element
cat: old-text
tag: nobr
title: منع كسر السطر (nobr)
en: HTML nobr element (deprecated)
status: deprecated
display: inline
void: no
support: all
size: compact
summary: عنصر nobr كان بيمنع النص جواه من النزول لسطر جديد حتى لو الصفحة ضيقة. اتحذف والبديل CSS: white-space nowrap.
keywords: nobr, no break, منع كسر السطر, nowrap, white-space, قديم, deprecated, wbr, br
related: wbr, br, span, style
---

## intro

المتصفح بيكسر النص لسطر جديد لما العرض يخلص. أحياناً ده مش مرغوب: رقم تليفون «010 1234 5678» متتقسمش، أو اسم منتج «iPhone 15 Pro» يفضل في سطر واحد. العنصر `<nobr>` (**No Break**) كان بيمنع الكسر جواه.

لكنه **غير معياري** (اتولد في Netscape) واتحذف من HTML5. البديل الحديث: خاصية CSS **`white-space: nowrap`** على أي عنصر. ولو عايز تمنع الكسر بس عند مسافة معينة بين كلمتين: استخدم المسافة غير القابلة للكسر `&nbsp;`. ولو عايز العكس (تسمح بالكسر في مكان معين): [[wbr]].

> [!warn] ده عنصر قديم، اتجنّبه في الكود الجديد واستخدم البديل الحديث.

> [!key] `<nobr>` = `white-space: nowrap`.

## try

```html
<div style="width:140px; border:1px solid #94a3b8; padding:6px">
  رقمي: <nobr>010 1234 5678</nobr> اتصل بيا
</div>
```

## syntax

```html nolive
<nobr>نص ما يتكسرش</nobr>
```

- `<nobr>` — **الوسم الافتتاحي** (قديم).
- النص — **اللي ميتكسرش**.
- `</nobr>` — **الوسم الختامي**.

## use

- موجود في كود قديم.
- لفهم الفرق مع `white-space`.

## avoid

- متستخدمهوش: غير معياري.

## instead

استخدم CSS: `white-space: nowrap`، أو المسافة غير القابلة للكسر `&nbsp;` بين الكلمات.

```html
<div style="width:140px; border:1px solid #94a3b8; padding:6px">
  رقمي: <span style="white-space:nowrap">010 1234 5678</span> اتصل بيا
</div>
```

## examples

### 1) nowrap بالـ CSS
البديل.

```html
<style>.nb { white-space: nowrap; }</style>
<div style="width:150px; border:1px solid #94a3b8; padding:6px">
  المنتج: <span class="nb">iPhone 15 Pro Max</span> متاح.
</div>
```

- `white-space: nowrap` بيمنع النزول لسطر جديد.
- لو النص أطول من العنصر هيطلع برّه (overflow).
- ممكن تضيف `overflow-x: auto` لو عايز تمرير.

### 2) المسافة غير القابلة للكسر
nbsp.

```html
<div style="width:130px; border:1px solid #94a3b8; padding:6px">
  السعر: 500&nbsp;جنيه&nbsp;مصري فقط.
</div>
```

- `&nbsp;` مسافة بتمنع الكسر عندها.
- مفيدة للأرقام مع وحداتها («500 جنيه»).
- أنسب لأماكن صغيرة محددة، و`nowrap` للمقاطع الكاملة.

## mistakes

### استخدام nobr
```html bad
<nobr>نص طويل جداً</nobr>
```
```html good
<span style="white-space:nowrap">نص طويل جداً</span>
```
ليه؟ العنصر غير معياري، وCSS بيعمل نفس الشغل.

## quiz

### إيه البديل الحديث لـ `<nobr>`؟
- [x] `white-space: nowrap`
- [ ] `word-break`
- [ ] `<br>`
- [ ] `display:none`
خاصية CSS.

### إيه العنصر العكسي اللي بيسمح بالكسر؟
- [x] `<wbr>`
- [ ] `<nobr>`
- [ ] `<hr>`
- [ ] `<br>`
`<wbr>` بيقترح مكان كسر.

## refs

- [MDN: nobr](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/nobr)
