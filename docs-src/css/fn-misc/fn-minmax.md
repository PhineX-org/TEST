---
id: fn-minmax
kind: function
cat: fn-misc
chip: minmax()
title: دالة minmax(): حد أدنى وأقصى للمسار
en: CSS minmax() function
status: stable
support: all
mdn: minmax
summary: minmax(min, max) في Grid بتحدد أصغر وأكبر حجم للعمود أو الصف: grid-template-columns: repeat(3, minmax(100px, 1fr)).
keywords: minmax, grid, أعمدة مرنة, 1fr, auto-fit
related: fn-repeat, fn-fit-content, grid-template-columns, grid-guide
---

## intro

الدالة `minmax(min, max)` بتستخدم **جوه Grid** لتحديد **مدى** حجم عمود أو صف: «ماتصغرش عن كذا وماتكبرش عن كذا». مثال: `grid-template-columns: minmax(200px, 1fr) 300px;` العمود الأول ماينزلش تحت 200px، ويتمدد ياخد مساحة متاحة (`1fr`)، والتاني ثابت 300px.

القيم الممكنة: أطوال (`px`, `%`)، و`fr` (للأقصى بس)، و`auto`، و`min-content`/`max-content`.

**أقوى استخدام** مع [[fn-repeat]]: **شبكة متجاوبة بدون media queries**:
`grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));`
يعني: كل عمود **150px على الأقل**، وبيتمدد ياخد حصته من المساحة، والمتصفح يحط **أكبر عدد أعمدة تساع**، وعلى الشاشة الضيقة تنزل لعمود واحد. ده من أشهر حيل CSS Grid.

نصيحة: لو الأدنى أكبر من الأقصى بيتجاهل الأقصى. وللأعمدة اللي ماتتخطاش عرض الحاوية على الموبايل استخدم `minmax(min(100%, 150px), 1fr)`.

## try

```html
<style>
  .g { display:grid; gap:6px; background:#efe0bd; padding:6px; border-radius:8px; }
  .g > div { background:#c9772f; color:#f3ede0; padding:8px; border-radius:6px; text-align:center; font-weight:bold; }
</style>
<div class="g" style="grid-template-columns:repeat(auto-fit,minmax(70px,1fr))"><div>1</div><div>2</div><div>3</div><div>4</div><div>5</div></div>
```

## syntax

```css nolive
grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
grid-template-columns: minmax(200px, 1fr) 300px;
grid-template-rows: minmax(60px, auto);
```

- `1fr` مسموح كأقصى فقط.
- لو min > max بيتجاهل max.
- مع repeat(auto-fit) = متجاوب.

## use

- شبكة متجاوبة بدون media query.
- صفوف بحد أدنى وتتمدد لمحتواها: minmax(60px, auto).
- عمود جانبي بين حدين.

## avoid

- `fr` كحد أدنى (غير مسموح).
- نسيان min(100%, ...) على الموبايل الضيق.

## examples

### 1) شبكة متجاوبة
auto-fit.

```html
<style>
  .g { display:grid; gap:6px; background:#efe0bd; padding:6px; border-radius:8px; }
  .g > div { background:#c9772f; color:#f3ede0; padding:8px; border-radius:6px; text-align:center; font-weight:bold; }
</style>
<div class="g" style="grid-template-columns:repeat(auto-fit,minmax(70px,1fr))"><div>1</div><div>2</div><div>3</div><div>4</div><div>5</div></div>
```



### 2) عمود بحد أدنى
200px أو 1fr.

```html
<style>
  .g { display:grid; gap:6px; background:#efe0bd; padding:6px; border-radius:8px; }
  .g > div { background:#c9772f; color:#f3ede0; padding:8px; border-radius:6px; text-align:center; font-weight:bold; }
</style>
<div class="g" style="grid-template-columns:minmax(80px,1fr) 70px"><div>مرن</div><div>ثابت</div></div>
```



### 3) صف بارتفاع أدنى
minmax(50px, auto).

```html
<style>
  .g { display:grid; gap:6px; background:#efe0bd; padding:6px; border-radius:8px; }
  .g > div { background:#c9772f; color:#f3ede0; padding:8px; border-radius:6px; text-align:center; font-weight:bold; }
</style>
<div class="g" style="grid-template-rows:minmax(50px,auto)"><div>صف أدنى 50 ويكبر مع المحتوى<br>سطر تاني</div></div>
```



### 4) آمن للموبايل
min(100%, ...).

```html
<style>
  .g { display:grid; gap:6px; background:#efe0bd; padding:6px; border-radius:8px; }
  .g > div { background:#c9772f; color:#f3ede0; padding:8px; border-radius:6px; text-align:center; font-weight:bold; }
</style>
<div class="g" style="grid-template-columns:repeat(auto-fit,minmax(min(100%,90px),1fr))"><div>أ</div><div>ب</div><div>ج</div></div>
```



## mistakes

### fr كحد أدنى

```css bad
grid-template-columns:minmax(1fr, 300px);  /* غلط */
```

```css good
grid-template-columns:minmax(100px, 1fr);
```

fr للأقصى فقط.

### عمود أوسع من الشاشة

```css bad
repeat(auto-fit, minmax(300px, 1fr))  /* على موبايل 280px يفيض */
```

```css good
repeat(auto-fit, minmax(min(100%, 300px), 1fr))
```

استخدم min().

## quiz

### minmax(100px, 1fr)؟
- [x] أدنى 100 وبيتمدد
- [ ] ثابت 100
- [ ] أقصى 100
- [ ] 1fr فقط

مدى.

### الشبكة المتجاوبة المشهورة؟
- [x] repeat(auto-fit, minmax())
- [ ] flex-wrap
- [ ] float
- [ ] position

بدون media.

### fr مسموح كـ؟
- [x] أقصى فقط
- [ ] أدنى فقط
- [ ] الاتنين
- [ ] لا

max.

## refs

- [MDN: minmax()](https://developer.mozilla.org/en-US/docs/Web/CSS/minmax)
