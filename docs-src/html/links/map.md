---
id: map
kind: element
cat: links
tag: map
title: عنصر خريطة الصورة (map)
en: HTML image map element
status: stable
display: inline
void: no
support: all
summary: عنصر map بيعرّف خريطة صورة قابلة للضغط: بتحدد مناطق جوه صورة واحدة (مستطيل أو دايرة أو شكل حر) وكل منطقة بتبقى رابط مختلف، بالتعاون مع img وarea.
keywords: map, خريطة صورة, image map, usemap, area, مناطق قابلة للضغط, hotspot, رابط داخل صورة
related: area, img, a, picture, svg, canvas
---

## intro

تخيّل صورة لخريطة مصر، وعايز لما المستخدم يدوس على القاهرة يروح لصفحة القاهرة، ولما يدوس على الإسكندرية يروح لصفحة الإسكندرية. الصورة واحدة، لكن كل **منطقة** (جزء) فيها ليها رابط مختلف. ده بالظبط اللي بتعمله **خريطة الصورة** (Image Map)، والعنصر `<map>` هو اللي بيعرّفها.

بتتكوّن من ثلاث حاجات متعاونين: الصورة `<img>` اللي عليها خاصية `usemap="#اسم"` بتشاور على الخريطة. والعنصر `<map name="اسم">` اللي بيجمّع المناطق. وجواه عناصر `<area>`: كل واحد بيحدد منطقة (بإحداثيات) ورابطها. يعني `<map>` هو الحاوية، و`<area>` هي المناطق.

الربط بين `<img>` و`<map>` بالاسم: `usemap="#egypt"` بتقابل `<map name="egypt">`. لاحظ علامة `#` في الـ `usemap` بس **مش** في الـ `name`. والاسم لازم يبقى فريد في الصفحة وما فيهوش مسافات.

نصيحة صريحة: خرائط الصور **قديمة نسبياً**، وفيها عيب كبير: الإحداثيات بتكون **بالبكسل** فمش بتتغيّر لما الصورة تتصغّر على الموبايل (مش Responsive). ولو بتبني حاجة جديدة، `<svg>` غالباً أحسن لأنه بيتكبر ويصغر مع الصفحة وبيقبل تنسيق وتفاعل. لكن `<map>` لسه شغال في كل المتصفحات وبسيط للحالات الثابتة.

> [!analogy] تخيّل خريطة ورقية معلّقة على الحيطة وإنت حاطط ملصقات شفافة على مناطق معينة: لما تلمس ملصق بيفتحلك صفحة عن المنطقة دي. الخريطة هي `<img>`، ودفتر الملصقات هو `<map>`، وكل ملصق هو `<area>`.

> [!key] `<img usemap="#x">` + `<map name="x">` + `<area>` لكل منطقة. الإحداثيات بالبكسل ومش بتتكبر مع الصورة.

## try

دوس على الأشكال التلاتة (مربع أزرق ودايرة برتقالي ومثلث أخضر): كل واحد بيودّي لرابط مختلف.

```html
<img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='150'%3E%3Crect width='300' height='150' fill='%23e2e8f0'/%3E%3Crect x='20' y='30' width='80' height='80' fill='%2338bdf8'/%3E%3Ccircle cx='170' cy='70' r='40' fill='%23f59e0b'/%3E%3Cpolygon points='230,110 270,30 290,110' fill='%2322c55e'/%3E%3C/svg%3E"
     width="300" height="150" alt="ثلاث أشكال: مربع ودايرة ومثلث" usemap="#shapes">

<map name="shapes">
  <area shape="rect"   coords="20,30,100,110"     href="#square"   alt="المربع">
  <area shape="circle" coords="170,70,40"          href="#circle"   alt="الدايرة">
  <area shape="poly"   coords="230,110,270,30,290,110" href="#triangle" alt="المثلث">
</map>
<p id="square">وصلت للمربع (لو دست عليه).</p>
```

## syntax

```html nolive
<img src="map.png" alt="خريطة" usemap="#egypt">

<map name="egypt">
  <area shape="rect" coords="10,20,100,80" href="/cairo" alt="القاهرة">
  <area shape="circle" coords="150,60,30" href="/alex" alt="الإسكندرية">
</map>
```

- `usemap="#egypt"` على الصورة — بيشاور على اسم الخريطة (مع `#`).
- `<map name="egypt">` — **الوسم الافتتاحي** والاسم (من غير `#`).
- `<area>` — منطقة قابلة للضغط (عنصر فارغ).
- `</map>` — **الوسم الختامي** إجباري.

## use

- لصورة فيها مناطق ثابتة كل منطقة ليها رابط (خريطة، مخطط، جسم الإنسان).
- لمخططات تعليمية بتشرح أجزاء صورة.
- لـ Hotspots على صور المنتجات.
- لما مفيش داعي للـ Responsive وبتحتاج حل بسيط من غير جافاسكربت.

## avoid

- متستخدمهوش في تصميم Responsive من غير حل: الإحداثيات ثابتة.
- متنساش `alt` على كل `<area>`.
- مش أحسن حل للجديد: فكّر في `<svg>`.
- متحطش اسم فيه مسافات أو مكرر.
- متعتمدش على الصور فقط لنقل روابط مهمة: اعمل قايمة روابط نصية بديلة.

## attributes

### name {required}
اسم الخريطة. لازم يبقى فريد في الصفحة ومن غير مسافات. بتشاور عليه `usemap` في الصورة (مع `#`).

```html nolive
<map name="egypt">…</map>
<img src="a.png" alt="" usemap="#egypt">
```

### id
ممكن تدّي `<map>` `id` كمان لنفس الاسم، لكن المهم `name`.

### class
للتنسيق.

## examples

### 1) أبسط خريطة
منطقة واحدة مستطيلة.

```html
<img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='100'%3E%3Crect width='200' height='100' fill='%23fde68a'/%3E%3Ctext x='100' y='58' font-size='22' text-anchor='middle'%3EClick%3C/text%3E%3C/svg%3E"
     width="200" height="100" alt="لافتة" usemap="#one">
<map name="one">
  <area shape="rect" coords="0,0,200,100" href="#done" alt="الصفحة كلها">
</map>
<p id="done">تمام، الضغط اشتغل.</p>
```

- الصورة كلها بقت رابط واحد (مستطيل بحجمها).
- `usemap` بيشاور على `one`، ودي نفس اسم `<map name="one">`.
- `coords="0,0,200,100"` معناها: من الزاوية فوق-شمال لتحت-يمين.

### 2) ثلاثة أشكال مختلفة
`rect` و `circle` و `poly`.

```html
<img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='150'%3E%3Crect width='300' height='150' fill='%23e2e8f0'/%3E%3Crect x='20' y='30' width='80' height='80' fill='%2338bdf8'/%3E%3Ccircle cx='170' cy='70' r='40' fill='%23f59e0b'/%3E%3Cpolygon points='230,110 270,30 290,110' fill='%2322c55e'/%3E%3C/svg%3E"
     width="300" height="150" alt="أشكال" usemap="#s3">
<map name="s3">
  <area shape="rect" coords="20,30,100,110" href="#a" alt="مربع">
  <area shape="circle" coords="170,70,40" href="#b" alt="دايرة">
  <area shape="poly" coords="230,110,270,30,290,110" href="#c" alt="مثلث">
</map>
<p id="a">مربع</p><p id="b">دايرة</p><p id="c">مثلث</p>
```

- المستطيل بنقطتين (x1,y1,x2,y2)، والدايرة بمركز ونصف قطر (x,y,r)، والمضلع بنقط (x1,y1,x2,y2,…).
- الإحداثيات بتتحسب من الزاوية اليسرى العليا للصورة.
- الـ `href="#a"` بيودّي لعنصر `id="a"` في نفس الصفحة.

### 3) تحديد الإحداثيات بالمعاينة (أداة صغيرة)
اضغط على الصورة وهتشوف إحداثيات النقطة اللي دست عليها (تستخدمها لكتابة `coords`).

```html
<img id="im" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='150'%3E%3Crect width='300' height='150' fill='%23ddd6fe'/%3E%3C/svg%3E"
     width="300" height="150" alt="لوحة قياس">
<p id="pos">دوس على الصورة…</p>
<script>
  im.addEventListener('click', e => {
    const r = im.getBoundingClientRect();
    pos.textContent = 'x=' + Math.round(e.clientX - r.left) + ' , y=' + Math.round(e.clientY - r.top);
  });
</script>
```

- بنطرح مكان الضغطة من حدود الصورة عشان نطلع الإحداثي النسبي.
- نفس الأرقام دي بتحطها في `coords`.
- ده أسهل من التخمين، وفيه أدوات جاهزة بتعمل الشغل ده بالرسم.

### 4) منطقة افتراضية (default)
`shape="default"` بتغطي أي حتة مش مغطّاة.

```html
<img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='100'%3E%3Crect width='300' height='100' fill='%23fecaca'/%3E%3Crect x='20' y='20' width='60' height='60' fill='%23dc2626'/%3E%3C/svg%3E"
     width="300" height="100" alt="لوحة" usemap="#df">
<map name="df">
  <area shape="rect" coords="20,20,80,80" href="#special" alt="المربع الأحمر">
  <area shape="default" href="#other" alt="باقي الصورة">
</map>
<p id="special">المربع</p><p id="other">باقي الصورة</p>
```

- `default` بتشمل الصورة كلها، والمناطق اللي قبلها ليها أولوية.
- مفيدة لو عايز رابط لأي ضغطة بره المناطق المحددة.

### 5) فتح رابط في تبويب جديد
خصائص `target` و `rel` زي `<a>`.

```html
<img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='80'%3E%3Crect width='200' height='80' fill='%23bbf7d0'/%3E%3C/svg%3E"
     width="200" height="80" alt="رابط خارجي" usemap="#ext">
<map name="ext">
  <area shape="rect" coords="0,0,200,80" href="https://example.com"
        target="_blank" rel="noopener noreferrer" alt="افتح example.com في تبويب جديد">
</map>
```

- `target="_blank"` بيفتح تبويب جديد، و`rel="noopener noreferrer"` للأمان.
- `alt` هنا بيوصف الوجهة (لأن النص الظاهر مفيش).

### 6) البديل الأحدث: SVG
نفس الفكرة بـ SVG وتتكبر مع الصفحة.

```html
<svg viewBox="0 0 300 150" width="100%" style="max-width:300px">
  <a href="#sq"><rect x="20" y="30" width="80" height="80" fill="#38bdf8"/></a>
  <a href="#ci"><circle cx="170" cy="70" r="40" fill="#f59e0b"/></a>
</svg>
<p id="sq">مربع</p><p id="ci">دايرة</p>
```

- `viewBox` بيخلّي الرسمة تتكبر وتتصغّر مع العرض، وده اللي ناقص خرائط الصور.
- كل شكل لفّيناه في `<a>` عشان يبقى رابط.

## rules

- parents: أي عنصر بيقبل **Phrasing content**.
- children: **Transparent** (محتوى شفاف) مع عناصر `<area>`: لازم فيها `<area>` واحد على الأقل أو محتوى فيه.
- closing: الوسم الختامي `</map>` إجباري.
- role: `generic`.
- dom: `HTMLMapElement`.
- layout: `display: inline` (غير مرئي بنفسه، مناطقه بتتفعّل على الصورة).

## mistakes

### نسيان # في usemap
```html bad
<img src="a.png" alt="" usemap="egypt">
<map name="egypt">…</map>
```
```html good
<img src="a.png" alt="" usemap="#egypt">
<map name="egypt">…</map>
```
ليه؟ `usemap` لازم يبدأ بـ `#` زي رابط داخلي، لكن الـ `name` من غيره.

### # في name
```html bad
<map name="#egypt">…</map>
```
```html good
<map name="egypt">…</map>
```
ليه؟ الاسم من غير `#`: الـ `#` بتتحط في `usemap` بس.

### area من غير alt
```html bad
<area shape="rect" coords="0,0,50,50" href="/cairo">
```
```html good
<area shape="rect" coords="0,0,50,50" href="/cairo" alt="القاهرة">
```
ليه؟ من غير `alt` قارئ الشاشة مش هيعرف المنطقة دي رابط لإيه.

## a11y

- كل `<area>` لازم `alt` واضح (وجهة الرابط).
- الـ `<img>` نفسها محتاجة `alt` يوصف الصورة عموماً.
- ضيف قايمة روابط نصية بديلة تحت الصورة: بتفيد الموبايل والقراء.
- المناطق بتتنقل بالكيبورد (Tab) زي أي رابط.

## tips

- استخدم أداة رسم الإحداثيات أو المثال رقم 3 لتحديدها بسهولة.
- لو الصورة بتتكبر وتتصغر، جرّب SVG أو سكربت يعيد حساب `coords`.
- ترتيب المناطق مهم: لو متداخلة، اللي أول واحدة بتغلب.
- `shape="default"` في الآخر لأي منطقة متبقية.

## quiz

### إيه الخاصية اللي بتربط `<img>` بـ `<map>`؟
- [ ] `src`
- [x] `usemap`
- [ ] `href`
- [ ] `for`
`usemap="#name"` على الصورة.

### الإحداثيات بتتحسب من فين؟
- [ ] من نص الصورة
- [x] من الزاوية اليسرى العليا للصورة
- [ ] من الزاوية اليمنى السفلى
- [ ] من الصفحة
أصل الإحداثيات أعلى-يسار الصورة.

### إيه العيب الأساسي لخرائط الصور؟
- [ ] مش بتشتغل في المتصفحات
- [x] الإحداثيات ثابتة فمش بتتكبر مع الصورة
- [ ] مش بتقبل روابط
- [ ] مش بتشتغل مع الكيبورد
الحل: SVG أو سكربت.

## refs

- [MDN: map](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/map)
- [WHATWG: The map element](https://html.spec.whatwg.org/multipage/image-maps.html#the-map-element)
