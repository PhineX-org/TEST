---
id: any-link
kind: pseudoclass
cat: pc-user
chip: :any-link
title: أي رابط
en: CSS :any-link pseudo-class
status: stable
support: all
size: compact
mdn: :any-link
summary: الحالة any-link بتختار كل الروابط اللي ليها href سواء مزارة أو لا. اختصار لـ :link و:visited معاً.
keywords: :any-link, any-link, رابط, link, visited, a[href]
related: link, visited, hover, pseudo-guide
---

## intro

`:any-link` بتختار **كل** العناصر اللي هي **روابط فعلية** (`<a href>` و`<area href>`)، سواء اتزارت أو لا. يعني هي اختصار لـ `:link, :visited`. مفيدة لما تعايز تنسيق مشترك للروابط من غير ما تكرر المحددين.

مثلاً بدل `a:link, a:visited { text-decoration: none; }` اكتب `a:any-link { text-decoration: none; }`. ولاحظ إنها بتستبعد `<a>` اللي من غير `href`. بتشتغل في كل المتصفحات الحديثة. وبتحافظ على أمان الخصوصية بنفس قواعد `:visited`. ببساطة: لو سألت «هل ده رابط شغّال؟» والإجابة أيوه، فالـ `:any-link` بتختاره مهما كانت زيارته.

## try

```html
<style>
  a:any-link { color:#7a4a1d; text-decoration:underline; text-underline-offset:.2em; font-weight:bold; }
</style>
<a href="#" onclick="return false">رابط</a> | <a>بدون href</a>
```

## syntax

```css nolive
a:any-link { color: #7a4a1d; }
/* بدل */
a:link, a:visited { color: #7a4a1d; }
```

- اختصار لـ link وvisited.
- تستبعد a بدون href.

## use

- تنسيق مشترك للروابط.
- تقليل التكرار.

## avoid

- استخدامها لو محتاج تفرّق بين المزار وغير المزار.

## examples

### 1) تنسيق موحد
للروابط كلها.

```html
<style>
  a:any-link { color:#3d7a5a; font-weight:bold; text-decoration:none; border-bottom:2px solid currentColor; }
</style>
<a href="#" onclick="return false">رابط 1</a> <a href="#" onclick="return false">رابط 2</a>
```



### 2) استبعاد بدون href
مبتتأثرش.

```html
<style>
  a:any-link { background:#efe0bd; color:#3d2c18; padding:2px 6px; border-radius:4px; }
</style>
<a href="#" onclick="return false">بـ href</a> <a>بدون href</a>
```



### 3) مع hover
تمييز عند التمرير.

```html
<style>
  a:any-link { color:#7a4a1d; }
  a:any-link:hover { color:#b5551f; }
</style>
<a href="#" onclick="return false">مرّر عليّ</a>
```



## mistakes

### تكرار المحددين

```css bad
a:link, a:visited { }
```

```css good
a:any-link { }
```

أقصر وأوضح.

## quiz

### any-link بتساوي؟
- [x] :link و:visited
- [ ] :hover فقط
- [ ] :focus
- [ ] :target

الاتنين.

### بتشمل a بدون href؟
- [ ] أيوه
- [x] لأ
- [ ] أحياناً
- [ ] فقط visited

لأ.

## refs

- [MDN: :any-link](https://developer.mozilla.org/en-US/docs/Web/CSS/:any-link)
