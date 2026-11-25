---
id: scope
kind: pseudoclass
cat: pc-logical
chip: :scope
title: نطاق التنسيق
en: CSS :scope pseudo-class
status: stable
support: all
size: compact
mdn: :scope
summary: الحالة scope بتمثل نقطة البداية (نطاق) للمحدد. داخل @scope هي الجذر، وفي querySelector هي العنصر اللي بتسأله.
keywords: :scope, scope, نطاق, @scope, querySelector
related: at-scope, nesting-selector, is
---

## intro

`:scope` بتمثل **«نطاق» المحدد**: نقطة البداية اللي المحدد بيتطبّق منها. معناها بيعتمد على السياق: **داخل `@scope`** ([[at-scope]]) هي الجذر اللي حددته. و**في JavaScript** مع `element.querySelectorAll(':scope > li')` هي العنصر نفسه (يعني الأبناء المباشرين له). وفي ورقة الأنماط العادية بدون `@scope` هي نفس `:root`. فايدتها الأساسية لما تكتب محددات نسبية لعنصر معين، أو مع `@scope` لعزل تنسيقات مكوّن.

## try

```html
<style>
  @scope (.card) {
    :scope { background:#efe0bd; padding:8px; border-radius:8px; color:#3d2c18; }
    p { color:#3d7a5a; font-weight:bold; margin:0; }
  }
</style>
<div class="card"><p>تنسيق داخل النطاق</p></div><p style="margin:4px 0;color:#3d2c18">فقرة برّه</p>
```

## syntax

```css nolive
@scope (.card) {
  :scope { padding: 8px; }
  p { color: #3d7a5a; }
}
/* في JS */
el.querySelectorAll(':scope > li');
```

- داخل @scope = الجذر.
- في JS = العنصر نفسه.

## use

- تنسيق مكوّن بعزل.
- محددات نسبية في JS.

## avoid

- الخلط بين معناها داخل وخارج @scope.

## examples

### 1) مع @scope
النطاق جوّه .card.

```html
<style>
  @scope (.box) {
    :scope { background:#efe0bd; padding:8px; color:#3d2c18; border-radius:8px; }
    span { color:#b5551f; font-weight:bold; }
  }
</style>
<div class="box"><span>داخل</span></div><span style="color:#3d2c18">خارج</span>
```



### 2) في JS
الأبناء المباشرين فقط.

```html
<style>
  .m { background:#bcd4a8; color:#3d2c18; }
</style>
<ul id="u" style="padding:0;margin:0;list-style:none"><li>1<ul><li>1.1</li></ul></li><li>2</li></ul>
<script>document.querySelectorAll('#u').forEach(u=>u.querySelectorAll(':scope > li').forEach(li=>li.classList.add('m')))</script>
```



### 3) شرط ثانوي
علامة المكوّن.

```html
<style>
  @scope (.a) to (.b) {
    p { color:#3d7a5a; font-weight:bold; margin:0; }
  }
</style>
<div class="a"><p>داخل a</p><div class="b"><p style="color:#3d2c18;font-weight:normal">داخل b (خارج النطاق)</p></div></div>
```



## mistakes

### توقع تأثير بدون @scope

```css bad
p :scope { }
```

```css good
@scope (.x) { :scope { } }
```

محتاج @scope لمعنى مختلف.

## quiz

### :scope داخل @scope؟
- [x] الجذر المحدد
- [ ] الصفحة
- [ ] body
- [ ] لا شيء

جذر النطاق.

### في JS مع querySelectorAll؟
- [x] العنصر نفسه
- [ ] document
- [ ] window
- [ ] body

العنصر المسؤول.

## refs

- [MDN: :scope](https://developer.mozilla.org/en-US/docs/Web/CSS/:scope)
