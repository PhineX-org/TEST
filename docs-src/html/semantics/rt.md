---
id: rt
kind: element
cat: semantics
tag: rt
title: عنصر نص الـ ruby (rt)
en: HTML ruby text element
status: stable
display: ruby-text
void: no
support: all
size: compact
summary: عنصر rt هو النص الصغير اللي بيظهر فوق (أو تحت) النص الأساسي جوه ruby، وبنستخدمه لنطق الكلمة أو شرح مختصر ليها.
keywords: rt, ruby text, نطق, furigana, pinyin, نص صغير, تعليق, annotation
related: ruby, rp, abbr
---

## intro

الـ `<rt>` هو **قلب** الـ `<ruby>`: هو النص الصغير الفعلي اللي بيظهر فوق النص الأساسي. بنكتبه **بعد** النص الأساسي مباشرةً جوه `<ruby>`، والمتصفح بيعرضه فوقه بحجم أصغر. يعني لو `<ruby>漢<rt>han</rt></ruby>`، فكلمة «han» هي الـ `<rt>`.

بيتعرض بحجم أصغر تلقائياً (تقريباً نصف الحجم)، وبتتحكم في مكانه بـ CSS (`ruby-position`). وممكن تكتب فيه أي نص: نطق، ترجمة قصيرة، تشكيل، أو شرح مختصر. لكن خلّيه **قصير**: النص الطويل هيبوّظ شكل السطر.

وممكن يبقى في `<ruby>` واحد أكتر من `<rt>`: كل `<rt>` بيوصف الجزء من النص الأساسي اللي قبله مباشرةً. وده بيفيد لما تعوز تحط نطق لكل مقطع من كلمة.

> [!key] `<rt>` لازم يبقى جوه `<ruby>` وبعد النص الأساسي. بيظهر فوقه بحجم أصغر.

## try

```html
<p style="font-size:28px; line-height:2.4">
  <ruby>Cairo<rt>القاهرة</rt></ruby>
  و<ruby>Dubai<rt>دبي</rt></ruby>
</p>
```

## syntax

```html nolive
<ruby>الأساس<rt>الشرح</rt></ruby>
```

- `<rt>` — **الوسم الافتتاحي**.
- النص — الشرح أو النطق (قصير).
- `</rt>` — **الوسم الختامي** (ممكن يتحذف في حالات معينة، لكن الأفضل تكتبه).

## use

- لنطق كلمة أجنبية بالعربي أو العكس.
- لشرح مصطلح مختصر فوق الكلمة.
- لنطق الحروف الآسيوية.

## avoid

- متكتبش جواه نص طويل.

## attributes

مالوش خصائص خاصة، بيقبل **الخصائص العامة** ([[global-attributes]]).

### lang
لغة النص الصغير (بتفيد في النطق).

## examples

### 1) rt أساسي
نطق بسيط.

```html
<p style="font-size:28px; line-height:2.4">
  <ruby>Hello<rt>هالو</rt></ruby>
</p>
```

- «هالو» بيظهر فوق «Hello» بحجم أصغر.
- المتصفح هو اللي بيرتبهم من غير CSS.
- ده مثال لمدرّس بيعلّم النطق.

### 2) تنسيق rt
لون وحجم.

```html
<style>
  rt { color: #16a34a; font-size: 0.55em; font-weight: bold; }
</style>
<p style="font-size:30px; line-height:2.6">
  <ruby>Python<rt>بايثون</rt></ruby>
</p>
```

- بتتحكم في شكل `<rt>` زي أي عنصر.
- ممكن تغيّر اللون والحجم والوزن.

### 3) أكتر من rt
نطق لكل جزء.

```html
<p style="font-size:28px; line-height:2.5">
  <ruby>
    Java<rt>جافا</rt>
    Script<rt>سكريبت</rt>
  </ruby>
</p>
```

- كل `<rt>` بيشرح الجزء اللي قبله.
- النص الأساسي مقسّم على جزأين.

## rules

- parents: `<ruby>`.
- children: **Phrasing content**.
- closing: الوسم الختامي `</rt>` (يفضّل تكتبه).
- role: `generic`.
- dom: `HTMLElement`.
- layout: `display: ruby-text`.

## mistakes

### rt برّه ruby
```html bad
<p>Hello<rt>هالو</rt></p>
```
```html good
<p><ruby>Hello<rt>هالو</rt></ruby></p>
```
ليه؟ الـ `<rt>` لازم يبقى جوه `<ruby>` وإلا بيتعرض كنص عادي.

## a11y

- بعض قارئات الشاشة بتقرا `<rt>` مباشرة بعد الأساسي، وبعضها لأ.
- حدد `lang` للنص الصغير.

## tips

- خلّي النص الصغير قصير.
- اظبط `line-height` للفقرة.

## quiz

### فين بيتحط `<rt>`؟
- [ ] برّه أي عنصر
- [x] جوه `<ruby>` بعد النص الأساسي
- [ ] جوه `<head>`
- [ ] جوه `<ul>`
جوه `<ruby>`.

### إيه وظيفته؟
- [x] النص الصغير اللي بيشرح النص الأساسي
- [ ] الأقواس الاحتياطية
- [ ] عنوان
- [ ] رابط
هو نص الشرح.

## refs

- [MDN: rt](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/rt)
- [WHATWG: The rt element](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-rt-element)
