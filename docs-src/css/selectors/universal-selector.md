---
id: universal-selector
kind: selector
cat: selectors
chip: *
title: المحدد الشامل (*)
en: Universal selector
status: stable
support: all
mdn: Universal_selectors
summary: النجمة (*) بتختار كل العناصر في الصفحة. بتستخدم أساساً في الـ reset وتفعيل box-sizing، وللتصحيح (debugging) بالحدود.
keywords: universal selector, *, الشامل, reset, box-sizing, كل العناصر, debug, النجمة
related: type-selector, box-sizing, selectors-guide, debugging-css
---

## intro

**المحدد الشامل (Universal Selector)** هو النجمة `*`. بيختار **كل** عنصر في الصفحة (أو جوه عنصر معيّن لو كتبته مع محدد: `.box *` = كل اللي جوه `.box`).

استخداماته الشهيرة:
1. **الـ reset الأساسي**: `*, *::before, *::after { box-sizing: border-box; }` علشان الـ padding والـ border ميزودوش على العرض ([[box-sizing]]).
2. **تصفير الهوامش**: `* { margin: 0 }`.
3. **التصحيح**: `* { outline: 1px solid red }` علشان تشوف حدود كل العناصر وتفهم التخطيط ([[debugging-css]]).

الـ specificity بتاعته **صفر (0,0,0)**، يعني أضعف من أي محدد تاني، فمش هيغلب حاجة خاصة. وده كويس لإنه مبيعملش تعارض.

نقطة مهمة: لو استخدمته مع ملايين العناصر في موقع كبير ممكن يكون فيه **تكلفة بسيطة** في الأداء لو كتبت قواعد تقيلة، لكن في الـ reset البسيط تأثيره مهمل.

> [!analogy] النجمة زي «الكل!»: ميكروفون بتكلّم بيه كل الناس في الصالة.

> [!tip] أشهر سطر في CSS الحديث: `*, *::before, *::after { box-sizing: border-box }`.

## try

```html
<style>
  .demo * { outline:1px dashed #c9772f; padding:4px; margin:3px; color:#3d2c18; }
</style>
<div class="demo">div<p>فقرة<span>span</span></p></div>
```

## syntax

```css nolive
* { box-sizing: border-box; }
.box * { margin: 0; }
* { outline: 1px solid red; }  /* للتصحيح */
```

- النجمة تختار كل العناصر.
- `A *` = كل نسل A.
- الـ specificity = صفر.

## use

- reset لـ `box-sizing`.
- تصحيح التخطيط بإظهار حدود كل العناصر.
- تصفير الهوامش جوه مكوّن.

## avoid

- قواعد تقيلة على الكل (ظلال، فلاتر).
- فرض `color` أو `font` على الكل (بيكسر الوراثة).

## examples

### 1) تصحيح بـ outline
حدود كل العناصر بتظهر فوراً.

```html
<style>
  * { outline:1px solid #c9772f; }
  .a { padding:10px; margin:6px; color:#3d2c18; }
</style>
<div class="a">أب<div style="padding:6px">ابن</div></div>
```

- مفيد جداً لفهم التخطيط.

### 2) box-sizing للكل
مع border-box العرض النهائي = 200px بالظبط.

```html
<style>
  *, *::before, *::after { box-sizing:border-box; }
  .b { width:200px; padding:20px; border:5px solid #7a4a1d; background:#efe0bd; color:#3d2c18; }
</style>
<div class="b">200px</div>
```



### 3) جوه مكوّن بس
`.card *` بيصفّر الهوامش لكل اللي جوه الكارت.

```html
<style>
  .card * { margin:0; }
  .card { background:#efe0bd; color:#3d2c18; padding:10px; }
  .card h4 { color:#7a4a1d; }
</style>
<div class="card"><h4>عنوان</h4><p>فقرة من غير هامش</p></div>
```



### 4) الشامل مش بيغلب حاجة
specificity صفر: أي محدد تاني بيكسب عليه.

```html
<style>
  * { color:#a63b2f; }
  p { color:#3d7a5a; }
</style>
<div>أحمر (من النجمة)</div><p>أخضر (النوع أقوى)</p>
```

- الشامل ضعيف جداً.

## mistakes

### فرض خط على الكل

```css bad
* { font-family:Arial; }
```

```css good
body { font-family:Arial; }
```

الوراثة بتنقل الخط تلقائي. النجمة بتكسر `code` وغيره.

### نسيان pseudo-elements

```css bad
* { box-sizing:border-box; }
```

```css good
*, *::before, *::after { box-sizing:border-box; }
```

النجمة لوحدها مبتشملش `::before` و`::after`.

## quiz

### الـ specificity للنجمة؟
- [ ] (0,0,1)
- [ ] (0,1,0)
- [x] (0,0,0)
- [ ] (1,0,0)

صفر.

### `.box *` بيختار؟
- [ ] .box نفسه
- [x] كل نسل .box
- [ ] أخ .box
- [ ] كل الصفحة

أحفاد وأبناء .box.

### أشهر استخدام للنجمة؟
- [ ] تلوين الصفحة
- [x] reset لـ box-sizing
- [ ] تغيير الخط
- [ ] إخفاء العناصر

`*, *::before, *::after { box-sizing: border-box }`.

## refs

- [MDN: *](https://developer.mozilla.org/en-US/docs/Web/CSS/Universal_selectors)
- [MDN: Universal selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/Universal_selectors)
