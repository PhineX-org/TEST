---
id: transition
kind: property
cat: motion
chip: transition
title: الانتقالات (تغيير ناعم)
en: CSS transition property
status: stable
support: all
mdn: transition
summary: transition بتخلّي التغيير بين حالتين (زي hover) يحصل بنعومة خلال مدة بدل ما يحصل فجأة. اختصار لـ property وduration وtiming-function وdelay.
keywords: transition, انتقال, hover, smooth, duration, ease, تغيير ناعم
related: transition-property, transition-duration, transition-timing-function, transition-delay, animation, transform, transitions-animations-guide
---

## intro

الخاصية `transition` بتخلّي **أي تغيير في قيمة خاصية** (لون، حجم، موضع…) يحصل **تدريجياً** خلال مدة، بدل ما يحصل فجأة. أول ما حالة العنصر تتغير (`:hover` أو `:focus` أو إضافة class بالـ JS)، المتصفح بيحسب القيم **اللي في النص** ويرسمها واحدة واحدة.

**الصيغة**: `transition: property duration timing-function delay;`. مثال: `transition: background-color .3s ease 0s;`. وتقدر تكتب **أكتر من transition** مفصولين بفاصلة: `transition: color .2s, transform .3s;`.

الأجزاء (لكل واحد صفحة مستقلة):
- [[transition-property]]: **أنهي خاصية** تتحرك (`all` أو اسم خاصية).
- [[transition-duration]]: **المدة** (`.3s` أو `300ms`) **إجبارية**، لأن الافتراضي 0 (بدون حركة).
- [[transition-timing-function]]: **منحنى السرعة** (`ease` و`linear` و`ease-in-out`…).
- [[transition-delay]]: **تأخير** قبل البداية.

أهم قاعدة: **اكتب `transition` على العنصر نفسه (الحالة الأصلية)**، مش على `:hover`. لو كتبتها على hover بتتحرك داخل بس ومش خارج.

نصائح أداء: حرّك خصائص **رخيصة** زي `transform` و`opacity` و`filter`؛ تجنّب تحريك `width` و`height` و`top` لأنها بتعيد حساب التخطيط. ولو مفيش حاجة تتحرك بين حالتين (زي `display`) الـ transition مبتشتغلش (إلا بخدع حديثة). ولاحترام المستخدمين الحساسين للحركة استخدم `@media (prefers-reduced-motion: reduce)`.

> [!analogy] `transition` زي ريموت تحكم في إضاءة بـ dimmer: بدل ما النور يتقلب فجأة من مطفي لمنوّر، بيزيد تدريجياً.

## try

```html
<style>
  .b { display:inline-block; padding:10px 22px; background:#c9772f; color:#f3ede0; border-radius:8px; font-weight:bold; transition:background .3s, transform .3s; }
  .b:hover { background:#7a4a1d; transform:translateY(-3px); }
</style>
<div class="b">مرّر الماوس</div>
```

## syntax

```css nolive
transition: all .3s;
transition: background-color .3s ease;
transition: color .2s, transform .4s ease-out .1s;
transition: none;
```

- **القيمة المبدئية**: `all 0s ease 0s`.
- **المدة إجبارية** عشان تظهر الحركة.
- اكتبها على الحالة الأصلية.

## values

### property
أنهي خاصية (all أو اسم).

### duration
المدة بالثواني أو ms.

### timing-function
منحنى السرعة.

### delay
التأخير قبل البداية.

## use

- hover ناعم للأزرار.
- فتح/إغلاق عناصر بنعومة.
- تغيير ثيم تدريجي.

## avoid

- transition: all على عناصر كبيرة (أداء).
- تحريك width/height/top (تخطيط).
- تجاهل reduced-motion.

## examples

### 1) لون وحركة
زرار بتغيير ناعم.

```html
<style>
  .b { display:inline-block; padding:10px 22px; background:#3d7a5a; color:#f3ede0; border-radius:8px; font-weight:bold; transition:background .3s, transform .3s; margin:8px; }
  .b:hover { background:#2d5c43; transform:translateY(-3px); }
</style>
<div class="b">مرّر</div>
```



### 2) بدون transition
تغيير فجأة للمقارنة.

```html
<style>
  .b { display:inline-block; padding:10px 22px; background:#c9772f; color:#f3ede0; border-radius:8px; font-weight:bold; margin:8px; }
  .b:hover { background:#7a4a1d; }
  .s { transition:background .5s; }
</style>
<div class="b">فجأة</div><div class="b s">ناعم</div>
```



### 3) مدة وتأخير
أكتر من خاصية بإعدادات مختلفة.

```html
<style>
  .c { width:70px; height:70px; background:#c9772f; border-radius:8px; margin:10px; transition:transform .6s ease-out, background .3s linear .2s; }
  .c:hover { transform:rotate(45deg); background:#3d7a5a; }
</style>
<div class="c"></div>
```



### 4) احترام reduced-motion
للي حساسين للحركة.

```html
<style>
  .b { display:inline-block; padding:10px 22px; background:#7a4a1d; color:#f3ede0; border-radius:8px; margin:8px; transition:transform .4s; }
  .b:hover { transform:scale(1.1); }
  @media (prefers-reduced-motion: reduce) { .b { transition:none; } }
</style>
<div class="b">يحترم الإعدادات</div>
```



## mistakes

### transition على hover فقط

```css bad
.b:hover { background:red; transition:.3s; }  /* داخل بس */
```

```css good
.b { transition:background .3s; }
.b:hover { background:red; }
```

اكتبها على الأصل.

### نسيان المدة

```css bad
.b { transition:background; }  /* المدة 0 */
```

```css good
.b { transition:background .3s; }
```

لازم duration.

## quiz

### أنهي مدة لازم؟
- [x] duration
- [ ] delay
- [ ] timing
- [ ] property

الافتراضي 0.

### تتكتب على؟
- [x] الحالة الأصلية
- [ ] hover فقط
- [ ] body
- [ ] html

تشتغل داخل وخارج.

### الأخف أداءً؟
- [x] transform وopacity
- [ ] width
- [ ] height
- [ ] top

ما بتعيدش التخطيط.

## refs

- [MDN: transition](https://developer.mozilla.org/en-US/docs/Web/CSS/transition)
