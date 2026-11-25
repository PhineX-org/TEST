---
id: kw-important
kind: datatype
cat: datatypes
chip: !important
title: رفع أولوية الإعلان
en: CSS !important keyword
status: stable
support: all
mdn: important
summary: !important بتخلّي إعلان واحد يكسب على أي إعلان تاني بدون important، حتى لو specificity أقل. استخدمها بحذر شديد.
keywords: important, !important, specificity, override, cascade, أولوية
related: specificity, cascade-inheritance, at-layer, css-best-practices
---

## intro

العلامة `!important` بتتحط **بعد قيمة خاصية** وبترفع أولوية **الإعلان ده** فوق باقي الإعلانات العادية: `color: red !important;`. بتكسب **حتى لو الـ selector المنافس أقوى** في الـ [[specificity]]. معنى كده: **أخر حل** لما تتعارض ستايلات، مش حل أول!

**ليه خطيرة؟** لأنها بتكسر الـ cascade الطبيعي: لو حطيت `!important` في مكان، الطريقة الوحيدة تتغلب عليها هي `!important` تانية بـ specificity أعلى، فبيبدأ **سباق تسلح** وكود لا يمكن صيانته.

**استخدامات مقبولة**:
- **utility classes** صريحة (`.hidden { display: none !important; }`) عشان تتأكد إنها تكسب.
- **تعديل CSS مكتبة خارجية** مفيش تحكم فيها (آخر حل).
- **تجاوز inline styles** من مصدر مش بتتحكم فيه.
- وجوه [[at-layer]]: `!important` بتعكس ترتيب الطبقات (الطبقة الأولى بتكسب).

الأفضل **قبل ما تكتب !important**: ارفع الـ specificity بشكل معقول، أو أعد ترتيب الملفات، أو استخدم `@layer`. وفي الأدوات: DevTools بيوضحلك مين كسب ولماذا.

## try

```html
<style>
  .t { color:#3d7a5a; font-weight:bold; }
  p.t { color:#b5551f; }                 /* specificity أعلى */
  .u { color:#3d7a5a !important; }       /* important بتغلب */
  p.u { color:#b5551f; }
  p { margin:4px 0; }
</style>
<p class="t">بدون important: برتقالي (الأقوى كسب)</p><p class="u">مع important: أخضر (important كسبت)</p>
```

## syntax

```css nolive
color: red !important;
.hidden { display: none !important; }
```

- بتتكتب بعد القيمة.
- أخر حل مش أول حل.
- في @layer بتعكس الترتيب.

## use

- utility classes.
- تجاوز CSS مكتبة خارجية.
- تجاوز inline styles خارجية.

## avoid

- استخدامها لحل أي تعارض بسرعة.
- تراكم !important على !important.

## examples

### 1) بدون وبـ important
مين بيكسب؟

```html
<style>
  .t { color:#3d7a5a; font-weight:bold; }
  p.t { color:#b5551f; }
  .u { color:#3d7a5a !important; font-weight:bold; }
  p.u { color:#b5551f; }
  p { margin:4px 0; }
</style>
<p class="t">بدون: برتقالي (specificity أعلى)</p><p class="u">مع important: أخضر</p>
```



### 2) utility
hidden.

```html
<style>
  .hidden { display:none !important; }
  .box { display:block; background:#efe0bd; color:#3d2c18; padding:6px; border-radius:6px; margin:4px 0; }
</style>
<div class="box">ظاهر</div><div class="box hidden">مخفي رغم display:block</div>
```



### 3) تجاوز inline
style مباشر.

```html
<style>
  .o { color:#3d7a5a !important; font-weight:bold; }
</style>
<p class="o" style="color:#b5551f">inline برتقالي لكن important أخضر</p>
```



### 4) البديل
رفع specificity.

```html
<style>
  .card p.t { color:#3d7a5a; font-weight:bold; }
  p.t { color:#b5551f; }
</style>
<div class="card"><p class="t">بدون important: كسب بـ specificity أعلى</p></div>
```



## mistakes

### حرب !important

```css bad
.a { color:red !important; }
.a.b { color:blue !important; }
```

```css good
/* أعد ترتيب CSS أو استخدم @layer */
```

تدمّر الصيانة.

### نسيان إنها تعمل على الإعلان فقط

```css bad
.a { color:red !important; background:blue; }  /* background مش important */
```

```css good
.a { color:red !important; background:blue !important; }
```

كل إعلان لوحده.

## quiz

### !important بتكسب على؟
- [x] أي إعلان بدون important حتى لو specificity أقل
- [ ] نفسها فقط
- [ ] كل شيء بدون استثناء
- [ ] inline فقط

تغلب specificity.

### أفضل حل قبلها؟
- [x] رفع specificity أو @layer
- [ ] إضافة !important تانية
- [ ] حذف الملف
- [ ] تجاهل

cascade طبيعي.

### مقبولة في؟
- [x] utility classes
- [ ] كل مكان
- [ ] ألوان فقط
- [ ] النصوص

.hidden.

## refs

- [MDN: !important](https://developer.mozilla.org/en-US/docs/Web/CSS/important)
