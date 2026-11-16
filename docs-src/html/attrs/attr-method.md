---
id: attr-method
kind: attribute
cat: attrs
chip: method
title: خاصية طريقة الإرسال
en: HTML method attribute
status: stable
support: all
mdn: Elements/form#method
summary: خاصية method على form بتحدد طريقة الإرسال: get (البيانات في الـ URL) أو post (في جسم الطلب) أو dialog. استخدم post للتغيير وللحساس، وget للبحث والفلترة.
keywords: method, get, post, dialog, form method, formmethod, query string, بيانات حساسة, بحث, HTTP
related: form, attr-action, dialog, input-submit, attr-name, attr-target
---

## intro

لما الفورم يتبعت، البيانات بتروح للسيرفر بإحدى طريقتين (والتانية `dialog` للـ [[dialog]]). **`get`** (الافتراضي): البيانات بتتحط **في الـ URL** بعد علامة `?`: `/search?q=html&page=2`. دي طريقة مناسبة للبحث والفلترة لأن الرابط ممكن يتحفظ ويتشارك ويتعمل له Bookmark، ولكنها **ظاهرة للكل** (في السجل وفي الـ URL)، ومحدودة بالطول.

**`post`**: البيانات بتروح في **جسم الطلب** (مش ظاهرة في الـ URL). مناسبة لـ **تغيير حاجة على السيرفر** (تسجيل، شراء، إضافة)، وللبيانات الحساسة (كلمات السر) والكبيرة (رفع ملفات مع `enctype="multipart/form-data"`). لكن كلمة «حساسة» لا تعني «مشفّرة»: التشفير الحقيقي من **HTTPS**.

القاعدة الذهبية: **هل الطلب بيغيّر حاجة؟** → `post`. **هل بيجيب بيانات بس؟** → `get`. و`method="dialog"` بتقفل [[dialog]] اللي الفورم جواه بدون إرسال للسيرفر وبتحط الـ `value` بتاع الزرار في `returnValue`. وتقدر تتخطّاها لزرار معيّن بـ `formmethod`.

## try

```html
<form method="get" action="/search" onsubmit="event.preventDefault(); o.textContent = 'GET → /search?' + new URLSearchParams(new FormData(this))">
  <input name="q" value="html"> <button>GET</button>
</form>
<form method="post" action="/login" onsubmit="event.preventDefault(); o.textContent = 'POST → /login (والجسم فيه: ' + new URLSearchParams(new FormData(this)) + ')'" style="margin-top:6px">
  <input name="user" value="ahmed"> <button>POST</button>
</form>
<p id="o" dir="ltr"></p>
```

## syntax

```html nolive
<form method="get" action="/search">…</form>
<form method="post" action="/login">…</form>
<form method="dialog">…</form>
```

- `get` (افتراضي) — البيانات في الـ URL.
- `post` — البيانات في الجسم.
- `dialog` — يقفل `<dialog>`.

## use

- `get` للبحث والفلترة والصفحات القابلة للمشاركة.
- `post` للتسجيل والشراء وتغيير البيانات.
- `dialog` لنوافذ التأكيد.

## avoid

- متستخدمش `get` للباسورد أو بيانات حساسة.
- متستخدمش `get` لعمليات بتغيّر بيانات (حذف…).

## section: القيم

- `get` — الافتراضي، البيانات في الـ URL (`?name=value`).
- `post` — في جسم الطلب.
- `dialog` — يغلق الـ dialog المحتوي (بدون سيرفر).

## examples

### 1) بحث (get)
رابط قابل للمشاركة.

```html
<form method="get" action="/search" onsubmit="event.preventDefault(); o.textContent = '/search?' + new URLSearchParams(new FormData(this))">
  <input name="q" value="css grid"> <select name="lang"><option value="ar">عربي</option><option value="en">English</option></select>
  <button>دوّر</button>
</form>
<p id="o" dir="ltr"></p>
```

- الرابط بيحتوي البحث كله.
- المستخدم يقدر يحفظه ويبعته.
- بيدخل في سجل المتصفح.

### 2) تسجيل دخول (post)
الباسورد مش في الـ URL.

```html
<form method="post" action="/login" onsubmit="event.preventDefault(); o.textContent = 'الـ URL فضل /login من غير بيانات'">
  <input name="user" autocomplete="username">
  <input name="pw" type="password" autocomplete="current-password">
  <button>دخول</button>
</form>
<p id="o"></p>
```

- POST مع HTTPS للباسورد.
- مفيش بيانات في الـ URL.
- السيرفر ممكن يوجّه بعد النجاح.

### 3) dialog
مثال على form method=dialog.

```html
<dialog id="d"><form method="dialog"><p>تأكيد الحذف؟</p><button value="no">لأ</button> <button value="yes">أيوه</button></form></dialog>
<button onclick="d.showModal(); d.onclose = () => o.textContent = 'رد: ' + d.returnValue">افتح</button>
<p id="o"></p>
```

- الفورم بيقفل الـ dialog من غير سيرفر.
- `returnValue` بياخد `value` بتاع الزرار.
- نمط ممتاز لنوافذ التأكيد.

### 4) تخطّي بـ formmethod
زرار مختلف.

```html
<form method="get" action="/x" onsubmit="event.preventDefault(); o.textContent = event.submitter.formMethod || this.method">
  <button>GET</button>
  <button formmethod="post">POST لنفس الفورم</button>
</form>
<p id="o"></p>
```

- `formmethod` على الزرار.
- نفس الحقول، طريقة مختلفة.
- نادراً ما تحتاجه.

## mistakes

### باسورد في get
```html bad
<form method="get" action="/login"><input type="password" name="pw"></form>
```
```html good
<form method="post" action="/login"><input type="password" name="pw"></form>
```
ليه؟ GET بيحط الباسورد في الـ URL والسجل.

### نسيان method (الافتراضي get)
```html bad
<form action="/add-to-cart">…</form>
```
```html good
<form action="/add-to-cart" method="post">…</form>
```
ليه؟ التغيير على السيرفر لازم POST.

## a11y

- ردّ الفورم لازم يوضّح النتيجة للمستخدم.
- POST بيمنع تكرار الإرسال عند تحديث الصفحة (مع PRG).
- `dialog` بيدّي إدارة فوكس جاهزة.

## quiz

### الافتراضي؟
- [x] `get`
- [ ] `post`
- [ ] `dialog`
- [ ] `put`
لو متكتبتش.

### لتغيير بيانات على السيرفر؟
- [x] `post`
- [ ] `get`
- [ ] `dialog`
- [ ] أي واحدة
GET للقراءة فقط.

### هل POST مشفّر؟
- [x] لأ، التشفير من HTTPS
- [ ] أيوه
- [ ] أحياناً
- [ ] مع multipart
التشفير شيء تاني.

## refs

- [MDN: method](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/form#method)
- [MDN: HTTP methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods)
