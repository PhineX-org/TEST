---
id: attr-inert
kind: attribute
cat: global-attrs
chip: inert
title: خاصية التعطيل الشامل
en: HTML inert global attribute
status: stable
support: all
mdn: Global_attributes/inert
summary: خاصية inert بتخلّي العنصر وكل اللي جواه غير تفاعلي: مفيش فوكس ولا ضغط ولا قراءة بقارئ الشاشة. مفيدة لعزل خلفية الصفحة وقت ظهور نافذة.
keywords: inert, تعطيل, غير تفاعلي, focus trap, modal, aria-hidden, disabled, boolean, خلفية النافذة
related: attr-hidden, attr-tabindex, dialog, button, attr-popover
---

## intro

تخيّل نافذة تأكيد ظهرت فوق الصفحة. المفروض المستخدم **ميقدرش** يضغط أو يتنقل بالكيبورد في اللي ورا النافذة. زمان كنت بتعمل ده بـ `tabindex="-1"` على كل حاجة و`aria-hidden` وقفل أحداث بالجافاسكربت (مجهود وعرضة للأخطاء). الـ **`inert`** بتعمل ده **بخاصية واحدة** على الحاوية.

العنصر اللي عليه `inert` **وكل اللي جواه**: **مبياخدش فوكس** (لا بالتبويب ولا بالضغط)، **مبيستجيبش لأحداث الماوس**، **مش متاح لقارئ الشاشة** (كأنه مش موجود)، ومش بيتحدّد نصه. لكنه **لسه ظاهر** بصرياً. هي خاصية منطقية (Boolean). فرقها عن [[attr-hidden]]: `hidden` بيخفي كل حاجة، و`inert` بيسيب العنصر ظاهر بس «مجمّد».

## try

فعّل inert وجرّب تضغط على العناصر أو تبوّب عليها.

```html
<style> .box { padding:10px; border:2px solid #22c55e; border-radius:8px; margin:6px 0 } .box[inert] { opacity:.5; border-color:#94a3b8 } </style>
<div class="box" id="b">
  <button>زرار 1</button> <input placeholder="حقل"> <a href="#">رابط</a>
</div>
<button onclick="document.getElementById('b').toggleAttribute('inert')">بدّل inert</button>
```

## syntax

```html nolive
<div inert>
  <button>مش هيشتغل</button>
</div>
```

- `inert` — **خاصية منطقية** (وجودها هو المهم).
- كل **الأحفاد** بيتجمّدوا.
- لتفعيلها برمجياً: `el.inert = true` أو `toggleAttribute("inert")`.

## use

- تجميد خلفية الصفحة وقت نافذة تأكيد.
- تعطيل قسم كامل لحد ما شرط يتحقق.
- منع التفاعل مع محتوى قيد التحميل.
- عزل أجزاء في تطبيقات متعددة الخطوات.

## avoid

- متستخدمهاش لإخفاء عنصر (استخدم `hidden`).
- متحطّش `inert` على عنصر فيه الفوكس الحالي من غير نقل الفوكس.

## examples

### 1) تجميد خلفية وقت النافذة
مثال على background inert.

```html
<div id="app" style="padding:10px; background:#f1f5f9; border-radius:8px">
  <button>إجراء 1</button> <button>إجراء 2</button>
</div>
<button onclick="app.inert = !app.inert; this.textContent = app.inert ? 'فك التجميد' : 'جمّد الخلفية'">جمّد الخلفية</button>
```

- `app.inert = true` بتجمّد القسم بالكامل.
- الأزرار جوه مبتاخدش فوكس ولا بتتدوس.
- ده بديل نظيف لـ focus trap.

### 2) الفرق بين inert وdisabled
disabled لعنصر واحد.

```html
<button disabled>مُعطَّل (زرار واحد)</button>
<div inert style="margin-top:6px"><button>جوه inert</button> <input placeholder="وكمان ده"> <a href="#">ورابط</a></div>
```

- `disabled` للعناصر الأصلية (زرار/حقل) كل واحد لوحده.
- `inert` على حاوية بتجمّد كل ما فيها حتى الروابط والـ div.
- الأخيرة مش بتغيّر الشكل تلقائياً: نسّقها.

### 3) تنسيق inert
[inert] في CSS.

```html
<style>
  [inert] { opacity: .45; filter: grayscale(1); pointer-events: none; }
</style>
<section inert style="padding:10px; border:1px solid #94a3b8"><button>مجمّد</button></section>
```

- بنطبّق شكل «معطّل» على أي عنصر `inert`.
- ملحوظة: `inert` بيمنع الأحداث أصلاً حتى من غير `pointer-events`.
- التنسيق للمستخدم عشان يفهم الحالة.

### 4) تحقق: هل العنصر inert؟
قراءة el.inert.

```html
<div id="x" inert>أنا جامد</div>
<p id="o"></p>
<script>
  document.getElementById('o').textContent = 'inert = ' + document.getElementById('x').inert;
</script>
```

- `el.inert` خاصية منطقية قابلة للقراءة والكتابة.
- ممكن تغيّرها حسب حالة التطبيق.
- بتتزامن مع الخاصية في HTML.

## mistakes

### استخدام inert للإخفاء
```html bad
<div inert>عايز أخفيه</div>
```
```html good
<div hidden>عايز أخفيه</div>
```
ليه؟ `inert` بيسيب العنصر ظاهر. الإخفاء بـ `hidden`.

### aria-hidden على عنصر فيه فوكس
```html bad
<div aria-hidden="true"><button>لسه بياخد فوكس!</button></div>
```
```html good
<div inert><button>مش بياخد فوكس</button></div>
```
ليه؟ `aria-hidden` بيخفي من قارئ الشاشة بس والفوكس بيفضل. `inert` بيعالج الاتنين.

## a11y

- `inert` بيشيل العنصر من شجرة الإتاحة، فتأكد إن ده هو المطلوب فعلاً.
- اشرح للمستخدم (بصرياً) إن القسم مجمّد وليه.
- بعد ما تقفل النافذة، رجّع الفوكس للعنصر اللي فتحها.

## quiz

### إيه اللي بيعمله `inert` على الأحفاد؟
- [x] بيجمّدهم: مفيش فوكس ولا ضغط
- [ ] بيحذفهم
- [ ] بيخفيهم
- [ ] بيكبّرهم
لكنهم ظاهرين.

### الفرق بين `inert` و`hidden`؟
- [x] hidden بيخفي وinert بيجمّد
- [ ] مفيش فرق
- [ ] inert بيخفي
- [ ] hidden بيجمّد
الأول للإخفاء والتاني للتجميد.

### إزاي تفعّل inert بجافاسكربت؟
- [x] `el.inert = true`
- [ ] `el.freeze()`
- [ ] `el.lock()`
- [ ] `el.disabled = true`
خاصية منطقية.

## refs

- [MDN: inert](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/inert)
- [WHATWG: inert](https://html.spec.whatwg.org/multipage/interaction.html#the-inert-attribute)
