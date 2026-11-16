---
id: class-selector
kind: selector
cat: selectors
chip: .class
title: محدد الـ class
en: Class selector
status: stable
support: all
mdn: Class_selectors
summary: محدد الـ class (.name) هو الأكتر استخداماً في CSS: بتحط class على أي عدد من العناصر وتنسقهم كلهم مع بعض بمرونة.
keywords: class selector, .class, محدد الكلاس, class, اسم الكلاس, reusable, BEM, تسمية
related: id-selector, type-selector, selectors-guide, specificity
---

## intro

**محدد الـ class** بيبدأ بنقطة قبل اسم الـ class: `.card`. بيختار **أي عنصر** في الصفحة فيه `class="card"` في الـ HTML، من أي نوع (div أو p أو span).

ده **أهم محدد** في الشغل اليومي لأسباب:
- **قابل لإعادة الاستخدام**: نفس الـ class على 100 عنصر.
- **مرن**: العنصر الواحد ممكن يبقى عليه **كذا class** مفصولين بمسافة: `class="btn btn-primary big"` وكل class بيضيف تنسيق.
- **specificity معتدلة** (0,1,0)، فمش بتعمل مشاكل أولويات زي الـ id.

وتقدر تدمج الكلاسات: `.btn.primary` (من غير مسافة) بيختار العنصر اللي عليه **الاتنين**.

قواعد تسمية الـ class: تبدأ بحرف (أو `-` أو `_` + حرف)، ومبتحتويش مسافات. الأحرف حساسة للحالة (`.Card` ≠ `.card`). والأفضل أسماء بمعنى ووصفية (`.product-card`) بدل الشكل (`.red-box`).

> [!analogy] الـ class زي «بادج» بتعلقها على الناس: «طالب» و«مشرف». ممكن حد واحد يبقى عليه كذا بادج، وكذا شخص يشاركوا نفس البادج.

> [!key] الـ classes هي الأداة الرئيسية. لو في شك، استخدم class.

## try

```html
<style>
  .tag { display:inline-block; background:#7a4a1d; color:#f3ede0; padding:4px 12px;
         border-radius:14px; margin:3px; }
  .tag.alt { background:#3d7a5a; }
</style>
<span class="tag">HTML</span><span class="tag alt">CSS</span><span class="tag">JS</span>
```

## syntax

```css nolive
.card { padding: 16px; }
.btn.primary { background: #7a4a1d; }
p.note { color: #3d7a5a; }
```

- النقطة `.` ثم اسم الـ class.
- `.a.b` من غير مسافة = العنصر عليه الاتنين.
- `p.note` = فقرة عليها class note.

## use

- أي مكوّن بتكرره: كروت، أزرار، تنبيهات.
- تنسيقات مساعدة (`.hidden`, `.text-center`).
- الاختيار الافتراضي لأي تنسيق مخصص.

## avoid

- أسماء بتوصف الشكل (`.red`) لأنها بتبوظ لو الشكل اتغيّر.
- أسماء عامة جداً زي `.box` و`.item` في مشاريع كبيرة (تتصادم).

## examples

### 1) نفس الـ class على أكتر من عنصر
كلهم بياخدوا نفس التنسيق.

```html
<style>
  .note { background:#efe0bd; color:#3d2c18; padding:8px 12px; border-right:4px solid #c9772f; margin:6px 0; }
</style>
<p class="note">ملاحظة 1</p><div class="note">ملاحظة 2 (div)</div>
```

- العنصر ممكن يكون أي نوع.

### 2) أكتر من class
العنصر عليه `btn` و`primary` فبياخد تنسيق الاتنين.

```html
<style>
  .btn { padding:8px 18px; border:0; border-radius:8px; background:#e4c490; color:#3d2c18; }
  .primary { background:#7a4a1d; color:#f3ede0; }
</style>
<button class="btn">عادي</button> <button class="btn primary">رئيسي</button>
```



### 3) دمج الكلاسات
`.btn.big` يختار العنصر اللي عليه الاتنين.

```html
<style>
  .btn { padding:6px 12px; background:#bcd4a8; color:#3d2c18; border:0; }
  .btn.big { padding:14px 28px; font-size:1.2rem; }
</style>
<button class="btn">عادي</button> <button class="btn big">كبير</button>
```



### 4) نوع + class
`p.warn` بيطبّق على الفقرات بس.

```html
<style>
  p.warn { color:#a63b2f; font-weight:bold; }
</style>
<p class="warn">فقرة تحذير</p><div class="warn">div بنفس الـ class مش متأثر</div>
```



## mistakes

### نسيان النقطة

```css bad
card { padding:10px; }  /* بيدوّر على عنصر <card> */
```

```css good
.card { padding:10px; }
```

من غير النقطة ده محدد نوع.

### مسافة بين الكلاسات في CSS

```css bad
.a .b { color:red; }  /* b جوه a */
```

```css good
.a.b { color:red; }  /* عنصر عليه الاتنين */
```

المسافة معناها نسل، مش اجتماع.

## quiz

### أنهي محدد بيختار class اسمه menu؟
- [ ] menu
- [ ] #menu
- [x] .menu
- [ ] *menu

النقطة قبل الاسم.

### `.a.b` بيختار؟
- [ ] b جوه a
- [x] عنصر عليه الاتنين
- [ ] a أو b
- [ ] أخ

من غير مسافة.

### العنصر ممكن يبقى عليه كام class؟
- [ ] واحد
- [ ] اتنين
- [x] أي عدد
- [ ] مفيش

مفصولين بمسافات في `class`.

## refs

- [MDN: .class](https://developer.mozilla.org/en-US/docs/Web/CSS/Class_selectors)
- [MDN: Class selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/Class_selectors)
