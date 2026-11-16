---
id: menu
kind: element
cat: lists
tag: menu
title: قايمة الأدوات (menu)
en: HTML menu element
status: stable
display: block
void: no
support: all
summary: عنصر menu هو بديل دلالي لـ ul لقايمة أوامر أو أدوات تفاعلية (زي شريط أدوات)، وسلوكه وشكله زي ul بالظبط في المتصفحات، ومش للمنيو الرئيسي للموقع (ده nav).
keywords: menu, قايمة أدوات, toolbar, أوامر, شريط أدوات, ul, قايمة تفاعلية, context menu, أزرار
related: ul, li, nav, button, ol
size: compact
---

## intro

اسم `<menu>` مضلّل: الناس بتفتكره «منيو الموقع» (الروابط الرئيسية). لكن ده شغل `<nav>` مع `<ul>`. الـ `<menu>` معناه في المواصفة الحديثة: **قايمة أوامر أو أدوات** تفاعلية، زي شريط أدوات محرر نصوص: «غامق، مائل، تسطير، نسخ، لصق». يعني مجموعة أزرار بتنفّذ حاجات.

عملياً، الـ `<menu>` **متطابق مع `<ul>`** في السلوك والشكل: أبناؤه `<li>`، وبيتعرض بنقط، ومتصفحات بتعامله زي قايمة غير مرتبة (role `list`). الفرق **دلالي بس**: بتقول للقارئ «دي مجموعة أوامر». ولسه ملهوش استخدام شائع جداً، لأن أغلب الناس بتستخدم `<ul>` لكل حاجة.

فتقدر تستخدم `<menu>` لما عندك فعلاً **شريط أدوات** (Toolbar) من أزرار، وده أنسب من `<ul>` لأنه بيعبّر عن «أوامر». لكن لو بتعمل منيو موقع، فـ `<nav>` + `<ul>`. وكان فيه في HTML 5.0 دعم لـ context menus (`type="context"`) لكنه اتشال ومتستخدمهوش.

> [!key] `<menu>` ≈ `<ul>` لأوامر وأدوات. منيو الموقع = `<nav>` + `<ul>`.

## try

```html
<menu style="display:flex; gap:6px; padding:0; list-style:none">
  <li><button>غامق</button></li>
  <li><button>مائل</button></li>
  <li><button>تسطير</button></li>
</menu>
```

## syntax

```html nolive
<menu>
  <li><button>أمر 1</button></li>
  <li><button>أمر 2</button></li>
</menu>
```

- `<menu>` — **الوسم الافتتاحي**.
- `<li>` — كل أمر (زرار غالباً).
- `</menu>` — **الوسم الختامي** إجباري.

## use

- لشريط أدوات (غامق/مائل/نسخ).
- لقايمة أوامر تفاعلية.

## avoid

- متستخدمهوش لمنيو الموقع: `<nav>`.

## attributes

مالوش خصائص خاصة، بيقبل **الخصائص العامة** ([[global-attributes]]).

### type {deprecated}
كانت `type="context"` لقوايم السياق. **قديمة** واتشالت.

### class
للتنسيق.

## examples

### 1) شريط أدوات
أزرار أوامر.

```html
<menu style="display:flex; gap:6px; padding:0; list-style:none">
  <li><button>نسخ</button></li>
  <li><button>لصق</button></li>
  <li><button>قص</button></li>
</menu>
```

- كل `<li>` فيه زرار أمر.
- الشكل الأفقي من CSS، والمعنى «قايمة أوامر».
- لو بدّلت `menu` بـ `ul` هيشتغل نفس الشيء.

### 2) menu مقابل ul
متطابقين في الشكل.

```html
<menu><li>عنصر 1</li><li>عنصر 2</li></menu>
<ul><li>عنصر 1</li><li>عنصر 2</li></ul>
```

- الاتنين بيتعرضوا بنفس النقط.
- الفرق في الدلالة بس.

### 3) شريط أدوات بتفاعل
مع جافاسكربت.

```html
<menu style="display:flex; gap:6px; padding:0; list-style:none">
  <li><button onclick="t.style.fontWeight='bold'">غامق</button></li>
  <li><button onclick="t.style.fontStyle='italic'">مائل</button></li>
  <li><button onclick="t.removeAttribute('style')">إلغاء</button></li>
</menu>
<p id="t">نص للتجربة</p>
```

- الأزرار بتغيّر شكل النص.
- ده الاستخدام الحقيقي لـ `<menu>`: أوامر على محتوى.

## rules

- parents: أي عنصر بيقبل **Flow content**.
- children: `<li>` (وعناصر الدعم).
- closing: الوسم الختامي `</menu>` إجباري.
- role: `list`.
- dom: `HTMLMenuElement`.
- layout: `display: block`، زي `<ul>`.

## mistakes

### menu لمنيو الموقع
```html bad
<menu><li><a href="/">الرئيسية</a></li></menu>
```
```html good
<nav><ul><li><a href="/">الرئيسية</a></li></ul></nav>
```
ليه؟ منيو الروابط الرئيسية مكانه `<nav>`.

## a11y

- بيتعلن كقايمة زي `<ul>`.
- الأزرار جواه لازم تبقى `<button>` حقيقية.

## tips

- لو متأكدش، استخدم `<ul>`.
- `<menu>` اختياري ومش ضروري.

## quiz

### أنهي أنسب لـ `<menu>`؟
- [ ] منيو الموقع
- [x] شريط أدوات
- [ ] جدول
- [ ] عنوان
قايمة أوامر.

### إيه علاقته بـ `<ul>`؟
- [x] نفس السلوك، دلالة مختلفة
- [ ] مفيش علاقة
- [ ] أسرع
- [ ] أقدم
متطابقين عملياً.

## refs

- [MDN: menu](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/menu)
- [WHATWG: The menu element](https://html.spec.whatwg.org/multipage/grouping-content.html#the-menu-element)
