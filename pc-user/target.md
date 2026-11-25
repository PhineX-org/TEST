---
id: target
kind: pseudoclass
cat: pc-user
chip: :target
title: عنصر الرابط المستهدف
en: CSS :target pseudo-class
status: stable
support: all
mdn: :target
summary: الحالة target بتنطبق على العنصر اللي الـ id بتاعه مطابق لجزء # في الرابط (اللي بعد #). مفيدة لتمييز القسم المفتوح بدون JS.
keywords: :target, target, anchor, hash, #id, تمييز القسم, tabs, modal
related: hover, focus, has, pseudo-guide, id-selector
---

## intro

`:target` بتنطبق على **العنصر اللي الـ `id` بتاعه هو الجزء بعد `#` في عنوان الصفحة (URL)**. يعني لو دخلت على `page.html#section2` فالعنصر اللي `id="section2"` ياخد حالة `:target`. وكمان لما تضغط على رابط داخلي `<a href="#section2">` الصفحة بتنزل للقسم ده ويتفعل `:target`.

ده بيدّيك **تفاعل بدون JavaScript**:
- **تمييز القسم الحالي** بلون خلفية لما المستخدم ينتقل له من الفهرس.
- **Tabs بسيطة** و**modal** و**قوائم منسدلة** تتفتح بالضغط على رابط (حيلة CSS-only).
- **نمط «الصفحة المستهدفة»** في صفحات التوثيق (زي الصفحة دي) عشان المستخدم يعرف هو وصل لأنهي عنوان.

تنبيهات: الحيل اللي بتعتمد على `:target` بتغيّر **الـ URL و history** (الرجوع بيقفل المودال مثلاً)، وممكن تعمل مشاكل وصولية (التركيز مبينتقلش تلقائياً). للتفاعلات المعقدة الأفضل JavaScript أو عنصر `<dialog>` و`popover`. لتمييز الرابط نفسه في فهرس استخدم JS أو [[has]].

> [!tip] ضيف `scroll-margin-top` للعنصر المستهدف عشان ميختفيش تحت header ثابت.

## try

```html
<style>
  .s { padding:10px; margin:6px 0; border-radius:8px; background:#efe0bd; color:#3d2c18; transition:background .3s; }
  .s:target { background:#c9772f; color:#f3ede0; }
  a { color:#7a4a1d; font-weight:bold; margin-inline-end:10px; }
</style>
<a href="#s1" onclick="location.hash='s1';return false">القسم 1</a><a href="#s2" onclick="location.hash='s2';return false">القسم 2</a>
<div class="s" id="s1">القسم الأول</div><div class="s" id="s2">القسم التاني</div>
```

## syntax

```css nolive
section:target { background: #fff3d6; }
.modal:target { display: block; }
:target { scroll-margin-top: 80px; }
```

- العنصر يتم استهدافه بالـ id في الـ hash.
- بتشتغل بدون JavaScript.

## use

- تمييز القسم المنتقل إليه.
- tabs/modal بدون JS (للأمثلة البسيطة).
- صفحات توثيق.

## avoid

- تفاعلات معقدة تعتمد عليها فقط.
- إغفال الوصولية (التركيز).

## examples

### 1) تمييز القسم
القسم يتلوّن لما تنتقل له.

```html
<style>
  .s { padding:10px; margin:6px 0; border-radius:8px; background:#efe0bd; color:#3d2c18; transition:all .3s; }
  .s:target { background:#bcd4a8; box-shadow:0 0 0 3px #3d7a5a; }
  a { color:#7a4a1d; font-weight:bold; margin-inline-end:10px; }
</style>
<a href="#a1" onclick="location.hash='a1';return false">أ</a><a href="#a2" onclick="location.hash='a2';return false">ب</a>
<div class="s" id="a1">الأول</div><div class="s" id="a2">التاني</div>
```



### 2) إظهار/إخفاء
محتوى يظهر عند الاستهداف.

```html
<style>
  .p { display:none; padding:8px; background:#7a4a1d; color:#f3ede0; border-radius:6px; margin-top:6px; }
  .p:target { display:block; }
  a { color:#b5551f; font-weight:bold; }
</style>
<a href="#panel" onclick="location.hash='panel';return false">افتح</a><div class="p" id="panel">اللوحة ظهرت</div>
```



### 3) scroll-margin
عشان ميختفيش تحت الهيدر.

```html
<style>
  h4 { margin:0; padding:6px; background:#efe0bd; color:#3d2c18; scroll-margin-top:60px; }
  h4:target { background:#c9772f; color:#f3ede0; }
</style>
<h4 id="h1">عنوان مستهدف</h4>
```



### 4) رابط الفهرس
تمييز العنوان المستهدف.

```html
<style>
  :target { outline:3px solid #c9772f; outline-offset:4px; }
  p { margin:6px 0; padding:6px; color:#3d2c18; background:#efe0bd; }
  a { color:#7a4a1d; font-weight:bold; }
</style>
<a href="#x" onclick="location.hash='x';return false">للفقرة</a><p id="x">فقرة هتتحدد</p>
```



## mistakes

### اعتماد كامل على target للمودال

```css bad
.modal:target { display:block; }  /* ملهوش إغلاق بالـ Esc */
```

```css good
<dialog> مع showModal()
```

dialog بيدّي وصولية أحسن.

### نسيان scroll-margin

```css bad
h2:target { }  /* بيختفي تحت الهيدر */
```

```css good
h2 { scroll-margin-top:70px; }
```

مسافة للهيدر الثابت.

## quiz

### target بتنطبق على؟
- [x] العنصر اللي id بتاعه = hash
- [ ] أي عنصر
- [ ] آخر عنصر
- [ ] الرابط

id مطابق للـ #.

### الاستخدام الأشهر؟
- [x] تمييز القسم المنتقل إليه
- [ ] تلوين الخطوط
- [ ] ترتيب
- [ ] قص

تمييز القسم.

### بديل أفضل للمودال؟
- [x] dialog
- [ ] target فقط
- [ ] iframe
- [ ] marquee

dialog.

## refs

- [MDN: :target](https://developer.mozilla.org/en-US/docs/Web/CSS/:target)
