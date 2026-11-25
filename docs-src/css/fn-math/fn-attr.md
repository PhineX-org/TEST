---
id: fn-attr
kind: function
cat: fn-math
chip: attr()
title: قراءة خاصية HTML
en: CSS attr() function
status: stable
support: all
size: compact
mdn: attr
summary: attr() بتقرا قيمة خاصية HTML (زي data-label أو href) وتحطها في content. الأشهر: content: attr(data-tooltip).
keywords: attr, data attribute, tooltip, content, خاصية html
related: content, before, after, fn-var
---

## intro

الدالة `attr()` بتقرا **قيمة خاصية من عنصر HTML** وتستخدمها في CSS. الاستخدام المعتاد (والأوسع دعماً): جوه [[content]] لعرض نص: `a::after { content: " (" attr(href) ")"; }` بتطبع رابط الصفحة بعد النص (مفيد جداً في الطباعة)، أو **tooltip** بسيط: `[data-tip]::after { content: attr(data-tip); }` من غير JavaScript. بتقرا أي خاصية: `title`، `href`، `data-*`. القراءة بتتم كـ **نص**. وفي المواصفات الحديثة ممكن تحدد النوع: `attr(data-w px)` أو `attr(data-n number)` لاستخدام القيمة في خصائص تانية (دعم متفاوت). استخدم `data-*` لتجنب التعارض.

## try

```html
<style>
  [data-tip] { position:relative; display:inline-block; padding:6px 12px; background:#efe0bd; color:#3d2c18; border-radius:8px; cursor:help; }
  [data-tip]::after { content:attr(data-tip); position:absolute; bottom:120%; inset-inline-start:0; white-space:nowrap; background:#3d2c18; color:#f3ede0; padding:4px 8px; border-radius:6px; font-size:.8rem; opacity:0; transition:opacity .2s; pointer-events:none; }
  [data-tip]:hover::after { opacity:1; }
</style>
<div style="padding-top:34px"><span data-tip="تلميح من attr()">مرّر عليّا</span></div>
```

## syntax

```css nolive
a::after { content: " (" attr(href) ")"; }
[data-tip]::after { content: attr(data-tip); }
```

- أشهر استخدامها داخل `content`.
- بتقرا كنص.
- استخدم data-* للتخصيص.

## use

- tooltips بدون JS.
- طباعة الروابط.
- عدّاد أو ملصق من data-.

## avoid

- وضع معلومات حيوية فقط في attr (الوصولية).

## examples

### 1) tooltip
من data-tip.

```html
<style>
  [data-tip] { position:relative; display:inline-block; padding:6px 12px; background:#efe0bd; color:#3d2c18; border-radius:8px; cursor:help; }
  [data-tip]::after { content:attr(data-tip); position:absolute; bottom:120%; inset-inline-start:0; white-space:nowrap; background:#3d2c18; color:#f3ede0; padding:4px 8px; border-radius:6px; font-size:.8rem; opacity:0; transition:opacity .2s; pointer-events:none; }
  [data-tip]:hover::after { opacity:1; }
</style>
<div style="padding-top:34px"><span data-tip="تلميح">مرّر</span></div>
```



### 2) رابط في الطباعة
href بعد النص.

```html
<style>
  a::after { content:" (" attr(href) ")"; color:#8a7a62; font-size:.85em; direction:ltr; unicode-bidi:isolate; }
  a { color:#b5551f; }
</style>
<a href="https://phinex.example" onclick="return false">رابط</a>
```



### 3) شارة من data
badge.

```html
<style>
  .b::after { content:attr(data-count); background:#c9772f; color:#f3ede0; border-radius:999px; padding:0 8px; margin-inline-start:6px; font-size:.8rem; }
  .b { color:#3d2c18; font-weight:bold; }
</style>
<span class="b" data-count="5">إشعارات</span>
```



## mistakes

### معلومة مهمة في attr

```css bad
.p::after { content:attr(data-price); }  /* القارئات قد لا تقرأها */
```

```css good
<span> في HTML
```

للوصولية.

## quiz

### attr(href) تقرا؟
- [x] قيمة الخاصية
- [ ] رقم
- [ ] لون
- [ ] متغير CSS

خاصية HTML.

### الاستخدام الأشهر؟
- [x] داخل content
- [ ] داخل color
- [ ] داخل width
- [ ] داخل z-index

content.

## refs

- [MDN: attr()](https://developer.mozilla.org/en-US/docs/Web/CSS/attr)
