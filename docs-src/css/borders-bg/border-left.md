---
id: border-left
kind: property
cat: borders-bg
chip: border-left
title: border من الشمال
en: CSS border-left property
status: stable
support: all
size: compact
mdn: border-left
summary: الخاصية border-left بتكتب سُمك ونوع ولون حد جهة الشمال بس.
keywords: border-left, حد جهة واحدة, border, خط فاصل
related: border, border-width, border-style, border-color, border-radius
---

## intro

الخاصية `border-left` هي اختصار بيحدد **سُمك ونوع ولون حد جهة الشمال فقط**: `border-left: 2px solid #7a4a1d`. بتستخدمها لما عايز خط فاصل أو تمييز جهة واحدة (زي خط تحت العنوان أو شريط جانبي ملوّن في تنبيه). نفس قواعد [[border]]: لازم تكتب **النوع** وإلا مفيش خط، والحد بياخد مساحة. ومعاها الخصائص المفردة `border-left-width` و`border-left-style` و`border-left-color`. وفي الصفحات العربية فضّل المنطقي [[border-inline-start]].

## try

```html
<style>
  .b { border-left:6px solid #c9772f; padding:10px; background:#efe0bd; color:#3d2c18; }
</style>
<div class="b">حد الشمال بس</div>
```

## syntax

```css nolive
border-left: 2px solid #7a4a1d;
border-left: none;
border-left: 4px dashed currentColor;
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
حد الشمال بس.

```html
<style>
  .b { border-left:5px solid #3d7a5a; padding:10px; background:#efe0bd; color:#3d2c18; }
</style>
<div class="b">border-left</div>
```



### 2) شريط تنبيه
لون بارز على جهة.

```html
<style>
  .n { border-left:6px solid #b5551f; background:#f3e6c9; color:#3d2c18; padding:10px 14px; }
</style>
<div class="n">تنبيه مهم</div>
```



### 3) إلغاء الحد
border على الكل ثم none لجهة.

```html
<style>
  .b { border:3px solid #7a4a1d; border-left:none; padding:10px; background:#efe0bd; color:#3d2c18; }
</style>
<div class="b">من غير حد الشمال</div>
```



## mistakes

### نسيان النوع

```css bad
.a { border-left:3px #7a4a1d; }
```

```css good
.a { border-left:3px solid #7a4a1d; }
```

من غير نوع مفيش حد.

## quiz

### border-left بتؤثر على؟
- [ ] كل الجهات
- [x] جهة الشمال فقط
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

- [MDN: border-left](https://developer.mozilla.org/en-US/docs/Web/CSS/border-left)
