---
id: area
kind: element
cat: links
tag: area
title: عنصر منطقة الخريطة (area)
en: HTML image map area element
status: stable
display: none
void: yes
support: all
summary: عنصر area بيحدد منطقة قابلة للضغط جوه صورة (مستطيل أو دايرة أو مضلع) وبيربطها برابط، ولازم يتحط جوه map، وبيقبل shape وcoords وhref وalt.
keywords: area, منطقة, hotspot, shape, coords, rect, circle, poly, image map, خريطة صورة, alt
related: map, img, a, svg
---

## intro

بعد ما اتعرفت على `<map>` (الحاوية)، `<area>` هو **المنطقة نفسها**: كل عنصر `<area>` بيحدد جزء قابل للضغط من الصورة وبيدّيه رابط. يعني لو عندك صورة فيها أربع مناطق، هتكتب أربع عناصر `<area>` جوه `<map>` واحد.

بيتكوّن من أربع حاجات أساسية: **`shape`** (شكل المنطقة: `rect` أو `circle` أو `poly` أو `default`)، **`coords`** (الإحداثيات اللي بتحدد الشكل بالبكسل)، **`href`** (الرابط)، **`alt`** (وصف نصي لوجهة الرابط). وكل شكل ليه صيغة مختلفة لـ `coords`: المستطيل `x1,y1,x2,y2` (الزاوية العليا اليسرى ثم السفلى اليمنى)، والدايرة `x,y,r` (المركز ونصف القطر)، والمضلع `x1,y1,x2,y2,x3,y3…` (نقط الرؤوس بالترتيب).

الـ `<area>` عنصر **فارغ (Void)**: ما بياخدش محتوى ولا وسم إغلاق. وهو **مش بيظهر** على الصفحة لوحده (`display: none`)؛ هو بس بيعرّف منطقة على الصورة. وعشان كده لازم يتحط جوه `<map>` وإلا ملهوش تأثير.

وزي `<a>` بالظبط، بيقبل خصائص الروابط: `target` لفتح تبويب جديد، `rel`، `download` لتحميل ملف. وهنا `alt` **إجباري** لو فيه `href`، لأنه الوصف الوحيد اللي هيعرف بيه قارئ الشاشة المنطقة دي رابط لإيه.

> [!analogy] تخيّل خريطة معلّقة وإنت بتحط ملصقات شفافة بأشكال مختلفة (مربع ودايرة ومثلث) على مناطق معينة. كل ملصق هو `<area>`: بيحدد شكله ومكانه وبيدّيك رابط للمنطقة اللي تحته.

> [!key] `shape` + `coords` + `href` + `alt`. المستطيل `x1,y1,x2,y2`، الدايرة `x,y,r`، المضلع نقط.

## try

دوس على المربع الأزرق أو الدايرة. جرّب غيّر `coords` للمربع وشوف المنطقة بتتحرك.

```html
<img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='120'%3E%3Crect width='300' height='120' fill='%23f1f5f9'/%3E%3Crect x='30' y='20' width='80' height='80' fill='%2338bdf8'/%3E%3Ccircle cx='200' cy='60' r='40' fill='%23f59e0b'/%3E%3C/svg%3E"
     width="300" height="120" alt="مربع ودايرة" usemap="#m">
<map name="m">
  <area shape="rect"   coords="30,20,110,100" href="#r" alt="المربع الأزرق">
  <area shape="circle" coords="200,60,40"     href="#c" alt="الدايرة البرتقالي">
</map>
<p id="r">المربع</p><p id="c">الدايرة</p>
```

## syntax

```html nolive
<map name="demo">
  <area shape="rect" coords="10,10,100,60" href="/page" alt="وصف الوجهة">
</map>
```

- `shape` — شكل المنطقة: `rect` أو `circle` أو `poly` أو `default`.
- `coords` — الإحداثيات بالبكسل حسب الشكل.
- `href` — رابط المنطقة.
- `alt` — وصف نصي (إجباري مع `href`).
- مفيش وسم إغلاق (عنصر فارغ).

## use

- لتحديد مناطق قابلة للضغط في صورة (جوه `<map>`).
- لخرائط وجداول ورسومات ثابتة.
- لـ Hotspots في صور المنتجات.
- لتحميل ملف عند الضغط على منطقة (`download`).

## avoid

- متستخدمهوش برّه `<map>`.
- متنساش `alt` مع `href`.
- مش للتصميمات اللي بتتكبر وتصغر: الإحداثيات ثابتة.
- متحطش مناطق متداخلة من غير ما تقصد.

## attributes

### shape
شكل المنطقة: `rect` (مستطيل)، `circle` (دايرة)، `poly` (مضلع)، `default` (الصورة كلها). لو مكتبتش، القيمة الافتراضية `rect`.

```html nolive
<area shape="circle" coords="100,50,30" href="/a" alt="…">
```

### coords
إحداثيات الشكل بالبكسل، مفصولة بفواصل، نسبةً للزاوية العليا اليسرى للصورة. `rect`: `x1,y1,x2,y2`. `circle`: `x,y,r`. `poly`: `x1,y1,x2,y2,…`. من غير `coords` لـ `default`.

### href
رابط المنطقة (صفحة أو ملف أو `#id`). من غير `href` المنطقة مش بتبقى رابط.

### alt
وصف نصي لوجهة الرابط. **إجباري** لو فيه `href`.

### target
مكان فتح الرابط: `_blank` تبويب جديد، `_self` نفس الصفحة (افتراضي)، `_parent`، `_top`.

### rel
علاقة الرابط (`noopener`، `noreferrer`، `nofollow`…).

### download
بتخلّي المتصفح ينزّل الملف بدل ما يفتحه.

### ping
قايمة URLs بيتبعتلها إشعار عند الضغط (تتبع).

### referrerpolicy
بتتحكم في بيانات الـ Referer اللي بتتبعت مع الرابط.

### nohref {deprecated}
كانت بتخلّي المنطقة من غير رابط. **اتشالت**: اكتب `<area>` من غير `href`.

## examples

### 1) مستطيل
`shape="rect"`.

```html
<img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='100'%3E%3Crect width='200' height='100' fill='%23e2e8f0'/%3E%3Crect x='20' y='20' width='100' height='60' fill='%2322c55e'/%3E%3C/svg%3E"
     width="200" height="100" alt="مربع أخضر" usemap="#r1">
<map name="r1">
  <area shape="rect" coords="20,20,120,80" href="#ok" alt="المستطيل الأخضر">
</map>
<p id="ok">وصلت!</p>
```

- `coords="20,20,120,80"`: الزاوية العليا اليسرى (20,20) والسفلى اليمنى (120,80).
- المنطقة بتطابق المستطيل الأخضر بالظبط.
- أي ضغطة خارجه مش بتعمل حاجة.

### 2) دايرة
`shape="circle"`.

```html
<img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='120'%3E%3Crect width='200' height='120' fill='%23fef3c7'/%3E%3Ccircle cx='100' cy='60' r='45' fill='%23f97316'/%3E%3C/svg%3E"
     width="200" height="120" alt="دايرة برتقالية" usemap="#c1">
<map name="c1">
  <area shape="circle" coords="100,60,45" href="#hit" alt="الدايرة البرتقالية">
</map>
<p id="hit">دست على الدايرة.</p>
```

- `coords="100,60,45"`: المركز (100,60) ونصف القطر 45.
- المنطقة دايرة حقيقية، فالضغط في زوايا المربع المحيط مش بيحسب.

### 3) مضلع
`shape="poly"` لأشكال حرة.

```html
<img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='120'%3E%3Crect width='200' height='120' fill='%23ede9fe'/%3E%3Cpolygon points='100,10 180,100 20,100' fill='%238b5cf6'/%3E%3C/svg%3E"
     width="200" height="120" alt="مثلث بنفسجي" usemap="#p1">
<map name="p1">
  <area shape="poly" coords="100,10,180,100,20,100" href="#tri" alt="المثلث">
</map>
<p id="tri">المثلث.</p>
```

- الأرقام أزواج (x,y) لثلاث نقط: القمة والزاويتين السفليتين.
- المتصفح بيقفل الشكل أوتوماتيك بين آخر نقطة والأولى.

### 4) مناطق متعددة بأسماء
كل منطقة ليها وجهة.

```html
<img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='100'%3E%3Crect width='100' height='100' fill='%2338bdf8'/%3E%3Crect x='100' width='100' height='100' fill='%2322c55e'/%3E%3Crect x='200' width='100' height='100' fill='%23f59e0b'/%3E%3C/svg%3E"
     width="300" height="100" alt="ثلاثة ألوان" usemap="#tri3">
<map name="tri3">
  <area shape="rect" coords="0,0,100,100"   href="#blue"   alt="الأزرق">
  <area shape="rect" coords="100,0,200,100" href="#green"  alt="الأخضر">
  <area shape="rect" coords="200,0,300,100" href="#orange" alt="البرتقالي">
</map>
<p id="blue">أزرق</p><p id="green">أخضر</p><p id="orange">برتقالي</p>
```

- كل مربع منطقة منفصلة ليها `alt` مختلف.
- المناطق ملصقة جنب بعض من غير تداخل.

### 5) رابط خارجي وتحميل
خصائص `target` و `download`.

```html
<img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='80'%3E%3Crect width='130' height='80' fill='%2386efac'/%3E%3Crect x='130' width='130' height='80' fill='%23fca5a5'/%3E%3C/svg%3E"
     width="260" height="80" alt="رابط وتحميل" usemap="#dl">
<map name="dl">
  <area shape="rect" coords="0,0,130,80" href="https://example.com" target="_blank"
        rel="noopener noreferrer" alt="موقع خارجي (تبويب جديد)">
  <area shape="rect" coords="130,0,260,80" href="file.pdf" download alt="تحميل الملف">
</map>
```

- النصف الأخضر بيفتح موقع في تبويب جديد، والأحمر بينزّل ملف.
- `rel="noopener noreferrer"` للأمان مع `_blank`.

### 6) default للباقي
أي منطقة مش مغطّاة.

```html
<img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='100'%3E%3Crect width='260' height='100' fill='%23e5e7eb'/%3E%3Crect x='20' y='20' width='60' height='60' fill='%23ef4444'/%3E%3C/svg%3E"
     width="260" height="100" alt="لوحة" usemap="#df2">
<map name="df2">
  <area shape="rect" coords="20,20,80,80" href="#spec" alt="المربع الأحمر">
  <area shape="default" href="#rest" alt="أي مكان تاني في الصورة">
</map>
<p id="spec">خاص</p><p id="rest">باقي الصورة</p>
```

- `default` من غير `coords` بتغطي الصورة كلها.
- المنطقة المحددة قبلها ليها الأولوية، فبنكتب `default` في الآخر.

## rules

- parents: جوه `<map>` (أو أي عنصر بيقبل Phrasing جواه `<map>` كسلف).
- children: مفيش (Void).
- closing: مفيش وسم إغلاق.
- role: `link` لو فيه `href`، وإلا `generic`.
- dom: `HTMLAreaElement`.
- layout: `display: none`.

## mistakes

### area برّه map
```html bad
<img src="a.png" alt="" usemap="#x">
<area shape="rect" coords="0,0,50,50" href="/a" alt="…">
```
```html good
<img src="a.png" alt="" usemap="#x">
<map name="x">
  <area shape="rect" coords="0,0,50,50" href="/a" alt="…">
</map>
```
ليه؟ الـ `<area>` من غير `<map>` ملهوش مكان يتربط بالصورة.

### coords غلط للدايرة
```html bad
<area shape="circle" coords="100,60,150,100" href="/a" alt="…">
```
```html good
<area shape="circle" coords="100,60,45" href="/a" alt="…">
```
ليه؟ الدايرة 3 أرقام بس: x و y و r. الأرقام الأربعة للمستطيل.

### وسم إغلاق
```html bad
<area shape="rect" coords="0,0,50,50" href="/a" alt="…"></area>
```
```html good
<area shape="rect" coords="0,0,50,50" href="/a" alt="…">
```
ليه؟ `<area>` عنصر فارغ مالوش وسم إغلاق.

## a11y

- `alt` لكل `<area>` له `href`: بيوصف الوجهة.
- ضيف قايمة روابط نصية بديلة قدام الصورة أو تحتها.
- لازم المناطق تتنقل بالكيبورد (Tab) ويبقى فيها مؤشر Focus واضح.
- متعتمدش على الصورة لوحدها لنقل معلومة.

## tips

- جرّب أدوات رسم الإحداثيات أونلاين أو المثال بتاع `<map>`.
- الأرقام نسبية لحجم الصورة اللي ظاهرة: متغيّرش حجم الصورة بعدين.
- لو محتاج Responsive، اشتغل بـ SVG.

## quiz

### كام رقم في `coords` لدايرة؟
- [ ] 2
- [x] 3
- [ ] 4
- [ ] 6
x و y و نصف القطر.

### أنهي `shape` يغطي أي مكان مش متغطي؟
- [ ] `rect`
- [ ] `circle`
- [ ] `poly`
- [x] `default`
`default` بتغطي الصورة كلها.

### هل `<area>` بيحتاج وسم إغلاق؟
- [ ] أيوه
- [x] لأ، عنصر فارغ
- [ ] أحياناً
- [ ] لو فيه `href`
عنصر Void.

## refs

- [MDN: area](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/area)
- [WHATWG: The area element](https://html.spec.whatwg.org/multipage/image-maps.html#the-area-element)
