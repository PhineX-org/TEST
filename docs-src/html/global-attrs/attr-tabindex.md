---
id: attr-tabindex
kind: attribute
cat: global-attrs
chip: tabindex
title: خاصية ترتيب التبويب
en: HTML tabindex global attribute
status: stable
support: all
mdn: Global_attributes/tabindex
summary: خاصية tabindex بتتحكم هل العنصر ياخد الفوكس بالكيبورد وإزاي. 0 يدخله في الترتيب الطبيعي، و-1 يخلّيه ياخد فوكس برمجي بس، وتجنّب القيم الموجبة.
keywords: tabindex, فوكس, focus, تبويب, tab, كيبورد, keyboard, إتاحة, accessibility, -1, 0
related: attr-autofocus, button, a, attr-inert, attr-accesskey
---

## intro

المستخدم اللي بيستخدم **الكيبورد** بيتنقل بين العناصر التفاعلية بزرار **Tab**: رابط بعد رابط، زرار بعد حقل... العناصر دي (`<a href>` و`<button>` و`<input>`...) **بتاخد الفوكس** لوحدها. لكن الـ `<div>` العادي لأ. وهنا بتيجي `tabindex`.

القيم المهمة: **`tabindex="0"`**: العنصر يدخل في **ترتيب التبويب الطبيعي** (حسب مكانه في الصفحة). **`tabindex="-1"`**: العنصر **مش في ترتيب التبويب**، لكن ينفع تديله فوكس **برمجياً** بـ `el.focus()` (مفيد لنقل الفوكس بعد ما تفتح نافذة أو بعد تنقّل). أما **القيم الموجبة** (`tabindex="3"`) فهي بتعمل ترتيب مخصوص بس **متستخدمهاش**: بتلخبط تجربة المستخدم وبتبوّظ بسهولة.

> [!warn] لو عايز عنصر ينفع يتدوس عليه، استخدم `<button>` أو `<a>` الأول: بياخدوا الفوكس وزرار Enter/Space من غير `tabindex`. `tabindex` مش بديل عن العناصر التفاعلية.

## try

دوس Tab في الكيبورد.

```html
<style> .f { padding:10px; margin:4px; border:2px solid #cbd5e1; border-radius:8px } .f:focus { border-color:#0ea5e9; background:#e0f2fe; outline:none } </style>
<div class="f" tabindex="0">أنا ياخد فوكس (tabindex=0)</div>
<div class="f">أنا div عادي مبياخدش فوكس</div>
<div class="f" tabindex="-1" id="x">أنا -1: فوكس برمجي بس</div>
<button onclick="document.getElementById('x').focus()">انقل الفوكس للـ -1</button>
```

## syntax

```html nolive
<div tabindex="0">...</div>
<div tabindex="-1">...</div>
```

- `0` — **يدخل** ترتيب التبويب الطبيعي.
- `-1` — **مش بيتبوّب** لكن `focus()` بيشتغل عليه.
- قيم موجبة — **متستخدمهاش**.

## use

- عنصر مخصّص (مكوّن) محتاج يبقى قابل للفوكس.
- نقل الفوكس برمجياً لعنصر بعد تغيّر الصفحة (`-1`).
- منطقة قابلة للتمرير بالكيبورد.
- تخطّي عناصر زينة من ترتيب التبويب.

## avoid

- متستخدمش قيم موجبة (`tabindex="5"`).
- متحطّش `tabindex="0"` على كل حاجة: هتبوّظ التنقل.

## section: القيم

- `0`: ياخد الفوكس بالترتيب الطبيعي.
- `-1`: فوكس برمجي بس، ومش بيتبوّب.
- رقم موجب: ترتيب مخصوص (**ممنوع عملياً**).

## examples

### 1) عنصر مخصّص ياخد فوكس
مثال على tabindex=0.

```html
<style> .c:focus-visible { outline: 3px solid #f59e0b } .c { display:inline-block; padding:8px 14px; background:#e2e8f0; border-radius:8px }</style>
<span class="c" role="button" tabindex="0" onkeydown="if(event.key==='Enter'||event.key===' ')alert('اتفعّل')">عنصر شبه زرار</span>
```

- `tabindex="0"` يخلّيه يتبوّب.
- لازم `role` وتعامل مع Enter وSpace بنفسك.
- الأفضل تستخدم `<button>` الحقيقي.

### 2) نقل الفوكس برمجياً
مثال على tabindex=-1.

```html
<button onclick="document.getElementById('msg').focus()">اعرض الرسالة</button>
<p id="msg" tabindex="-1" style="background:#dcfce7; padding:8px; outline:2px solid #22c55e">تمت العملية! (الفوكس هنا)</p>
```

- العنصر مش بيتبوّب لكن `focus()` بينقل ليه.
- قارئ الشاشة بيبدأ يقرا من هنا.
- مفيد بعد تحميل محتوى جديد أو عرض رسالة.

### 3) ترتيب التبويب الطبيعي
حسب مكان العنصر.

```html
<input placeholder="1"> <input placeholder="2"> <input placeholder="3">
<p>دوس Tab: بيمشي 1 ثم 2 ثم 3 حسب ترتيب الكود.</p>
```

- الترتيب الطبيعي = ترتيب الظهور في HTML.
- عشان كده رتّب الـ HTML صح بدل ما تلعب بالـ tabindex.
- الـ CSS (زي `order`) ممكن يلخبط الترتيب البصري عن الفوكس.

### 4) إخراج عنصر من التبويب
tabindex=-1 للزينة.

```html
<a href="#" tabindex="-1">رابط مش عايزه في التبويب (غير ضروري)</a>
<a href="#">رابط عادي</a>
<p>دوس Tab: هيتخطّى الأول.</p>
```

- `-1` بيسحبه من ترتيب التبويب.
- استخدمه بحذر: المستخدم ممكن يحتاجه.
- الأفضل تشيل التفاعل لو مش مفيد.

### 5) قراءة tabIndex بجافاسكربت
مثال على el.tabIndex.

```html
<div id="a" tabindex="0">a</div> <div id="b">b</div>
<p id="o"></p>
<script>
  o.textContent = 'a=' + a.tabIndex + ' | b=' + b.tabIndex;
</script>
```

- العنصر العادي `div` قيمته `-1` افتراضياً (مش بياخد فوكس).
- العناصر الأصلية (button) قيمتها `0`.
- ينفع تغيّرها: `el.tabIndex = 0`.

## mistakes

### استخدام قيم موجبة
```html bad
<input tabindex="3"><input tabindex="1"><input tabindex="2">
```
```html good
<input><input><input>
```
ليه؟ القيم الموجبة بتخلق ترتيب منفصل وهشّ. رتّب الـ HTML بالترتيب المطلوب.

### div بدل button
```html bad
<div tabindex="0" onclick="go()">اضغط</div>
```
```html good
<button type="button" onclick="go()">اضغط</button>
```
ليه؟ الـ button بيدّيك فوكس وEnter وSpace وإتاحة جاهزة من غير شغل إضافي.

## a11y

- خلّي ترتيب التبويب يتبع ترتيب القراءة المنطقي.
- العنصر اللي بياخد فوكس لازم يبان عليه (متشيلش `outline` من غير بديل).
- استخدم `-1` + `focus()` لنقل الفوكس بعد فتح نافذة أو تحميل قسم جديد.

## quiz

### أنهي قيمة تدخل العنصر في التبويب الطبيعي؟
- [x] `0`
- [ ] `-1`
- [ ] `5`
- [ ] `none`
صفر = بالترتيب الطبيعي.

### إيه فايدة `tabindex="-1"`؟
- [x] فوكس برمجي بدون تبويب
- [ ] بيخفي العنصر
- [ ] بيعطّله
- [ ] بيحذفه
بتنقل ليه بـ focus().

### هل نستخدم قيم موجبة؟
- [x] لأ، بتلخبط التنقل
- [ ] أيوه دايماً
- [ ] بس في الفورمز
- [ ] بس مع الـ div
من أسوأ الممارسات.

## refs

- [MDN: tabindex](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/tabindex)
- [WHATWG: The tabindex attribute](https://html.spec.whatwg.org/multipage/interaction.html#attr-tabindex)
