---
id: overflow-y
kind: property
cat: sizing
chip: overflow-y
title: التمرير الرأسي
en: CSS overflow-y property
status: stable
support: all
size: compact
mdn: overflow-y
summary: overflow-y بتتحكم في المحتوى الزايد رأسياً. الأكثر استخداماً: auto لصناديق بسكرول رأسي مع max-height.
keywords: overflow-y, scroll رأسي, vertical scroll, auto, hidden, max-height, scrollbar
related: overflow, overflow-x, max-height, height, scrollbar-width
---

## intro

الخاصية `overflow-y` هي [[overflow]] للاتجاه **الرأسي** (فوق/تحت). أشهر استخدام: `max-height` + `overflow-y: auto` علشان صندوق طويل المحتوى يسكرول جوه نفسه بدل ما يمدّد الصفحة.

مثلاً: قائمة اقتراحات، نافذة منبثقة (modal) طويلة، أو sidebar فيه عناصر كتير. بتخلّي الـ scrollbar بتاع الصندوق يظهر **لما يلزم بس** (`auto`).

القاعدة نفسها: لو `overflow-y` غير visible و`overflow-x` visible، الـ x بيتحول لـ auto تلقائياً.

> [!tip] للـ sidebar الثابت: `height: 100dvh; overflow-y: auto` علشان القائمة تسكرول مستقلة عن الصفحة.

## try

```html
<style>
  .l { max-height:70px; overflow-y:auto; background:#efe0bd; color:#3d2c18; padding:6px; width:180px; }
</style>
<div class="l">1<br>2<br>3<br>4<br>5<br>6</div>
```

## syntax

```css nolive
overflow-y: auto;
overflow-y: scroll;
overflow-y: hidden;
```

- **القيمة المبدئية**: `visible`.

## values

### auto
scrollbar رأسي لو لازم.

### hidden
يقص الزايد رأسياً.

### scroll
scrollbar دايماً.

## use

- صناديق بـ max-height بسكرول.
- sidebar أو modal طويل.

## avoid

- إخفاء محتوى مهم بـ hidden من غير طريقة للوصول إليه.

## examples

### 1) قائمة اقتراحات
scroll جوه القائمة.

```html
<style>
  .l { max-height:80px; overflow-y:auto; width:160px; background:#efe0bd; color:#3d2c18; }
  .l div { padding:4px 8px; border-bottom:1px solid #d8c7a0; }
</style>
<div class="l"><div>مصر</div><div>السعودية</div><div>الإمارات</div><div>الأردن</div><div>تونس</div></div>
```



### 2) sidebar طويل
ارتفاع ثابت وسكرول مستقل.

```html
<style>
  .sb { height:90px; width:140px; overflow-y:auto; background:#7a4a1d; color:#f3ede0; padding:6px; }
</style>
<div class="sb">1<br>2<br>3<br>4<br>5<br>6<br>7<br>8</div>
```



### 3) قص رأسي
hidden بيخفي اللي تحت.

```html
<style>
  .b { height:40px; overflow-y:hidden; background:#bcd4a8; color:#3d2c18; padding:4px; }
</style>
<div class="b">سطر<br>سطر<br>سطر مقصوص</div>
```



## mistakes

### نسيان max-height

```css bad
.l { overflow-y:auto; }  /* مفيش حد، مفيش سكرول */
```

```css good
.l { max-height:200px; overflow-y:auto; }
```

من غير حد للارتفاع الصندوق بيكبر ومفيش حاجة تفيض.

## quiz

### `overflow-y:auto` مع max-height بتعمل؟
- [ ] تقص
- [x] تسكرول لو زاد
- [ ] تخفي
- [ ] تكبّر

scrollbar لو لازم.

### بدونه max-height؟
- [ ] شغّال
- [x] غالباً مفيش سكرول
- [ ] خطأ
- [ ] يخفي

الصندوق بيكبر مع المحتوى.

## refs

- [MDN: overflow-y](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-y)
