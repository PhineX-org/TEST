---
id: hover
kind: pseudoclass
cat: pc-user
chip: :hover
title: تمرير الماوس
en: CSS :hover pseudo-class
status: stable
support: all
mdn: :hover
summary: الحالة hover بتنطبق لما المؤشر يقف فوق العنصر. أساس تأثيرات الأزرار والروابط والبطاقات، مع الانتباه إنها مبتشتغلش على اللمس.
keywords: :hover, hover, تمرير الماوس, mouse over, تأثير, pseudo-class, زرار
related: active, focus, focus-visible, transition, pseudo-guide
---

## intro

`:hover` هي **حالة (pseudo-class)** بتنطبق على العنصر **طول ما مؤشر الماوس واقف فوقه**. أول ما الماوس يمشي، القاعدة بتتلغي والعنصر يرجع لشكله الطبيعي. بنكتبها بعد المحدد مباشرة من غير مسافة: `button:hover`.

بتستخدمها في كل حاجة تقريباً: تغيير لون زرار، رفع بطاقة بظل، إظهار قايمة فرعية، تكبير صورة. والسر إنك **تدمجها مع [[transition]]** عشان التغيير يبقى ناعم مش مفاجئ.

تنبيهات مهمة جداً:
- **على الموبايل مفيش hover حقيقي** (اللمس). بعض المتصفحات بتحاكيه بعد اللمس وبيفضل «عالق». فمتخلّيش وظيفة مهمة (زي فتح قايمة) تعتمد على hover فقط. استخدم `@media (hover: hover)` لتطبيق التأثير على الأجهزة اللي فعلاً ليها ماوس ([[at-media]]).
- **للوصولية**: اللي بيستخدم الكيبورد مش هيشوف hover، فاكتب نفس التأثير للحالة [[focus-visible]] كمان.
- ترتيب حالات الروابط (LVHA): `:link` ثم `:visited` ثم `:hover` ثم `:active`، عشان الأخيرة تغلب.

> [!analogy] `:hover` زي لما تقرّب إيدك من زرار الأسانسير فيسخن/ينور؛ لسه ما ضغطتش، بس العنصر «حاسس» بوجودك.

## try

```html
<style>
  .b { display:inline-block; background:#c9772f; color:#f3ede0; padding:10px 20px; border-radius:8px; font-weight:bold; transition:background .25s, transform .25s; cursor:pointer; }
  .b:hover { background:#7a4a1d; transform:translateY(-2px); }
</style>
<span class="b">مرّر الماوس عليّ</span>
```

## syntax

```css nolive
a:hover { color: #b5551f; }
.card:hover { box-shadow: 0 6px 16px rgba(61,44,24,.25); }
@media (hover: hover) {
  .btn:hover { background: #7a4a1d; }
}
```

- بتنطبق طول ما الماوس فوق العنصر.
- اكتبها مع [[transition]] لتغيير ناعم.
- على الموبايل استخدم `@media (hover: hover)`.

## use

- تغيير لون الأزرار والروابط.
- رفع البطاقات وإظهار ظل.
- إظهار محتوى مخفي (قوائم منسدلة بسيطة).

## avoid

- الاعتماد على hover وحده لوظيفة مهمة (مبتشتغلش على اللمس).
- نسيان نفس التأثير لـ focus-visible للكيبورد.

## examples

### 1) زرار يتغيّر
اللون والحركة عند التمرير.

```html
<style>
  .b { display:inline-block; background:#3d7a5a; color:#f3ede0; padding:10px 20px; border-radius:8px; font-weight:bold; transition:background .25s, transform .25s; }
  .b:hover { background:#2d5c43; transform:translateY(-3px); }
</style>
<span class="b">زرار</span>
```



### 2) بطاقة بتطلع
ظل أكبر وحركة لفوق.

```html
<style>
  .card { width:150px; padding:14px; border-radius:10px; background:#f3e6c9; color:#3d2c18; box-shadow:0 2px 6px rgba(61,44,24,.18); transition:transform .25s, box-shadow .25s; }
  .card:hover { transform:translateY(-6px); box-shadow:0 10px 20px rgba(61,44,24,.28); }
</style>
<div class="card">بطاقة منتج</div>
```



### 3) إظهار عنصر مخفي
بتظهر عند hover على الأب.

```html
<style>
  .p { width:160px; padding:10px; background:#efe0bd; color:#3d2c18; border-radius:8px; }
  .p .tip { display:none; margin-top:6px; padding:6px; background:#7a4a1d; color:#f3ede0; border-radius:6px; font-size:.9rem; }
  .p:hover .tip { display:block; }
</style>
<div class="p">مرّر هنا<div class="tip">نص مخفي ظهر</div></div>
```



### 4) hover للأجهزة بالماوس فقط
media query بتحمي اللمس.

```html
<style>
  .b { display:inline-block; padding:10px 20px; border-radius:8px; background:#c9772f; color:#f3ede0; font-weight:bold; }
  @media (hover: hover) { .b:hover { background:#7a4a1d; } }
</style>
<span class="b">hover بشرط</span>
```



## mistakes

### قايمة مبتفتحش على الموبايل

```css bad
.menu:hover .sub { display:block; }  /* اللمس مبيشغلش hover */
```

```css good
.menu:hover .sub, .menu:focus-within .sub { display:block; }
```

ضيف focus-within أو زرار يفتح بالضغط.

### ترتيب خاطئ للروابط

```css bad
a:hover { color:red; }
a:link { color:blue; }  /* link بتغلب */
```

```css good
a:link { color:blue; }
a:hover { color:red; }
```

LVHA: link ثم visited ثم hover ثم active.

## quiz

### hover بتنطبق إمتى؟
- [x] لما الماوس فوق العنصر
- [ ] لما العنصر يتضغط
- [ ] لما الصفحة تتحمل
- [ ] عند الكتابة

طول وقت وقوف المؤشر.

### الحل لتأثير hover للأجهزة بماوس فقط؟
- [x] @media (hover: hover)
- [ ] @media print
- [ ] display:none
- [ ] z-index

hover media feature.

### عشان التغيير يبقى ناعم نضيف؟
- [x] transition
- [ ] float
- [ ] order
- [ ] content

transition.

## refs

- [MDN: :hover](https://developer.mozilla.org/en-US/docs/Web/CSS/:hover)
