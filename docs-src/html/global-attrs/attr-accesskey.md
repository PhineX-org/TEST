---
id: attr-accesskey
kind: attribute
cat: global-attrs
chip: accesskey
title: خاصية مفتاح الاختصار
en: HTML accesskey global attribute
status: stable
support: all
size: compact
mdn: Global_attributes/accesskey
summary: خاصية accesskey بتحدد حرف مفتاح اختصار للوصول للعنصر أو تفعيله بالكيبورد مع مفاتيح تعديل زي Alt. اختلاف المتصفحات وتعارضها مع قارئات الشاشة بيخلّي استخدامها محدود.
keywords: accesskey, مفتاح اختصار, shortcut, Alt, كيبورد, تعارض, إتاحة, accessKeyLabel, اختصار
related: attr-tabindex, button, a, input, attr-title
---

## intro

الـ `accesskey` بتدّي العنصر **حرف اختصار**: لو كتبت `accesskey="s"` على زرار «حفظ»، المستخدم يقدر يدوس **تركيبة مفاتيح** فيتفعّل. التركيبة بتختلف حسب المتصفح والنظام: **Alt + الحرف** في كروم وإيدج (ويندوز)، **Alt + Shift + الحرف** في فايرفوكس، و**Ctrl + Option + الحرف** على ماك.

المشكلة إن الاختصارات دي **بتتعارض** مع اختصارات المتصفح والنظام وقارئات الشاشة، ومفيش طريقة سهلة تعرّف المستخدم بيها. عشان كده معظم أدلة الإتاحة **بتنصح تتجنّبها** وتعتمد على اختصارات جافاسكربت موثّقة أو على التنقل العادي. القيمة ممكن تكون حرف واحد أو **قايمة حروف بمسافة** (المتصفح يختار أول واحد متاح).

## try

```html
<button accesskey="s" onclick="alert('اتحفظ')">حفظ (Alt+S)</button>
<p>جرّب Alt+S (أو Alt+Shift+S في فايرفوكس).</p>
```

## syntax

```html nolive
<button accesskey="s">حفظ</button>
<a href="/help" accesskey="h">مساعدة</a>
```

- `accesskey="s"` — **حرف** الاختصار.
- `accesskey="a b"` — **قايمة بدائل** بمسافة.

## use

- تطبيقات ويب كبيرة بتوثّق اختصاراتها للمستخدم.
- تجارب داخل بيئة معروفة (مثلاً أدوات داخلية).

## avoid

- متعتمدش عليها: بتتعارض مع قارئات الشاشة والمتصفحات.

## examples

### 1) اختصار لرابط
رابط مساعدة.

```html
<a href="#help" accesskey="h" title="مساعدة (Alt+H)">مساعدة</a>
```

- الـ `title` بيعرّف المستخدم بالاختصار.
- بيشتغل بنفس التركيبة حسب المتصفح.
- لازم توثّقه في الصفحة.

### 2) قراءة تركيبة الاختصار
مثال على accessKeyLabel.

```html
<button id="b" accesskey="s">حفظ</button>
<p id="o"></p>
<script>
  document.getElementById('o').textContent = 'التركيبة: ' + (document.getElementById('b').accessKeyLabel || '—');
</script>
```

- `accessKeyLabel` بترجع التركيبة الفعلية للمتصفح الحالي.
- ممتازة لعرض الاختصار الصحيح للمستخدم.
- قد ترجع فاضي لو المتصفح مش بيدعمها.

### 3) قايمة بدائل
حروف متعددة.

```html
<button accesskey="q w">أول حرف متاح</button>
```

- المتصفح بيجرّب `q` أولاً ثم `w`.
- مفيدة لتجنب تعارض.
- الأحرف بتتفصل بمسافة.

## mistakes

### حروف متعارضة مع المتصفح
```html bad
<button accesskey="d">حذف</button>
```
```html good
<!-- جرّب اختصار JS موثّق بدل accesskey -->
```
ليه؟ حروف زي D وF بتتعارض مع قوائم المتصفح. الأفضل تتجنب accesskey.

## a11y

- تتعارض مع اختصارات قارئات الشاشة: دليل WCAG بيحذّر منها.
- لو استخدمتها، وفّر طريقة لتعطيلها أو إعادة تعيينها.

## quiz

### تركيبة accesskey في كروم (ويندوز)؟
- [x] Alt + الحرف
- [ ] Ctrl + الحرف
- [ ] Shift + الحرف
- [ ] Win + الحرف
وتختلف حسب المتصفح.

### ليه بيتجنبوها؟
- [x] بتتعارض مع الاختصارات الأخرى
- [ ] بطيئة
- [ ] مش بتشتغل أبداً
- [ ] بتكلّف
مشاكل إتاحة وتعارض.

## refs

- [MDN: accesskey](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/accesskey)
- [WHATWG: accesskey](https://html.spec.whatwg.org/multipage/interaction.html#the-accesskey-attribute)
