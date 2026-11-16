---
id: attr-spellcheck
kind: attribute
cat: global-attrs
chip: spellcheck
title: خاصية التدقيق الإملائي
en: HTML spellcheck global attribute
status: stable
support: all
size: compact
mdn: Global_attributes/spellcheck
summary: خاصية spellcheck بتحدد هل المتصفح يراجع إملاء النص في حقل أو عنصر قابل للتعديل ويرسم خط أحمر تحت الأخطاء. القيم true وfalse، وبتنفع لتعطيله في الأكواد والأسماء.
keywords: spellcheck, تدقيق إملائي, خط أحمر, textarea, contenteditable, true, false, أخطاء إملائية, كود
related: textarea, attr-contenteditable, attr-autocorrect, attr-autocapitalize, input
---

## intro

لما بتكتب في حقل نص ويطلع **خط أحمر مموّج** تحت كلمة، ده **التدقيق الإملائي** بتاع المتصفح. الخاصية `spellcheck` بتتحكم فيه: `true` يفعّله، `false` يوقفه. وتنفع على العناصر القابلة للتعديل: `<textarea>` و`<input type="text">` وأي عنصر عليه [[attr-contenteditable]]، وبتتورّث من الأب.

الافتراضي بيختلف حسب المتصفح والحقل. اقفله (`false`) في حقول بتكتب فيها **أكواد أو أسماء مستخدمين أو أرقام تسلسلية** عشان الخط الأحمر ميظهرش على كل حاجة ويزعج المستخدم.

## try

```html
<textarea spellcheck="true" rows="2" style="width:100%">كتبت كلمه غلط هنا: ثقافه، مدرسه</textarea>
<textarea spellcheck="false" rows="2" style="width:100%">نفس الكلمات من غير تدقيق: ثقافه، مدرسه</textarea>
```

## syntax

```html nolive
<textarea spellcheck="true | false"></textarea>
```

- `true` — **فعّل** التدقيق.
- `false` — **أوقفه**.
- من غير قيمة — **الافتراضي** للمتصفح.

## use

- إيقافه في حقول الكود والأسماء.
- تفعيله في حقول الكتابة الطويلة (تعليقات، مقالات).

## avoid

- متقفلهوش في حقول نصية عادية من غير سبب: بيساعد المستخدم.

## examples

### 1) إيقاف التدقيق في حقل اسم مستخدم
مثال على username.

```html
<input spellcheck="false" placeholder="اسم المستخدم" value="Ahmd_99x" style="padding:6px">
```

- أسماء المستخدمين مش كلمات قاموس.
- إيقاف التدقيق بيشيل الخط الأحمر الغير مفيد.
- نفس الفكرة لحقول الكود والـ IDs.

### 2) تدقيق في عنصر contenteditable
مع التحرير المباشر.

```html
<div contenteditable spellcheck="true" style="border:1px solid #94a3b8; padding:8px">اكتب كلمة غلط: مكتبه</div>
```

- الخاصية بتشتغل على العناصر القابلة للتعديل.
- بتتورّث للأبناء.
- مفيدة في محررات النصوص.

### 3) قراءة القيمة
مثال على el.spellcheck.

```html
<textarea id="t" spellcheck="false"></textarea>
<p id="o"></p>
<script>
  document.getElementById('o').textContent = 'spellcheck = ' + document.getElementById('t').spellcheck;
</script>
```

- الخاصية قابلة للقراءة والكتابة (`el.spellcheck`).
- بترجّع قيمة منطقية.
- ممكن تضبطها حسب نوع المحتوى.

## mistakes

### قيمة غير صحيحة
```html bad
<textarea spellcheck="off"></textarea>
```
```html good
<textarea spellcheck="false"></textarea>
```
ليه؟ القيم الصحيحة `true` و`false` (مش on/off).

## a11y

- التدقيق الإملائي بيساعد ناس كتير (عسر القراءة): متقفلوش من غير داعي.
- في الحقول التقنية اقفله علشان تقلل التشويش.

## quiz

### أنهي قيمة بتوقف التدقيق؟
- [x] `false`
- [ ] `off`
- [ ] `no`
- [ ] `0`
false.

### تنفع على إيه؟
- [x] العناصر القابلة للتعديل
- [ ] الصور
- [ ] الفيديو
- [ ] الجداول
حقول وcontenteditable.

## refs

- [MDN: spellcheck](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/spellcheck)
- [WHATWG: spellcheck](https://html.spec.whatwg.org/multipage/interaction.html#attr-spellcheck)
