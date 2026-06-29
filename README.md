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

## Конверсии для Яндекс Директа и amoCRM

Сайт передает в заявку рекламную атрибуцию: `yandexClientId`, `yandexMetrikaId`, `_ym_uid`, UTM-метки, `yclid`, `gclid`, `fbclid`, referrer и страницу заявки. Для встроенной отправки в amoCRM Forms сайт тихо инициализирует официальный amoCRM Forms transport/GSO, отправляет `lead.custom_fields_values` и добавляет `gso_session_uid` в `queue/add`; это нужно, чтобы системные поля сделки amoCRM (`_ym_uid`, `_ym_counter`, `yclid`, `utm_*`, `gclid`, `fbclid`, `referrer`) реально заполнялись, а не оставались только в примечании. Если используется `data-lead-endpoint`, endpoint получит эти поля в JSON payload.

WhatsApp-ссылки автоматически получают текст с текущей страницей, UTM/click ID и `Metrika ClientID`. Это нужно, чтобы менеджер или интеграция amoCRM могли сохранить идентификатор в сделку, если лид пришел через WhatsApp.

Найденные системные поля сделки amoCRM для текущего аккаунта:

- `_ym_uid`: `984895`
- `_ym_counter`: `984897`
- `yclid`: `984901`
- `utm_source`: `984873`, `utm_medium`: `984869`, `utm_campaign`: `984871`, `utm_content`: `984867`, `utm_term`: `984875`

Рекомендуемая настройка в amoCRM и Метрике:

- Сопоставить статусы сделок с целями Метрики: `Новая заявка`, `Квалифицированный лид / целевой диалог`, `Успешная сделка`.
- В Директе оптимизироваться на самую качественную цель, которая набирает от 10 конверсий в неделю; если продаж меньше, временно использовать `Квалифицированный лид`.
