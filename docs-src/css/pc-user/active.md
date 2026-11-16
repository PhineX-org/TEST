---
id: active
kind: pseudoclass
cat: pc-user
chip: :active
title: أثناء الضغط
en: CSS :active pseudo-class
status: stable
support: all
mdn: :active
summary: الحالة active بتنطبق أثناء الضغط على العنصر (من لحظة الضغط لحد الإفلات). مناسبة لإحساس «الضغط» في الأزرار.
keywords: :active, active, ضغط, زرار, click, pseudo-class, مضغوط
related: hover, focus, focus-visible, transition, pseudo-guide
---

## intro

`:active` هي **حالة** بتنطبق على العنصر **أثناء ما المستخدم بيضغط عليه** (من لحظة الضغط بزرار الماوس أو الإصبع لحد ما يسيبه). فترتها قصيرة جداً، لكنها بتدي **إحساس الاستجابة الفوري**: الزرار «بيتنزل» لما تضغطه.

استخدامات شائعة: إزاحة الزرار بكسل لتحت، تصغيره شوية (`transform: scale(.97)`)، أو تغميق لونه. وبتستخدم مع الروابط والأزرار وأي عنصر تفاعلي.

نقاط مهمة:
- في ترتيب حالات الروابط (LVHA) لازم تيجي **بعد** `:hover`.
- على أجهزة اللمس بتشتغل بشكل مختلف حسب المتصفح؛ بعض النسخ تحتاج `ontouchstart` في iOS القديم.
- **متعتمدش** عليها لوظيفة أساسية؛ هي مجرد تغذية راجعة بصرية.

> [!tip] اجمع `:active` مع [[transition]] قصيرة (.1s) عشان الضغط يبان لحظي وناعم.

## try

```html
<style>
  .b { display:inline-block; background:#c9772f; color:#f3ede0; padding:10px 22px; border-radius:8px; font-weight:bold; box-shadow:0 4px 0 #7a4a1d; transition:transform .1s, box-shadow .1s; user-select:none; }
  .b:active { transform:translateY(3px); box-shadow:0 1px 0 #7a4a1d; }
</style>
<span class="b">اضغط واستمر</span>
```

## syntax

```css nolive
button:active { transform: scale(.97); }
a:active { color: #b5551f; }
```

- مدتها = وقت الضغط فقط.
- في LVHA بتيجي آخر حاجة.

## use

- إحساس الضغط في الأزرار.
- تغميق الروابط لحظة الضغط.
- تأثير «زرار ثلاثي الأبعاد».

## avoid

- وظيفة أساسية تعتمد عليها.
- تغييرات كبيرة تخلّي الواجهة تقفز.

## examples

### 1) زرار ينضغط
نزول بسيط.

```html
<style>
  .b { display:inline-block; background:#3d7a5a; color:#f3ede0; padding:10px 22px; border-radius:8px; font-weight:bold; box-shadow:0 4px 0 #2d5c43; transition:transform .1s, box-shadow .1s; }
  .b:active { transform:translateY(3px); box-shadow:0 1px 0 #2d5c43; }
</style>
<span class="b">اضغط</span>
```



### 2) تصغير
scale عند الضغط.

```html
<style>
  .b { display:inline-block; background:#c9772f; color:#f3ede0; padding:10px 22px; border-radius:50px; font-weight:bold; transition:transform .1s; }
  .b:active { transform:scale(.93); }
</style>
<span class="b">اضغط</span>
```



### 3) رابط
لون مختلف أثناء الضغط.

```html
<style>
  a { color:#7a4a1d; font-size:1.2rem; font-weight:bold; }
  a:hover { color:#b5551f; } a:active { color:#3d7a5a; }
</style>
<a href="#" onclick="return false">اضغط على الرابط</a>
```



### 4) بطاقة قابلة للضغط
تصغير خفيف مع تغميق الخلفية.

```html
<style>
  .c { width:150px; padding:12px; border-radius:10px; background:#f3e6c9; color:#3d2c18; cursor:pointer; transition:transform .1s, background .1s; user-select:none; }
  .c:active { transform:scale(.96); background:#e4c490; }
</style>
<div class="c">اضغط على البطاقة</div>
```



## mistakes

### ترتيب غلط

```css bad
a:active { color:red; }
a:hover { color:blue; }
```

```css good
a:hover { color:blue; }
a:active { color:red; }
```

LVHA.

### تغيير حجم يسبب قفز

```css bad
.b:active { padding:30px; }  /* الصفحة تقفز */
```

```css good
.b:active { transform:scale(.97); }
```

transform مبتحركش باقي العناصر.

## quiz

### active بتنطبق؟
- [x] أثناء الضغط
- [ ] بعد الإفلات
- [ ] عند التحميل
- [ ] دايماً

وقت الضغط.

### ترتيبها بين حالات الرابط؟
- [ ] أول واحدة
- [x] آخر واحدة
- [ ] وسط
- [ ] لا يهم

LVHA.

### الأفضل للتأثير؟
- [x] transform
- [ ] width
- [ ] margin
- [ ] float

مبتحركش التخطيط.

## refs

- [MDN: :active](https://developer.mozilla.org/en-US/docs/Web/CSS/:active)
