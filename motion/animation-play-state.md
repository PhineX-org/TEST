---
id: animation-play-state
kind: property
cat: motion
chip: animation-play-state
title: تشغيل وإيقاف الأنيميشن
en: CSS animation-play-state property
status: stable
support: all
size: compact
mdn: animation-play-state
summary: animation-play-state بتوقف الأنيميشن مؤقتاً (paused) أو بتكمّلها (running) بدون ما تفقد مكانها.
keywords: animation-play-state, paused, running, إيقاف, hover
related: animation, animation-iteration-count, hover
---

## intro

الخاصية `animation-play-state` بتتحكم في **تشغيل وإيقاف الأنيميشن** مؤقتاً: **`running`** (الافتراضي) و**`paused`** (متوقفة في مكانها الحالي، ولما ترجع `running` بتكمل من نفس النقطة). أشهر استخدام: **إيقاف الحركة عند `:hover`** (مثلاً شريط أخبار متحرك يقف لما المستخدم يحط الماوس عليه، عشان يقدر يقراه) أو عند `:focus` أو لزرار «إيقاف» للوصولية. بتمنع الحركات المزعجة وتحترم المستخدم. جزء من [[animation]] وتتكامل مع [[hover]].

## try

```html
<style>
  @keyframes spin { to { transform:rotate(360deg); } }
  .s { width:40px; height:40px; border:6px solid #efe0bd; border-top-color:#c9772f; border-radius:50%; margin:14px; animation:spin 1s linear infinite; }
  .s:hover { animation-play-state:paused; }
</style>
<div class="s"></div>
```

## syntax

```css nolive
animation-play-state: running;
animation-play-state: paused;
.ticker:hover { animation-play-state: paused; }
```

- **القيمة المبدئية**: `running`.

## values

### running
شغّالة.

### paused
متوقفة مؤقتاً.

## use

- إيقاف عند hover.
- زرار إيقاف للحركة.

## avoid

- حركات مزعجة بدون وسيلة إيقاف.

## examples

### 1) إيقاف عند hover
مرّر لتوقيفها.

```html
<style>
  @keyframes spin { to { transform:rotate(360deg); } }
  .s { width:36px; height:36px; border:6px solid #efe0bd; border-top-color:#3d7a5a; border-radius:50%; margin:12px; animation:spin 1s linear infinite; }
  .s:hover { animation-play-state:paused; }
</style>
<div class="s"></div>
```



### 2) شريط متحرك
يقف عند التمرير.

```html
<style>
  @keyframes mq { from { transform:translateX(100%); } to { transform:translateX(-100%); } }
  .w { overflow:hidden; background:#efe0bd; padding:6px; border-radius:6px; }
  .t { display:inline-block; white-space:nowrap; color:#3d2c18; animation:mq 8s linear infinite; }
  .w:hover .t { animation-play-state:paused; }
</style>
<div class="w"><span class="t">خبر عاجل: موقع فينيكس التعليمي يطلق قسم CSS الجديد</span></div>
```



### 3) paused مباشرة
متوقفة من البداية.

```html
<style>
  @keyframes spin { to { transform:rotate(360deg); } }
  .s { width:30px; height:30px; border:5px solid #efe0bd; border-top-color:#b5551f; border-radius:50%; margin:10px; animation:spin 1s linear infinite; animation-play-state:paused; }
</style>
<div class="s"></div>
```



## mistakes

### شريط متحرك بلا إيقاف

```css bad
.t { animation:mq 5s linear infinite; }
```

```css good
.w:hover .t { animation-play-state:paused; }
```

أعطِ المستخدم تحكم.

## quiz

### paused بتعمل؟
- [x] توقف الحركة مؤقتاً
- [ ] تحذفها
- [ ] تكررها
- [ ] تسرّعها

تتوقف في مكانها.

### الاستخدام الشائع؟
- [x] إيقاف عند hover
- [ ] تغيير اللون
- [ ] تكبير
- [ ] حد

قراءة الشريط.

## refs

- [MDN: animation-play-state](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-play-state)
