---
id: visited
kind: pseudoclass
cat: pc-user
chip: :visited
title: الروابط المزارة
en: CSS :visited pseudo-class
status: stable
support: all
size: compact
mdn: :visited
summary: الحالة visited بتختار الروابط اللي المستخدم زارها. للخصوصية بتسمح بتغيير اللون فقط وممنوع خصائص تانية.
keywords: :visited, visited, مزار, خصوصية, لون الرابط
related: link, any-link, hover, color, pseudo-guide
---

## intro

`:visited` بتختار الروابط **اللي المستخدم فتحها قبل كده** (موجودة في تاريخ المتصفح). بتفيد في تمييز الصفحات اللي اتقرت (ألوان مختلفة، شائعة في القوايم الطويلة).

**قيد الخصوصية**: لمنع المواقع من التجسس على تاريخ التصفح، المتصفحات **بتقيّد** الخصائص اللي تقدر تغيّرها في `:visited`: **الألوان بس** (`color` و`background-color` وألوان الحدود والخط التحتاني)، ومبتسمحش بخصائص مثل الأبعاد. وكمان لو قريت اللون بـ JavaScript بيرجع لون الرابط العادي.

لازم تيجي بعد [[link]] وقبل [[hover]] (LVHA).

## try

```html
<style>
  a { font-weight:bold; font-size:1.2rem; }
  a:link { color:#3d7a5a; } a:visited { color:#7a4a1d; }
</style>
<a href="https://example.com" onclick="return false">رابط (جرّب بعد الزيارة)</a>
```

## syntax

```css nolive
a:visited { color: #7a4a1d; }
```

- الألوان فقط (قيد الخصوصية).
- بعد :link.

## use

- تمييز الصفحات المقروءة.
- قوايم نتائج طويلة.

## avoid

- محاولة تغيير خصائص غير لونية.

## examples

### 1) لونين
للمزار وغير المزار.

```html
<style>
  a { font-weight:bold; } a:link { color:#3d7a5a; } a:visited { color:#b5551f; }
</style>
<a href="#">رابط</a>
```



### 2) خلفية فقط
خاصية لونية مسموحة.

```html
<style>
  a:visited { background-color:#efe0bd; color:#7a4a1d; }
  a { padding:2px 6px; font-weight:bold; color:#3d7a5a; }
</style>
<a href="#">رابط</a>
```



### 3) محاولة غير مسموحة
الحجم مبيتغيّرش.

```html
<style>
  a { font-size:1rem; color:#3d7a5a; }
  a:visited { font-size:2rem; }   /* يتجاهل */
</style>
<a href="#">حجم ثابت</a>
```



## mistakes

### تغيير غير لوني

```css bad
a:visited { font-size:2rem; }
```

```css good
a:visited { color:#7a4a1d; }
```

مسموح اللون فقط.

## quiz

### visited بتسمح بتغيير؟
- [x] الألوان فقط
- [ ] كل الخصائص
- [ ] الحجم
- [ ] المسافات

خصوصية.

### ترتيبها؟
- [x] بعد link
- [ ] قبل link
- [ ] قبل hover
- [ ] آخر واحدة

LVHA.

## refs

- [MDN: :visited](https://developer.mozilla.org/en-US/docs/Web/CSS/:visited)
