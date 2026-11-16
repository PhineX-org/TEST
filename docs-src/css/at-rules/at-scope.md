---
id: at-scope
kind: atrule
cat: at-rules
chip: @scope
title: قاعدة @scope: نطاق الـ selectors
en: CSS @scope at-rule
status: stable
support: all
size: compact
mdn: @scope
summary: قاعدة @scope بتحدد نطاق (من عنصر لعنصر) تنطبق فيه الستايلات، فتتجنب تسرّب الستايل لخارج المكوّن بدون BEM.
keywords: @scope, scoping, نطاق, component, scope, donut scope
related: nesting-guide, at-layer, class-selector
---

## intro

القاعدة `@scope` بتحدد **نطاق (scope)** تنطبق جواه الستايلات: يبدأ من **عنصر جذر** وممكن ينتهي عند **حد أدنى** (donut scope). فتقدر تكتب selectors قصيرة (`img`, `a`) **بدون ما تتسرّب** لباقي الصفحة، ومن غير تسميات طويلة زي BEM.

الصيغة: `@scope (.card) { img { border-radius: 8px; } }` يعني: أي `img` **جوه `.card`** فقط. وفي النطاق «الدونات»: `@scope (.card) to (.content) { a { color: red; } }` يعني الروابط جوه `.card` لكن **مش جوه `.content`** (الجزء الداخلي). وبداخلها تقدر تشير للجذر بـ `:scope`.

ميزة إضافية: القاعدة تأثر على **الـ specificity** بشكل ألطف (النطاق مش بيزوّد الأولوية بشكل كبير) وده بيساعد في إدارة الأولويات. الدعم الحديث موجود في Chromium وSafari ويتوسع، فاختبر الدعم أو استخدمها تدريجياً.

## try

```html
<style>
  @scope (.card) { p { color:#b5551f; font-weight:bold; } }
  .card { padding:8px; background:#efe0bd; border-radius:8px; margin:4px 0; }
  p { color:#3d2c18; margin:0; }
</style>
<div class="card"><p>جوه card: ملوّنة</p></div><p>برّه card: عادية</p>
```

## syntax

```css nolive
@scope (.card) {
  img { border-radius: 8px; }
  :scope { padding: 12px; }
}
@scope (.card) to (.content) {
  a { color: #b5551f; }
}
```

- `:scope` يعني الجذر.
- `to (...)` لحد النطاق (donut).
- دعم حديث متفاوت.

## use

- مكونات معزولة بدون BEM.
- تلوين عناصر في جزء من الصفحة فقط.

## avoid

- الاعتماد عليها بدون اختبار الدعم.

## examples

### 1) نطاق بسيط
p جوه card فقط.

```html
<style>
  @scope (.card) { p { color:#b5551f; font-weight:bold; } }
  .card { padding:8px; background:#efe0bd; border-radius:8px; margin:4px 0; }
  p { color:#3d2c18; margin:0; }
</style>
<div class="card"><p>جوه card: ملوّنة</p></div><p>برّه card: عادية</p>
```



### 2) donut scope
حد أدنى.

```html
<style>
  @scope (.card) to (.inner) { span { color:#3d7a5a; font-weight:bold; } }
  .card { padding:8px; background:#efe0bd; border-radius:8px; color:#3d2c18; }
  .inner { margin-top:6px; padding:6px; background:#e4c490; border-radius:6px; }
</style>
<div class="card"><span>خضراء (جوه card)</span><div class="inner"><span>مش خضراء (جوه inner)</span></div></div>
```



### 3) :scope
الجذر نفسه.

```html
<style>
  @scope (.box) { :scope { padding:10px; background:#bcd4a8; border-radius:8px; color:#3d2c18; } }
</style>
<div class="box">الجذر اتلوّن بـ :scope</div>
```



## mistakes

### أمل ظهور في متصفح قديم

```css bad
/* ممكن مدعومة ناقص */
```

```css good
@supports at-rule(@scope) { ... } أو fallback
```

اختبر الدعم.

## quiz

### @scope بتحدد؟
- [x] نطاق تطبيق الستايلات
- [ ] لون
- [ ] خط
- [ ] حركة

scope.

### الجذر داخل النطاق؟
- [x] :scope
- [ ] &
- [ ] root
- [ ] this

:scope.

## refs

- [MDN: @scope](https://developer.mozilla.org/en-US/docs/Web/CSS/@scope)
