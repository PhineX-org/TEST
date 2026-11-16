---
id: attr-form
kind: attribute
cat: attrs
chip: form
title: خاصية ربط الفورم
en: HTML form attribute
status: stable
support: all
size: compact
mdn: Attributes/form
summary: خاصية form على input وbutton وselect وtextarea وغيرها بتربط العنصر بفورم عن طريق id الفورم حتى لو العنصر برّه الفورم في الـ DOM. مفيدة لتصميمات بتفصل الحقول.
keywords: form attribute, ربط بفورم, button form, input form, خارج الفورم, id, form owner, تصميم, fieldset form
related: form, input, button, select, textarea, attr-name
---

## intro

القاعدة المعتادة: العنصر لازم يكون **جوه** وسم `<form>` عشان يتبعت معاه. لكن أحياناً التصميم بيفرض إن **زرار الإرسال** يبقى في الـ header أو الـ footer **بعيد** عن الفورم، أو إن حقل يبقى في قسم تاني. هنا بتحل `form` المشكلة: بتكتب `form="id-الفورم"` على العنصر، فالمتصفح يعتبره جزء من الفورم ده حتى لو برّاه. بتتكتب على [[input]] و[[button]] و[[select]] و[[textarea]] و[[fieldset]] وغيرها. القيمة **`id` فورم واحد بس**. ولو العنصر جوه فورم أصلاً وكتبت `form` تانية، بتتغلب الخاصية.

## try

```html
<form id="f" onsubmit="event.preventDefault(); o.textContent = new URLSearchParams(new FormData(this)).toString()">
  <input name="q" value="html">
</form>
<div style="padding:8px; background:#f1f5f9">
  <input name="lang" form="f" value="ar" size="4">
  <button form="f">ابعت (برّه الفورم)</button>
</div>
<p id="o" dir="ltr"></p>
```

## syntax

```html nolive
<form id="myForm">…</form>
<button type="submit" form="myForm">إرسال</button>
```

- `form="id-الفورم"` — ربط بفورم.
- العنصر ممكن يبقى برّا الفورم.
- فورم واحد بس.

## use

- زرار إرسال في header أو شريط ثابت.
- حقول موزّعة في أقسام التصميم.

## avoid

- متحطش `form` على عنصر جوه فورم تاني إلا لو متعمّد.

## examples

### 1) زرار برّه
submit خارجي.

```html
<form id="f" onsubmit="event.preventDefault(); o.textContent='اتبعت ✅'"><input name="n" required></form>
<button type="submit" form="f">إرسال من برّه</button>
<p id="o"></p>
```

- الزرار بيبعت الفورم.
- الفحص (`required`) بيشتغل.
- مفيد في الـ sticky bars.

### 2) حقل في قسم تاني
مثال على input form.

```html
<form id="f" onsubmit="event.preventDefault(); o.textContent = new URLSearchParams(new FormData(this))"><input name="a" value="1"><button>ابعت</button></form>
<aside><input name="b" form="f" value="2"></aside>
<p id="o" dir="ltr"></p>
```

- الحقل `b` بيتبعت مع الفورم.
- حتى لو برّا.
- `form.elements` بيشمله.

### 3) قراءة form owner
مثال على el.form.

```html
<form id="f"></form><input id="i" form="f">
<script>document.write('<p>' + (i.form === f) + '</p>')</script>
```

- `input.form` بيرجّع الفورم المرتبط.
- مفيد للتحقق.
- بيشتغل مع الخاصية.

## mistakes

### id غلط
```html bad
<button form="mYform">إرسال</button>
```
```html good
<button form="myForm">إرسال</button>
```
ليه؟ لازم تطابق id الفورم بالحرف.

## a11y

- حافظ على ترتيب منطقي للتاب حتى لو العناصر بعيدة.
- اربط الزرار بنص يوضح وظيفته.

## quiz

### قيمتها؟
- [x] id الفورم
- [ ] name الفورم
- [ ] action
- [ ] class
بالـ id.

### لازم العنصر جوه الفورم؟
- [x] لأ مع form
- [ ] أيوه
- [ ] بعض الأحيان
- [ ] دايماً
ممكن برّاه.

## refs

- [MDN: form](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/form)
- [WHATWG: form owner](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#form-owner)
