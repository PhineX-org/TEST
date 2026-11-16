---
id: cursor
kind: property
cat: ui
chip: cursor
title: شكل مؤشر الماوس
en: CSS cursor property
status: stable
support: all
mdn: cursor
summary: cursor بتغيّر شكل مؤشر الماوس فوق العنصر: pointer لليد وtext للكتابة وnot-allowed للممنوع وgrab للسحب. تلميح بصري مهم.
keywords: cursor, مؤشر الماوس, pointer, not-allowed, grab, text, wait
related: pointer-events, user-select, hover, disabled
---

## intro

الخاصية `cursor` بتغيّر **شكل مؤشر الماوس** لما يقف فوق العنصر. المؤشر ده **رسالة للمستخدم** عن اللي يقدر يعمله: يد (اضغط)، شرطة نص (اكتب)، علامة ممنوع، إلخ.

القيم الأكتر استخداماً:
- **`default`** سهم عادي، **`auto`** المتصفح يحدد (الافتراضي).
- **`pointer`** 👆 يد: لأي حاجة **قابلة للضغط** غير الروابط (أزرار مخصصة، بطاقات).
- **`text`** شرطة الكتابة: مناسب للحقول.
- **`not-allowed`** 🚫 ممنوع: للعناصر المعطّلة ([[disabled]]).
- **`wait`** و`progress` ⏳: جاري التحميل.
- **`grab`** و`grabbing` ✊: عناصر قابلة للسحب.
- **`move`** و`zoom-in` و`zoom-out` و`help` و`crosshair` و`col-resize`…

وتقدر تحط **صورة مخصصة**: `cursor: url(hand.png) 4 4, pointer;` مع قيمة احتياطية في الآخر دايماً.

قواعد ذهبية: الأزرار الأصلية (`<button>`) بتاخد `default` افتراضياً (مش pointer)، فكتير بيضيفوا `cursor: pointer` للأزرار. ولو العنصر مش قابل للضغط فعلاً متحطش `pointer` عشان متخدعش المستخدم. ومتعتمدش على المؤشر وحده لنقل معنى (على اللمس مفيش مؤشر).

## try

```html
<style>
  .c { display:inline-block; padding:8px 14px; margin:4px; background:#efe0bd; color:#3d2c18; border-radius:8px; font-weight:bold; }
</style>
<div class="c" style="cursor:pointer">pointer</div><div class="c" style="cursor:not-allowed">not-allowed</div><div class="c" style="cursor:grab">grab</div><div class="c" style="cursor:text">text</div>
```

## syntax

```css nolive
cursor: pointer;
cursor: not-allowed;
cursor: grab;
cursor: url(hand.png) 4 4, auto;
```

- **القيمة المبدئية**: `auto`.
- **بتتوارث؟** أيوه.
- مع صورة: ضيف قيمة احتياطية.

## values

### pointer
يد (قابل للضغط).

### not-allowed
ممنوع.

### grab / grabbing
سحب.

### wait / progress
تحميل.

### text
كتابة.

## use

- pointer للعناصر القابلة للضغط.
- not-allowed للمعطّل.
- grab لعناصر السحب.

## avoid

- pointer لعنصر مش قابل للضغط.
- الاعتماد على المؤشر وحده.

## examples

### 1) مجموعة مؤشرات
مرّر على كل واحد.

```html
<style>
  .c { display:inline-block; padding:8px 12px; margin:3px; background:#efe0bd; color:#3d2c18; border-radius:8px; font-weight:bold; font-size:.9rem; }
</style>
<div class="c" style="cursor:pointer">pointer</div><div class="c" style="cursor:wait">wait</div><div class="c" style="cursor:help">help</div><div class="c" style="cursor:zoom-in">zoom-in</div><div class="c" style="cursor:crosshair">crosshair</div>
```



### 2) زرار معطّل
not-allowed.

```html
<style>
  button { padding:8px 18px; border:0; border-radius:8px; font-weight:bold; margin:4px; }
  .a { background:#c9772f; color:#f3ede0; cursor:pointer; }
  .b { background:#d8cbb0; color:#8a7a62; cursor:not-allowed; }
</style>
<button class="a">نشط</button><button class="b">معطّل</button>
```



### 3) سحب
grab وgrabbing.

```html
<style>
  .d { display:inline-block; padding:14px 20px; background:#3d7a5a; color:#f3ede0; border-radius:8px; cursor:grab; user-select:none; }
  .d:active { cursor:grabbing; }
</style>
<div class="d">اسحبني</div>
```



### 4) بطاقة قابلة للضغط
pointer على البطاقة.

```html
<style>
  .c { width:150px; padding:12px; background:#f3e6c9; color:#3d2c18; border-radius:10px; cursor:pointer; transition:box-shadow .2s; }
  .c:hover { box-shadow:0 6px 16px rgba(61,44,24,.25); }
</style>
<div class="c">بطاقة قابلة للضغط</div>
```



## mistakes

### pointer لعنصر غير تفاعلي

```css bad
.title { cursor:pointer; }  /* مش بيعمل حاجة */
```

```css good
.title { cursor:default; }
```

متخدعش المستخدم.

### صورة بدون احتياطي

```css bad
.a { cursor:url(c.png); }
```

```css good
.a { cursor:url(c.png) 4 4, auto; }
```

ضيف قيمة احتياطية.

## quiz

### المؤشر للعنصر القابل للضغط؟
- [x] pointer
- [ ] wait
- [ ] text
- [ ] move

يد.

### للمعطّل؟
- [x] not-allowed
- [ ] grab
- [ ] zoom-in
- [ ] help

ممنوع.

### بتتوارث؟
- [x] أيوه
- [ ] لأ
- [ ] أحياناً
- [ ] فقط pointer

بتتوارث.

## refs

- [MDN: cursor](https://developer.mozilla.org/en-US/docs/Web/CSS/cursor)
