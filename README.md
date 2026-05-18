# Kean Limassol landing

Статический многостраничный сайт для lead generation по проекту Kean Limassol.

## Что внутри

- `index.html` - главная посадочная страница.
- `blog/*.html` - SEO-статьи под запросы про недвижимость Лимассола, beachfront property, ПМЖ Кипра, non-dom, IP Box и переезд.
- `llms.txt` - краткие факты для AI-поиска и ассистентов.
- `robots.txt` и `sitemap.xml` - базовая индексация.
- `script.js` - меню и обработка формы.
- `assets/` - локально сохраненные визуальные материалы Kean.

## Домен

Боевой домен настроен в SEO-разметке, `robots.txt`, `sitemap.xml` и `llms.txt` как `https://kean.city`.

Для боевой формы укажите endpoint в `index.html`:

```html
<body data-lead-endpoint="https://your-crm-endpoint.example/leads">
```

Если endpoint не указан, заявки сохраняются в `localStorage` браузера для локального теста.
