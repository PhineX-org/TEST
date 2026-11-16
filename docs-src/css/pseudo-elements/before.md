---
id: before
kind: pseudoelement
cat: pseudo-elements
chip: ::before
title: عنصر وهمي قبل المحتوى
en: CSS ::before pseudo-element
status: stable
support: all
mdn: ::before
summary: العنصر الوهمي before بيضيف محتوى (content) قبل محتوى العنصر بدون تعديل HTML. أساس الأيقونات والزخارف والأشكال بـ CSS.
keywords: ::before, before, content, عنصر وهمي, pseudo-element, زخرفة, أيقونة
related: after, content, position, selection, pseudo-guide
---

## intro

`::before` بتنشئ **عنصر وهمي** كأنه **أول ابن** للعنصر، من غير ما تكتب أي حاجة في HTML. الشرط الأساسي: لازم تحدد الخاصية [[content]] (حتى لو فاضية `content: ""`) وإلا مبتظهرش خالص.

الاستخدامات:
- **نص أو أيقونة** قبل المحتوى: `content: "✓ "`.
- **زخارف وأشكال بحتة**: خط، دايرة، سهم، مثلث بحدود (`content: ""` + `width` + `height` + `background`).
- **تأثيرات الـ hover** (خط متحرك تحت الرابط).
- **طبقة overlay** فوق صورة (مع `position: absolute; inset: 0`).
- **clearfix** (قديم).

تنبيهات مهمة:
1. العنصر الوهمي **بيتصرف زي `inline` افتراضياً**؛ لو عايز تدّيه أبعاد لازم `display: block` أو `inline-block` أو `position: absolute`.
2. **مش جزء من الـ DOM**: مينفعش تحدده بـ JavaScript، وقارئ الشاشة **ممكن يقرأ** الـ content النصي، فمتحطش معلومة مهمة فيه.
3. الكتابة الصحيحة بنقطتين `::before` (الحديثة) وقديماً `:before`.
4. مبتشتغلش على العناصر **المستبدلة** زي `img` و`input` (لأنها مفيهاش محتوى).

> [!analogy] `::before` زي لصقة صغيرة بتلزّقها قبل أول كلمة في الجملة: مش جزء من الكلام الأصلي، بس بتظهر معاه.

## try

```html
<style>
  .t::before { content:'★ '; color:#c9772f; font-weight:bold; }
  .t { font-size:1.3rem; color:#3d2c18; }
</style>
<div class="t">عنصر بنجمة قبله (من CSS)</div>
```

## syntax

```css nolive
.t::before { content: '★ '; }
.line::before { content: ''; display: block; height: 2px; background: #c9772f; }
.card::before { content: ''; position: absolute; inset: 0; }
```

- لازم content.
- inline افتراضياً.
- نقطتين ::.

## use

- أيقونات وزخارف.
- خط/شكل بدون HTML إضافي.
- طبقات overlay.

## avoid

- معلومة مهمة جوه content.
- نسيان content (مبتظهرش).
- استخدامها على img وinput.

## examples

### 1) نص قبل العنصر
نجمة وعلامة صح.

```html
<style>
  .ok::before { content:'✓ '; color:#3d7a5a; font-weight:bold; }
  .no::before { content:'✗ '; color:#b5551f; font-weight:bold; }
  div { color:#3d2c18; font-size:1.2rem; margin:3px 0; }
</style>
<div class="ok">تم التحقق</div><div class="no">فشل الإرسال</div>
```



### 2) خط زخرفي
شكل من غير HTML.

```html
<style>
  h4 { margin:0; color:#7a4a1d; font-size:1.4rem; }
  h4::before { content:''; display:block; width:40px; height:4px; background:#c9772f; border-radius:2px; margin-bottom:6px; }
</style>
<h4>عنوان بخط فوقه</h4>
```



### 3) تأثير hover
خط يتمدد تحت الرابط.

```html
<style>
  a { position:relative; color:#7a4a1d; font-weight:bold; font-size:1.2rem; text-decoration:none; }
  a::before { content:''; position:absolute; bottom:-2px; right:0; width:0; height:2px; background:#c9772f; transition:width .3s; }
  a:hover::before { width:100%; }
</style>
<a href="#" onclick="return false">مرّر الماوس</a>
```



### 4) طبقة فوق عنصر
overlay داخلي.

```html
<style>
  .p { position:relative; width:150px; height:70px; background:linear-gradient(135deg,#c9772f,#3d7a5a); border-radius:8px; }
  .p::before { content:''; position:absolute; inset:0; background:rgba(61,44,24,.4); border-radius:8px; }
  .p span { position:relative; color:#f3ede0; font-weight:bold; padding:10px; display:block; }
</style>
<div class="p"><span>نص فوق الطبقة</span></div>
```



## mistakes

### نسيان content

```css bad
.a::before { color:red; }  /* مبيظهرش */
```

```css good
.a::before { content:""; color:red; }
```

لازم content.

### معلومة مهمة في content

```css bad
.price::before { content:"السعر: "; }  /* قارئ الشاشة قد يتجاهل */
```

```css good
<span>السعر:</span> 100
```

المحتوى المهم في HTML.

## quiz

### ::before لازم معاها؟
- [x] content
- [ ] display:none
- [ ] position
- [ ] float

content.

### ::before بتتحط؟
- [x] كأول ابن للعنصر
- [ ] بعد العنصر
- [ ] قبل العنصر برّه
- [ ] في head

أول ابن.

### ينفع على img؟
- [x] لأ
- [ ] أيوه
- [ ] أحياناً
- [ ] فقط svg

عناصر مستبدلة.

## refs

- [MDN: ::before](https://developer.mozilla.org/en-US/docs/Web/CSS/::before)
