---
id: tab-size
kind: property
cat: typography
chip: tab-size
title: عرض علامة التاب
en: CSS tab-size property
status: stable
support: all
size: compact
mdn: tab-size
summary: tab-size بتحدد عدد المسافات اللي علامة Tab بتاخدها في عرض النص (غالباً داخل pre وcode). الافتراضي 8.
keywords: tab-size, tab, pre, code, مسافات, كود
related: white-space, font-family, direction
---

## intro

الخاصية `tab-size` بتحدد **عرض حرف Tab** بعدد المسافات (أو بوحدة طول). الافتراضي **8** وهو كبير لعرض الكود. بتشتغل مع النص اللي فيه علامات Tab فعلية وبيحافظ على المسافات (`white-space: pre` أو `pre-wrap` أو وسم `<pre>`).

مفيدة لعرض **أكواد برمجية** في المواقع التعليمية بمسافات بادئة صغيرة (`tab-size: 2` أو `4`). غالباً بتتحط على `pre` و`code`. وبتتوارث. وتخيّل إنك بتكتب كود في محرر: كل Tab بتدّيك مسافة بادئة، والخاصية دي بتقول المسافة دي تبقى كبيرة ولا صغيرة.

## try

```html
<style>
  pre { margin:4px 0; padding:8px 12px; background:#3d2c18; color:#f3ede0; border-radius:6px; direction:ltr; text-align:left; }
</style>
<pre style="tab-size:2">if (a) {
	return 1;
}</pre>
<pre style="tab-size:8">if (a) {
	return 1;
}</pre>
```

## syntax

```css nolive
tab-size: 4;
tab-size: 2;
tab-size: 1em;
```

- **القيمة المبدئية**: `8`.
- **بتتوارث؟** أيوه.

## values

### `<integer>`
عدد المسافات.

### `<length>`
عرض ثابت.

## use

- عرض أكواد منسّقة.
- تعليم البرمجة.

## avoid

- نسيان white-space:pre (مبتشتغلش).

## examples

### 1) 2 مقابل 8
الفرق في الإزاحة.

```html
<style>
  pre { margin:4px 0; padding:6px 10px; background:#3d2c18; color:#f3ede0; border-radius:6px; direction:ltr; text-align:left; }
</style>
<pre style="tab-size:2">a
	b
		c</pre><pre style="tab-size:8">a
	b
		c</pre>
```



### 2) بالـ em
عرض نسبي للخط.

```html
<style>
  pre { margin:0; padding:6px 10px; background:#3d2c18; color:#f3ede0; border-radius:6px; direction:ltr; text-align:left; tab-size:3em; }
</style>
<pre>x	y</pre>
```



### 3) على code
مع white-space.

```html
<style>
  code { white-space:pre; tab-size:4; display:block; padding:6px 10px; background:#3d2c18; color:#f3ede0; border-radius:6px; direction:ltr; text-align:left; font-family:monospace; }
</style>
<code>function f() {
	return 1;
}</code>
```



## mistakes

### نسيان white-space

```css bad
.c { tab-size:2; }  /* التاب بيتدمج مسافة */
```

```css good
.c { white-space:pre; tab-size:2; }
```

محتاج pre.

## quiz

### الافتراضي؟
- [ ] 2
- [ ] 4
- [x] 8
- [ ] 16

8.

### بتشتغل مع؟
- [x] white-space:pre
- [ ] display:grid
- [ ] flex
- [ ] float

pre.

## refs

- [MDN: tab-size](https://developer.mozilla.org/en-US/docs/Web/CSS/tab-size)
