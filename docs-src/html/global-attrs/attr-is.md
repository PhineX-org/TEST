---
id: attr-is
kind: attribute
cat: global-attrs
chip: is
title: خاصية العنصر المخصّص المبني
en: HTML is global attribute
status: stable
support: limited
support_note: سفاري مبيدعمش الـ customized built-in elements، فاستخدم عناصر مخصّصة مستقلة لو محتاج تدعم سفاري.
size: compact
mdn: Global_attributes/is
summary: خاصية is بتخلّي عنصر HTML جاهز (زي button) يتصرّف كنسخة مخصّصة من مكوّن اتعرّف بـ customElements مع extends. دعمها غير موجود في سفاري.
keywords: is, customized built-in, extends, custom element, button is, HTMLButtonElement, web components, عنصر مخصص
related: attr-slot, attr-part, button, template, slot
---

## intro

فيه طريقتين لعمل عنصر مخصّص: **(1) عنصر مستقل** باسم جديد (`<my-card>`)، و**(2) نسخة مخصّصة من عنصر موجود** (customized built-in)، يعني تاخد `<button>` وتزوّد له قدرات، وتفضل محتفظ بكل إمكانياته الأصلية (إتاحة، فورم، فوكس). النوع التاني بتستخدمه بـ **`is`**: `<button is="fancy-button">`. وفي جافاسكربت بتعرّفه بـ `customElements.define("fancy-button", Class, { extends: "button" })`.

⚠️ **سفاري (WebKit) رافض يدعم النوع ده**، فكتير بيفضّلوا العنصر المستقل مع Shadow DOM. استخدم `is` لو هتحتاج تحسين تدريجي (التطبيق يفضل شغال لو الـ define فشل).

## try

```html
<button is="count-button" style="padding:8px 16px">العدّ: 0</button>
<script>
  customElements.define('count-button', class extends HTMLButtonElement {
    connectedCallback() { let n = 0; this.addEventListener('click', () => this.textContent = 'العدّ: ' + (++n)); }
  }, { extends: 'button' });
</script>
```

## syntax

```html nolive
<button is="اسم-مخصّص">زرار</button>
<script>
  customElements.define('اسم-مخصّص', class extends HTMLButtonElement {}, { extends: 'button' });
</script>
```

- `is="name"` — **اسم** النسخة المخصّصة.
- `{ extends: "button" }` — **العنصر** الأساسي في التعريف.

## use

- زيادة قدرات عنصر أصلي مع الحفاظ على إمكانياته.
- تحسين تدريجي مع بدائل لسفاري.

## avoid

- متعتمدش عليها لو لازم تدعم سفاري.

## examples

### 1) رابط بتأكيد
a مخصّص.

```html
<a is="confirm-link" href="#" style="color:#0369a1">احذف الحساب</a>
<script>
  customElements.define('confirm-link', class extends HTMLAnchorElement {
    connectedCallback() { this.addEventListener('click', e => { e.preventDefault(); this.textContent = 'اتأكد (تم الضغط)'; }); }
  }, { extends: 'a' });
</script>
```

- بنحافظ على إمكانيات `<a>` الأصلية.
- `is` بتربط العنصر بتعريف الـ class.
- ممكن نضيف سلوك من غير تغيير HTML.

### 2) العنصر المستقل (البديل)
متوافق مع سفاري.

```html
<x-btn>زرار</x-btn>
<script>
  customElements.define('x-btn', class extends HTMLElement {
    connectedCallback() { this.style.cssText = 'display:inline-block;padding:8px 16px;background:#0ea5e9;color:#fff;border-radius:8px;cursor:pointer'; this.setAttribute('role','button'); this.tabIndex = 0; }
  });
</script>
```

- بيشتغل في كل المتصفحات.
- لازم تضيف الإتاحة بنفسك (`role` و`tabindex`).
- ده البديل الشائع لـ `is`.

### 3) فحص الدعم
مثال على feature detection.

```html
<p id="o"></p>
<script>
  let ok = true;
  try { customElements.define('t-b', class extends HTMLButtonElement {}, { extends: 'button' }); document.createElement('button', { is: 't-b' }); } catch (e) { ok = false; }
  document.getElementById('o').textContent = ok ? 'المتصفح بيدعم is' : 'المتصفح مش بيدعم is';
</script>
```

- مش كل المتصفحات بتدعمها.
- افحص الدعم قبل الاعتماد.
- وفّر بديل مستقل.

## mistakes

### is من غير تعريف
```html bad
<button is="my-btn">زرار</button>   <!-- ولا define -->
```
```html good
<button is="my-btn">زرار</button>
<script>customElements.define('my-btn', class extends HTMLButtonElement {}, { extends: 'button' });</script>
```
ليه؟ الـ `is` لوحدها مبتعملش حاجة: لازم تعريف بـ `customElements.define` ومعاه `extends`.

## a11y

- الميزة إنك بتحتفظ بالإتاحة الأصلية للعنصر المبني (زرار حقيقي).
- العناصر المستقلة محتاجة `role` وفوكس وكيبورد بنفسك.

## quiz

### وظيفة `is`؟
- [x] تحويل عنصر جاهز لنسخة مخصّصة
- [ ] تغيير لغة العنصر
- [ ] تعطيله
- [ ] إخفاؤه
customized built-in.

### أي متصفح مبيدعمهاش؟
- [x] سفاري
- [ ] كروم
- [ ] فايرفوكس
- [ ] إيدج
WebKit.

## refs

- [MDN: is](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/is)
- [MDN: Using custom elements](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements)
