---
id: selector-list
kind: selector
cat: selectors
chip: A, B
title: قائمة المحددات (A, B)
en: Selector list
status: stable
support: all
mdn: Selector_list
summary: الفاصلة بين محددات بتخلّي نفس القاعدة تنطبق على أكتر من محدد من غير تكرار. أداة بسيطة لكن مهمة لنظافة الكود.
keywords: selector list, فاصلة, comma, تجميع محددات, group selector, h1 h2 h3, DRY
related: class-selector, type-selector, is, selectors-guide
---

## intro

بدل ما تكتب نفس التنسيق مرتين: `h1 { color: brown }` و`h2 { color: brown }`، بتكتب **قائمة محددات** مفصولة بـ **فاصلة**: `h1, h2 { color: brown }`. معناها «**أو**»: القاعدة تنطبق على أي عنصر يطابق **أي واحد** من المحددات.

مهم تعرف:
- كل محدد في القائمة **بيتحسب لوحده** في الـ specificity.
- **السطر الجديد** بعد كل فاصلة بيخلّي القراءة أسهل.
- في الـ CSS القديمة، لو **واحد** من المحددات غلط (محدد مش مدعوم) كانت **القاعدة كلها** بتتجاهل! لو عايز تتفادى ده استخدم [[is]] (forgiving).

وبيتجمّع بسهولة مع الأنواع والكلاسات والـ pseudo: `h1, .title, a:hover, [data-x]`.

> [!analogy] الفاصلة زي حرف العطف «و/أو»: «الأبواب **و** الشبابيك اتدهن أخضر».

> [!tip] الأفضل تكتب كل محدد في **سطر مستقل** علشان الـ diff والتعديل يبقوا أنضف.

## try

```html
<style>
  h3, p.note, .tag { color:#b5551f; font-weight:bold; }
</style>
<h3>عنوان</h3><p class="note">ملاحظة</p><span class="tag">وسم</span><p>فقرة عادية</p>
```

## syntax

```css nolive
h1, h2, h3 {
  color: brown;
}
a:hover,
a:focus {
  color: green;
}
```

- الفاصلة = أو.
- كل محدد بيتحسب مستقل.

## use

- نفس التنسيق على أنواع مختلفة (`h1, h2, h3`).
- حالات متشابهة (`:hover, :focus`).
- تقليل التكرار.

## avoid

- محدد غلط وسط القائمة في CSS قديمة (بيبوّظ القاعدة).
- قوائم طويلة جداً على سطر واحد.

## examples

### 1) تجميع العناوين
نفس اللون لـ h2 وh3 وh4.

```html
<style>
  h2, h3, h4 { color:#7a4a1d; margin:4px 0; }
</style>
<h2>H2</h2><h3>H3</h3><h4>H4</h4>
```



### 2) hover و focus
تنسيق واحد للحالتين.

```html
<style>
  button { background:#7a4a1d; color:#f3ede0; padding:8px 16px; border:0; border-radius:8px; }
  button:hover, button:focus-visible { background:#3d7a5a; outline:2px solid #c9772f; }
</style>
<button>مرّر أو Tab</button>
```



### 3) أنواع وكلاسات
قائمة مختلطة.

```html
<style>
  p, .box, [data-x] { background:#efe0bd; color:#3d2c18; padding:6px; margin:4px 0; }
</style>
<p>p</p><div class="box">.box</div><span data-x>[data-x]</span>
```



### 4) كل محدد بأولويته
المحدد `.a` والمحدد `p` في نفس القائمة لكن كل واحد بقوته.

```html
<style>
  p, .a { color:#3d7a5a; }
  .b { color:#a63b2f; }
</style>
<p class="b">أحمر: .b أقوى من p لوحده</p>
```

- القائمة مش بتجمع القوى.

## mistakes

### فاصلة زيادة في النهاية

```css bad
h1, h2, { color:red; }
```

```css good
h1, h2 { color:red; }
```

فاصلة معلقة ممكن تبوّظ القاعدة.

### استخدام مسافة بدل فاصلة

```css bad
h1 h2 { color:red; }  /* h2 جوه h1 */
```

```css good
h1, h2 { color:red; }
```

المسافة نسل، والفاصلة أو.

## quiz

### الفاصلة بين المحددات معناها؟
- [ ] و (كلهم مع بعض)
- [x] أو
- [ ] نسل
- [ ] ابن

أي محدد منهم.

### الفرق بين `h1 h2` و `h1, h2`؟
- [ ] مفيش
- [x] الأول h2 جوه h1 والتاني الاتنين
- [ ] العكس
- [ ] للـ JS

مسافة = نسل.

### كل محدد في القائمة؟
- [x] بيتحسب لوحده في الـ specificity
- [ ] بيتجمع مع اللي قبله
- [ ] بيتجاهل
- [ ] أقوى واحد بس

كل واحد مستقل.

## refs

- [MDN: A, B](https://developer.mozilla.org/en-US/docs/Web/CSS/Selector_list)
- [MDN: Selector list](https://developer.mozilla.org/en-US/docs/Web/CSS/Selector_list)
