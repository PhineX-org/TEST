---
id: grid-area
kind: property
cat: grid
chip: grid-area
title: وضع العنصر في منطقة أو مكان
en: CSS grid-area property
status: stable
support: all
mdn: grid-area
summary: grid-area بتحط العنصر في منطقة مسمّاة (من grid-template-areas) أو بتحدد موقعه بالصفوف والأعمدة (row-start / col-start / row-end / col-end).
keywords: grid-area, منطقة, areas, row start, column end, موقع العنصر, grid, تموضع في الشبكة
related: grid-template-areas, grid-column, grid-row, grid-guide, grid
---

## intro

الخاصية `grid-area` بتقول للعنصر **«روح هنا في الشبكة»**، وليها استخدامين:

**1) اسم منطقة**: لو عرّفت مناطق بـ [[grid-template-areas]]، بتكتب `grid-area: header` فالعنصر يروح للمنطقة المسمّاة دي. ده الاستخدام الأشهر والأسهل. وبتقدر تسمّي أي اسم من غير علامات تنصيص (`header` مش `"header"`).

**2) أرقام الخطوط**: اختصار لأربع خصائص بالترتيب: `grid-area: row-start / column-start / row-end / column-end`، مثلاً `grid-area: 1 / 2 / 3 / 4` يعني يبدأ من الصف 1 العمود 2 وينتهي عند الصف 3 والعمود 4 (الأرقام **خطوط الشبكة** مش الخلايا). ممكن تستخدم `span`: `grid-area: 1 / 1 / span 2 / span 3`.

وبتتحط على **الابن** مش الحاوية. ولو متحددتش، المتصفح بيرتّب العناصر تلقائي حسب [[grid-auto-flow]].

> [!analogy] زي ما تكتب على كل قطعة أثاث «مكانها: غرفة النوم» أو تقول لها «من الحيطة رقم 1 للحيطة رقم 3».

> [!key] الأرقام بتشير لـ **خطوط** الشبكة: عمودين يحتاجوا 3 خطوط (1, 2, 3).

## try

```html
<style>
  .g { display:grid; grid-template-columns:1fr 1fr 1fr; grid-template-rows:40px 40px; gap:4px; }
  .g div { background:#bcd4a8; color:#3d2c18; display:grid; place-items:center; }
  .x { grid-area:1 / 2 / 3 / 4; background:#c9772f !important; color:#fff3e0 !important; }
</style>
<div class="g"><div>1</div><div class="x">يمتد: 1/2/3/4</div></div>
```

## syntax

```css nolive
grid-area: header;                  /* اسم منطقة */
grid-area: 1 / 1 / 3 / 4;           /* row-start / col-start / row-end / col-end */
grid-area: 2 / 1 / span 2 / span 3;
```

- **القيمة المبدئية**: `auto`.
- بتتحط على الابن.
- الأرقام = خطوط الشبكة.

## values

### `<name>`
اسم منطقة من grid-template-areas.

### `<line> / <line> / <line> / <line>`
row-start / col-start / row-end / col-end.

### `span <n>`
يمتد عدد معين من الخلايا.

### auto
المتصفح يحدد.

## use

- وضع عناصر في تخطيط مرسوم بالمناطق.
- عنصر ياخد مساحة مخصوصة (يمتد صفين وعمودين).
- أسماء واضحة بدل أرقام.

## avoid

- الأرقام الكتيرة بدل الأسماء (تلخبط).
- وضعها على الحاوية.

## examples

### 1) اسم منطقة
العنصر راح للمنطقة المسمّاة.

```html
<style>
  .g { display:grid; gap:4px; grid-template-columns:1fr 1fr; grid-template-areas:"a a" "b c"; }
  .g > div { padding:8px; color:#3d2c18; text-align:center; }
  .a { grid-area:a; background:#e4c490; } .b { grid-area:b; background:#bcd4a8; } .c { grid-area:c; background:#efe0bd; }
</style>
<div class="g"><div class="c">c</div><div class="a">a</div><div class="b">b</div></div>
```

- ترتيب HTML مختلف عن الترتيب البصري.

### 2) بالأرقام
يمتد من خط 1 لخط 3 في الأعمدة.

```html
<style>
  .g { display:grid; grid-template-columns:repeat(3,1fr); grid-template-rows:36px 36px; gap:4px; }
  .g div { background:#bcd4a8; color:#3d2c18; display:grid; place-items:center; }
  .w { grid-area:1 / 1 / 2 / 3; background:#c9772f !important; color:#fff3e0 !important; }
</style>
<div class="g"><div class="w">عمودين</div><div>2</div><div>3</div><div>4</div><div>5</div></div>
```



### 3) span
يمتد 2 صف و2 عمود.

```html
<style>
  .g { display:grid; grid-template-columns:repeat(3,1fr); grid-auto-rows:36px; gap:4px; }
  .g div { background:#bcd4a8; color:#3d2c18; display:grid; place-items:center; }
  .big { grid-area:1 / 1 / span 2 / span 2; background:#7a4a1d !important; color:#f3ede0 !important; }
</style>
<div class="g"><div class="big">كبير</div><div>2</div><div>3</div></div>
```



### 4) تداخل عناصر
عنصرين في نفس الخلايا.

```html
<style>
  .g { display:grid; grid-template-columns:1fr 1fr; grid-template-rows:60px; }
  .a { grid-area:1/1/2/3; background:#bcd4a8; }
  .b { grid-area:1/2/2/3; background:rgba(201,119,47,.8); color:#fff3e0; display:grid; place-items:center; }
</style>
<div class="g"><div class="a"></div><div class="b">فوقه</div></div>
```



## mistakes

### أسماء بين علامات تنصيص

```css bad
.a { grid-area:"header"; }
```

```css good
.a { grid-area:header; }
```

في grid-area بتكتب الاسم من غير تنصيص.

### عدّ خلايا بدل خطوط

```css bad
.a { grid-area:1/1/1/3; }  /* start=end */
```

```css good
.a { grid-area:1/1/2/3; }
```

الخط التاني لازم يكون أكبر من الأول.

## quiz

### grid-area بتتحط على؟
- [ ] الحاوية
- [x] الابن
- [ ] body
- [ ] الاتنين

العنصر نفسه.

### الأرقام تشير لـ؟
- [ ] الخلايا
- [x] خطوط الشبكة
- [ ] الأعمدة فقط
- [ ] البكسل

lines.

### ترتيب الأرقام؟
- [x] row-start/column-start/row-end/column-end
- [ ] column-start/row-start
- [ ] start/end
- [ ] عشوائي

4 قيم بالترتيب.

## refs

- [MDN: grid-area](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-area)
