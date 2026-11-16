---
id: fn-translate
kind: function
cat: fn-transform
chip: translate()
title: دالة translate(): تحريك العنصر
en: CSS translate() function
status: stable
support: all
mdn: transform-function/translate
summary: translate(x, y) بتحرّك العنصر أفقياً ورأسياً بدون ما تأثر على باقي الصفحة: transform: translate(20px, -10px).
keywords: translate, translateX, translateY, transform, تحريك, توسيط
related: transform, translate, fn-scale, fn-rotate, transitions-animations-guide
---

## intro

الدالة `translate()` (داخل خاصية [[transform]]) بتحرّك العنصر **أفقياً ورأسياً** من مكانه الأصلي. الصيغة: `transform: translate(20px, -10px);` يعني 20 يمين (في LTR، وفي RTL x الموجب بيروح يمين برضه لأن transform مش منطقي!) و10 لفوق. وفيه `translateX(20px)` و`translateY(10px)` و`translate3d(x,y,z)`.

**الميزة الكبرى**: التحريك **ما بيأثرش على تخطيط باقي الصفحة** (العنصر بيفضل «حاجز» مكانه الأصلي)، ومعالجته على **كرت الشاشة (GPU)** فهو **سلس جداً** للأنيميشن، عكس `left`/`top`/`margin` اللي بتعيد حساب التخطيط.

**النسب مرجعها العنصر نفسه**: `translate(50%, 50%)` تحرّكه نص عرضه ونص ارتفاعه. ومن هنا الحيلة المشهورة لـ **التوسيط**: `position:absolute; top:50%; left:50%; transform: translate(-50%, -50%);`.

نقطة: لو عايز تحرك بدون ما تكتب كل `transform`، فيه خاصية [[translate]] المستقلة: `translate: 20px 10px;`.

## try

```html
<style>
  .st { background:#efe0bd; padding:18px; border-radius:8px; display:flex; gap:18px; align-items:center; }
  .bx { width:50px; height:50px; background:#c9772f; color:#f3ede0; border-radius:8px; display:grid; place-items:center; font-weight:bold; }
  .gh { position:absolute; width:50px; height:50px; border:2px dashed #7a4a1d; border-radius:8px; }
  .w { position:relative; display:inline-block; }
</style>
<div class="st"><div class="w"><div class="gh"></div><div class="bx" style="transform:translate(24px,14px)">T</div></div></div>
```

## syntax

```css nolive
transform: translate(20px, -10px);
transform: translateX(30px);
transform: translateY(-50%);
transform: translate(-50%, -50%);  /* توسيط */
```

- النسبة مرجعها العنصر نفسه.
- مش بتأثر على التخطيط.
- سلسة (GPU).

## use

- أنيميشن وحركات سلسة.
- توسيط مطلق: translate(-50%,-50%).
- تأثيرات hover (رفع زرار).

## avoid

- تحريك بـ left/top في الأنيميشن.
- نسيان إن العنصر يفضل شاغل مكانه.

## examples

### 1) تحريك بسيط
X وY.

```html
<style>
  .st { background:#efe0bd; padding:18px; border-radius:8px; display:flex; gap:18px; align-items:center; }
  .bx { width:50px; height:50px; background:#c9772f; color:#f3ede0; border-radius:8px; display:grid; place-items:center; font-weight:bold; }
  .gh { position:absolute; width:50px; height:50px; border:2px dashed #7a4a1d; border-radius:8px; }
  .w { position:relative; display:inline-block; }
</style>
<div class="st"><div class="w"><div class="gh"></div><div class="bx" style="transform:translate(24px,14px)">T</div></div></div>
```



### 2) رفع زرار hover
translateY.

```html
<style>
  button { padding:10px 20px; border:0; border-radius:8px; background:#c9772f; color:#f3ede0; font-weight:bold; transition:transform .2s, box-shadow .2s; }
  button:hover { transform:translateY(-4px); box-shadow:0 8px 14px rgba(61,44,24,.3); }
</style>
<button>مرّر عليّا</button>
```



### 3) التوسيط الكلاسيكي
50% و-50%.

```html
<style>
  .p { position:relative; height:80px; background:#efe0bd; border-radius:8px; }
  .c { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); background:#3d7a5a; color:#f3ede0; padding:8px 14px; border-radius:8px; }
</style>
<div class="p"><div class="c">في النص</div></div>
```



### 4) X فقط
translateX.

```html
<style>
  .st { background:#efe0bd; padding:18px; border-radius:8px; display:flex; gap:18px; align-items:center; }
  .bx { width:50px; height:50px; background:#c9772f; color:#f3ede0; border-radius:8px; display:grid; place-items:center; font-weight:bold; }
  .gh { position:absolute; width:50px; height:50px; border:2px dashed #7a4a1d; border-radius:8px; }
  .w { position:relative; display:inline-block; }
</style>
<div class="st"><div class="w"><div class="gh"></div><div class="bx" style="transform:translateX(40px)">X</div></div></div>
```



## mistakes

### تحريك بـ left

```css bad
@keyframes m { to { left:100px; } }  /* بطيء */
```

```css good
@keyframes m { to { transform:translateX(100px); } }
```

transform أسلس.

### نسيان حاجز المكان

```css bad
.a { transform:translateX(200px); }  /* لسه شاغل مكانه */
```

```css good
/* استخدم margin أو grid لو عايز تغيّر التخطيط */
```

لا يتغير التخطيط.

## quiz

### translate بتحرّك؟
- [x] من غير التأثير على التخطيط
- [ ] وتحرك باقي العناصر
- [ ] وتغيّر الحجم
- [ ] وتلوّن

مش بتأثر.

### النسبة في translate مرجعها؟
- [x] العنصر نفسه
- [ ] الأب
- [ ] الشاشة
- [ ] الجسم

حجم العنصر.

### للتوسيط؟
- [x] translate(-50%, -50%)
- [ ] translate(50%)
- [ ] scale
- [ ] rotate

مع top/left 50%.

## refs

- [MDN: translate()](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/translate)
