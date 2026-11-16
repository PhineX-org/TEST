---
id: attr-style
kind: attribute
cat: global-attrs
chip: style
title: خاصية التنسيق المباشر
en: HTML style global attribute
status: stable
support: all
mdn: Global_attributes/style
summary: خاصية style بتكتب بيها كود CSS مباشرة على العنصر نفسه. مفيدة للقيم الديناميكية والتجارب السريعة، لكن للتنسيق العادي استخدم class وملف CSS.
keywords: style, تنسيق مباشر, inline style, CSS, style attribute, element.style, خصائص CSS, متغيرات, cssText
related: attr-class, style, attr-id, span
---

## intro

الـ `style` بتخلّيك تكتب **CSS جوه HTML**، على العنصر نفسه مباشرة: `<p style="color: red; font-size: 20px">`. القيمة هي **قايمة تصريحات CSS** (property: value) بتتفصل بـ **فاصلة منقوطة**. ده بيسمّوه **Inline Style**.

مميزاته: بسيط وسريع، وبيكسب في الأولوية على أي قاعدة تانية تقريباً، وممتاز للقيم اللي **بتتغيّر ديناميكياً** (زي عرض شريط تقدّم أو مكان عنصر بتحدّده بجافاسكربت). عيوبه: **مينفعش** تعمل بيه `:hover` أو media queries أو pseudo-elements، وبيكرّر نفس الكود على كل عنصر، وبيصعّب الصيانة. ولو الموقع عليه سياسة CSP صارمة ممكن تمنعه. القاعدة العملية: للتنسيق **الثابت** استخدم [[attr-class]] مع ملف CSS، و`style` للحاجات **المتغيّرة**.

> [!tip] عايز تمرّر قيمة من HTML لـ CSS؟ حط متغيّر CSS في `style`: `style="--w: 60%"`، واستخدمه في ملف CSS بـ `width: var(--w)`.

## try

غيّر اللون أو الحجم.

```html
<p style="color: #0ea5e9; font-size: 22px; font-weight: bold; text-decoration: underline;">نص متنسّق بـ style</p>
```

## syntax

```html nolive
<element style="property: value; خاصية2: قيمة2;">المحتوى</element>
```

- `style="…"` — **الخاصية**.
- `property: value` — **تصريح CSS** واحد.
- `;` — **بيفصل** بين التصريحات.

## use

- قيم ديناميكية: عرض شريط، مكان، لون من بيانات.
- تجارب سريعة وأمثلة صغيرة.
- تمرير متغيّرات CSS لعنصر معيّن.
- رسائل البريد الإلكتروني (HTML emails) اللي مبتدعمش ملفات CSS خارجية بشكل كويس.

## avoid

- متكتبش تنسيق الموقع كله inline: استخدم ملف CSS وclass.
- متتوقعش `:hover` أو media queries جوه style (مش بتشتغل).

## examples

### 1) أكتر من خاصية
فاصلة منقوطة بينهم.

```html
<div style="background:#fef3c7; border:2px solid #f59e0b; padding:12px; border-radius:10px; text-align:center;">
  تنبيه مهم
</div>
```

- كل تصريح بيتفصل عن اللي بعده بـ `;`.
- الأسماء بتتكتب بـ kebab-case (`border-radius` مش `borderRadius`).
- القيمة بتتكتب زي ما هي في ملف CSS.

### 2) تغيير الـ style بجافاسكربت
مثال على element.style.

```html
<p id="t" style="transition:.3s">اضغط الزرار</p>
<button onclick="
  const t = document.getElementById('t');
  t.style.color = 'crimson';
  t.style.fontSize = '28px';
">غيّر</button>
```

- في JS الأسماء بـ camelCase: `fontSize`.
- كل تغيير بيتكتب كـ inline style على العنصر.
- للتنسيق المعقّد الأحسن تبدّل `class`.

### 3) شريط تقدّم بقيمة ديناميكية
عرض من متغيّر.

```html
<div style="background:#e2e8f0; border-radius:99px; overflow:hidden; height:14px">
  <div style="width:65%; height:100%; background:#22c55e"></div>
</div>
<p>التقدّم: 65%</p>
```

- العرض `65%` ممكن يتولّد من السيرفر أو جافاسكربت.
- ده استخدام مناسب لـ `style`: قيمة بتتغيّر مع البيانات.
- تقدر تستخدم العنصر `progress` كبديل أنضف.

### 4) متغيّر CSS في style
تمرير قيمة لـ CSS.

```html
<style>
  .bar { width: var(--w); height: 14px; background: #0ea5e9; border-radius: 99px; }
</style>
<div class="bar" style="--w: 30%"></div><br>
<div class="bar" style="--w: 80%"></div>
```

- الشكل ثابت في الـ CSS، والقيمة المتغيّرة في `style`.
- اسم المتغيّر بيبدأ بشرطتين `--`.
- ده أسلوب نظيف بيجمع بين الاتنين.

### 5) حدود inline style
مفيش hover.

```html
<style>
  .a:hover { background: #bbf7d0; }
</style>
<p class="a" style="padding:10px; border:1px solid #94a3b8">الكلاس بيدعم hover</p>
<p style="padding:10px; border:1px solid #94a3b8">ومش ممكن تكتب hover جوه style</p>
```

- الفقرة الأولى بتتغيّر لما تقف عليها لأن `:hover` في ملف CSS.
- `style=":hover{}"` مش بتشتغل: الـ style مجرد تصريحات.
- عشان كده التنسيق التفاعلي مكانه ملف CSS.

## mistakes

### ربط بين الخاصية والقيمة بـ =
```html bad
<p style="color = red">نص</p>
```
```html good
<p style="color: red">نص</p>
```
ليه؟ الصيغة نقطتين `:` مش `=`.

### نسيان الفاصلة المنقوطة بين التصريحات
```html bad
<p style="color: red font-size: 20px">نص</p>
```
```html good
<p style="color: red; font-size: 20px">نص</p>
```
ليه؟ من غير `;` المتصفح مش هيفهم التصريحين.

## a11y

- لو بتخفي نص بـ `display:none` inline، هو بيتخفي من قارئ الشاشة كمان.
- اتأكد إن تباين الألوان كافي وحجم الخط معقول، حتى لو مكتوبين inline.
- متستخدمش `style` علشان تبيّن حاجة مهمة بس باللون من غير نص يوضّحها.

## quiz

### بتكتب `style` ازاي؟
- [x] `style="color: red;"`
- [ ] `style="color = red"`
- [ ] `style={color:red}`
- [ ] `style=color:red`
property: value وبينهم ;

### إيه الأفضل للتنسيق العام للموقع؟
- [x] ملف CSS وclass
- [ ] style على كل عنصر
- [ ] عنصر `<font>`
- [ ] عنصر `<center>`
ملف CSS أسهل في الصيانة.

### هل ينفع نكتب `:hover` في `style`؟
- [x] لأ
- [ ] أيوه
- [ ] بس في كروم
- [ ] بس مع `!important`
مينفعش.

## refs

- [MDN: style](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/style)
- [WHATWG: The style attribute](https://html.spec.whatwg.org/multipage/dom.html#the-style-attribute)
