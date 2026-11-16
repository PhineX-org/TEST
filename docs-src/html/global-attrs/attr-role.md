---
id: attr-role
kind: attribute
cat: global-attrs
chip: role
title: خاصية الدور
en: HTML role global attribute (ARIA)
status: stable
support: all
mdn: Global_attributes/role
summary: خاصية role بتعرّف دور العنصر لتقنيات المساعدة (زرار، قايمة، تبويب، تنبيه) من ARIA. القاعدة الذهبية: استخدم العنصر الأصلي الأول، وrole للحالات الخاصة بس.
keywords: role, ARIA, دور, button, alert, tablist, navigation, presentation, none, إتاحة, accessibility, قارئ الشاشة
related: attr-aria, attr-tabindex, button, nav, attr-hidden
---

## intro

قارئ الشاشة بيفهم الصفحة عن طريق **شجرة الإتاحة**، وكل عنصر فيها ليه **دور (role)**: `<button>` دوره زرار، `<nav>` دوره تنقل، `<h1>` عنوان. العناصر الأصلية بتاخد دورها تلقائي. لما تبني عنصر **مخصّص** (زي `<div>` بيتصرف كزرار)، القارئ مبيعرفش دوره، فبتستخدم **`role="button"`** عشان تقوله.

**القاعدة الذهبية في ARIA: متستخدمهاش لو فيه عنصر HTML أصلي بيعمل نفس الشغل.** `<button>` أحسن من `<div role="button">` لأن الأول جاي معاه فوكس وEnter وSpace جاهزين، والتاني لازم تعمله بإيدك. استخدام `role` الصح: أدوار الـ **Landmarks** (`main` و`navigation`)، وأدوار الـ **widgets** (`tablist` و`tab` و`dialog`)، و`alert` للتنبيهات اللي تتعلن فوراً، و`presentation`/`none` لإزالة المعنى من عنصر شكلي.

> [!warn] **أول قاعدة في ARIA:** لو في عنصر HTML جاهز بيعمل المطلوب، استخدمه. `role` على `div` معناها إنك مسؤول عن الكيبورد والفوكس والحالة.

## try

```html
<div role="alert" style="padding:10px; background:#fee2e2; border-radius:8px">تم حذف الملف!</div>
<div role="button" tabindex="0" style="display:inline-block; margin-top:8px; padding:8px 16px; background:#e2e8f0; border-radius:8px; cursor:pointer" onkeydown="if(event.key==='Enter'||event.key===' ') alert('تمام')" onclick="alert('تمام')">زرار مخصّص</div>
```

## syntax

```html nolive
<element role="اسم-الدور">...</element>
```

- `role="…"` — **دور** من أدوار ARIA.
- بتغيّر الدور في شجرة الإتاحة، **مش** السلوك.

## use

- مكوّنات مخصّصة مفيش لها عنصر أصلي (تبويبات، شجرة).
- تنبيهات فورية: `role="alert"`.
- إخفاء معنى عنصر شكلي: `role="presentation"`.
- توضيح هيكل الصفحة (landmarks) عند الحاجة.

## avoid

- متحطّش `role` يطابق دور العنصر الأصلي (`<button role="button">`).
- متغيّرش دور عنصر أصلي لدور مختلف تماماً من غير داعي.

## section: أشهر الأدوار

- **widgets:** `button` `checkbox` `tab` `tablist` `tabpanel` `dialog` `menu` `slider`.
- **landmarks:** `main` `navigation` `banner` `contentinfo` `search` `complementary`.
- **live regions:** `alert` `status` `log`.
- **بدون معنى:** `presentation` و`none`.

## examples

### 1) تبويبات ARIA
tablist وtab.

```html
<div role="tablist">
  <button role="tab" aria-selected="true">HTML</button>
  <button role="tab" aria-selected="false">CSS</button>
</div>
<div role="tabpanel">محتوى تبويب HTML</div>
```

- كل أدوار التبويبات بتشتغل مع بعض.
- بتوصف لقارئ الشاشة إن دي مجموعة تبويبات.
- محتاج تتحكم في `aria-selected` بجافاسكربت.

### 2) alert للتنبيه الفوري
مثال على alert.

```html
<div id="a"></div>
<button onclick="document.getElementById('a').innerHTML='<div role=&quot;alert&quot; style=&quot;padding:8px;background:#fef3c7&quot;>جلسة منتهية!</div>'">اعرض تنبيه</button>
```

- قارئ الشاشة بيقرا المحتوى فوراً لما يظهر.
- استخدمه للأخطاء المهمة بس.
- مفيش داعي لـ `aria-live` معاه.

### 3) إزالة المعنى
مثال على presentation.

```html
<table role="presentation" style="border-collapse:collapse">
  <tr><td style="padding:6px; border:1px solid #cbd5e1">تخطيط</td><td style="padding:6px; border:1px solid #cbd5e1">فقط</td></tr>
</table>
```

- الجدول هنا للشكل، مش بيانات.
- `presentation` بتشيل معنى الجدول لقارئ الشاشة.
- الأفضل تستخدم CSS Grid للتخطيط.

### 4) الأصلي أحسن
button وdiv.

```html
<button onclick="alert('أصلي')">زرار أصلي (فوكس وEnter جاهزين)</button>
<div role="button" tabindex="0" onclick="alert('مخصّص')" style="display:inline-block; padding:6px 12px; background:#e2e8f0; cursor:pointer">مخصّص (محتاج شغل)</div>
```

- الأصلي بيشتغل بالكيبورد من غير كود.
- المخصّص لازم تضيف `tabindex` ومعالج Enter/Space.
- تفضيل الأصلي دايماً.

### 5) قراءة الدور
مثال على el.role.

```html
<div id="x" role="status">جاري التحميل</div>
<p id="o"></p>
<script>document.getElementById('o').textContent = 'role = ' + document.getElementById('x').role;</script>
```

- `el.role` مدعومة في المتصفحات الحديثة.
- بترجّع قيمة الخاصية.
- للأدوار الضمنية استخدم أدوات الإتاحة في DevTools.

## mistakes

### role زيادة على عنصر أصلي
```html bad
<button role="button">حفظ</button>
```
```html good
<button>حفظ</button>
```
ليه؟ العنصر الأصلي أصلاً له الدور ده. التكرار مالوش فايدة.

### div بدور زرار من غير سلوك
```html bad
<div role="button">اضغط</div>
```
```html good
<button type="button">اضغط</button>
```
ليه؟ الـ role بتغيّر الوصف بس: مفيش فوكس ولا Enter ولا Space.

## a11y

- اختبر بقارئ شاشة (NVDA أو VoiceOver) مش بس بالعين.
- كل دور له خصائص ARIA مطلوبة (مثلاً `tab` محتاج `aria-selected`).
- ARIA الغلط أسوأ من مفيش ARIA.

## quiz

### أول قاعدة في ARIA؟
- [x] استخدم العنصر الأصلي لو موجود
- [ ] حط role على كل شيء
- [ ] استخدم div دايماً
- [ ] متستخدمش HTML
الأصلي أولاً.

### هل `role="button"` على `div` بيضيف فوكس وEnter؟
- [x] لأ، لازم تعملهم بنفسك
- [ ] أيوه
- [ ] أحياناً
- [ ] بس على الموبايل
بتغيّر الدور فقط.

### أنهي دور للتنبيه الفوري؟
- [x] `alert`
- [ ] `main`
- [ ] `tab`
- [ ] `presentation`
بتتعلن فوراً.

## refs

- [MDN: role](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/role)
- [W3C: ARIA in HTML](https://www.w3.org/TR/html-aria/)
