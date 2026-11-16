---
id: justify-content
kind: property
cat: flexbox
chip: justify-content
title: توزيع العناصر على المحور الرئيسي
en: CSS justify-content property
status: stable
support: all
mdn: justify-content
summary: justify-content بتوزع المساحة الفاضية بين العناصر على المحور الرئيسي: start وcenter وspace-between وspace-around وspace-evenly.
keywords: justify-content, توزيع, center, space-between, space-around, space-evenly, flex-start, flex-end, توسيط افقي
related: align-items, flex-direction, gap, place-content, flexbox-guide
---

## intro

الخاصية `justify-content` بتحدد **إزاي العناصر بتتوزع على المحور الرئيسي** لما تكون فيه **مساحة فاضية** في الحاوية. في `row` (الافتراضي) المحور الرئيسي هو **الأفقي**، فهي اللي بتتحكم في التوزيع **الأفقي**. ولو غيّرت `flex-direction: column` بتبقى رأسية.

القيم:
- **`flex-start`** (الافتراضي): من بداية المحور (يمين في العربي).
- **`flex-end`**: من النهاية.
- **`center`**: في النص.
- **`space-between`**: أول عنصر في البداية وآخر عنصر في النهاية، والمسافات متساوية بينهم (أشهر قيمة للـ navbar).
- **`space-around`**: مسافة متساوية حوالين كل عنصر (يعني النص بين العناصر ضعف الأطراف).
- **`space-evenly`**: مسافات متساوية تماماً (بين العناصر والأطراف).
- **`start` / `end`**: القيم الحديثة المراعية للاتجاه.

> [!analogy] اتخيّل أصحاب على مقعد طويل: `flex-start` يقعدوا في أول المقعد، `center` في النص، `space-between` يتفرقوا لأقصى الأطراف.

> [!key] `justify-content` للمحور **الرئيسي**، و[[align-items]] للمحور **العرضي**. في Grid بتشتغل على توزيع الأعمدة في الحاوية.

## try

```html
<style>
  .f { display:flex; justify-content:space-between; background:#efe0bd; padding:8px; }
  .f div { background:#7a4a1d; color:#f3ede0; padding:8px 14px; }
</style>
<div class="f"><div>1</div><div>2</div><div>3</div></div>
```

## syntax

```css nolive
justify-content: flex-start;
justify-content: center;
justify-content: flex-end;
justify-content: space-between;
justify-content: space-around;
justify-content: space-evenly;
```

- **القيمة المبدئية**: `normal` (يتصرف كـ flex-start).
- **بتتوارث؟** لأ.
- بتتحط على الحاوية.

## values

### flex-start
من البداية.

### flex-end
من النهاية.

### center
في النص.

### space-between
الأطراف لازقة والمسافات متساوية بينهم.

### space-around
مسافة متساوية حوالين كل عنصر.

### space-evenly
مسافات متساوية تماماً.

## use

- navbar: `space-between`.
- توسيط عنصر `center`.
- أزرار في طرف `flex-end`.
- تباعد عناصر متساوي `space-evenly`.

## avoid

- توقع إنها تشتغل من غير مساحة فاضية.
- الخلط مع align-items في column.

## examples

### 1) center
توسيط أفقي.

```html
<style>
  .f { display:flex; justify-content:center; background:#efe0bd; padding:8px; gap:4px; }
  .f div { background:#3d7a5a; color:#f3ede0; padding:6px 14px; }
</style>
<div class="f"><div>1</div><div>2</div></div>
```



### 2) space-between
navbar كلاسيكي.

```html
<style>
  .f { display:flex; justify-content:space-between; background:#7a4a1d; padding:8px; }
  .f div { color:#f3ede0; }
</style>
<div class="f"><div>الشعار</div><div>الروابط</div><div>دخول</div></div>
```



### 3) مقارنة around وevenly
الفرق في المسافات على الأطراف.

```html
<style>
  .f { display:flex; background:#efe0bd; padding:6px; margin:4px 0; }
  .f span { background:#c9772f; color:#fff3e0; padding:4px 12px; }
</style>
<div class="f" style="justify-content:space-around"><span>1</span><span>2</span><span>3</span></div>
<div class="f" style="justify-content:space-evenly"><span>1</span><span>2</span><span>3</span></div>
```



### 4) flex-end
العناصر في النهاية.

```html
<style>
  .f { display:flex; justify-content:flex-end; background:#bcd4a8; padding:8px; gap:4px; }
  .f div { background:#7a4a1d; color:#f3ede0; padding:6px 14px; }
</style>
<div class="f"><div>إلغاء</div><div>حفظ</div></div>
```



## mistakes

### استخدامها على الابن

```css bad
.child { justify-content:center; }
```

```css good
.parent { display:flex; justify-content:center; }
```

الخاصية بتتحط على الحاوية.

### توقع توسيط رأسي في row

```css bad
.f { display:flex; justify-content:center; }  /* أفقي فقط */
```

```css good
.f { display:flex; justify-content:center; align-items:center; }
```

للرأسي استخدم align-items.

## quiz

### أشهر قيمة للـ navbar؟
- [ ] center
- [x] space-between
- [ ] flex-end
- [ ] stretch

الأطراف والمسافات متساوية.

### justify-content بتشتغل على؟
- [ ] المحور العرضي
- [x] المحور الرئيسي
- [ ] الألوان
- [ ] الحجم

main axis.

### الفرق بين around وevenly؟
- [ ] مفيش
- [x] evenly متساوية تماماً حتى على الأطراف
- [ ] around أوسع
- [ ] للـ grid فقط

around نص المسافة على الأطراف.

## refs

- [MDN: justify-content](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content)
