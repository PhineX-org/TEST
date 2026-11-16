---
id: overflow-wrap
kind: property
cat: typography
chip: overflow-wrap
title: لف الكلمات الطويلة
en: CSS overflow-wrap property
status: stable
support: all
mdn: overflow-wrap
summary: overflow-wrap بتسمح بكسر كلمة طويلة لو مفيش مكان: break-word وanywhere. الحل الأفضل لمنع خروج النص من الصندوق.
keywords: overflow-wrap, word-wrap, break-word, anywhere, كلمة طويلة, خروج النص
related: word-break, white-space, hyphens, text-overflow
---

## intro

الخاصية `overflow-wrap` (اسمها القديم `word-wrap`) بتقول للمتصفح: «لو فيه كلمة **أطول من السطر** ومفيش مكان لها، **اكسرها** بدل ما تخلّيها تخرج بره الصندوق». ودي **أنضف وأحسن طريقة** لحل مشكلة النصوص الطويلة (روابط، إيميلات، أسماء).

القيم:
- **`normal`** (الافتراضي): ممنوع كسر الكلمة، فالطويلة بتخرج بره.
- **`break-word`**: يكسر الكلمة لو لازم، **بعد** ما يحاول يلفها للسطر الجديد أولاً.
- **`anywhere`**: شبيهة بـ break-word لكنها كمان **بتحسب** نقط الكسر المحتملة في حساب `min-content` (مهمة في flex/grid).

الفرق عن [[word-break]]`: break-all`: هنا الكسر **آخر حل**، فالنصوص العادية مبتتكسرش. وبتتوارث. ولو الصندوق جوه flex/grid ضيف `min-width: 0` للأولاد عشان تشتغل.

## try

```html
<style>
  div { width:130px; margin:4px 0; padding:4px 8px; background:#efe0bd; color:#3d2c18; direction:ltr; text-align:left; }
</style>
<div style="overflow-wrap:normal">normal: Supercalifragilisticexpialidocious</div>
<div style="overflow-wrap:break-word">break-word: Supercalifragilisticexpialidocious</div>
```

## syntax

```css nolive
overflow-wrap: normal;
overflow-wrap: break-word;
overflow-wrap: anywhere;
```

- **القيمة المبدئية**: `normal`.
- **بتتوارث؟** أيوه.

## values

### normal
مبيكسرش.

### break-word
يكسر لو لازم.

### anywhere
يكسر وبيحسب نقط الكسر في min-content.

## use

- بطاقات بنصوص مولّدة من المستخدمين.
- روابط طويلة.
- رسائل شات.

## avoid

- نسيانها في مكوّنات بتعرض نص المستخدم.
- نسيان min-width:0 في flex.

## examples

### 1) كلمة طويلة
normal تخرج وbreak-word تتكسر.

```html
<style>
  div { width:120px; margin:4px 0; padding:4px 8px; background:#efe0bd; color:#3d2c18; direction:ltr; text-align:left; }
</style>
<div>Supercalifragilisticexpialidocious</div><div style="overflow-wrap:break-word">Supercalifragilisticexpialidocious</div>
```



### 2) رسالة شات
نص مولّد من مستخدم.

```html
<style>
  .m { width:150px; background:#e4c490; color:#3d2c18; padding:8px 10px; border-radius:10px; overflow-wrap:anywhere; direction:ltr; text-align:left; }
</style>
<div class="m">hello aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
```



### 3) جوه flex
محتاجة min-width:0.

```html
<style>
  .row { display:flex; width:200px; background:#efe0bd; padding:6px; gap:8px; color:#3d2c18; }
  .txt { min-width:0; overflow-wrap:anywhere; flex:1; direction:ltr; text-align:left; }
</style>
<div class="row"><div class="txt">averyveryveryveryverylongwordhere</div><b>OK</b></div>
```



### 4) النصوص العادية سليمة
مبتتكسرش بدون لزوم.

```html
<style>
  p { width:140px; margin:0; background:#efe0bd; color:#3d2c18; padding:6px 8px; overflow-wrap:break-word; direction:ltr; text-align:left; }
</style>
<p>Normal sentence stays readable.</p>
```



## mistakes

### الاعتماد على break-all

```css bad
.c { word-break:break-all; }
```

```css good
.c { overflow-wrap:break-word; }
```

أخف تأثيراً على النص العادي.

### flex بدون min-width:0

```css bad
.txt { overflow-wrap:anywhere; flex:1; }  /* ممكن مبتتكسرش */
```

```css good
.txt { overflow-wrap:anywhere; flex:1; min-width:0; }
```

أولاد flex ليهم min-width:auto.

## quiz

### overflow-wrap:break-word بتكسر؟
- [ ] كل كلمة
- [x] فقط لو الكلمة مش لاقية مكان
- [ ] مفيش
- [ ] العربي فقط

آخر حل.

### الاسم القديم؟
- [x] word-wrap
- [ ] word-break
- [ ] text-wrap
- [ ] line-break

word-wrap.

### الافتراضي؟
- [x] normal
- [ ] break-word
- [ ] anywhere
- [ ] pre

normal.

## refs

- [MDN: overflow-wrap](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-wrap)
