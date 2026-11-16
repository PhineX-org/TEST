---
id: attr-events
kind: attribute
cat: global-attrs
chip: on*
title: خصائص الأحداث (onclick وأخواتها)
en: HTML event handler content attributes (on*)
status: stable
support: all
mdn: Global_attributes#event_handler_attributes
summary: خصائص الأحداث زي onclick وoninput وonsubmit بتخلّيك تكتب كود جافاسكربت يتنفّذ لما حدث يحصل على العنصر. سهلة للتجارب، لكن addEventListener أنضف ومناسب للمشاريع.
keywords: onclick, oninput, onchange, onsubmit, onload, onerror, onmouseover, onkeydown, event handler, addEventListener, أحداث, inline
related: button, form, input, attr-id, script
---

## intro

أي عنصر في HTML بيقدر **يسمع لأحداث**: ضغطة (`click`)، كتابة (`input`)، إرسال فورم (`submit`)، تحميل صورة (`load`). أبسط طريقة تربط حدث بكود: خاصية بتبدأ بـ **`on`** + اسم الحدث، وقيمتها **كود جافاسكربت**: `<button onclick="alert('أهلاً')">`. جوه الكود ده `this` هو العنصر، و`event` هو كائن الحدث.

دي بسيطة جداً وبتناسب **الأمثلة والتجارب السريعة** (وكتير من أمثلة الموسوعة دي بتستخدمها). لكن في المشاريع الحقيقية الأفضل `addEventListener` في ملف جافاسكربت: بتفصل الكود عن HTML، وبتسمح بأكتر من مستمع، وبتشتغل مع سياسات الأمان (CSP) اللي بتمنع الـ inline handlers.

> [!tip] للمشاريع: `el.addEventListener("click", fn)` أنضف وأقوى. الـ `onclick` الـ inline للتجارب السريعة.

## try

```html
<button onclick="this.textContent = 'اتدوست!'; this.style.background = '#bbf7d0'">اضغط عليّ</button>
<input oninput="document.getElementById('o').textContent = this.value" placeholder="اكتب…">
<p id="o"></p>
```

## syntax

```html nolive
<element onevent="كود جافاسكربت">
<button onclick="alert('أهلاً')">زرار</button>
```

- `onclick` و`oninput`… — **on + اسم الحدث**.
- القيمة — **كود جافاسكربت** بيتنفّذ.
- `this` — **العنصر**، و`event` — **الحدث**.

## use

- تجارب وأمثلة سريعة.
- ربط بسيط لزرار بدالة.
- تعلّم فكرة الأحداث.

## avoid

- متستخدمهاش في مشاريع كبيرة: خلّي الجافاسكربت في ملف.
- متكتبش كود طويل جوه الخاصية.

## section: أشهر الأحداث

- **فأرة:** `onclick` `ondblclick` `onmouseover` `onmouseout`.
- **لوحة المفاتيح:** `onkeydown` `onkeyup`.
- **فورم:** `onsubmit` `onchange` `oninput` `onfocus` `onblur`.
- **تحميل:** `onload` `onerror`.

## examples

### 1) استدعاء دالة
مثال على onclick.

```html
<button onclick="greet('أحمد')">ألقِ التحية</button>
<p id="o"></p>
<script>function greet(n) { document.getElementById('o').textContent = 'أهلاً يا ' + n + '!'; }</script>
```

- الخاصية بتنادي دالة معرّفة في `<script>`.
- ده أنضف من كتابة كود طويل جوه الخاصية.
- بتمرّر بيانات كوسائط.

### 2) كائن الحدث event
مفتاح الكيبورد.

```html
<input onkeydown="document.getElementById('k').textContent = 'ضغطت: ' + event.key" placeholder="اكتب أي زرار">
<p id="k"></p>
```

- `event` متاح تلقائياً في الـ inline handler.
- `event.key` بيعرفك الزرار.
- ينفع `event.preventDefault()` لمنع السلوك الافتراضي.

### 3) منع إرسال الفورم
مثال على onsubmit.

```html
<form onsubmit="event.preventDefault(); document.getElementById('r').textContent = 'اتبعت: ' + this.n.value">
  <input name="n" placeholder="اسمك"> <button>إرسال</button>
</form>
<p id="r"></p>
```

- `preventDefault()` بيمنع تحميل الصفحة.
- `this` هو الفورم، فـ `this.n` هو الحقل.
- ده نمط شائع في الأمثلة.

### 4) الأسلوب الأحسن
مثال على addEventListener.

```html
<button id="b">اضغط</button>
<p id="o"></p>
<script>
  document.getElementById('b').addEventListener('click', () => {
    document.getElementById('o').textContent = 'استخدمت addEventListener';
  });
</script>
```

- الكود في `<script>` أو ملف خارجي.
- ينفع تضيف أكتر من مستمع لنفس الحدث.
- متوافق مع CSP الصارمة.

### 5) تحميل صورة وفشلها
onload وonerror.

```html
<img alt="" width="60" height="30" src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='60' height='30'><rect width='60' height='30' fill='%2322c55e'/></svg>" onload="document.getElementById('m').textContent='اتحمّلت ✅'">
<img alt="" src="مش-موجودة.png" onerror="document.getElementById('m').textContent='فشلت ❌'">
<p id="m"></p>
```

- `onload` بيشتغل لما تتحمّل.
- `onerror` لما فشل التحميل.
- مفيد لعرض صورة بديلة.

## mistakes

### استدعاء دالة بدل تمريرها
```html bad
<button onclick="go">اضغط</button>
```
```html good
<button onclick="go()">اضغط</button>
```
ليه؟ في الـ inline handler لازم تكتب استدعاء `go()` بأقواس.

### حروف كبيرة
```html bad
<button onClick="go()">اضغط</button>
```
```html good
<button onclick="go()">اضغط</button>
```
ليه؟ الأفضل تكتبها حروف صغيرة كلها (HTML مش حساسة لكن ده المتّبع).

## a11y

- اعمل الأحداث على عناصر تفاعلية أصلية (`button`, `a`) علشان الكيبورد يشتغل.
- متعتمدش على `onmouseover` لوحدها: وفّر نفس الوظيفة بالفوكس (`onfocus`).
- لو `onclick` على `div`، ضيف `tabindex` و`role` ومعالج للكيبورد.

## quiz

### إيه اللي في قيمة `onclick`؟
- [x] كود جافاسكربت
- [ ] اسم ملف
- [ ] لون
- [ ] رابط
كود بيتنفّذ.

### الأفضل للمشاريع؟
- [x] `addEventListener`
- [ ] `onclick` inline
- [ ] الاتنين سواء
- [ ] `onpress`
فصل الكود.

### إزاي تمنع إرسال الفورم؟
- [x] `event.preventDefault()`
- [ ] `event.stop()`
- [ ] `return null`
- [ ] `this.cancel()`
يمنع السلوك الافتراضي.

## refs

- [MDN: Event handler attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes#event_handler_attributes)
- [MDN: addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
