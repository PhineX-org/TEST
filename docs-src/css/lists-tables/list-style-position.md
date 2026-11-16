---
id: list-style-position
kind: property
cat: lists-tables
chip: list-style-position
title: موضع علامة القائمة
en: CSS list-style-position property
status: stable
support: all
size: compact
mdn: list-style-position
summary: list-style-position بتحدد العلامة تبقى بره صندوق العنصر (outside) أو جواه (inside) مع النص.
keywords: list-style-position, inside, outside, marker
related: list-style, list-style-type, marker
---

## intro

الخاصية `list-style-position` بتحدد **مكان العلامة بالنسبة لصندوق عنصر القائمة**: **`outside`** (الافتراضي) العلامة بره الصندوق على جنب والنص كله متراصّ في عمود نضيف. و**`inside`** العلامة جوه الصندوق كأنها أول حرف في النص، فالسطر التاني بيلتف **تحت** العلامة. الفرق بيبان لما العنصر طويل وبيلف على أكتر من سطر، أو لما تحط خلفية أو حد على `li`: مع `outside` العلامة بتطلع بره الخلفية، ومع `inside` بتفضل جواها. اختار `inside` للقوائم جوه بطاقات بخلفية، و`outside` للقراءة الأنضف.

## try

```html
<style>
  ul { width:150px; padding:6px; margin:3px; display:inline-block; vertical-align:top; background:#efe0bd; color:#3d2c18; border-radius:8px; }
  li { background:#e4c490; padding:4px 6px; }
</style>
<ul style="list-style:disc inside"><li>inside: نص طويل بيلف تحت النقطة</li></ul><ul style="list-style:disc outside; padding-inline-start:24px"><li>outside: النقطة بره الخلفية</li></ul>
```

## syntax

```css nolive
list-style-position: outside;
list-style-position: inside;
```

- **القيمة المبدئية**: `outside`.

## values

### outside
العلامة بره الصندوق.

### inside
العلامة جوه الصندوق.

## use

- `inside` مع خلفيات على li.
- `outside` للنصوص الطويلة.

## avoid

- `inside` مع فقرات طويلة (التفاف مزعج).

## examples

### 1) outside
الافتراضي.

```html
<style>
  ul { width:160px; background:#efe0bd; color:#3d2c18; border-radius:8px; padding:8px 26px 8px 8px; list-style-position:outside; }
</style>
<ul><li>عنصر طويل بيلف على أكتر من سطر</li></ul>
```



### 2) inside
جوه الصندوق.

```html
<style>
  ul { width:160px; background:#efe0bd; color:#3d2c18; border-radius:8px; padding:8px; list-style-position:inside; }
</style>
<ul><li>عنصر طويل بيلف على أكتر من سطر</li></ul>
```



### 3) مع خلفية على li
الفرق الواضح.

```html
<style>
  ul { list-style:none; padding:0; margin:0; width:170px; }
  li { background:#e4c490; color:#3d2c18; margin:3px 0; padding:4px 8px; border-radius:6px; list-style:square inside; }
</style>
<ul><li>بطاقة 1</li><li>بطاقة 2</li></ul>
```



## mistakes

### نقطة بره الخلفية

```css bad
li { background:#e4c490; }  /* النقطة بتطلع بره */
```

```css good
li { list-style-position:inside; }
```

لو عايزها جوه الخلفية.

## quiz

### القيمة الافتراضية؟
- [x] outside
- [ ] inside
- [ ] none
- [ ] center

outside.

### inside بتخلّي النقطة؟
- [x] جوه صندوق العنصر
- [ ] بره
- [ ] مخفية
- [ ] أكبر

جوه.

## refs

- [MDN: list-style-position](https://developer.mozilla.org/en-US/docs/Web/CSS/list-style-position)
