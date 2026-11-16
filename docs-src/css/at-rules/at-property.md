---
id: at-property
kind: atrule
cat: at-rules
chip: @property
title: قاعدة @property: تسجيل متغير مخصص بنوع
en: CSS @property at-rule
status: stable
support: all
mdn: @property
summary: قاعدة @property بتسجّل متغير CSS مخصص بنوع (syntax) وقيمة ابتدائية، فيقدر يتحرك ويتحوّل بنعومة (مثلاً زاوية تدرج).
keywords: @property, custom property, variable, syntax, initial-value, houdini, animate gradient
related: variables-guide, at-keyframes, transition, fn-var
---

## intro

المتغيرات العادية `--x` في CSS **نصوص بلا نوع**؛ المتصفح مبيعرفش إن `--angle` دي زاوية، فمستحيل يعملها أنيميشن أو transition سلس. القاعدة `@property` بتحل ده: **بتسجّل** المتغير وتقول له **نوعه** و**قيمته الابتدائية** و**هل يتوارث**.

```
@property --angle {
  syntax: "<angle>";
  inherits: false;
  initial-value: 0deg;
}
```

التلات أوصاف:
- **`syntax`**: النوع (`<length>` `<color>` `<number>` `<angle>` `<percentage>` أو `*` لأي حاجة).
- **`inherits`**: يتوارث من الأب ولا لأ.
- **`initial-value`**: القيمة الافتراضية (مطلوبة لو النوع مش `*`).

بعد التسجيل تقدر تعمل `transition` أو `@keyframes` على المتغير نفسه، فتحرّك **تدرج لوني** أو **زاوية دوران** (حاجة كانت مستحيلة)، وكمان بيتحقق من صحة القيم. مثال مشهور: **حدود متحركة** بتدرج مخروطي (conic-gradient) بتلف.

## try

```html
<style>
  @property --a { syntax:"<angle>"; inherits:false; initial-value:0deg; }
  @keyframes spin { to { --a:360deg; } }
  .r { width:110px; height:110px; border-radius:50%; background:conic-gradient(from var(--a), #c9772f, #efe0bd, #3d7a5a, #c9772f); animation:spin 3s linear infinite; margin:8px; }
</style>
<div class="r"></div>
```

## syntax

```css nolive
@property --angle {
  syntax: "<angle>";
  inherits: false;
  initial-value: 0deg;
}
.box { background: conic-gradient(from var(--angle), red, blue); }
```

- الأوصاف الثلاثة: syntax وinherits وinitial-value.
- `*` = أي قيمة (لكن بدون أنيميشن).
- لازم initial-value مع النوع المحدد.

## use

- أنيميشن تدرج أو زاوية.
- متغيرات بتحقق من النوع.
- تحويل ألوان ناعم.

## avoid

- نسيان initial-value.
- استخدام syntax:"*" لو عايز أنيميشن.

## examples

### 1) تدرج دوّار
زاوية متحركة.

```html
<style>
  @property --a { syntax:"<angle>"; inherits:false; initial-value:0deg; }
  @keyframes spin { to { --a:360deg; } }
  .r { width:100px; height:100px; border-radius:50%; background:conic-gradient(from var(--a), #c9772f, #efe0bd, #3d7a5a, #c9772f); animation:spin 3s linear infinite; }
</style>
<div class="r"></div>
```



### 2) انتقال رقم
number.

```html
<style>
  @property --n { syntax:"<number>"; inherits:false; initial-value:0; }
  .c { transition:--n 1s; counter-reset:v var(--n); font-size:1.6rem; font-weight:bold; color:#7a4a1d; }
  .c::after { content:counter(v); }
  .c:hover { --n:100; }
</style>
<div class="c">مرّر عليّا: </div>
```



### 3) لون بيتحوّل بنعومة
color.

```html
<style>
  @property --c { syntax:"<color>"; inherits:false; initial-value:#c9772f; }
  .b { --c:#c9772f; background:linear-gradient(var(--c), #efe0bd); transition:--c .6s; padding:30px; border-radius:8px; color:#3d2c18; }
  .b:hover { --c:#3d7a5a; }
</style>
<div class="b">مرّر هنا: التدرج يتحوّل بنعومة</div>
```



### 4) متغير غير مسجّل
بيقفز بدون نعومة.

```html
<style>
  .b { --c:#c9772f; background:linear-gradient(var(--c), #efe0bd); transition:--c .6s; padding:30px; border-radius:8px; color:#3d2c18; }
  .b:hover { --c:#3d7a5a; }
</style>
<div class="b">مرّر هنا: بيقفز (مش مسجّل)</div>
```



## mistakes

### أنيميشن متغير غير مسجّل

```css bad
.a { --angle:0deg; animation:spin 2s; }  /* بيقفز */
```

```css good
@property --angle { syntax:"<angle>"; inherits:false; initial-value:0deg; }
```

لازم تسجيل.

### بدون initial-value

```css bad
@property --x { syntax:"<length>"; inherits:false; }
```

```css good
@property --x { syntax:"<length>"; inherits:false; initial-value:0px; }
```

مطلوبة.

## quiz

### ليه @property؟
- [x] تدّي المتغير نوع فيتحرك
- [ ] تخفي المتغير
- [ ] تسرّع
- [ ] تلوّن

نوع + قيمة ابتدائية.

### الوصف اللي بيحدد النوع؟
- [x] syntax
- [ ] inherits
- [ ] initial-value
- [ ] type

syntax.

### syntax بـ * معناها؟
- [x] أي قيمة بدون أنيميشن
- [ ] رقم
- [ ] لون
- [ ] مستحيل

untyped.

## refs

- [MDN: @property](https://developer.mozilla.org/en-US/docs/Web/CSS/@property)
