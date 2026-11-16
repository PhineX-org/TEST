---
id: border-right
kind: property
cat: borders-bg
chip: border-right
title: حد اليمين
en: CSS border-right property
status: stable
support: all
size: compact
mdn: border-right
summary: الخاصية border-right بتكتب سُمك ونوع ولون حد جهة اليمين بس.
keywords: border-right, حد جهة واحدة, border, خط فاصل
related: border, border-width, border-style, border-color, border-radius
---

## intro

الخاصية `border-right` هي اختصار بيحدد **سُمك ونوع ولون حد جهة اليمين فقط**: `border-right: 2px solid #7a4a1d`. بتستخدمها لما عايز خط فاصل أو تمييز جهة واحدة (زي خط تحت العنوان أو شريط جانبي ملوّن في تنبيه). نفس قواعد [[border]]: لازم تكتب **النوع** وإلا مفيش خط، والحد بياخد مساحة. ومعاها الخصائص المفردة `border-right-width` و`border-right-style` و`border-right-color`. وفي الصفحات العربية فضّل المنطقي [[border-inline-start]].

## try

```html
<style>
  .b { border-right:6px solid #c9772f; padding:10px; background:#efe0bd; color:#3d2c18; }
</style>
<div class="b">حد اليمين بس</div>
```

## syntax

```css nolive
border-right: 2px solid #7a4a1d;
border-right: none;
border-right: 4px dashed currentColor;
```

- **القيمة المبدئية**: `medium none currentcolor`.

## values

### `<width> <style> <color>`
نفس صيغة border.

### none
إلغاء حد الجهة.

## use

- خط فاصل على جهة واحدة.
- شريط ملوّن على جانب كارت أو اقتباس.

## avoid

- نسيان النوع.

## examples

### 1) خط جهة واحدة
حد اليمين بس.

```html
<style>
  .b { border-right:5px solid #3d7a5a; padding:10px; background:#efe0bd; color:#3d2c18; }
</style>
<div class="b">border-right</div>
```



### 2) شريط تنبيه
لون بارز على جهة.

```html
<style>
  .n { border-right:6px solid #b5551f; background:#f3e6c9; color:#3d2c18; padding:10px 14px; }
</style>
<div class="n">تنبيه مهم</div>
```



### 3) إلغاء الحد
border على الكل ثم none لجهة.

```html
<style>
  .b { border:3px solid #7a4a1d; border-right:none; padding:10px; background:#efe0bd; color:#3d2c18; }
</style>
<div class="b">من غير حد اليمين</div>
```



## mistakes

### نسيان النوع

```css bad
.a { border-right:3px #7a4a1d; }
```

```css good
.a { border-right:3px solid #7a4a1d; }
```

من غير نوع مفيش حد.

## quiz

### border-right بتؤثر على؟
- [ ] كل الجهات
- [x] جهة اليمين فقط
- [ ] اللون فقط
- [ ] الزوايا

جهة واحدة.

### لازم نكتب؟
- [x] النوع
- [ ] الاسم
- [ ] الظل
- [ ] الرقم

border-style.

## refs

- [MDN: border-right](https://developer.mozilla.org/en-US/docs/Web/CSS/border-right)
