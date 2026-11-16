---
id: attr-writingsuggestions
kind: attribute
cat: global-attrs
chip: writingsuggestions
title: خاصية اقتراحات الكتابة
en: HTML writingsuggestions global attribute
status: stable
support: limited
support_note: مدعومة في كروم وإيدج؛ باقي المتصفحات بتتجاهلها.
size: compact
mdn: Global_attributes/writingsuggestions
summary: خاصية writingsuggestions بتشغّل أو توقف اقتراحات الكتابة اللي المتصفح بيعرضها كنص رمادي بعد المؤشر. القيمة false بتوقفها في الحقول الحساسة أو اللي ليها اقتراحاتها.
keywords: writingsuggestions, اقتراحات الكتابة, إكمال تلقائي, AI, textarea, input, true, false, نص رمادي
related: attr-spellcheck, attr-autocorrect, textarea, input, attr-contenteditable
---

## intro

بعض المتصفحات الحديثة (مدعومة بذكاء اصطناعي) بتقترح عليك **إكمال الجملة** وانت بتكتب، كنص رمادي بعد المؤشر، وتدوس Tab تقبله. ده ممكن يفيد، لكن **مش مناسب** في كل حقل: محرر بيعمل اقتراحاته الخاصة، أو حقل فيه بيانات حساسة، أو تجربة اختبار الكتابة. الخاصية `writingsuggestions` بتتحكم فيه: `false` توقف الاقتراحات، `true` (أو من غير قيمة) تسمح بيها. وبتنفع على الحقل أو على حاوية تغطي جزء كبير من الصفحة (وبتتورّث).

## try

```html
<textarea writingsuggestions="false" rows="2" style="width:100%" placeholder="من غير اقتراحات كتابة"></textarea>
<textarea rows="2" style="width:100%; margin-top:6px" placeholder="الافتراضي (ممكن يظهر اقتراح)"></textarea>
```

## syntax

```html nolive
<textarea writingsuggestions="false"></textarea>
<form writingsuggestions="false">...</form>
```

- `false` — **إيقاف** الاقتراحات.
- `true` أو من غير قيمة — **تفعيل**.

## use

- إيقافه في حقول الاختبارات والمحررات الذكية.
- حقول فيها بيانات حساسة.

## avoid

- متقفلهوش بدون داعي: بيساعد ناس كتير.

## examples

### 1) إيقاف على حاوية كاملة
مثال على form.

```html
<form writingsuggestions="false">
  <textarea rows="2" style="width:100%" placeholder="تعليق"></textarea>
  <input placeholder="عنوان" style="width:100%; margin-top:4px; padding:6px">
</form>
```

- القيمة بتتورّث للحقول جوه الفورم.
- بدل ما تكتبها على كل حقل.
- ممكن override على حقل بعينه.

### 2) تفعيل صريح
مثال على true.

```html
<textarea writingsuggestions="true" rows="2" style="width:100%" placeholder="اكتب رسالة"></textarea>
```

- `true` هي الافتراضي.
- مفيدة لو الأب موقفها.
- متكتبهاش لو مش محتاجها.

### 3) محرر مخصّص
مثال على contenteditable.

```html
<div contenteditable writingsuggestions="false" style="border:1px solid #94a3b8; padding:8px">محرر بيعمل اقتراحاته الخاصة</div>
```

- المحررات اللي بتعمل اقتراحاتها محتاجة تقفل اقتراحات المتصفح.
- بتشتغل على `contenteditable`.
- تجنّب التكرار والتشويش.

## mistakes

### قيمة خاطئة
```html bad
<textarea writingsuggestions="off"></textarea>
```
```html good
<textarea writingsuggestions="false"></textarea>
```
ليه؟ القيم المسموحة `true` و`false`.

## a11y

- الاقتراحات بتساعد مستخدمين كتير: متقفلهاش من غير سبب.
- في الاختبارات اقفلها لأسباب العدالة.

## quiz

### أنهي قيمة بتوقف الاقتراحات؟
- [x] `false`
- [ ] `off`
- [ ] `no`
- [ ] `none`
false.

### بتتورّث؟
- [x] أيوه من الحاوية
- [ ] لأ
- [ ] بس للأخ
- [ ] بس للـ body
تنطبق على الأبناء.

## refs

- [MDN: writingsuggestions](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/writingsuggestions)
- [WHATWG: writingsuggestions](https://html.spec.whatwg.org/multipage/interaction.html#writing-suggestions)
