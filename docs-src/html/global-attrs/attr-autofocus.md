---
id: attr-autofocus
kind: attribute
cat: global-attrs
chip: autofocus
title: خاصية الفوكس التلقائي
en: HTML autofocus global attribute
status: stable
support: all
size: compact
mdn: Global_attributes/autofocus
summary: خاصية autofocus بتخلّي العنصر ياخد الفوكس أول ما الصفحة تتحمّل أو لما النافذة تتفتح. مفيدة لحقل البحث، لكن ممكن تتعب مستخدمي قارئ الشاشة والموبايل.
keywords: autofocus, فوكس تلقائي, focus, حقل بحث, boolean, dialog autofocus, تحميل الصفحة, لوحة المفاتيح
related: attr-tabindex, input, dialog, button, attr-inert
---

## intro

الـ `autofocus` خاصية منطقية بتقول للمتصفح: «لما الصفحة تتحمّل، **حط المؤشر (الفوكس) على العنصر ده فوراً**». الاستخدام الشائع: **حقل البحث** في صفحة بحث، أو أول حقل في فورم تسجيل دخول، فالمستخدم يبدأ يكتب من غير ما يدوس.

لكن ليها محاذير: على **الموبايل** ممكن تفتح لوحة المفاتيح فجأة وتغطّي نص الصفحة، ولمستخدمي **قارئ الشاشة** بتنقلهم لنص الحقل وتفوّتهم اللي قبله. وجوه [[dialog]] مفيدة جداً: العنصر اللي عليه `autofocus` جوه النافذة هو اللي بياخد الفوكس لما تتفتح. ولو فيه أكتر من عنصر `autofocus` في الصفحة، **الأول بس** هو اللي بيكسب.

## try

```html
<label>ابحث: <input type="search" autofocus placeholder="الفوكس هنا لما الصفحة تتحمّل"></label>
```

## syntax

```html nolive
<input autofocus>
<dialog open><button autofocus>تمام</button></dialog>
```

- `autofocus` — **خاصية منطقية** بتحط الفوكس عند التحميل.
- جوه `<dialog>` — **بتحدد** العنصر اللي ياخد الفوكس عند الفتح.

## use

- حقل البحث الرئيسي في صفحة بحث مخصصة.
- العنصر الأساسي جوه نافذة (dialog).

## avoid

- متحطّهاش في صفحات المحتوى العادية: بتنقل المستخدم من غير ما يطلب.

## examples

### 1) أول حقل في فورم دخول
سهولة الكتابة.

```html
<form onsubmit="return false">
  <input autofocus placeholder="البريد الإلكتروني" style="display:block; margin:4px 0; padding:6px">
  <input type="password" placeholder="كلمة السر" style="display:block; margin:4px 0; padding:6px">
</form>
```

- المستخدم يبدأ يكتب من غير ضغطة.
- مناسبة لصفحة هدفها الوحيد الدخول.
- متستخدمهاش لو الصفحة فيها محتوى مهم فوق الحقل.

### 2) داخل نافذة dialog
الفوكس على الزرار الآمن.

```html
<dialog open style="position:static; border:2px solid #0ea5e9; border-radius:10px">
  <p>حذف الملف؟ مفيش رجوع.</p>
  <button>حذف</button> <button autofocus>إلغاء</button>
</dialog>
```

- الفوكس على «إلغاء» (الخيار الآمن) مش «حذف».
- ده أفضل تصميم للإجراءات الخطرة.
- عند فتح النافذة بـ `showModal()` الفوكس بيروح للعنصر ده.

### 3) أكتر من autofocus
الأول بيكسب.

```html
<input autofocus placeholder="1 (ده اللي ياخد الفوكس)">
<input autofocus placeholder="2 (بيتجاهل)">
```

- لو في أكتر من عنصر، **الأول** بس بياخد الفوكس.
- متحطّش أكتر من واحد في الصفحة.
- الباقي بيتتجاهل.

## mistakes

### autofocus في صفحة محتوى
```html bad
<article>...<input autofocus placeholder="اشترك"></article>
```
```html good
<article>...<input placeholder="اشترك"></article>
```
ليه؟ هتنقل المستخدم لأسفل الصفحة فور فتحها، وتخفي بداية المقال.

## a11y

- الفوكس التلقائي بيغيّر مكان القراءة لقارئ الشاشة: استخدمه بحذر.
- على الموبايل ممكن يفتح الكيبورد ويغطي المحتوى.

## quiz

### إيه بيعمله `autofocus`؟
- [x] بيحط الفوكس على العنصر عند التحميل
- [ ] بيمسح الحقل
- [ ] بيخفي العنصر
- [ ] بيعطّله
فوكس تلقائي.

### لو فيه أكتر من autofocus؟
- [x] الأول بيكسب
- [ ] الأخير
- [ ] كلهم
- [ ] خطأ
واحد بس.

## refs

- [MDN: autofocus](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/autofocus)
- [WHATWG: autofocus](https://html.spec.whatwg.org/multipage/interaction.html#the-autofocus-attribute)
