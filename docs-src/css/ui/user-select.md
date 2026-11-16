---
id: user-select
kind: property
cat: ui
chip: user-select
title: تحديد النص
en: CSS user-select property
status: stable
support: all
mdn: user-select
summary: user-select بتتحكم هل المستخدم يقدر يحدد النص: none بيمنع التحديد، all بيحدد كل شيء بضغطة، text بيسمح. استخدمها بحذر.
keywords: user-select, none, all, text, تحديد النص, منع النسخ
related: cursor, pointer-events, selection
---

## intro

الخاصية `user-select` بتتحكم في **قدرة المستخدم على تحديد النص** بالماوس أو اللمس. القيم: **`auto`** (الافتراضي)، **`text`** (يسمح)، **`none`** (يمنع التحديد)، **`all`** (ضغطة واحدة تحدد العنصر كله).

الاستخدام الصح:
- **`none` على عناصر الواجهة**: أزرار وتبويبات وأيقونات، عشان لما المستخدم يضغط مرتين بسرعة متتحددش كلمات الزرار وتبان وحشة.
- **`all` على قيم قابلة للنسخ**: كود، رقم طلب، كلمة سر مؤقتة؛ ضغطة واحدة تحددها كلها.
- مع [[cursor]] لعناصر السحب.

**تحذير مهم**: **متستخدمش `user-select: none` على المحتوى** (المقالات والنصوص) عشان «تحمي» من النسخ؛ ده مبيحمي حاجة (أي حد يقدر ينسخ بطرق تانية)، بيضايق المستخدمين، ومشكلة وصولية (بعض التقنيات المساعدة بتعتمد على التحديد). وبعض المتصفحات محتاجة `-webkit-user-select` للتوافق (Safari).

## try

```html
<style>
  .b { display:inline-block; padding:8px 16px; margin:4px; background:#c9772f; color:#f3ede0; border-radius:8px; font-weight:bold; }
</style>
<div class="b" style="user-select:none;-webkit-user-select:none">مش بيتحدد (none)</div><div class="b">بيتحدد (auto)</div>
```

## syntax

```css nolive
user-select: none;
user-select: text;
user-select: all;
-webkit-user-select: none;
```

- **القيمة المبدئية**: `auto`.
- Safari يحتاج -webkit-.

## values

### none
يمنع التحديد.

### text
يسمح بالتحديد.

### all
تحديد كامل بضغطة.

### auto
افتراضي.

## use

- none لعناصر الواجهة.
- all لكود/قيم للنسخ.
- سحب وإفلات.

## avoid

- none على المحتوى النصي.
- اعتبارها حماية للمحتوى.

## examples

### 1) زرار بدون تحديد
none للأزرار.

```html
<style>
  .b { display:inline-block; padding:8px 16px; margin:4px; background:#3d7a5a; color:#f3ede0; border-radius:8px; font-weight:bold; user-select:none; -webkit-user-select:none; cursor:pointer; }
</style>
<div class="b">اضغط مرتين</div>
```



### 2) all للنسخ
ضغطة وحدة بتحدد الكود.

```html
<style>
  code { display:inline-block; padding:6px 12px; background:#3d2c18; color:#f3ede0; border-radius:6px; user-select:all; -webkit-user-select:all; direction:ltr; }
</style>
<code>npm install phinex</code>
```



### 3) مقارنة
auto مقابل none.

```html
<style>
  p { margin:4px 0; padding:6px 10px; background:#efe0bd; color:#3d2c18; border-radius:6px; }
</style>
<p style="user-select:none;-webkit-user-select:none">مش بيتحدد</p><p>بيتحدد عادي</p>
```



### 4) تبويبات
تسميات بدون تحديد.

```html
<style>
  .t { display:inline-block; padding:6px 14px; background:#efe0bd; color:#3d2c18; border-radius:6px 6px 0 0; margin-inline-end:3px; user-select:none; -webkit-user-select:none; cursor:pointer; }
</style>
<div><span class="t">الأول</span><span class="t">التاني</span></div>
```



## mistakes

### منع نسخ المحتوى

```css bad
article { user-select:none; }
```

```css good
article { user-select:text; }
```

مبيحمي ومضايق.

### نسيان prefix

```css bad
.b { user-select:none; }  /* Safari */
```

```css good
.b { -webkit-user-select:none; user-select:none; }
```

للتوافق.

## quiz

### none معناها؟
- [x] يمنع التحديد
- [ ] يحدد الكل
- [ ] يسمح
- [ ] يخفي

مفيش تحديد.

### all مفيدة لـ؟
- [x] قيم قابلة للنسخ
- [ ] المقالات
- [ ] الصور
- [ ] الحدود

ضغطة واحدة.

### بحمي المحتوى؟
- [x] لأ
- [ ] أيوه
- [ ] دايماً
- [ ] أحياناً

وهم حماية.

## refs

- [MDN: user-select](https://developer.mozilla.org/en-US/docs/Web/CSS/user-select)
