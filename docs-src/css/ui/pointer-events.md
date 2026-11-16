---
id: pointer-events
kind: property
cat: ui
chip: pointer-events
title: التفاعل بالماوس واللمس
en: CSS pointer-events property
status: stable
support: all
mdn: pointer-events
summary: pointer-events بتحدد هل العنصر يستقبل أحداث الماوس واللمس. none بيخلّي الضغطات تعدّي من خلاله للعنصر اللي تحته.
keywords: pointer-events, none, auto, ضغط, click through, overlay
related: cursor, user-select, disabled, opacity
---

## intro

الخاصية `pointer-events` بتحدد **هل العنصر يقدر يكون «هدف» للماوس واللمس** (ضغط، hover، سحب). القيمتين المهمتين: **`auto`** (الافتراضي: العنصر عادي بيستقبل الأحداث) و**`none`** (العنصر **«شفاف» للماوس**: الضغطة بتعدّي من خلاله للعنصر اللي تحته، ومبيتفعلش عليه hover ولا click).

استخدامات مفيدة:
- **طبقة overlay زخرفية** (تدرج فوق صورة) متمنعش الضغط على اللي تحتها: `pointer-events: none`.
- **تعطيل ضغط** على عنصر بصرياً مؤقتاً (زرار أثناء الإرسال).
- **أيقونة جوه input** لا تسرق الضغط من الحقل.

**تحذيرات وصولية**: `pointer-events: none` **ملغاش التركيز بالكيبورد**؛ العنصر لسه ممكن يتركّز عليه ويتضغط عليه بـ Enter! فمتستخدمهاش لتعطيل وظيفة (استخدم `disabled` الحقيقية أو `aria-disabled` مع منع الكود). كمان لو حطيتها على أب، الأبناء ممكن يرجعوا `pointer-events: auto` ويستقبلوا. وقيم SVG المتقدمة (`visiblePainted` وغيرها) نادرة.

## try

```html
<style>
  .w { position:relative; width:150px; height:60px; background:#c9772f; border-radius:8px; }
  .o { position:absolute; inset:0; background:linear-gradient(transparent,rgba(61,44,24,.5)); border-radius:8px; pointer-events:none; }
  button { position:absolute; top:12px; right:12px; padding:6px 12px; border:0; border-radius:6px; background:#f3ede0; color:#3d2c18; font-weight:bold; }
</style>
<div class="w"><button>اضغط</button><div class="o"></div></div>
```

## syntax

```css nolive
pointer-events: auto;
pointer-events: none;
.overlay { pointer-events: none; }
.overlay button { pointer-events: auto; }
```

- **القيمة المبدئية**: `auto`.
- **بتتوارث؟** أيوه.
- none لا يمنع الكيبورد.

## values

### auto
يستقبل الأحداث (الافتراضي).

### none
يتجاهله الماوس واللمس.

### visiblePainted
لعناصر SVG: يستجيب للأجزاء المرسومة بس (نادر).

## use

- طبقات زخرفية فوق عناصر تفاعلية.
- أيقونات داخل حقول.
- منع ضغط مزدوج أثناء التحميل (مع الحذر).

## avoid

- استخدامها لتعطيل وظيفة (الكيبورد لسه يشتغل).
- نسيان إعادة auto لأبناء تفاعليين.

## examples

### 1) overlay شفاف للضغط
الزرار يتضغط رغم الطبقة.

```html
<style>
  .w { position:relative; width:150px; height:60px; background:#3d7a5a; border-radius:8px; }
  .o { position:absolute; inset:0; background:rgba(61,44,24,.35); border-radius:8px; pointer-events:none; }
  button { position:absolute; top:12px; right:12px; padding:6px 12px; border:0; border-radius:6px; background:#f3ede0; color:#3d2c18; font-weight:bold; cursor:pointer; }
</style>
<div class="w"><button onclick="this.textContent='اشتغل!'">اضغط</button><div class="o"></div></div>
```



### 2) بدون none
الطبقة بتسرق الضغطة.

```html
<style>
  .w { position:relative; width:150px; height:60px; background:#c9772f; border-radius:8px; }
  .o { position:absolute; inset:0; background:rgba(61,44,24,.35); border-radius:8px; }
  button { position:absolute; top:12px; right:12px; padding:6px 12px; border:0; border-radius:6px; background:#f3ede0; color:#3d2c18; font-weight:bold; }
</style>
<div class="w"><button onclick="this.textContent='اشتغل!'">اضغط</button><div class="o"></div></div>
```



### 3) رابط معطّل بصرياً
بدون تأثير ماوس.

```html
<style>
  a { display:inline-block; padding:8px 14px; background:#c9772f; color:#f3ede0; border-radius:8px; font-weight:bold; text-decoration:none; margin:4px; }
  a.off { opacity:.5; pointer-events:none; }
</style>
<a href="#" onclick="return false">شغّال</a><a href="#" class="off" aria-disabled="true">معطّل</a>
```



### 4) أيقونة داخل حقل
الضغط ينتقل للحقل.

```html
<style>
  .f { position:relative; display:inline-block; }
  .f input { padding:8px 32px 8px 10px; border:2px solid #bda27a; border-radius:8px; background:#f3ede0; color:#3d2c18; }
  .f span { position:absolute; right:10px; top:50%; transform:translateY(-50%); pointer-events:none; }
</style>
<div class="f"><input placeholder="ابحث"><span>🔍</span></div>
```



## mistakes

### تعطيل وظيفة بـ none فقط

```css bad
a.off { pointer-events:none; }  /* Enter لسه يشتغل */
```

```css good
<button disabled> أو aria-disabled مع منع الكود
```

الكيبورد لسه يوصل.

### طبقة بتسرق الضغطات

```css bad
.overlay { position:absolute; inset:0; }
```

```css good
.overlay { position:absolute; inset:0; pointer-events:none; }
```

خلّيها شفافة للماوس.

## quiz

### pointer-events:none بتعمل؟
- [x] الضغطة تعدّي للي تحته
- [ ] العنصر يختفي
- [ ] يتعطّل بالكيبورد
- [ ] يتلوّن

شفاف للماوس.

### بتمنع الكيبورد؟
- [x] لأ
- [ ] أيوه
- [ ] أحياناً
- [ ] فقط Tab

مبتمنعوش.

### الافتراضي؟
- [x] auto
- [ ] none
- [ ] all
- [ ] fill

auto.

## refs

- [MDN: pointer-events](https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events)
