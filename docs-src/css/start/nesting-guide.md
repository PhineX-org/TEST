---
id: nesting-guide
kind: guide
cat: start
title: الـ CSS Nesting: تداخل القواعد
en: CSS nesting
status: stable
summary: تقدر دلوقتي تكتب قواعد جوه قواعد في CSS العادي من غير Sass: تنظيم أحسن، تكرار أقل، وإزاي تستخدم & للحالات.
keywords: nesting, css nesting, &, تداخل, sass, nested rules, تنظيم, hover داخل, نسخ المحدد
related: nesting-selector, selectors-guide, hover, descendant-combinator, css-best-practices
---

## intro

زمان كنت لازم تكرر اسم الـ class في كل قاعدة: `.card {}` و`.card h2 {}` و`.card:hover {}`. دلوقتي CSS بتدعم **Nesting** (التداخل) بشكل مدمج، فتكتب القواعد الفرعية **جوه** القاعدة الأم:

```
.card {
  padding: 16px;
  h2 { color: brown; }
  &:hover { background: wheat; }
}
```

والرمز **`&`** ([[nesting-selector]]) معناه «المحدد الأب نفسه». استخدمه لما تحتاج تضيف حالة أو class على نفس العنصر: `&:hover` أو `&.active` أو `.dark &` (لما الأب جوه class معين). ومن غير `&` المحدد الفرعي بيتعامل كأنه **نسل** (مسافة).

وتقدر تتداخل `@media` جوه القاعدة نفسها كمان:
`.card { @media (min-width: 600px) { padding: 32px } }` فكل تنسيقات الكارت في مكان واحد.

> [!tip] متتعمّقش في التداخل أكتر من 2–3 مستويات، لأن المحددات بتطول وتزيد الـ specificity وتصعّب القراءة.

> [!note] Nesting مدعوم في المتصفحات الحديثة. للمتصفحات القديمة جداً ممكن تحتاج معالج مسبق.

## try

```html
<style>
  .card { padding:14px; background:#efe0bd; color:#3d2c18; border-radius:8px; transition:background .2s;
    h3 { margin:0 0 6px; color:#7a4a1d; }
    &:hover { background:#e4c490; }
  }
</style>
<div class="card"><h3>عنوان</h3>مرّر الماوس</div>
```

## syntax

```css nolive
.card {
  padding: 16px;
  h2 { color: brown; }        /* .card h2 */
  &:hover { background: wheat; }  /* .card:hover */
  &.active { outline: 2px solid; } /* .card.active */
  @media (min-width: 600px) { padding: 32px; }
}
```

- `&` = المحدد الأب.
- من غير `&` = نسل.

## examples

### 1) نسل بسيط
`h3` و`p` جوه `.card` من غير ما نكرر الاسم.

```html
<style>
  .card { padding:12px; background:#efe0bd; color:#3d2c18;
    h3 { margin:0; color:#7a4a1d; }
    p { margin:6px 0 0; }
  }
</style>
<div class="card"><h3>العنوان</h3><p>الفقرة</p></div>
```



### 2) & للحالات
`&:hover` بتضيف حالة للعنصر نفسه.

```html
<style>
  .btn { display:inline-block; padding:10px 18px; background:#7a4a1d; color:#f3ede0; border-radius:8px;
    &:hover { background:#3d7a5a; }
  }
</style>
<span class="btn">مرّر</span>
```



### 3) media جوه القاعدة
كل تنسيقات الكارت في مكان واحد.

```html
<style>
  .box { background:#efe0bd; color:#3d2c18; padding:10px;
    @media (min-width:420px) { background:#bcd4a8; padding:24px; }
  }
</style>
<div class="box">وسّع النافذة</div>
```



## mistakes

### نسيان & مع الحالة

```css bad
.a { :hover { color:red; } }  /* معناها نسل */
```

```css good
.a { &:hover { color:red; } }
```

من غير `&` الـ `:hover` بيتحسب على أحفاد `.a` مش على `.a`.

### تداخل عميق

```css bad
.a { .b { .c { .d { color:red; } } } }
```

```css good
.a-d { color:red; }
```

المحددات الطويلة صعب تتخطّاها.

## quiz

### & في Nesting معناها؟
- [ ] كل العناصر
- [x] المحدد الأب
- [ ] أخ تالي
- [ ] !important

المحدد الأب نفسه.

### اللي جوه القاعدة من غير & بيتعامل كـ؟
- [x] نسل
- [ ] نفس العنصر
- [ ] أخ
- [ ] ابن مباشر بس

مسافة = نسل.

## refs

- [MDN: CSS nesting](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_nesting)
