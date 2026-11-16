---
id: optgroup
kind: element
cat: choices
tag: optgroup
title: مجموعة الاختيارات (optgroup)
en: HTML option group element
status: stable
display: block
void: no
support: all
size: compact
summary: عنصر optgroup بيجمّع اختيارات option مرتبطة جوه select تحت عنوان واحد بـ label، وبيعطّل المجموعة كلها بـ disabled. العنوان نفسه مش قابل للاختيار.
keywords: optgroup, مجموعة اختيارات, label, select, option, تجميع, disabled
related: select, option, datalist
---

## intro

قايمة فيها 50 مدينة بدون تنظيم بتتعب. لو جمّعتها حسب الدولة بتبقى أسهل بكتير. الـ `<optgroup>` (**Option Group**) بيعمل ده: بيلف مجموعة [[option]] جوه [[select]] ويعرض فوقهم **عنوان** (بخاصية `label`) غامق وغير قابل للاختيار. والمجموعة ممكن تتعطّل كلها بـ `disabled`.

مفيهوش تداخل: مينفعش `<optgroup>` جوه `<optgroup>` (مستوى واحد بس). وكمان بيفيد في الإتاحة: قارئ الشاشة بيقول اسم المجموعة قبل ما يقرا الاختيارات اللي جواها، فالمستخدم يفهم السياق ومايتوهش في القايمة الطويلة.

> [!key] `<optgroup label="العنوان">` بيجمّع `<option>`ات جوه `<select>`. العنوان مش قابل للاختيار.

## try

```html
<select>
  <optgroup label="فواكه">
    <option>تفاح</option>
    <option>موز</option>
  </optgroup>
  <optgroup label="خضار">
    <option>جزر</option>
  </optgroup>
</select>
```

## syntax

```html nolive
<select>
  <optgroup label="العنوان">
    <option>اختيار</option>
  </optgroup>
</select>
```

- `<optgroup ...>` — **الوسم الافتتاحي**.
- `label` — **عنوان المجموعة** (إجباري).
- `<option>` — **الاختيارات**.
- `</optgroup>` — **الوسم الختامي** (يفضّل تكتبه).

## use

- لتنظيم قايمة طويلة لفئات.
- لتعطيل مجموعة اختيارات كاملة مرة واحدة.

## avoid

- متعملش تداخل: مستوى واحد بس.

## attributes

### label {required}
**عنوان المجموعة.** بيظهر غامق وغير قابل للاختيار.

### disabled {boolean}
**يعطّل كل اختيارات المجموعة.**

## examples

### 1) تنظيم بالقارات
عنوان وخيارات.

```html
<select name="city">
  <optgroup label="مصر">
    <option>القاهرة</option><option>الإسكندرية</option>
  </optgroup>
  <optgroup label="السعودية">
    <option>الرياض</option><option>جدة</option>
  </optgroup>
</select>
```

- «مصر» و«السعودية» عناوين مش قابلة للاختيار.
- المدن تحتهم بإزاحة.
- ده أوضح بكتير من قايمة طويلة مسطّحة.

### 2) تعطيل مجموعة
`disabled`.

```html
<select>
  <optgroup label="متاح">
    <option>خيار 1</option>
  </optgroup>
  <optgroup label="قريباً" disabled>
    <option>خيار 2</option>
    <option>خيار 3</option>
  </optgroup>
</select>
```

- المجموعة التانية كلها معطّلة بسطر واحد.
- العنوان والاختيارات بتظهر باهتة.
- مفيش حاجة تتعمل على كل option لوحده.

### 3) تنسيق عناوين المجموعات
CSS.

```html
<style>
  select { padding: 6px; }
  optgroup { color: #0369a1; font-weight: bold; }
  option { color: #0f172a; font-weight: normal; }
</style>
<select>
  <optgroup label="لغات ويب"><option>HTML</option><option>CSS</option></optgroup>
  <optgroup label="لغات سيرفر"><option>Python</option></optgroup>
</select>
```

- تنسيق الألوان والخط على القايمة المنسدلة بيعتمد على المتصفح ونظام التشغيل.
- في Chrome وFirefox على سطح المكتب بيشتغل غالباً.
- على الموبايل المتصفح بيستخدم منتقي النظام فبيتجاهل التنسيق.

## rules

- parents: [[select]].
- children: [[option]] (وعناصر السكريبت).
- closing: الوسم الختامي `</optgroup>` (يفضّل تكتبه).
- role: `group`.
- dom: `HTMLOptGroupElement`.
- layout: `display: block`.

## mistakes

### نسيان label
```html bad
<optgroup><option>أ</option></optgroup>
```
```html good
<optgroup label="المجموعة"><option>أ</option></optgroup>
```
ليه؟ العنوان هو الغرض من الـ `<optgroup>`.

## a11y

- قارئ الشاشة بيقول اسم المجموعة قبل الاختيارات.
- العناوين لازم تكون وصفية.

## tips

- متحطش أكتر من 7–10 اختيارات في المجموعة.
- لا تداخل.

## quiz

### هل عنوان `<optgroup>` قابل للاختيار؟
- [ ] أيوه
- [x] لأ
- [ ] أحياناً
- [ ] بـ `selected`
هو عنوان فقط.

### إيه الخاصية الإجبارية؟
- [x] `label`
- [ ] `value`
- [ ] `name`
- [ ] `id`
عنوان المجموعة.

## refs

- [MDN: optgroup](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/optgroup)
- [WHATWG: The optgroup element](https://html.spec.whatwg.org/multipage/form-elements.html#the-optgroup-element)
