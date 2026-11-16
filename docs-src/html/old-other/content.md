---
id: content
kind: element
cat: old-other
tag: content
title: نقطة الإدراج القديمة (content)
en: HTML content element (obsolete, Shadow DOM v0)
status: obsolete
display: contents
void: no
support: none
size: compact
summary: عنصر content كان نقطة إدراج في Shadow DOM الإصدار الأول قبل ما يتحل محله slot. اتشال من المتصفحات، واستخدم slot مع Shadow DOM الحديث لتحديد مكان المحتوى.
keywords: content, shadow dom, insertion point, v0, slot, web components, قديم, obsolete, نقطة إدراج
related: slot, template, shadow
---

## intro

قبل ما يستقر معيار **Web Components**، كروم جرّب نسخة أولى من **Shadow DOM (v0)** كان فيها `<content select="…">` كـ **نقطة إدراج**: بتقول للمتصفح «حط المحتوى اللي جاي من برّه هنا». ده كان بيخلّي الـ component يستقبل محتوى المستخدم ويرتّبه جواه.

النسخة دي اتشالت (v1 هي المعيار)، والعنصر `<content>` اتحذف. اللي بياخد مكانه هو **[[slot]]** (وبـ `name` لو عايز أكتر من مكان). الفكرة نفسها: مكان فاضي جوه الـ shadow بيتملي بمحتوى الـ light DOM.

> [!warn] ده عنصر قديم، متستخدموش.

> [!key] `<content>` اتحذف من Shadow DOM v0. استخدم `<slot>` (v1).

## instead

استخدم [[slot]] جوه الـ shadow root: من غير `name` للمحتوى العادي، ومعاه `name` لمحتوى معيّن بـ `slot="…"` على العنصر.

```html
<my-card>
  <h4 slot="title">عنوان الكارت</h4>
  <p>محتوى الكارت</p>
</my-card>
<script>
  customElements.define('my-card', class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' }).innerHTML =
        '<div style="border:1px solid #cbd5e1;border-radius:8px;padding:10px">' +
        '<slot name="title"></slot><hr><slot></slot></div>';
    }
  });
</script>
```

## examples

### 1) الكود القديم (v0)
content بـ select.

```html nolive
<!-- Shadow DOM v0 (اتشال) -->
<shadow-root>
  <content select="h4"></content>
  <content></content>
</shadow-root>
```

- `select` كان بيحدد مين يتحط هنا بـ CSS selector.
- v1 بدّلته بـ `name` على `<slot>` و`slot` على العنصر.
- ولا متصفح حديث بيفهم `<content>`.

### 2) slot بسيط
v1.

```html
<div id="host">نص من برّه</div>
<script>
  const r = document.getElementById('host').attachShadow({ mode: 'open' });
  r.innerHTML = '<b>قبل</b> <slot></slot> <b>بعد</b>';
</script>
```

- محتوى `host` اتحط مكان `<slot>`.
- الـ light DOM بيفضل موجود، بس بيتعرض في مكان الـ slot.
- لو مفيش slot، المحتوى مش بيتعرض.

### 3) slot بأسماء
أكتر من مكان.

```html
<div id="h"><span slot="a">أ</span><span slot="b">ب</span></div>
<script>
  const s = document.getElementById('h').attachShadow({ mode: 'open' });
  s.innerHTML = '[<slot name="b"></slot>] ثم [<slot name="a"></slot>]';
</script>
```

- `slot="a"` بيروح لـ `<slot name="a">`.
- الترتيب في الـ shadow هو اللي بيحدد العرض مش ترتيب الكتابة.
- ده المقابل الحديث لـ `select` القديم.

## refs

- [MDN: content](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/content)
