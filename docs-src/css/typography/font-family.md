---
id: font-family
kind: property
cat: typography
chip: font-family
title: نوع الخط
en: CSS font-family property
status: stable
support: all
mdn: font-family
summary: font-family بتحدد قايمة الخطوط المفضلة للنص بالترتيب، وآخرها لازم يكون عائلة عامة (serif أو sans-serif أو monospace) كاحتياطي.
keywords: font-family, خط, serif, sans-serif, monospace, system-ui, fallback, خطوط عربية
related: font-size, font-weight, font, line-height, font-style
---

## intro

الخاصية `font-family` بتحدد **نوع الخط** اللي هيتعرض بيه النص. الفكرة الأساسية إنك مبتكتبش خط واحد، بل **قايمة بالأولوية** مفصولة بفاصلة: المتصفح يجرّب أول خط، لو مش موجود عند المستخدم ينزل للتاني، وهكذا لحد ما يلاقي واحد شغال. ولازم **آخر عنصر في القايمة يكون «عائلة عامة»** زي `sans-serif` أو `serif` أو `monospace` عشان تضمن إن فيه خط ما في كل الأحوال.

أسماء الخطوط اللي فيها **مسافات** لازم تتحط بين علامتي تنصيص: `"Times New Roman"`. وأسماء من كلمة واحدة زي `Arial` مش محتاجة.

العائلات العامة: `serif` (بزوائد زي Times)، `sans-serif` (بدون زوائد، حديث وواضح)، `monospace` (كل حرف بنفس العرض، للكود)، `cursive` و`fantasy` (نادرة)، و`system-ui` (خط نظام التشغيل نفسه، سريع ومألوف للمستخدم).

للعربي: خطوط زي **Tahoma** و**Segoe UI** و**Noto Naskh Arabic** و**Cairo** (لو حمّلته بـ [[at-font-face]]) بتدي قراءة كويسة. وخلّي الخط الاحتياطي `sans-serif` دايماً.

> [!analogy] القايمة زي طلب في مطعم: «عايز فراخ، لو مفيش أديني لحمة، ولو مفيش أي حاجة تتاكل»؛ آخر اختيار بيضمن إنك متفضلش من غير أكل.

الخاصية دي **بتتوارث**، فاكتبها مرة واحدة على `body`.

## try

```html
<style>
  p { margin:4px 0; font-size:1.2rem; }
</style>
<p style="font-family:serif">خط بزوائد (serif) Hello</p>
<p style="font-family:sans-serif">خط بدون زوائد (sans) Hello</p>
<p style="font-family:monospace">خط ثابت العرض (mono) Hello</p>
```

## syntax

```css nolive
font-family: "Segoe UI", Tahoma, sans-serif;
font-family: Georgia, "Times New Roman", serif;
font-family: system-ui, sans-serif;
font-family: ui-monospace, Consolas, monospace;
```

- **القيمة المبدئية**: بيعتمد على المتصفح.
- **بتتوارث؟** أيوه.
- أسماء فيها مسافات → بين علامتي تنصيص.
- آخر عنصر: عائلة عامة.

## values

### serif
خط بزوائد (كلاسيكي).

### sans-serif
خط بدون زوائد (حديث).

### monospace
عرض حروف ثابت (للكود).

### system-ui
خط نظام التشغيل.

## use

- ضبط خط الصفحة كلها على body.
- خط مختلف للعناوين.
- monospace لأكواد.

## avoid

- خط واحد بدون احتياطي.
- نسيان علامات التنصيص حول الأسماء ذات المسافات.

## examples

### 1) العائلات العامة
أربع عائلات مختلفة.

```html
<style>
  p { margin:3px 0; font-size:1.15rem; color:#3d2c18; }
</style>
<p style="font-family:serif">serif — كتابة كلاسيكية</p>
<p style="font-family:sans-serif">sans-serif — كتابة حديثة</p>
<p style="font-family:monospace">monospace — كود ثابت</p>
<p style="font-family:cursive">cursive — خط يدوي</p>
```



### 2) قايمة احتياطية
لو الخط الأول مش موجود يكمل للي بعده.

```html
<style>
  p { font-size:1.3rem; color:#3d2c18; }
</style>
<p style="font-family:'خط-مش-موجود', Tahoma, sans-serif">اتعرض بـ Tahoma لأن الأول مش موجود</p>
```



### 3) أسماء فيها مسافات
لازم علامات تنصيص.

```html
<style>
  p { font-size:1.3rem; color:#3d2c18; margin:4px 0; }
</style>
<p style="font-family:'Times New Roman', serif">"Times New Roman" بعلامات تنصيص</p>
<p style="font-family:Georgia, serif">Georgia من غير تنصيص (كلمة واحدة)</p>
```



### 4) خط للكود
monospace يحافظ على المحاذاة.

```html
<style>
  code { font-family:ui-monospace, Consolas, monospace; background:#efe0bd; color:#3d2c18; padding:6px 10px; display:block; border-radius:6px; direction:ltr; }
</style>
<code>iiii<br>WWWW</code>
```



## mistakes

### اسم فيه مسافة بدون تنصيص

```css bad
body { font-family: Times New Roman; }
```

```css good
body { font-family: "Times New Roman", serif; }
```

الاسم المركب لازم يتحط بين علامتي تنصيص.

### بدون خط احتياطي

```css bad
body { font-family: "Cairo"; }
```

```css good
body { font-family: "Cairo", Tahoma, sans-serif; }
```

لو Cairo مش محمّل المتصفح هيستخدم الافتراضي القبيح؛ احتياطي أحسن.

## quiz

### آخر عنصر في قايمة الخطوط يفضّل يكون؟
- [ ] خط مخصص
- [x] عائلة عامة زي sans-serif
- [ ] رقم
- [ ] لون

ضمان وجود خط.

### الاسم "Times New Roman" محتاج؟
- [x] علامات تنصيص
- [ ] أقواس
- [ ] لا شيء
- [ ] فاصلة منقوطة

لأن فيه مسافات.

### الخاصية دي بتتوارث؟
- [x] أيوه
- [ ] لأ
- [ ] أحياناً
- [ ] فقط في body

بتتوارث.

## refs

- [MDN: font-family](https://developer.mozilla.org/en-US/docs/Web/CSS/font-family)
