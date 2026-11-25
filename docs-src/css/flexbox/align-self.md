---
id: align-self
kind: property
cat: flexbox
chip: align-self
title: محاذاة عنصر واحد
en: CSS align-self property
status: stable
support: all
mdn: align-self
summary: align-self بتغيّر محاذاة ابن واحد على المحور العرضي بدل align-items بتاعة الحاوية. مفيدة لاستثناءات.
keywords: align-self, محاذاة عنصر, استثناء, center, flex-end, stretch, auto
related: align-items, justify-self, order, flexbox-guide, place-self
---

## intro

الخاصية `align-self` بتتحط على **ابن واحد** وبتعدّل محاذاته على المحور العرضي، متجاهلة قيمة [[align-items]] اللي على الحاوية. يعني لو الحاوية عاملة `align-items: center` وعايز ابن واحد ينزل تحت، بتكتب له `align-self: flex-end`.

القيم زي `align-items`: `auto` (الافتراضي: يتبع الحاوية)، `stretch`، `flex-start`، `flex-end`، `center`، `baseline`. وبتشتغل في Flexbox وGrid. وفي flex، **الـ margin `auto`** على المحور العرضي (`margin-top: auto`) بيعمل شيء شبيه.


فكّر فيها كـ «استثناء من القاعدة»: الحاوية قررت إن كل الأبناء يتوسّطوا (`align-items: center`)، لكن عندك عنصر واحد عايزه يشذ عن الباقي: ينزل تحت أو يطلع فوق أو يتمدد. بدل ما تعمل حاويات منفصلة، بتدّي العنصر ده بس `align-self` بالقيمة اللي عايزها. ومهم تفتكر إنها **على المحور العرضي** بس (الرأسي في `row`)؛ للمحور الرئيسي استخدم margins `auto` أو [[order]] أو [[justify-content]].

> [!tip] الأكتر استخداماً: زرار «حفظ» ينزل لتحت في كارت `flex-direction:column` بـ `align-self:flex-end`.

## try

```html
<style>
  .f { display:flex; align-items:center; height:100px; background:#efe0bd; gap:6px; padding:6px; }
  .f div { background:#7a4a1d; color:#f3ede0; padding:8px 14px; }
  .x { align-self:flex-end; background:#3d7a5a !important; }
</style>
<div class="f"><div>وسط</div><div class="x">تحت</div><div>وسط</div></div>
```

## syntax

```css nolive
align-self: auto;
align-self: center;
align-self: flex-end;
align-self: stretch;
```

- **القيمة المبدئية**: `auto`.
- بتتحط على الابن.

## values

### auto
يتبع `align-items` للحاوية.

### center
وسط.

### flex-end
نهاية المحور العرضي.

### flex-start
بداية المحور العرضي.

### stretch
يتمدد.

## use

- استثناء محاذاة عنصر واحد.
- زر في آخر كارت.
- عنصر ملتزم بخط الأساس.

## avoid

- استخدامها على الحاوية (مفيش أثر).
- تكرارها على كل الأبناء (استخدم align-items).

## examples

### 1) استثناء واحد
كلهم وسط ما عدا واحد.

```html
<style>
  .f { display:flex; align-items:center; height:90px; background:#efe0bd; gap:6px; padding:6px; }
  .f div { background:#c9772f; color:#fff3e0; padding:8px 14px; }
  .t { align-self:flex-start; background:#3d7a5a !important; }
</style>
<div class="f"><div>1</div><div class="t">فوق</div><div>3</div></div>
```



### 2) زرار في آخر الكارت
الزرار في الشمال بدون إيدي.

```html
<style>
  .c { display:flex; flex-direction:column; gap:6px; background:#efe0bd; color:#3d2c18; padding:10px; }
  .c button { align-self:flex-end; background:#7a4a1d; color:#f3ede0; border:0; padding:6px 14px; border-radius:6px; }
</style>
<div class="c"><div>محتوى الكارت</div><button>حفظ</button></div>
```



### 3) stretch لواحد
واحد بيتمدد والباقي حسب الحاوية.

```html
<style>
  .f { display:flex; align-items:flex-start; height:90px; background:#efe0bd; gap:6px; padding:6px; }
  .f div { background:#bcd4a8; color:#3d2c18; padding:8px 14px; }
  .s { align-self:stretch; background:#e4c490 !important; }
</style>
<div class="f"><div>1</div><div class="s">stretch</div></div>
```



### 4) baseline لعنصر
محاذاة خط الأساس لواحد بس.

```html
<style>
  .f { display:flex; align-items:flex-start; gap:10px; background:#efe0bd; padding:8px; color:#3d2c18; }
  .b { align-self:baseline; font-size:1.8rem; }
</style>
<div class="f"><span class="b">كبير</span><span style="font-size:.9rem">صغير</span></div>
```



## mistakes

### على الحاوية

```css bad
.parent { align-self:center; }
```

```css good
.parent { align-items:center; }
```

align-self للأبناء.

### توقع تأثير على المحور الرئيسي

```css bad
.item { align-self:flex-end; }  /* مش بيحركه يمين/شمال في row */
```

```css good
.item { margin-inline-start:auto; }
```

align-self للمحور العرضي فقط.

## quiz

### align-self بتأثر على؟
- [ ] الحاوية
- [x] ابن واحد
- [ ] كل الأبناء
- [ ] body

الابن نفسه.

### الافتراضي؟
- [ ] center
- [x] auto
- [ ] stretch
- [ ] start

auto.

### بتغلب مين؟
- [x] align-items للحاوية
- [ ] width
- [ ] order
- [ ] gap

بتتجاوز محاذاة الحاوية لابن واحد.

## refs

- [MDN: align-self](https://developer.mozilla.org/en-US/docs/Web/CSS/align-self)
