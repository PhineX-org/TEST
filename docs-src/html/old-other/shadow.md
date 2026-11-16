---
id: shadow
kind: element
cat: old-other
tag: shadow
title: نقطة الظل القديمة (shadow)
en: HTML shadow element (obsolete, Shadow DOM v0)
status: obsolete
display: contents
void: no
support: none
size: compact
summary: عنصر shadow كان نقطة إدراج في Shadow DOM v0 لعرض shadow root أقدم جوه واحد أحدث. اتشال من المعيار، والحديث هو shadow roots متداخلة مع slot.
keywords: shadow, shadow dom, v0, insertion point, older shadow root, slot, قديم, obsolete, web components
related: slot, template, content
---

## intro

في Shadow DOM الإصدار الأول (v0)، العنصر كان ممكن يكون له **أكتر من shadow root** (واحد فوق التاني). و`<shadow>` هو **نقطة إدراج** بتقول: «اعرض الـ shadow root الأقدم هنا جوه الأحدث». ده كان مفيد للوراثة بين الـ components.

الفكرة كانت معقّدة ومحدش استخدمها كتير، فـ **v1 شالتها**: كل عنصر ليه shadow root واحد بس، والتركيب بيتم بـ [[slot]] و**تداخل الـ components** (component جوه component). لو لقيت `<shadow>` في كود قديم، هو مش بيعمل حاجة في أي متصفح حديث.

> [!warn] ده عنصر قديم، متستخدموش.

> [!key] `<shadow>` اتشال. الـ v1 فيها shadow root واحد وslot، والتركيب بتداخل الـ components.

## instead

ابني الـ component من قطع أصغر: كل component له shadow root واحد، وبتحط الـ components جوه بعض وتوصّل المحتوى بـ [[slot]].

```html
<outer-box>
  <inner-badge>جوه</inner-badge>
</outer-box>
<script>
  customElements.define('inner-badge', class extends HTMLElement {
    constructor() { super(); this.attachShadow({ mode: 'open' }).innerHTML = '<span style="background:#39ff14;padding:2px 8px;border-radius:99px"><slot></slot></span>'; }
  });
  customElements.define('outer-box', class extends HTMLElement {
    constructor() { super(); this.attachShadow({ mode: 'open' }).innerHTML = '<div style="border:2px solid #0f172a;padding:10px;border-radius:8px">صندوق: <slot></slot></div>'; }
  });
</script>
```

## examples

### 1) الكود القديم (v0)
نقطة الإدراج.

```html nolive
<!-- Shadow DOM v0 (اتشال) -->
<shadow-root>
  <shadow></shadow>   <!-- الـ shadow root الأقدم -->
  <p>إضافة فوقه</p>
</shadow-root>
```

- `<shadow>` كان بيعرض الـ shadow root الأقدم.
- v1 مفيهاش أكتر من shadow root للعنصر.
- ولا متصفح حديث بيفهم الوسم.

### 2) تركيب بالتداخل
component في component.

```html
<card-wrap><star-rate></star-rate></card-wrap>
<script>
  customElements.define('star-rate', class extends HTMLElement {
    constructor() { super(); this.attachShadow({ mode: 'open' }).innerHTML = '★★★★☆'; }
  });
  customElements.define('card-wrap', class extends HTMLElement {
    constructor() { super(); this.attachShadow({ mode: 'open' }).innerHTML = '<div style="border:1px solid #cbd5e1;padding:10px;border-radius:8px">تقييم: <slot></slot></div>'; }
  });
</script>
```

- `card-wrap` بيحط محتواه في `<slot>`.
- `star-rate` component مستقل بيتحط جوهه.
- ده البديل الحديث لتركيب الظل القديم.

## refs

- [MDN: shadow](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/shadow)
