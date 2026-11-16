---
id: touch-action
kind: property
cat: ui
chip: touch-action
title: حركات اللمس المسموحة
en: CSS touch-action property
status: stable
support: all
size: compact
mdn: touch-action
summary: touch-action بتحدد إيماءات اللمس اللي المتصفح يتعامل معاها (scroll وzoom): manipulation بتشيل تأخير الضغطتين، none بتمنع كل شيء.
keywords: touch-action, لمس, manipulation, pan-x, none, double-tap
related: overscroll-behavior, scroll-behavior, pointer-events
---

## intro

الخاصية `touch-action` بتخبّر المتصفح **أنهي إيماءات لمس يعالجها بنفسه** (سكرول، تكبير بالقرص) **وأنهي تسيبها لـ JavaScript بتاعك**. القيم: `auto` (الكل) و**`manipulation`** (سكرول وقرص زوم بس، من غير الضغطتين المتتاليتين، فبتشيل تأخير الـ 300ms قديماً وتحسّن الاستجابة)، و`pan-x` و`pan-y` (اتجاه واحد)، و`none` (المتصفح ميعملش حاجة، مفيدة لـ canvas وألعاب وسحب مخصص). مهمة لواجهات اللمس المخصصة (سحب عناصر، رسم). لكن `none` بتمنع السكرول، فاستخدمها على العنصر المطلوب فقط.

## try

```html
<style>
  .t { width:150px; height:60px; background:#efe0bd; color:#3d2c18; border-radius:8px; touch-action:none; display:flex; align-items:center; justify-content:center; font-weight:bold; }
</style>
<div class="t">touch-action: none</div>
```

## syntax

```css nolive
touch-action: auto;
touch-action: manipulation;
touch-action: pan-y;
touch-action: none;
```

- **القيمة المبدئية**: `auto`.

## values

### manipulation
سكرول وزوم من غير double-tap.

### pan-x / pan-y
اتجاه واحد.

### none
بدون إيماءات المتصفح.

## use

- canvas وألعاب لمس.
- سحب عناصر مخصص.
- تحسين استجابة الأزرار.

## avoid

- none على نطاق واسع (يمنع السكرول).

## examples

### 1) manipulation
للأزرار.

```html
<style>
  button { padding:10px 20px; border:0; border-radius:8px; background:#c9772f; color:#f3ede0; font-weight:bold; touch-action:manipulation; }
</style>
<button>زرار سريع الاستجابة</button>
```



### 2) none لسحب مخصص
المتصفح ميتدخلش.

```html
<style>
  .d { width:120px; height:50px; background:#3d7a5a; color:#f3ede0; border-radius:8px; touch-action:none; display:flex; align-items:center; justify-content:center; user-select:none; }
</style>
<div class="d">سحب مخصص</div>
```



### 3) pan-y
سكرول رأسي فقط.

```html
<style>
  .s { width:150px; height:50px; overflow:auto; background:#efe0bd; color:#3d2c18; padding:6px; touch-action:pan-y; }
</style>
<div class="s">سطر 1<br>سطر 2<br>سطر 3<br>سطر 4<br>سطر 5</div>
```



## mistakes

### none على الصفحة

```css bad
body { touch-action:none; }  /* لا سكرول */
```

```css good
.canvas { touch-action:none; }
```

على العنصر المطلوب.

## quiz

### manipulation بتعمل؟
- [x] سكرول وزوم بدون double-tap
- [ ] تمنع كل شيء
- [ ] تسمح بكل شيء
- [ ] تخفي

استجابة أسرع.

### none بتناسب؟
- [x] سحب مخصص وcanvas
- [ ] الأزرار
- [ ] النصوص
- [ ] الصور

تحكم JS.

## refs

- [MDN: touch-action](https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action)
