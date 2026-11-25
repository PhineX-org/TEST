#!/usr/bin/env python3
"""Generates the course menu pages with the shared design system (assets/tokens.css + assets/site.css).
usage: python3 tools/menus.py   (run from the site root)"""
import io, os, html

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>'
SEARCH = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>'
THEME = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 3v18"/><path d="M12 3a9 9 0 0 1 0 18" fill="currentColor" stroke="none" opacity=".55"/></svg>'
MENU = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>'
e = html.escape
_TABBAR_SRC = '''
<nav class="tabbar" aria-label="التنقل">
  <a href="{{rel}}index.html"{{c0}}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11.5 12 4l9 7.5"/><path d="M5 10.5V20h14v-9.5"/><path d="M10 20v-5h4v5"/></svg><span>الرئيسية</span></a>
  <a href="{{rel}}courses/menu.html"{{c1}}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5"/></svg><span>الكورسات</span></a>
  <a href="{{rel}}docs/index.html"{{c2}}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14"/></svg><span>المرجع</span></a>
  <button type="button" data-px-cycle aria-label="تغيير المظهر"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 3v18"/><path d="M12 3a9 9 0 0 1 0 18" fill="currentColor" stroke="none" opacity=".5"/></svg><span>المظهر</span></button>
</nav>
'''


def head(title, desc, rel):
    return f'''<!DOCTYPE html>
<html lang="ar" dir="rtl" data-theme="dusk">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{e(title)} — PhineX Academy</title>
<meta name="description" content="{e(desc)}">
<meta name="theme-color" content="#14181e">
<link rel="icon" href="{rel}PhineX_Courses.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="{rel}assets/tokens.css">
<link rel="stylesheet" href="{rel}assets/site.css">
<script src="{rel}assets/site.js"></script>
</head>
'''


def bar(rel, here):
    cur = lambda k: ' aria-current="page"' if k == here else ''
    return f'''<body>
<a class="skip" href="#main">تخطّي للمحتوى</a>
<header class="bar">
  <div class="wrap bar-in">
    <a class="brand" href="{rel}index.html" aria-label="PhineX Academy — الرئيسية"><span class="brand-mark">P</span><span class="brand-name">Phine<b>X</b></span></a>
    <nav class="nav" data-px-nav aria-label="التنقل الرئيسي">
      <a href="{rel}index.html">الرئيسية</a>
      <a href="{rel}courses/menu.html"{cur('courses')}>الكورسات</a>
      <a href="{rel}docs/index.html">المرجع (Docs)</a>
      <a href="{rel}index.html#community">المجتمع</a>
    </nav>
    <div class="bar-tools">
      <button class="ib" type="button" data-px-cycle aria-label="تغيير المظهر" title="تغيير المظهر">{THEME}</button>
    </div>
  </div>
</header>
'''


def tabbar(rel, here):
    return _TABBAR_SRC.replace('{{rel}}', rel).replace('{{c0}}', '').replace('{{c1}}', ' aria-current="page"' if here == 'courses' else '').replace('{{c2}}', '')


def foot(rel):
    return f'''<footer class="foot">
  <div class="wrap">
    <div class="foot-bottom" style="margin-top:0;padding-top:0;border-top:0">
      <span>© 2026 PhineX Academy. جميع الحقوق محفوظة.</span>
      <span><a href="{rel}index.html">الرئيسية</a> · <a href="{rel}courses/menu.html">كل الكورسات</a> · <a href="{rel}docs/index.html">المرجع</a></span>
    </div>
  </div>
</footer>
''' + tabbar(rel, 'courses')


def crumbs(items):
    out = []
    for i, (label, href) in enumerate(items):
        if i:
            out.append('<span aria-hidden="true">›</span>')
        out.append(f'<a href="{href}">{e(label)}</a>' if href else f'<span>{e(label)}</span>')
    return '<nav class="crumbs" aria-label="مسار التنقل">' + ''.join(out) + '</nav>'


def lesson(item):
    """item: dict(href, title, desc, icon|None, id|None, special, soon, badge)"""
    cls = ['lesson']
    if item.get('special'):
        cls.append('sp')
    if item.get('soon'):
        cls.append('soon')
    ln = f'<span class="ln ic" aria-hidden="true">{item["icon"]}</span>' if item.get('icon') else '<span class="ln" aria-hidden="true"></span>'
    attrs = ''
    if item.get('id'):
        attrs += f' data-lid="{item["id"]}"'
    badge = f'<span class="badge">{e(item["badge"])}</span>' if item.get('badge') else ''
    st = '<span class="st">قريباً</span>' if item.get('soon') else ''
    href = item['href'] if not item.get('soon') else '#'
    search = e((item['title'] + ' ' + item.get('desc', '')).lower())
    return (f'<li><a class="{" ".join(cls)}" href="{e(href, quote=True)}"{attrs} data-search="{search}">{ln}'
            f'<span><b>{e(item["title"])}{badge}</b><small>{e(item.get("desc", ""))}</small></span>{st}'
            f'<span class="go" aria-hidden="true">{ARROW}</span></a></li>')


def course_page(path, title, desc, trail, intro, groups, progress=None, search=True, reset_ids=None):
    depth = path.count('/')
    rel = '../' * depth
    total_lessons = sum(1 for g in groups for it in g['items'] if it.get('id') and not it.get('soon'))
    body = head(title, desc, rel) + bar(rel, 'courses')
    body += f'''<header class="page-head">
  <div class="wrap">
    {crumbs(trail)}
    <h1>{title}</h1>
    <p>{intro}</p>
'''
    if progress:
        body += f'    <div class="prog" aria-label="تقدمك"><div class="prog-bar"><i id="pfill"></i></div><span class="prog-txt" id="ptxt">0 / {total_lessons} مكتمل</span></div>\n'
    body += '  </div>\n</header>\n<main id="main" class="wrap" style="padding:8px 0 56px">\n'
    if search:
        body += f'  <div class="search">{SEARCH}<input id="q" type="search" placeholder="ابحث عن درس أو موضوع…" aria-label="بحث في الدروس" autocomplete="off"></div>\n'
    for g in groups:
        if g.get('title'):
            body += f'  <h2 class="group-title" data-group>{e(g["title"])}</h2>\n'
        if g.get('hint'):
            body += f'  <p class="hint">{e(g["hint"])}</p>\n'
        body += '  <ol class="lessons">\n' + '\n'.join('    ' + lesson(it) for it in g['items']) + '\n  </ol>\n'
    body += '  <p class="empty" id="empty">مفيش نتائج لبحثك. جرّب كلمة تانية.</p>\n'
    if progress and reset_ids:
        body += '  <button class="reset" type="button" id="reset">مسح التقدم المحفوظ</button>\n'
    body += '</main>\n' + foot(rel)
    # script
    js = ''
    if search:
        js += '''
  var q=document.getElementById('q'),empty=document.getElementById('empty');
  q.addEventListener('input',function(){
    var t=q.value.trim().toLowerCase(),n=0;
    document.querySelectorAll('.lesson').forEach(function(a){var s=!t||(a.getAttribute('data-search')||'').indexOf(t)>-1;a.parentNode.style.display=s?'':'none';if(s)n++;});
    document.querySelectorAll('[data-group]').forEach(function(g){g.style.display=t?'none':'';});
    empty.style.display=n?'none':'block';
  });'''
    if progress:
        keys = progress  # python list expr as js: [ ['id','px-key','lesson-key'], ...]
        js += f'''
  var IDS={keys};
  function isDone(id){{try{{return localStorage.getItem('lesson-'+id)==='completed'||localStorage.getItem('px-'+id)==='done';}}catch(e){{return false;}}}}
  function paint(){{
    var d=0;
    IDS.forEach(function(id){{
      var a=document.querySelector('.lesson[data-lid="'+id+'"]'); if(!a) return;
      var on=isDone(id); a.classList.toggle('done',on); if(on) d++;
      var st=a.querySelector('.st'); if(!st){{st=document.createElement('span');st.className='st';a.insertBefore(st,a.querySelector('.go'));}}
      st.textContent=on?'مكتمل':'';
    }});
    var p=IDS.length?Math.round(d/IDS.length*100):0;
    document.getElementById('pfill').style.width=p+'%';
    document.getElementById('ptxt').textContent=d+' / '+IDS.length+' مكتمل';
  }}
  paint();
  document.addEventListener('visibilitychange',function(){{if(!document.hidden)paint();}});
  window.addEventListener('pageshow',paint);'''
        if reset_ids:
            js += '''
  document.getElementById('reset').addEventListener('click',function(){
    if(!confirm('تمسح كل التقدم المحفوظ؟'))return;
    IDS.forEach(function(id){try{localStorage.removeItem('lesson-'+id);localStorage.removeItem('px-'+id);}catch(e){}});
    paint();
  });'''
    body += f'<script>\n(function(){{{js}\n}})();\n</script>\n</body>\n</html>\n'
    return body


def write(path, content):
    full = os.path.join(ROOT, path)
    with io.open(full, 'w', encoding='utf8', newline='\n') as f:
        f.write(content)
    print('wrote', path, len(content))


# ───────────────────────── data ─────────────────────────
L = lambda href, title, desc, icon=None, **k: dict(href=href, title=title, desc=desc, icon=icon, **k)

html_items = [
    L('getting-started.html', 'البداية من الصفر الكامل', 'كيف يعمل الويب؟ ما هو HTML؟ إعداد VS Code خطوة بخطوة'),
    L('html-basics.html', 'أساسيات HTML — كل شيء من الصفر', 'h1–h6، p، strong، em، ul، ol، a، img، Semantic HTML'),
    L('all-html-elements.html', 'موسوعة جميع عناصر HTML', 'كل عنصر بشرح + مثال + بحث فوري — المرجع الدائم'),
    L('html-attributes.html', 'سمات HTML (Attributes) — شرح كل سمة', 'id, class, style, href, src, alt, data-*, السمات العامة'),
    L('html-with-css.html', 'HTML مع CSS — من رمادي لجميل', 'Box Model، Selectors، الألوان، الخطوط، CSS Variables'),
    L('forms-and-validation.html', 'النماذج والتحقق من البيانات', 'form، input، select، textarea، التحقق بـ JS وRegEx'),
    L('seo-for-html.html', 'SEO لـ HTML — تصدّر نتائج البحث', 'meta tags، Open Graph، Twitter Cards، defer/async'),
    L('html-with-javascript.html', 'HTML مع JavaScript — أضف الحياة', 'DOM، تعديل العناصر، الأحداث، إنشاء المحتوى ديناميكياً'),
]
html_special = [
    L('projects.html', 'مشاريع HTML التطبيقية', 'طبّق كل ما تعلمته في مشاريع حقيقية خطوة بخطوة', '🎮', special=True),
    L('../../docs/index.html#/html', 'مرجع HTML الكامل', '258 صفحة بالمصري مع أمثلة تفاعلية لكل عنصر وخاصية', '📚', special=True),
    L('../../docs/index.html#/css', 'مرجع CSS الكامل', '366 صفحة: الخصائص والدوال والـ selectors بأمثلة تجرّبها', '🎨', special=True),
]
html_page = course_page(
    'courses/HTML & CSS/menu.html', 'HTML و CSS من الصفر',
    'مسار HTML و CSS بالعربي: من أول وسم لحد صفحات متجاوبة مع الموبايل، مع أمثلة تفاعلية ومشاريع.',
    [('الرئيسية', '../../index.html'), ('الكورسات', '../menu.html'), ('HTML و CSS', None)],
    'تعلّم HTML و CSS خطوة بخطوة بالعربي، وابنِ صفحات حقيقية من الصفر لحد الاحتراف.',
    [dict(title='الدروس', items=html_items), dict(title='تطبيق ومرجع', items=html_special)])

js_ids = ['js-getting-started', 'js-variables', 'js-loops', 'js-loops-workshop', 'js-functions', 'js-functions-workshop',
          'js-dom-manipulation', 'js-async', 'js-advanced', 'js-database', 'js-revision', 'js-quiz']
js_lessons = [
    L('js-getting-started.html', 'البداية مع JavaScript', 'المتغيرات، أنواع البيانات، console.log — نظرية + تطبيق', id='js-getting-started'),
    L('js-variables.html', 'المتغيرات وأنواع البيانات', 'let و const، الأنواع، دمج النصوص (template literals)', id='js-variables'),
    L('js-loops.html', 'الشروط والحلقات التكرارية', 'if/else, switch, for, while, for...of, for...in', id='js-loops'),
    L('js-loops-workshop.html', 'ورشة المنطق والحلقات', 'بناء نظام جرد ذكي — تطبيق حقيقي بالحلقات والشروط', id='js-loops-workshop'),
    L('js-functions.html', 'إتقان الدوال (Functions Mastery)', 'Declaration, Arrow, Closures, Higher-Order, Proxy API', id='js-functions'),
    L('js-functions-workshop.html', 'ورشة الدوال الشاملة', 'محرك حسابي: دوال + حلقات + شروط مدمجة في مشروع', id='js-functions-workshop'),
    L('js-dom-manipulation.html', 'التحكم في هيكل الصفحة (DOM)', 'اختيار العناصر، تعديل المحتوى، CSS، Events، Delegation', id='js-dom-manipulation'),
    L('js-async.html', 'Async / Await والـ APIs', 'Promises, Fetch, JSON, try/catch, Promise.all', id='js-async'),
    L('js-advanced.html', 'المواضيع المتقدمة', 'ES6+, Classes, OOP, Destructuring, Modules, Proxy', id='js-advanced'),
    L('js-database.html', 'الربط السحابي الشامل', 'Firebase · Supabase · MongoDB · LocalStorage · REST API', id='js-database'),
]
js_special = [
    L('projects.html', 'المشاريع العملية', 'ابنِ مشاريع حقيقية بإيدك خطوة بخطوة، بأسلوب PhineX Lab', '🧪', special=True),
    L('projects/character-card/step1.html', 'مشروع: بطاقة شخصية اللعبة', 'ابنِ المشروع بنفسك في 6 خطوات: let, const, أنواع البيانات، دمج النصوص', '🎮', special=True),
    L('js-revision.html', 'المراجعة الشاملة', 'كل مفاهيم الكورس — مرجعك الدائم مع أكواد كاملة', '📖', special=True, id='js-revision'),
    L('js-quiz.html', 'الاختبار النهائي — 30 سؤال', 'اختبر معرفتك بكل مراحل الكورس مع تقرير مفصل وتصحيح', '🏆', special=True, id='js-quiz'),
]
js_page = course_page(
    'courses/Js/menu.html', 'JavaScript من الصفر للاحتراف',
    'كورس JavaScript بالعربي: من المتغيرات لحد الـ DOM والـ Async والربط بقواعد البيانات.',
    [('الرئيسية', '../../index.html'), ('الكورسات', '../menu.html'), ('JavaScript', None)],
    'اتعلّم لغة الويب الأساسية خطوة بخطوة: دروس + ورش عملية + مشاريع + اختبار نهائي.',
    [dict(title='الدروس بالترتيب', items=js_lessons), dict(title='مشاريع ومراجعة واختبار', items=js_special)],
    progress=str(js_ids), reset_ids=True)

php_ids = ['intro', 'variables', 'operators', 'conditionals', 'loops', 'functions', 'arrays', 'strings', 'oop', 'forms', 'calculator', 'weather', 'review']
php_data = [
    ('lesson-01-intro.html', '🐘', 'مقدمة إلى PHP', 'ما هو PHP ولماذا نتعلمه؟', 'intro'),
    ('lesson-02-variables.html', '📦', 'المتغيرات وأنواع البيانات', 'كيف نخزن البيانات في PHP؟', 'variables'),
    ('lesson-03-operators.html', '➗', 'العمليات والمشغلات (Operators)', 'الحسابية والمقارنة والمنطقية', 'operators'),
    ('lesson-04-conditionals.html', '🔀', 'الجمل الشرطية', 'اتخاذ القرارات في الكود', 'conditionals'),
    ('lesson-05-loops.html', '🔁', 'الحلقات التكرارية', 'تكرار الكود بذكاء', 'loops'),
    ('lesson-06-functions.html', '⚙️', 'الدوال (Functions)', 'كتابة كود قابل لإعادة الاستخدام', 'functions'),
    ('lesson-07-arrays.html', '📚', 'المصفوفات (Arrays)', 'تخزين مجموعات من البيانات', 'arrays'),
    ('lesson-08-strings.html', '✍️', 'السلاسل النصية (Strings)', 'التعامل الاحترافي مع النصوص', 'strings'),
    ('lesson-09-oop.html', '🏗️', 'البرمجة كائنية التوجه (OOP)', 'Classes, Objects & Inheritance', 'oop'),
    ('lesson-10-forms.html', '📝', 'النماذج ومدخلات المستخدم', '$_GET و $_POST والتحقق من البيانات', 'forms'),
    ('lesson-11-calculator.html', '🧮', 'مشروع: آلة حاسبة PHP', 'تطبيق عملي شامل', 'calculator'),
    ('lesson-12-weather.html', '🌤️', 'مشروع: تطبيق الطقس', 'API Requests و JSON في PHP', 'weather'),
    ('lesson-13-review.html', '🏆', 'مراجعة شاملة واختبار نهائي', 'تقييم شامل لكل ما تعلمته', 'review'),
]
php_items = []
for href, ic, t, d, i in php_data:
    soon = not os.path.exists(os.path.join(ROOT, 'courses/php-course', href))
    php_items.append(L(href, t, d, None, id=i, soon=soon))
php_page = course_page(
    'courses/php-course/index.html', 'دورة PHP الشاملة',
    'كورس PHP بالعربي: من المقدمة والمتغيرات لحد الـ OOP والنماذج ومشاريع عملية.',
    [('الرئيسية', '../../index.html'), ('الكورسات', '../menu.html'), ('PHP', None)],
    'من الأساسيات لحد البرمجة كائنية التوجه والتعامل مع النماذج والـ APIs.',
    [dict(title='الدروس بالترتيب', items=php_items),
     dict(title='مشاريع تطبيقية', items=[L('projects.html', 'مشروع: نموذج تسجيل الدخول', 'ابنِ نموذج تسجيل دخول كامل خطوة بخطوة', '🔐', special=True)])],
    progress=str(php_ids), reset_ids=True)

py_page = course_page(
    'courses/Python/menu.html', 'Python من الصفر',
    'كورس بايثون بالعربي — الكود بيشتغل فعلاً جوه المتصفح.',
    [('الرئيسية', '../../index.html'), ('الكورسات', '../menu.html'), ('Python', None)],
    'بايثون حقيقية شغّالة جوه المتصفح: جرّب الكود واشوف النتيجة فوراً، من غير ما تنزّل حاجة.',
    [dict(title='الدروس', items=[
        L('getting-started.html', 'البداية مع بايثون', 'المتغيرات، أنواع البيانات، العمليات الحسابية، f-strings — 9 خطوات تفاعلية', None, id='py-getting-started', badge='جديد')])],
    progress=str(['py-getting-started']))
rc_page = course_page(
    'courses/React/menu.html', 'React من الصفر',
    'كورس React بالعربي — مكوّنات حقيقية بتشتغل جوه المتصفح.',
    [('الرئيسية', '../../index.html'), ('الكورسات', '../menu.html'), ('React', None)],
    'JSX ومكوّنات (components) وحالة (state) بتشتغل فعلاً جوه المتصفح، مش أمثلة نظرية.',
    [dict(title='الدروس', items=[
        L('getting-started.html', 'البداية مع React', 'JSX، المكونات، Props، الحالة (State)، الأحداث، القوائم — 9 خطوات تفاعلية', None, id='rc-getting-started', badge='جديد')])],
    progress=str(['rc-getting-started']))

tw_page = course_page(
    'courses/Tailwind CSS/menu.html', 'Tailwind CSS من الصفر',
    'كورس Tailwind CSS بالعربي: 15 درس، ورش عملية، مراجعة شاملة واختبار.',
    [('الرئيسية', '../../index.html'), ('الكورسات', '../menu.html'), ('Tailwind CSS', None)],
    'أسرع طريقة لتصميم مواقع احترافية: من مقدمة الـ utilities لحد الـ 3D Transforms والـ Custom Plugins.',
    [dict(title='ابدأ من هنا', items=[
        L('lessons.html', 'الدروس', '15 درس من مقدمة Tailwind لحد الـ 3D Transforms والـ Custom Plugins', '📘'),
        L('projects.html', 'الورش العملية', '5 مشاريع حقيقية — بناء بطاقات، Dashboard، Landing Page وأكتر', '🛠️'),
        L('revision.html', 'المراجعة الشاملة', 'Cheatsheet كامل لكل الـ utilities مع أمثلة — خليه مفتوح وأنت بتشتغل', '📋'),
        L('quiz.html', 'اختبر نفسك', '25 سؤال بـ Timer وشرح الإجابة الصح — تعرف مستواك فين', '🏆')])],
    search=False)

# ── main courses menu ──
def ccard(href, ico, cls, title, level, desc, meta):
    m = ''.join(f'<span>{e(x)}</span>' for x in meta)
    return (f'<a class="ccard" href="{href}" data-search="{e((title + " " + desc).lower())}"><div class="c-top"><span class="c-ico {cls}">{ico}</span><div><h3 class="c-title">{e(title)}</h3><span class="c-level">{e(level)}</span></div></div>'
            f'<div class="c-body"><p class="c-desc">{e(desc)}</p></div><div class="c-meta">{m}</div>'
            f'<div class="c-foot"><span class="c-free">مجاني</span><span class="c-go">ادخل الكورس {ARROW}</span></div></a>')

cards = [
    ccard('HTML & CSS/menu.html', '&lt;/&gt;', 'html', 'HTML و CSS', 'مبتدئ', 'ابدأ بناء صفحات الويب من الأساسيات لحد Flexbox و Grid والتصميم المتجاوب.', ['9 دروس', 'Forms', 'Flexbox', 'Grid']),
    ccard('Js/menu.html', 'JS', 'js', 'JavaScript', 'مبتدئ', 'لغة الويب الأساسية: المتغيرات، الدوال، الـ DOM، الأحداث والـ Fetch API.', ['12 درس', 'DOM', 'Async', 'APIs']),
    ccard('Tailwind CSS/menu.html', 'TW', 'tw', 'Tailwind CSS', 'مبتدئ', 'أسرع طريقة لتصميم مواقع احترافية بالـ utilities، من الـ Animations لحد الـ 3D.', ['15 درس', 'Utilities', 'Dark Mode']),
    ccard('php-course/index.html', 'PHP', 'php', 'PHP', 'مبتدئ · جديد', 'لغة سيرفر واسعة الانتشار: من المتغيرات لحد الـ OOP والنماذج والـ APIs.', ['13 درس', 'OOP', 'Forms']),
    ccard('Python/menu.html', 'PY', 'py', 'Python', 'مبتدئ · جديد', 'بايثون حقيقية شغّالة جوه المتصفح: المتغيرات، الأنواع، f-strings.', ['درس تفاعلي', 'Real Execution']),
    ccard('React/menu.html', 'RE', 'rc', 'React', 'متوسط · جديد', 'JSX ومكوّنات بتشتغل فعلاً جوه المتصفح: Props وState والأحداث.', ['درس تفاعلي', 'JSX', 'State']),
]
main = head('قائمة الكورسات', 'كل كورسات PhineX Academy: HTML و CSS و JavaScript و Tailwind و PHP و Python و React بالعربي.', '../') + bar('../', 'courses')
main += f'''<header class="page-head">
  <div class="wrap">
    {crumbs([('الرئيسية', '../index.html'), ('الكورسات', None)])}
    <h1>قائمة الكورسات</h1>
    <p>تعلّم برمجة الويب من الصفر لحد الاحتراف، بالعربي وبالمصري. اختار كورس وابدأ.</p>
    <div class="stats4">
      <div class="stat"><b>6</b><span>كورسات متاحة</span></div>
      <div class="stat"><b>80+</b><span>صفحة تعليمية</span></div>
      <div class="stat"><b>624</b><span>صفحة في المرجع</span></div>
      <div class="stat"><b>100%</b><span>مجاني</span></div>
    </div>
  </div>
</header>
<main id="main" class="wrap" style="padding:8px 0 56px">
  <div class="search">{SEARCH}<input id="q" type="search" placeholder="ابحث عن كورس أو موضوع…" aria-label="بحث في الكورسات" autocomplete="off"></div>
  <div class="grid g3" id="grid">
    {chr(10).join('    ' + c for c in cards)}
  </div>
  <p class="empty" id="empty">مفيش نتائج لبحثك. جرّب كلمة تانية.</p>
  <h2 class="group-title" style="margin-top:36px">مرجع سريع</h2>
  <div class="grid g2">
    <a class="ccard" href="../docs/index.html#/html"><div class="c-top"><span class="c-ico html">HTML</span><div><h3 class="c-title">مرجع HTML</h3><span class="c-level">258 عنصر وخاصية</span></div></div><div class="c-body"><p class="c-desc">كل عنصر وخاصية بالمصري مع أمثلة تفاعلية.</p></div><div class="c-foot"><span class="c-free">مجاني</span><span class="c-go">افتح المرجع {ARROW}</span></div></a>
    <a class="ccard" href="../docs/index.html#/css"><div class="c-top"><span class="c-ico tw">CSS</span><div><h3 class="c-title">مرجع CSS</h3><span class="c-level">366 صفحة</span></div></div><div class="c-body"><p class="c-desc">الخصائص والدوال والـ selectors وقواعد @ بأمثلة تجرّبها.</p></div><div class="c-foot"><span class="c-free">مجاني</span><span class="c-go">افتح المرجع {ARROW}</span></div></a>
  </div>
</main>
{foot('../')}<script>
(function(){{
  var q=document.getElementById('q'),empty=document.getElementById('empty');
  q.addEventListener('input',function(){{
    var t=q.value.trim().toLowerCase(),n=0;
    document.querySelectorAll('#grid .ccard').forEach(function(a){{var s=!t||(a.getAttribute('data-search')||'').indexOf(t)>-1;a.style.display=s?'':'none';if(s)n++;}});
    empty.style.display=n?'none':'block';
  }});
}})();
</script>
</body>
</html>
'''

write('courses/menu.html', main)
write('courses/HTML & CSS/menu.html', html_page)
write('courses/HTML & CSS/html-menu.html', html_page)
write('courses/Js/menu.html', js_page)
write('courses/php-course/index.html', php_page)
write('courses/Python/menu.html', py_page)
write('courses/React/menu.html', rc_page)
write('courses/Tailwind CSS/menu.html', tw_page)
