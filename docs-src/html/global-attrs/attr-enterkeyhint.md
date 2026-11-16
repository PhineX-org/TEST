---
id: attr-enterkeyhint
kind: attribute
cat: global-attrs
chip: enterkeyhint
title: خاصية تلميح زرار الإدخال
en: HTML enterkeyhint global attribute
status: stable
support: all
size: compact
mdn: Global_attributes/enterkeyhint
summary: خاصية enterkeyhint بتغيّر شكل أو كلمة زرار Enter على لوحة المفاتيح الافتراضية للموبايل: go أو search أو send أو next أو done، علشان يوضح اللي هيحصل.
keywords: enterkeyhint, زرار الإدخال, Enter, لوحة المفاتيح, موبايل, search, send, go, next, done, previous
related: attr-inputmode, attr-autocapitalize, input, textarea, form
---

## intro

لوحة المفاتيح الافتراضية على الموبايل فيها زرار في الركن اسمه **Enter** (أو «↵»). الخاصية `enterkeyhint` بتخلّيك تغيّر **شكل أو كلمة** الزرار ده حسب اللي هيحصل لما المستخدم يضغطه: **`search`** (🔍 بحث) لحقل بحث، **`send`** (إرسال) لرسالة، **`go`** (انتقال) لعنوان، **`next`** (التالي) للانتقال للحقل بعده، **`done`** (تم) لآخر حقل، **`previous`** (السابق)، و**`enter`** الافتراضي.

مفيش تأثير على سلوك الضغط نفسه (إنت اللي بتبرمجه)، لكنها **تحسّن الوضوح** وبتخلّي واجهة الموبايل أقرب للتطبيقات الأصلية.

## try

```html
<input type="search" enterkeyhint="search" placeholder="ابحث… (على الموبايل زرار البحث)" style="width:100%; padding:6px">
```

## syntax

```html nolive
<input enterkeyhint="enter | done | go | next | previous | search | send">
```

- `search` — **بحث** 🔍.
- `send` — **إرسال**.
- `next` — **التالي** للحقل بعده.
- `done` — **تم** (آخر حقل).

## use

- حقول البحث: `search`.
- رسائل الدردشة: `send`.
- فورمز متعددة الحقول: `next` و`done`.

## avoid

- متحطّش قيمة مضلّلة (مثلاً `send` لحقل مش بيبعت حاجة).

## examples

### 1) دردشة
مثال على send.

```html
<form onsubmit="event.preventDefault(); alert('اتبعتت')"><input enterkeyhint="send" placeholder="اكتب رسالة" style="padding:6px; width:70%"> <button>إرسال</button></form>
```

- زرار Enter على الموبايل هيظهر كـ «إرسال».
- الضغط عليه بيبعت الفورم (سلوك الفورم العادي).
- التلميح بيوضّح الوظيفة بس.

### 2) خطوات فورم
next ثم done.

```html
<input enterkeyhint="next" placeholder="الاسم" style="display:block; margin:4px 0; padding:6px">
<input enterkeyhint="next" placeholder="الإيميل" style="display:block; margin:4px 0; padding:6px">
<input enterkeyhint="done" placeholder="الموبايل" style="display:block; margin:4px 0; padding:6px">
```

- `next` على الحقول الوسطية، و`done` على الأخير.
- بيوضّح للمستخدم إنه خلّص.
- تحتاج تضبط الانتقال برمجياً لو عايز.

### 3) العنوان والانتقال
مثال على go.

```html
<input type="url" enterkeyhint="go" placeholder="https://" style="width:100%; padding:6px">
```

- `go` مناسب لحقل رابط.
- الشكل بيختلف بين Android وiOS.
- بعض المتصفحات بتتجاهلها.

## mistakes

### قيمة غير مدعومة
```html bad
<input enterkeyhint="submit">
```
```html good
<input enterkeyhint="send">
```
ليه؟ القيم المسموحة محدّدة: enter, done, go, next, previous, search, send.

## a11y

- التلميح بيساعد كل المستخدمين على فهم اللي هيحصل.
- متعتمدش عليها كبديل لتسمية الزرار في الواجهة.

## quiz

### إيه القيمة المناسبة لحقل بحث؟
- [x] `search`
- [ ] `next`
- [ ] `done`
- [ ] `send`
أيقونة بحث.

### هل بتغيّر السلوك؟
- [x] لأ، شكل بس
- [ ] أيوه
- [ ] بتبعت الفورم
- [ ] بتمسح الحقل
مجرد تلميح.

## refs

- [MDN: enterkeyhint](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/enterkeyhint)
- [WHATWG: enterkeyhint](https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-enterkeyhint-attribute)
