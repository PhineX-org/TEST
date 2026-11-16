---
id: attr-data
kind: attribute
cat: global-attrs
chip: data-*
title: خصائص البيانات المخصّصة
en: HTML data-* global attributes
status: stable
support: all
mdn: Global_attributes/data-*
summary: خصائص data-* بتخلّيك تخزّن أي بيانات مخصّصة على العنصر: data-price وdata-id مثلاً. بتقراها بجافاسكربت من dataset وبتستخدمها في CSS كمان.
keywords: data-*, dataset, data attribute, بيانات مخصصة, data-id, data-price, attr(), selector, تخزين, custom data
related: attr-class, attr-id, attr-style, div, button
---

## intro

أحياناً عايز تربط **بيانات** بعنصر في HTML: سعر المنتج، رقم الـ id في قاعدة البيانات، حالة القسم (مفتوح/مقفول). مفيش خاصية جاهزة للكلام ده، فالمعيار سمحلك تخترع **خصائصك بنفسك** بشرط إن اسمها **يبدأ بـ `data-`**: `data-price="25"` و`data-user-id="42"` و`data-state="open"`.

بتقراها بجافاسكربت من الخاصية **`element.dataset`**: `el.dataset.price` (بترجّع نص دايماً). لاحظ التحويل: الاسم `data-user-id` بيتحوّل لـ `dataset.userId` (**camelCase**). وبتستخدمها في CSS كمان: `[data-state="open"] { ... }`، وبـ `attr(data-x)` في المحتوى المُولَّد. وفكّر فيها كـ«**ملاحظات للكود**» مش للعرض: **متحطّش فيها بيانات حسّاسة** (أي حد يشوفها بـ View Source).

> [!analogy] `data-*` زي **الورقة اللاصقة** على العنصر: بتكتب عليها ملاحظة صغيرة للكود، المستخدم مش بيشوفها.

## try

```html
<button data-product="قهوة" data-price="25" onclick="alert(this.dataset.product + ' بـ ' + this.dataset.price + ' جنيه')">قهوة</button>
```

## syntax

```html nolive
<element data-اسم="قيمة">
<script>
  el.dataset.اسم  // نص
</script>
```

- `data-…` — **الاسم يبدأ بـ data-** ثم حروف صغيرة وشرطات.
- `dataset.اسم` — **قراءة/كتابة** من جافاسكربت.
- القيمة **نص** دايماً.

## use

- تخزين id أو سعر أو حالة على عنصر.
- تمرير إعدادات لمكوّن جافاسكربت.
- تنسيق حسب الحالة: `[data-state="open"]`.
- اختبار الواجهات (`data-testid`).

## avoid

- متخزّنش بيانات سرية أو حسّاسة فيها.
- متستخدمهاش بدل خصائص HTML الجاهزة (زي `disabled`).

## section: قواعد الاسم

- لازم يبدأ بـ `data-` متبوع باسم واحد على الأقل.
- الأحرف صغيرة (`data-User` بتتحوّل لصغيرة).
- الشرطات بتتحوّل لـ camelCase في `dataset` (`data-user-id` ⟵ `userId`).
- القيمة نص، حوّلها لرقم بنفسك (`Number(...)`).

## examples

### 1) قراءة data من جافاسكربت
مثال على dataset.

```html
<li id="u" data-user-id="42" data-role="admin">أحمد</li>
<p id="o"></p>
<script>
  const li = document.getElementById('u');
  document.getElementById('o').textContent = 'id=' + li.dataset.userId + ' | role=' + li.dataset.role;
</script>
```

- `data-user-id` بقت `dataset.userId`.
- كل القيم نصوص.
- لو مفيش خاصية بيرجع `undefined`.

### 2) تعديل وإضافة data
كتابة dataset.

```html
<div id="d" data-count="0" style="padding:10px; border:1px solid #94a3b8">العدّاد</div>
<button onclick="const d = document.getElementById('d'); d.dataset.count = Number(d.dataset.count) + 1; d.textContent = 'العدّاد: ' + d.dataset.count;">+1</button>
```

- الكتابة في `dataset` بتحدّث الخاصية في HTML.
- لازم تحوّل لرقم قبل الجمع.
- تقدر تشوف الخاصية الجديدة في الـ DevTools.

### 3) تنسيق حسب data-state
selector في CSS.

```html
<style>
  .panel { padding:10px; border-radius:8px; margin:4px 0; }
  .panel[data-state="open"] { background:#dcfce7; }
  .panel[data-state="closed"] { background:#fee2e2; }
</style>
<div class="panel" data-state="open">مفتوح</div>
<div class="panel" data-state="closed">مقفول</div>
```

- `[data-state="open"]` بيطابق القيمة بالظبط.
- ده أسلوب شائع بدل إضافة/إزالة كلاسات.
- JS بيغيّر الحالة والـ CSS بيتصرّف.

### 4) عرض data بـ attr() في CSS
محتوى مُولَّد.

```html
<style>
  .tip::after { content: " (" attr(data-hint) ")"; color:#64748b; font-size:.85em; }
</style>
<span class="tip" data-hint="سعر بالجنيه">القهوة 25</span>
```

- `attr(data-hint)` بتقرا الخاصية جوه CSS.
- بتشتغل في `content` بس (في أغلب المتصفحات).
- مفيش جافاسكربت.

### 5) قايمة منتجات وسلة
بيانات على كل زرار.

```html
<ul>
  <li>قهوة <button data-name="قهوة" data-price="25">اطلب</button></li>
  <li>شاي <button data-name="شاي" data-price="15">اطلب</button></li>
</ul>
<p id="t">الإجمالي: 0</p>
<script>
  let total = 0;
  document.querySelectorAll('button[data-price]').forEach(b => b.onclick = () => {
    total += Number(b.dataset.price);
    document.getElementById('t').textContent = 'الإجمالي: ' + total + ' (آخر طلب: ' + b.dataset.name + ')';
  });
</script>
```

- كل زرار شايل بياناته (`data-price`).
- كود جافاسكربت واحد بيخدم كل الأزرار.
- ده الاستخدام الكلاسيكي للـ data-*.

## mistakes

### اسم من غير data-
```html bad
<div price="25">قهوة</div>
```
```html good
<div data-price="25">قهوة</div>
```
ليه؟ الخصائص المخصّصة لازم تبدأ بـ `data-` عشان تبقى صالحة وليها `dataset`.

### خلط الشرطات في dataset
```html bad
el.dataset['user-id']      // undefined
```
```html good
el.dataset.userId          // "42"
```
ليه؟ في `dataset` الشرطات بتتحوّل لـ camelCase.

## a11y

- البيانات في `data-*` مش بتتقرا لقارئ الشاشة: المعنى المهم يبقى نص ظاهر.
- متحطّش فيها معلومات المفروض المستخدم يعرفها من غير تفاعل.
- لو بتغيّر الحالة (`data-state`) فعدّل كمان `aria-*` المقابلة (زي `aria-expanded`).

## quiz

### إزاي تقرا `data-user-id` بجافاسكربت؟
- [x] `el.dataset.userId`
- [ ] `el.dataset["data-user-id"]`
- [ ] `el.userId`
- [ ] `el.data.user-id`
camelCase بعد data-.

### القيم اللي بترجع من `dataset` نوعها؟
- [x] نص (string)
- [ ] رقم
- [ ] boolean
- [ ] object
دايماً نص.

### هل نحط بيانات سرية في `data-*`؟
- [x] لأ، أي حد يشوفها
- [ ] أيوه
- [ ] بس للأرقام
- [ ] بس مع `hidden`
الـ HTML مكشوف.

## refs

- [MDN: MDN: data-*](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/data-*)
- [WHATWG: data-* attributes](https://html.spec.whatwg.org/multipage/dom.html#embedding-custom-non-visible-data-with-the-data-*-attributes)
