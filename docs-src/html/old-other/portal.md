---
id: portal
kind: element
cat: old-other
tag: portal
title: البوابة (portal)
en: HTML portal element (obsolete, removed experiment)
status: obsolete
display: inline-block
void: no
support: none
size: compact
summary: عنصر portal كان تجربة في كروم لعرض صفحة تانية جوه صفحتك وتنتقل ليها بسلاسة. اتشالت التجربة، والبدائل iframe أو fencedframe أو Speculation Rules للتحميل المسبق.
keywords: portal, بوابة, تجربة, Chrome, preview, prerender, iframe, fencedframe, Speculation Rules, قديم, obsolete
related: iframe, fencedframe, a
---

## intro

`<portal>` كان **تجربة** من كروم: بيعرض صفحة تانية جوه صفحتك زي `<iframe>`، لكن بحيث لما المستخدم يدوس عليها **تتحول لصفحة كاملة** بانتقال سلس (من غير تحميل جديد). الفكرة كانت لتنقّل أسرع بين صفحات الموقع.

الفريق قرر **يوقف التجربة** ويشيلها (2023) لأن في بدائل أبسط وأأمن. أهمها **Speculation Rules** اللي بتخلّي المتصفح **يحمّل الصفحة الجاية مسبقاً (prerender)** فيبقى الانتقال فوري، من غير عنصر في الـ HTML. وللعرض المعزول فيه [[iframe]] و[[fencedframe]].

> [!warn] ده عنصر قديم، متستخدموش.

> [!key] `<portal>` تجربة اتشالت. استخدم Speculation Rules أو `<iframe>`.

## instead

للتنقل السريع استخدم **Speculation Rules** (`<script type="speculationrules">`) عشان المتصفح يحمّل الصفحة التالية مسبقاً. وللعرض داخل الصفحة استخدم [[iframe]].

```html
<iframe title="معاينة" style="width:100%;height:90px;border:1px solid #cbd5e1;border-radius:8px"
  srcdoc="<h3 style='font-family:sans-serif'>ده محتوى صفحة تانية</h3>"></iframe>
```

## examples

### 1) الكود القديم (تجربة اتشالت)
portal.

```html nolive
<portal src="https://example.com/next" id="p"></portal>
<script>
  document.getElementById('p').addEventListener('click', e => e.target.activate());
</script>
```

- `activate()` كانت بتحوّل البوابة لصفحة كاملة.
- كانت متاحة بعلم تجريبي في كروم بس.
- اتحذفت نهائياً من كروم.

### 2) تحميل مسبق بـ Speculation Rules
بديل حديث.

```html nolive
<script type="speculationrules">
{
  "prerender": [
    { "where": { "href_matches": "/courses/*" }, "eagerness": "moderate" }
  ]
}
</script>
```

- بنقول للمتصفح أي روابط يحمّلها مسبقاً.
- `eagerness: "moderate"` يحمّلها لما المستخدم يقف عليها بالماوس.
- مدعوم في كروم، وغيره بيتجاهله من غير ضرر.

### 3) معاينة بـ iframe
عرض صفحة معزولة جوه صفحتك.

```html
<iframe title="معاينة الصفحة" style="width:100%;height:100px;border:1px solid #cbd5e1;border-radius:8px"
  srcdoc="<h3 style='font-family:sans-serif'>الصفحة التالية</h3><p style='font-family:sans-serif'>معاينة محتواها.</p>"></iframe>
```

- الـ iframe بيعرض صفحة جوه صفحتك معزولة.
- ماينفعش يتحوّل لصفحة كاملة بسلاسة زي البوابة.
- استخدم `title` عشان قارئ الشاشة.

## refs

- [Chrome: Speculation Rules](https://developer.chrome.com/docs/web-platform/prerender-pages)
