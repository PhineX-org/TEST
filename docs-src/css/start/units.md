---
id: units
kind: guide
cat: start
title: الوحدات: px و rem و % و vw
en: CSS units
status: stable
summary: وحدات القياس في CSS: الثابتة (px) والنسبية (em, rem, %) وأبعاد الشاشة (vw, vh, dvh). إمتى تستخدم أنهي واحدة، وإزاي تخلي موقعك يتأقلم مع أي شاشة.
keywords: units, px, rem, em, vw, vh, percent, وحدات, احجام, حجم الخط, relative, absolute, dvh, ch
related: dt-length, dt-percentage, fn-calc, fn-clamp, font-size, width
---

## intro

أي رقم في CSS لازم يكون ليه **وحدة** (إلا الصفر)، فتخيّل إنك بتقول «عايز المسافة دي 20 إيه؟». الوحدات نوعين: **مطلقة** (ثابتة) و**نسبية** (بتتغيّر حسب حاجة تانية).

**الوحدة المطلقة المهمة هي `px`** (بكسل). ثابتة وبسيطة، بتنفع للحدود الرفيعة والظلال والتفاصيل الصغيرة.

**الوحدات النسبية** هي سر المواقع المرنة:
- **`rem`**: نسبة لحجم خط الـ `html` (الافتراضي 16px). يعني `2rem` = 32px. ممتازة للخطوط والمسافات لأنها بتحترم إعدادات المستخدم لو كبّر الخط.
- **`em`**: نسبة لحجم خط **العنصر نفسه**. مفيدة للمكونات اللي بتكبر وتصغر مع خطها (زي padding الزرار).
- **`%`**: نسبة لحاجة في الأب، ومش دايماً نفس الحاجة (في `width` نسبة لعرض الأب، في `height` نسبة لارتفاعه).
- **`vw` / `vh`**: 1% من عرض/ارتفاع نافذة العرض ([[dt-length]]). و`dvh` أدق في الموبايل لأنه بيراعي شريط المتصفح.
- **`ch`**: عرض حرف الـ "0"، حلوة للتحكم في عرض الفقرة (`max-width: 65ch`).

> [!tip] قاعدة عملية: `rem` للخطوط والمسافات الكبيرة، `px` للحدود والتفاصيل الدقيقة، `%`/`fr` للتخطيط، و`clamp()` ([[fn-clamp]]) للأحجام المتجاوبة.

> [!warn] تجنّب `px` للخط الأساسي لو عايز المستخدم يقدر يكبّر الخط من إعدادات المتصفح بسهولة.

## try

```html
<style>
  .a { font-size:1rem; background:#efe0bd; color:#3d2c18; padding:.5rem; margin-bottom:6px; }
  .b { font-size:2rem; background:#bcd4a8; color:#3d2c18; padding:.5rem; }
</style>
<div class="a">1rem = 16px</div><div class="b">2rem = 32px</div>
```

## examples

### 1) px مقابل rem
الاتنين بيطلعوا بنفس الحجم النهاية، لكن `rem` بيتجاوب مع إعدادات الخط.

```html
<style>
  .p { font-size:24px; background:#efe0bd; color:#3d2c18; padding:8px; margin-bottom:6px; }
  .r { font-size:1.5rem; background:#bcd4a8; color:#3d2c18; padding:8px; }
</style>
<div class="p">24px</div><div class="r">1.5rem</div>
```

- لو غيّرت حجم الخط من الإعدادات الجنب، الـ rem بيتغيّر معاه.

### 2) em بيتراكم
كل مستوى `em` بيضرب في الأب. شوف الحجم بيكبر ازاي.

```html
<style>
  .l1 { font-size:1.4em; color:#3d2c18; background:#efe0bd; padding:6px; }
  .l1 .l2 { font-size:1.4em; background:#bcd4a8; padding:6px; margin-top:4px; }
  .l1 .l2 .l3 { font-size:1.4em; background:#e4c490; padding:6px; margin-top:4px; }
</style>
<div class="l1">1<div class="l2">2<div class="l3">3</div></div></div>
```

- الحجم بيتضاعف كل ما تدخل جوه.
- ده السبب اللي بيخلّي rem أأمن للخطوط.

### 3) النسب المئوية
`%` في `width` نسبة من عرض الأب. غيّر حجم النافذة وشوف.

```html
<style>
  .parent { width:100%; background:#efe0bd; padding:6px; }
  .half { width:50%; background:#3d7a5a; color:#f3ede0; padding:8px; }
  .third { width:33.33%; background:#b5551f; color:#f3ede0; padding:8px; margin-top:4px; }
</style>
<div class="parent"><div class="half">50%</div><div class="third">33%</div></div>
```



### 4) ch للقراءة المريحة
الفقرة العريضة مجهدة للعين. `max-width: 40ch` يخلّيها ~40 حرف.

```html
<style>
  p { max-width:40ch; line-height:1.9; color:#3d2c18; background:#efe0bd; padding:10px; }
</style>
<p>النص الطويل لو عرضه كبير جداً بيتعب العين وهي بتنتقل بين الأسطر، فبنحدد عرض مريح يقارب أربعين حرف.</p>
```

- مثالي لمقالات القراءة.

## mistakes

### الصفر مش محتاج وحدة

```css bad
.a { margin:0px; }  /* شغال لكن مالوش لازمة */
```

```css good
.a { margin:0; }
```

الصفر هو صفر في أي وحدة.

### نسيان الوحدة

```css bad
.box { width:200; }  /* هيتجاهل */
```

```css good
.box { width:200px; }
```

الأرقام من غير وحدة (ماعدا 0 وبعض الخصائص) مش بتشتغل.

## quiz

### `2rem` تساوي (والخط الأساسي 16px)؟
- [ ] 16px
- [ ] 24px
- [x] 32px
- [ ] 2px

rem × حجم الخط الأساسي.

### أنهي وحدة بتحترم تكبير المستخدم للخط؟
- [ ] px
- [x] rem
- [ ] mm
- [ ] pt

rem نسبية لخط الجذر.

### `50vw` معناها؟
- [ ] 50% من عرض الأب
- [x] 50% من عرض نافذة العرض
- [ ] 50 بكسل
- [ ] نص الخط

vw = viewport width.

## refs

- [MDN: CSS values and units](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Values_and_units)
