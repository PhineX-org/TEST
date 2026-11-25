---
id: border-bottom
kind: property
cat: borders-bg
chip: border-bottom
title: border من تحت
en: CSS border-bottom property
status: stable
support: all
size: compact
mdn: border-bottom
summary: الخاصية border-bottom بتكتب سُمك ونوع ولون حد جهة الأسفل بس.
keywords: border-bottom, حد جهة واحدة, border, خط فاصل
related: border, border-width, border-style, border-color, border-radius
---

## intro

الخاصية `border-bottom` هي اختصار بيحدد **سُمك ونوع ولون حد جهة الأسفل فقط**: `border-bottom: 2px solid #7a4a1d`. بتستخدمها لما عايز خط فاصل أو تمييز جهة واحدة (زي خط تحت العنوان أو شريط جانبي ملوّن في تنبيه). نفس قواعد [[border]]: لازم تكتب **النوع** وإلا مفيش خط، والحد بياخد مساحة. ومعاها الخصائص المفردة `border-bottom-width` و`border-bottom-style` و`border-bottom-color`. وفي الصفحات العربية فضّل المنطقي [[border-inline-start]].

## try

```html
<style>
  .b { border-bottom:6px solid #c9772f; padding:10px; background:#efe0bd; color:#3d2c18; }
</style>
<div class="b">حد الأسفل بس</div>
```

## syntax

```css nolive
border-bottom: 2px solid #7a4a1d;
border-bottom: none;
border-bottom: 4px dashed currentColor;
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
حد الأسفل بس.

```html
<style>
  .b { border-bottom:5px solid #3d7a5a; padding:10px; background:#efe0bd; color:#3d2c18; }
</style>
<div class="b">border-bottom</div>
```



### 2) شريط تنبيه
لون بارز على جهة.

```html
<style>
  .n { border-bottom:6px solid #b5551f; background:#f3e6c9; color:#3d2c18; padding:10px 14px; }
</style>
<div class="n">تنبيه مهم</div>
```



### 3) إلغاء الحد
border على الكل ثم none لجهة.

```html
<style>
  .b { border:3px solid #7a4a1d; border-bottom:none; padding:10px; background:#efe0bd; color:#3d2c18; }
</style>
<div class="b">من غير حد الأسفل</div>
```



## mistakes

### نسيان النوع

```css bad
.a { border-bottom:3px #7a4a1d; }
```

```css good
.a { border-bottom:3px solid #7a4a1d; }
```

من غير نوع مفيش حد.

## quiz

### border-bottom بتؤثر على؟
- [ ] كل الجهات
- [x] جهة الأسفل فقط
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

- [MDN: border-bottom](https://developer.mozilla.org/en-US/docs/Web/CSS/border-bottom)
