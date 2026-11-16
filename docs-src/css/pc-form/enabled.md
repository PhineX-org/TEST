---
id: enabled
kind: pseudoclass
cat: pc-form
chip: :enabled
title: عنصر مفعّل
en: CSS :enabled pseudo-class
status: stable
support: all
size: compact
mdn: :enabled
summary: الحالة enabled بتنطبق على عناصر النماذج غير المعطّلة، عكس disabled.
keywords: :enabled, enabled, مفعل, زرار, input
related: disabled, read-only, cursor, hover
---

## intro

`:enabled` بتنطبق على **عناصر النماذج الغير معطّلة**، يعني اللي تقدر تضغط عليها أو تكتب فيها. هي عكس [[disabled]]. أغلب الوقت مش هتحتاجها لأن الحالة الافتراضية هي «مفعّل»، لكنها مفيدة لتطبيق **تأثيرات التفاعل** (زي المؤشر `pointer` والـ hover) على العناصر المتاحة فقط، عشان متضيفش تأثير على زرار معطّل. يعني لو الزرار معطّل مش منطقي المؤشر يتحوّل ليد (pointer) ولا يتلوّن عند التمرير، لأن ده بيوحي للمستخدم إنه يقدر يضغط.

## try

```html
<style>
  button { padding:8px 18px; border:0; border-radius:8px; font-weight:bold; margin:3px; background:#d8cbb0; color:#8a7a62; }
  button:enabled { background:#c9772f; color:#f3ede0; cursor:pointer; }
  button:enabled:hover { background:#7a4a1d; }
</style>
<button>نشط</button><button disabled>معطّل</button>
```

## syntax

```css nolive
button:enabled { cursor: pointer; }
input:enabled { background: #fff; }
```

- عكس :disabled.

## use

- مؤشر pointer على المتاح فقط.
- hover للأزرار النشطة.

## avoid

- تكرار التنسيق الافتراضي بدون داعي.

## examples

### 1) pointer للمتاح
لو معطّل مبيظهرش.

```html
<style>
  button { padding:8px 16px; border:0; border-radius:8px; background:#e4c490; color:#3d2c18; font-weight:bold; margin:3px; }
  button:enabled { cursor:pointer; background:#c9772f; color:#f3ede0; }
</style>
<button>مفعّل</button><button disabled>معطّل</button>
```



### 2) hover آمن
hover للمفعّل فقط.

```html
<style>
  button { padding:8px 16px; border:0; border-radius:8px; background:#3d7a5a; color:#f3ede0; font-weight:bold; margin:3px; }
  button:enabled:hover { background:#2d5c43; }
  button:disabled { opacity:.4; }
</style>
<button>مرّر</button><button disabled>معطّل</button>
```



### 3) حقول
تنسيق الحقول المفعّلة.

```html
<style>
  input { padding:6px; border:2px solid #bda27a; border-radius:6px; background:#f3ede0; color:#3d2c18; margin:3px; }
  input:enabled { border-color:#3d7a5a; }
</style>
<input placeholder="مفعّل"><input disabled placeholder="معطّل">
```



## mistakes

### hover على الزرار المعطّل

```css bad
button:hover { background:red; }  /* بيتطبق على المعطّل كمان */
```

```css good
button:enabled:hover { background:red; }
```

حصر hover على المفعّل.

## quiz

### enabled عكس؟
- [x] disabled
- [ ] checked
- [ ] required
- [ ] hidden

disabled.

### فايدتها؟
- [x] تأثيرات للمتاح فقط
- [ ] لون الخط
- [ ] ظل
- [ ] حد

تحديد النشط.

## refs

- [MDN: :enabled](https://developer.mozilla.org/en-US/docs/Web/CSS/:enabled)
