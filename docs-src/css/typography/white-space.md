---
id: white-space
kind: property
cat: typography
chip: white-space
title: التعامل مع المسافات وكسر السطر
en: CSS white-space property
status: stable
support: all
mdn: white-space
summary: white-space بتحدد ازاي المتصفح يتعامل مع المسافات والأسطر: nowrap يمنع الكسر، pre يحافظ على المسافات، pre-wrap يحافظ مع الكسر.
keywords: white-space, nowrap, pre, pre-wrap, pre-line, كسر السطر, مسافات
related: text-overflow, overflow-wrap, word-break, overflow
---

## intro

الخاصية `white-space` بتتحكم في حاجتين: **1) المسافات والأسطر الجديدة** في الكود (هل المتصفح يدمجها ولا يحافظ عليها)، و**2) الكسر التلقائي للسطر** لما النص يوصل لآخر الصندوق.

القيم الأساسية:
- **`normal`** (الافتراضي): يدمج المسافات المتكررة والأسطر الجديدة في مسافة واحدة، ويكسر السطر تلقائياً.
- **`nowrap`**: يدمج المسافات **ومبيكسرش** السطر أبداً (كله سطر واحد).
- **`pre`**: يحافظ على كل المسافات والأسطر **ومبيكسرش** تلقائياً (زي وسم `<pre>`).
- **`pre-wrap`**: يحافظ على المسافات والأسطر **ويكسر** لو السطر طويل.
- **`pre-line`**: يدمج المسافات لكن يحافظ على الأسطر الجديدة.

الاستخدام الأشهر: `nowrap` مع [[text-overflow]] لقص النص بنقط، و`pre-wrap` لعرض نص المستخدم (تعليقات) بنفس تنسيقه، و`pre` للكود. وبتتوارث. ولتنظيم كسر الكلمات الطويلة استخدم [[overflow-wrap]] و[[word-break]].

## try

```html
<style>
  div { margin:4px 0; padding:6px 10px; background:#efe0bd; color:#3d2c18; width:200px; }
</style>
<div style="white-space:normal">normal: النص     بيتدمج   ويكسر سطر تلقائياً لما يطول</div>
<div style="white-space:nowrap">nowrap: كله في سطر واحد ومبيكسرش أبداً</div>
```

## syntax

```css nolive
white-space: normal;
white-space: nowrap;
white-space: pre;
white-space: pre-wrap;
white-space: pre-line;
```

- **القيمة المبدئية**: `normal`.
- **بتتوارث؟** أيوه.

## values

### normal
يدمج ويكسر.

### nowrap
يدمج ومبيكسرش.

### pre
يحافظ ومبيكسرش.

### pre-wrap
يحافظ ويكسر.

### pre-line
يدمج المسافات ويحافظ على الأسطر.

## use

- nowrap لأزرار وعناوين قصيرة.
- pre-wrap لنصوص المستخدمين.
- pre للكود.

## avoid

- nowrap على نص طويل في موبايل.
- pre على نص عادي (مسافات كود زيادة).

## examples

### 1) كل القيم
نفس النص بخمس قيم.

```html
<style>
  div { margin:3px 0; padding:4px 8px; background:#efe0bd; color:#3d2c18; width:210px; font-size:.9rem; overflow:auto; }
</style>
<div style="white-space:normal">normal  أ  ب
 ج</div><div style="white-space:nowrap">nowrap  أ  ب
 ج</div><div style="white-space:pre">pre  أ  ب
 ج</div><div style="white-space:pre-wrap">pre-wrap  أ  ب
 ج</div><div style="white-space:pre-line">pre-line  أ  ب
 ج</div>
```



### 2) nowrap لزرار
النص مبيلفش.

```html
<style>
  .b { white-space:nowrap; display:inline-block; background:#c9772f; color:#f3ede0; padding:8px 14px; border-radius:6px; width:120px; overflow:hidden; text-overflow:ellipsis; }
</style>
<span class="b">زرار بعنوان طويل جداً</span>
```



### 3) تعليق مستخدم
pre-wrap يحافظ على الأسطر.

```html
<style>
  .c { white-space:pre-wrap; background:#efe0bd; color:#3d2c18; padding:8px 12px; border-radius:8px; }
</style>
<div class="c">السطر الأول
    سطر بمسافة بادئة
السطر الأخير</div>
```



### 4) pre للكود
الكود بتنسيقه.

```html
<style>
  .p { white-space:pre; background:#3d2c18; color:#f3ede0; padding:8px 12px; border-radius:8px; direction:ltr; text-align:left; font-family:monospace; }
</style>
<div class="p">function hi() {
  return 'hello';
}</div>
```



## mistakes

### nowrap على نص طويل

```css bad
.title { white-space:nowrap; }  /* بيخرج برا الشاشة */
```

```css good
.title { white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
```

أضف قص أو اسمح بالكسر.

### استخدام br لنص المستخدم

```css bad
<p>سطر<br>سطر</p>
```

```css good
p { white-space:pre-line; }
```

CSS تحافظ على الأسطر من غير وسوم.

## quiz

### nowrap معناه؟
- [ ] يكسر السطر
- [x] مبيكسرش السطر
- [ ] يحافظ على المسافات
- [ ] يخفي

سطر واحد.

### للحفاظ على الأسطر مع الكسر؟
- [ ] pre
- [x] pre-wrap
- [ ] nowrap
- [ ] normal

pre-wrap.

### الافتراضي؟
- [x] normal
- [ ] pre
- [ ] nowrap
- [ ] pre-line

normal.

## refs

- [MDN: white-space](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
