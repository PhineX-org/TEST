---
id: dir
kind: pseudoclass
cat: pc-logical
chip: :dir
title: اتجاه العنصر
en: CSS :dir() pseudo-class
status: stable
support: all
size: compact
mdn: :dir
summary: الدالة dir بتختار العناصر حسب اتجاه الكتابة (rtl أو ltr) الفعلي، حتى لو موروث. مفيدة لتصميمات ثنائية الاتجاه.
keywords: :dir, dir, rtl, ltr, اتجاه, عربي, bidirectional
related: lang, direction, margin-inline
---

## intro

`:dir(rtl)` و`:dir(ltr)` بتختار العناصر **حسب اتجاه الكتابة الفعلي** (المتحدد بالخاصية `dir` في HTML، وبيتوارث). مفيدة لتصميمات تدعم الاتجاهين: مثلاً تقلب سهم أيقونة أو تغيّر margin حسب الاتجاه (`:dir(rtl) .arrow { transform: scaleX(-1); }`). الفرق عن `[dir=rtl]`: دي بتلاحظ **الاتجاه الموروث** كمان مش بس الخاصية المكتوبة على العنصر. ولو استخدمت الخصائص المنطقية ([[margin-inline]]) هتحتاجها أقل. وللعربي دي مهمة لأن موقعك غالباً RTL، وأي أيقونات اتجاهية (أسهم) لازم تتعكس.

## try

```html
<style>
  .arrow:dir(rtl)::before { content:'←'; }
  .arrow:dir(ltr)::before { content:'→'; }
  .arrow { color:#b5551f; font-weight:bold; font-size:1.3rem; }
</style>
<div dir="rtl" class="arrow"> الصفحة التالية</div><div dir="ltr" class="arrow"> Next</div>
```

## syntax

```css nolive
:dir(rtl) .icon { transform: scaleX(-1); }
:dir(ltr) .box { margin-left: 10px; }
```

- حسب الاتجاه الفعلي.
- بتتوارث.

## use

- قلب الأيقونات في RTL.
- تنسيق مختلف حسب الاتجاه.

## avoid

- الاعتماد على [dir] فقط.

## examples

### 1) سهم حسب الاتجاه
يتقلب تلقائياً.

```html
<style>
  .a:dir(rtl)::after { content:'←'; } .a:dir(ltr)::after { content:'→'; }
  .a { color:#3d7a5a; font-weight:bold; margin:4px 0; }
</style>
<div class="a" dir="rtl">التالي </div><div class="a" dir="ltr">Next </div>
```



### 2) وراثة الاتجاه
dir على الأب.

```html
<style>
  span:dir(rtl) { color:#b5551f; font-weight:bold; }
</style>
<div dir="rtl"><span>موروث rtl</span></div>
```



### 3) قلب أيقونة
scaleX.

```html
<style>
  .i { display:inline-block; font-size:1.6rem; color:#7a4a1d; }
  .i:dir(rtl) { transform:scaleX(-1); }
</style>
<div dir="ltr"><span class="i">➜</span></div><div dir="rtl"><span class="i">➜</span></div>
```



## mistakes

### الاعتماد على [dir]

```css bad
[dir=rtl] .x { }  /* لا يلتقط الموروث */
```

```css good
:dir(rtl) .x { }
```

dir() يلتقط الموروث.

## quiz

### dir() بتختار؟
- [x] حسب اتجاه الكتابة
- [ ] حسب اللغة
- [ ] حسب الحجم
- [ ] حسب النوع

rtl/ltr.

### الفرق عن [dir]؟
- [x] بتلتقط الموروث
- [ ] نفسها
- [ ] أضعف
- [ ] أقدم

الموروث كمان.

## refs

- [MDN: :dir](https://developer.mozilla.org/en-US/docs/Web/CSS/:dir)
