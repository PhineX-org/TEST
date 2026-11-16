---
id: input-search
kind: inputtype
cat: input-types
chip: type="search"
title: حقل البحث
en: <input type="search">
status: stable
support: all
mdn: Elements/input/search
summary: type="search" حقل نص مخصّص للبحث: بيظهر زرار مسح (✕) في بعض المتصفحات، ومفتاح Enter على الموبايل بيبقى "بحث". بيتصرّف كالنص لكن بمعنى (semantic) أوضح.
keywords: input search, بحث, search box, زرار المسح, enterkeyhint, role search, form search, بحث الموقع
related: input, input-text, search, form, attr-enterkeyhint, attr-autocomplete
---

## intro

ده حقل نص عادي من حيث الوظيفة، لكن **معناه إنه حقل بحث**. الفايدة: بعض المتصفحات بتظهر فيه **زرار مسح صغير (✕)** بعد ما تكتب، وكيبورد الموبايل بيغيّر مفتاح الإدخال لـ **«بحث» (Search)** بدل «سطر جديد». كمان قارئ الشاشة بيفهم إن ده حقل بحث.

الشكل بيختلف بين المتصفحات: سفاري بيدّيه حواف مدوّرة وأيقونة عدسة، وكروم بيضيف الـ ✕. لو الشكل ده مش عاجبك بتقدر تغيّره بـ CSS. والأحسن تلفّه جوه `<form role="search">` أو عنصر [[search]] عشان يتعرّف كمنطقة بحث للموقع كله. وممكن تدّيه [[attr-enterkeyhint]] لتحكّم أدق في شكل مفتاح الإدخال على الموبايل.

## try

```html
<form role="search" onsubmit="event.preventDefault(); o.textContent = 'بتدوّر على: ' + q.value">
  <input id="q" type="search" name="q" placeholder="دوّر في الدروس…" autocomplete="off">
  <button>بحث</button>
</form>
<p id="o"></p>
```

## syntax

```html nolive
<form role="search" action="/search">
  <input type="search" name="q" placeholder="ابحث…">
  <button>بحث</button>
</form>
```

- `type="search"` — معناها حقل بحث (زرار ✕ ومفتاح "بحث").
- `name="q"` — الاسم الشائع لكلمة البحث.
- `role="search"` على الفورم — بيحدد منطقة البحث.

## use

- بحث داخل الموقع أو التطبيق.
- فلترة قايمة أو جدول.
- أي حقل هدفه استعلام.

## avoid

- متنساش تغلّفه بـ form مع زرار أو مفتاح Enter يشتغل.
- متستخدمهوش لإدخال بيانات عادية (اسم مثلاً).

## examples

### 1) فلترة فورية
تصفية قايمة.

```html
<input type="search" placeholder="فلتر…" oninput="[...l.children].forEach(li => li.hidden = !li.textContent.includes(this.value))">
<ul id="l"><li>HTML</li><li>CSS</li><li>JavaScript</li><li>Python</li></ul>
```

- الفلترة بتحصل مع كل حرف.
- العنصر المخفي بـ `hidden`.
- مفيش إرسال للسيرفر.

### 2) حدث search
لما يمسح أو يدوس Enter.

```html
<input type="search" placeholder="اكتب واضغط Enter أو ✕" onsearch="o.textContent = 'حدث search: ' + this.value">
<p id="o"></p>
```

- حدث `search` بيتطلق عند Enter أو المسح (حسب المتصفح).
- مش مدعوم في كل المتصفحات.
- الأضمن `input` و`submit`.

### 3) مع datalist
اقتراحات بحث.

```html
<input type="search" list="s" placeholder="دوّر…">
<datalist id="s"><option value="HTML"><option value="CSS"><option value="JavaScript"></datalist>
```

- اقتراحات بسيطة بدون JS.
- المستخدم ممكن يكتب أي كلمة.
- للاقتراحات الأغنى استخدم مكتبة.

### 4) تلميح مفتاح الإدخال
مثال على enterkeyhint.

```html
<input type="search" enterkeyhint="search" placeholder="على الموبايل المفتاح هيبقى بحث">
```

- `enterkeyhint="search"` بيظبط شكل المفتاح.
- يظهر على الموبايل.
- ملهوش تأثير على الكمبيوتر.

## mistakes

### حقل بحث من غير form
```html bad
<input type="search" name="q">
```
```html good
<form action="/search"><input type="search" name="q"><button>بحث</button></form>
```
ليه؟ من غير form مفيش إرسال بـ Enter ومفيش معنى لمنطقة البحث.

### placeholder بس
```html bad
<input type="search" placeholder="بحث">
```
```html good
<label class="sr-only">بحث <input type="search" name="q"></label>
```
ليه؟ اللي معندوش label ظاهر محتاج اسم لقارئ الشاشة (يتخبى بصرياً بس).

## a11y

- لو مفيش label ظاهر، حط `aria-label="بحث"` أو label مخفي بصرياً.
- لفّه بـ `role="search"` أو عنصر `<search>`.
- زرار البحث لازم يكون زرار حقيقي.

## quiz

### فرق `search` عن `text`؟
- [x] المعنى وبعض التحسينات (زرار مسح)
- [ ] لا فرق نهائياً
- [ ] أسرع
- [ ] بيحفظ البحث
نفس الوظيفة بمعنى أوضح.

### اسم الحقل الشائع؟
- [x] `q`
- [ ] `s`
- [ ] `find`
- [ ] `text`
q = query.

### إيه بيحدد منطقة البحث؟
- [x] `role="search"` أو `<search>`
- [ ] `class="search"`
- [ ] `type="find"`
- [ ] `id="search"`
معنى للإتاحة.

## refs

- [MDN: search](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/search)
- [WHATWG: Search state](https://html.spec.whatwg.org/multipage/input.html#text-(type=text)-state-and-search-state-(type=search))
