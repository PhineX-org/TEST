---
id: visibility
kind: property
cat: sizing
chip: visibility
title: الظهور والإخفاء
en: CSS visibility property
status: stable
support: all
size: compact
mdn: visibility
summary: visibility بتخفي العنصر مع الاحتفاظ بمكانه (hidden)، بعكس display:none اللي بيشيل المكان. وفيها collapse لصفوف الجداول.
keywords: visibility, hidden, visible, collapse, اخفاء, اخفاء مع مكان, display none
related: display, opacity, overflow, display-flow, pointer-events
---

## intro

الخاصية `visibility` بتتحكم في **ظهور** العنصر **من غير ما تشيله من الـ layout**. يعني لما تكتب `visibility: hidden` العنصر **بيختفي بصرياً** لكن **بيفضل ياخد مكانه** فاضي. وده الفرق الجوهري عن [[display]]`: none` اللي بيشيل العنصر تماماً من التخطيط.

القيم: `visible` (الافتراضي)، و`hidden` (مخفي ومكانه محجوز ومش بيستقبل ضغط ولا تركيز)، و`collapse` (لصفوف وأعمدة الجداول: بتشيلهم، وفي العناصر التانية زي hidden).

مهمة: `visibility` **بتتوارث**، والأبناء ممكن يرجّعوا `visibility: visible` حتى لو الأب hidden. وبيتحرك بـ transition بشكل متقطع (بيتبدّل في نص المدة)، فبنستخدمه مع `opacity` لعمل fade: `opacity` بحركة و`visibility` بتتبدل في آخر لحظة.

وقارئ الشاشة **بيتجاهل** العنصر اللي `visibility: hidden` (زي display:none).

> [!analogy] `display: none` زي إنك شيلت الكرسي من الغرفة، و`visibility: hidden` زي إنك سبت الكرسي بس غطّيته بملاية شفافة: مكانه محجوز لكن مش شايفه.

## try

```html
<style>
  .row div { display:inline-block; padding:10px; background:#efe0bd; color:#3d2c18; margin:3px; }
  .h { visibility:hidden; }
</style>
<div class="row"><div>1</div><div class="h">2 (hidden)</div><div>3</div></div>
```

## syntax

```css nolive
visibility: visible;
visibility: hidden;
visibility: collapse;
```

- **القيمة المبدئية**: `visible`.
- **بتتوارث؟** أيوه.
- **بتتحرك؟** بشكل منفصل (discrete).

## values

### visible
ظاهر.

### hidden
مخفي مع حجز المكان ومن غير تفاعل.

### collapse
في الجداول بيشيل الصف/العمود. في غيرها زي hidden.

## use

- إخفاء عنصر من غير ما التخطيط يتحرك.
- fade-in/out مع `opacity`.
- إخفاء صف في جدول بـ collapse.

## avoid

- استخدامه لإخفاء محتوى عايزه يتقري بالـ screen reader (بيخفيه عنهم).

## examples

### 1) hidden يسيب فراغ
مكان العنصر 2 فاضي.

```html
<style>
  .r span { display:inline-block; padding:8px 14px; background:#bcd4a8; color:#3d2c18; margin:3px; }
  .r .h { visibility:hidden; }
</style>
<div class="r"><span>1</span><span class="h">2</span><span>3</span></div>
```



### 2) none مقابل hidden
الأول بيشيل المكان، التاني بيسيبه.

```html
<style>
  .r span { display:inline-block; padding:8px 14px; background:#efe0bd; color:#3d2c18; margin:3px; }
  .n { display:none !important; } .h { visibility:hidden; }
</style>
<div class="r"><span>أ</span><span class="n">none</span><span>ب</span><span class="h">hidden</span><span>ج</span></div>
```



### 3) fade بـ opacity + visibility
مرّر الماوس على الصندوق.

```html
<style>
  .p { position:relative; width:160px; padding:8px; background:#efe0bd; color:#3d2c18; }
  .tip { visibility:hidden; opacity:0; transition:opacity .3s, visibility .3s; background:#7a4a1d; color:#f3ede0; padding:6px; margin-top:6px; }
  .p:hover .tip { visibility:visible; opacity:1; }
</style>
<div class="p">مرّر عليّ<div class="tip">تلميح بيظهر بنعومة</div></div>
```



## mistakes

### استخدام hidden لإخفاء محتوى للقراء بس

```css bad
.sr { visibility:hidden; }  /* القارئ مش هيقراه */
```

```css good
.sr { position:absolute; width:1px; height:1px; overflow:hidden; clip-path:inset(50%); }
```

`visibility:hidden` بيخفيه من الكل حتى قارئ الشاشة.

## quiz

### الفرق بين visibility:hidden و display:none؟
- [ ] مفيش
- [x] hidden يسيب المكان
- [ ] none يسيب المكان
- [ ] hidden أسرع

المكان محجوز مع hidden.

### visibility بتتوارث؟
- [x] أيوه
- [ ] لأ
- [ ] أحياناً
- [ ] فقط للأبناء المباشرين

والابن ممكن يرجّعها visible.

## refs

- [MDN: visibility](https://developer.mozilla.org/en-US/docs/Web/CSS/visibility)
