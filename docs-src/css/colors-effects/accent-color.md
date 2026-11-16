---
id: accent-color
kind: property
cat: colors-effects
chip: accent-color
title: لون عناصر الفورم الأصلية
en: CSS accent-color property
status: stable
support: all
size: compact
mdn: accent-color
summary: accent-color بتغيّر لون عناصر النماذج الأصلية (checkbox وradio وrange وprogress) بسطر واحد بدون تصميم مخصص.
keywords: accent-color, checkbox, radio, range, progress, لون مميز, فورم
related: color-scheme, appearance, caret-color, color
---

## intro

الخاصية `accent-color` بتغيّر **لون التمييز** لعناصر الفورم الأصلية: **checkbox** و**radio** و**range** و**progress**. بدل ما تعمل تصميم مخصص بـ `appearance: none`، بسطر واحد (`accent-color: #c9772f`) بتغيّر لون الصح أو الشريط. المتصفح بيختار تلقائياً لون التباين للعلامة (✓) فوق اللون.

مفيدة جداً للتوافق مع ثيم الموقع بأقل مجهود، والحفاظ على إمكانية الوصول الأصلية (كيبورد وقارئ الشاشة). وبتتوارث فيمكن تحطها على `:root`.

## try

```html
<style>
  .f { accent-color:#c9772f; font-size:1.1rem; }
</style>
<div class="f"><label><input type="checkbox" checked> تفعيل</label><br><label><input type="radio" checked> اختيار</label><br><input type="range" value="60"></div>
```

## syntax

```css nolive
accent-color: #c9772f;
accent-color: auto;
:root { accent-color: #3d7a5a; }
```

- **القيمة المبدئية**: `auto`.
- **بتتوارث؟** أيوه.

## values

### `<color>`
لون التمييز.

### auto
لون المتصفح الافتراضي.

## use

- لون فورم متناسق مع الهوية.
- بدون تصميم مخصص.

## avoid

- ألوان بتباين ضعيف مع الخلفية.

## examples

### 1) ألوان مختلفة
checkbox بألوان.

```html
<style>
  input { width:20px; height:20px; margin:4px; }
</style>
<input type="checkbox" checked style="accent-color:#c9772f"><input type="checkbox" checked style="accent-color:#3d7a5a"><input type="checkbox" checked style="accent-color:#7a4a1d">
```



### 2) range وprogress
نفس اللون.

```html
<style>
  .f { accent-color:#3d7a5a; display:grid; gap:8px; }
</style>
<div class="f"><input type="range" value="40"><progress value="60" max="100"></progress></div>
```



### 3) على :root
لكل الصفحة.

```html
<style>
  :root { accent-color:#b5551f; }
</style>
<label><input type="checkbox" checked> متوارث</label>
```



## mistakes

### تصميم مخصص بدل accent

```css bad
input[type=checkbox]{ appearance:none; /* كود كتير */ }
```

```css good
input { accent-color:#c9772f; }
```

سطر واحد يكفي.

## quiz

### accent-color بتغيّر؟
- [ ] خلفية الصفحة
- [x] لون عناصر الفورم الأصلية
- [ ] الخط
- [ ] الحد

checkbox وغيره.

### بتتوارث؟
- [x] أيوه
- [ ] لأ
- [ ] أحياناً
- [ ] فقط range

أيوه.

## refs

- [MDN: accent-color](https://developer.mozilla.org/en-US/docs/Web/CSS/accent-color)
