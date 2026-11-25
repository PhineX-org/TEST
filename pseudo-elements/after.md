---
id: after
kind: pseudoelement
cat: pseudo-elements
chip: ::after
title: عنصر وهمي بعد المحتوى
en: CSS ::after pseudo-element
status: stable
support: all
mdn: ::after
summary: العنصر الوهمي after بيضيف محتوى (content) بعد محتوى العنصر بدون تعديل HTML. للأسهم والعلامات والتأثيرات والـ clearfix.
keywords: ::after, after, content, عنصر وهمي, pseudo-element, سهم, clearfix
related: before, content, position, marker, pseudo-guide
---

## intro

`::after` توأم [[before]] لكن بتضيف **عنصر وهمي كآخر ابن** للعنصر (بعد محتواه). نفس القواعد: لازم [[content]]، بيتصرف `inline` افتراضياً، مش في الـ DOM.

استخدامات أكتر في `::after`:
- **علامات بعد الرابط**: سهم `↗` للروابط الخارجية، أو أيقونة.
- **علامات الجودة**: نجمة بعد حقل إجباري، «(اختياري)» بعد تسمية.
- **تأثيرات التحويم**: خط أو ظل متحرك.
- **Clearfix** القديم: `::after { content:""; display:table; clear:both; }`.
- **أشكال**: أسهم القوايم (بحدود شفافة)، فقاعات الكلام (مثلث صغير).

تعديل ممتاز: **قراءة attribute** بـ `content: attr(data-label)` فتحط نصوص من HTML داخل الـ pseudo-element، وكمان `counter()` للعدّادات.

ومعنى الاتجاه: في صفحة RTL، **`::after` بيظهر على اليسار** (نهاية السطر)، و`::before` يمين. فاستخدم الخصائص المنطقية للـ margins.

> [!tip] لو الـ ::after مش ظاهر، اتأكد من `content` أولاً، بعدين `display` وأبعاده.

## try

```html
<style>
  a.ext::after { content:' ↗'; color:#c9772f; font-weight:bold; }
  a { color:#7a4a1d; font-size:1.2rem; font-weight:bold; }
</style>
<a class="ext" href="#" onclick="return false">رابط خارجي</a>
```

## syntax

```css nolive
a.ext::after { content: ' ↗'; }
.req::after { content: ' *'; color: red; }
[data-tip]::after { content: attr(data-tip); }
```

- آخر ابن وهمي.
- attr() و counter().
- في RTL بيظهر على اليسار.

## use

- أسهم وعلامات بعد النص.
- نجمة للحقل الإجباري.
- فقاعات كلام وأسهم.

## avoid

- نسيان content.
- معلومة أساسية جواه.

## examples

### 1) سهم بعد الرابط
↗ للخارجي.

```html
<style>
  a { color:#7a4a1d; font-weight:bold; }
  a.ext::after { content:' ↗'; color:#c9772f; }
  p { margin:3px 0; color:#3d2c18; }
</style>
<p><a href="#" onclick="return false">داخلي</a></p><p><a class="ext" href="#" onclick="return false">خارجي</a></p>
```



### 2) attr()
نص من attribute.

```html
<style>
  [data-tip] { position:relative; display:inline-block; padding:6px 12px; background:#efe0bd; color:#3d2c18; border-radius:6px; }
  [data-tip]::after { content:attr(data-tip); position:absolute; bottom:120%; right:0; background:#3d2c18; color:#f3ede0; padding:4px 8px; border-radius:4px; font-size:.8rem; white-space:nowrap; opacity:0; transition:.2s; }
  [data-tip]:hover::after { opacity:1; }
</style>
<div style="padding-top:24px"><span data-tip="تلميح جاي من HTML">مرّر هنا</span></div>
```



### 3) فقاعة كلام
مثلث بـ after.

```html
<style>
  .b { position:relative; display:inline-block; padding:10px 16px; background:#bcd4a8; color:#3d2c18; border-radius:10px; }
  .b::after { content:''; position:absolute; bottom:-8px; right:16px; border:8px solid transparent; border-top-color:#bcd4a8; border-bottom:0; }
</style>
<div class="b" style="margin-bottom:12px">رسالة</div>
```



### 4) clearfix
احتواء float.

```html
<style>
  .w { background:#efe0bd; padding:6px; }
  .w::after { content:''; display:table; clear:both; }
  .f { float:right; width:60px; height:40px; background:#c9772f; }
</style>
<div class="w"><div class="f"></div></div>
```



## mistakes

### نسيان content

```css bad
.a::after { color:red; }
```

```css good
.a::after { content:""; color:red; }
```

لازم content.

### بعد عنصر مستبدل

```css bad
img::after { content:"x"; }
```

```css good
.wrap::after { content:"x"; }
```

img مبتتحمّلش.

## quiz

### ::after بتضيف؟
- [x] عنصر وهمي آخر ابن
- [ ] أول ابن
- [ ] أب جديد
- [ ] أخ

آخر ابن.

### محتوى من attribute؟
- [x] attr()
- [ ] counter()
- [ ] url()
- [ ] var()

attr.

### ضرورية لظهورها؟
- [x] content
- [ ] display:flex
- [ ] float
- [ ] z-index

content.

## refs

- [MDN: ::after](https://developer.mozilla.org/en-US/docs/Web/CSS/::after)
