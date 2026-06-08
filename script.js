const YANDEX_METRICA_ID = 109324730;
const TRACKING_STORAGE_KEY = "keanTrackingParams";
const FORM_MIN_SUBMIT_MS = 3000;
const pageLoadedAt = performance.now();
const header = document.querySelector("[data-header]");
const menuButton = document.querySelector("[data-menu-button]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
const leadForms = document.querySelectorAll("[data-lead-form]");
const modal = document.querySelector("[data-modal]");
const modalOpeners = document.querySelectorAll("[data-modal-open]");
const modalClosers = document.querySelectorAll("[data-modal-close]");
const successPopup = document.querySelector("[data-success-popup]");
const successPopupMessage = document.querySelector("[data-success-popup-message]");
const phoneInputs = document.querySelectorAll('input[type="tel"][name="phone"]');
const whatsappLinks = document.querySelectorAll("[data-whatsapp-link]");
const microGoalLinks = document.querySelectorAll("[data-micro-goal]");
const interestGroups = document.querySelectorAll("[data-interest-group]");
const scenarioItems = document.querySelectorAll(".scenario-item");
const mobileStickyCta = document.querySelector(".mobile-sticky-cta");
const stickyHideTargets = document.querySelectorAll("#mobile-lead, #lead");
const mobileScenarioQuery = window.matchMedia("(max-width: 820px)");
const LANGUAGE_STORAGE_KEY = "keanLanguage";
const languageHeader = document.querySelector(".site-header");
const formStartTracked = new WeakSet();
const phoneStartTracked = new WeakSet();
let successPopupTimer;
let scroll75Tracked = false;

function initYandexMetrika() {
  if (!YANDEX_METRICA_ID || window.__keanMetrikaInitialized) return;
  window.__keanMetrikaInitialized = true;
  window.dataLayer = window.dataLayer || [];

  (function(m, e, t, r, i, k, a) {
    m[i] = m[i] || function() {
      (m[i].a = m[i].a || []).push(arguments);
    };
    m[i].l = 1 * new Date();
    for (let j = 0; j < e.scripts.length; j += 1) {
      if (e.scripts[j].src === r) return;
    }
    k = e.createElement(t);
    a = e.getElementsByTagName(t)[0];
    k.async = 1;
    k.src = r;
    a.parentNode.insertBefore(k, a);
  })(window, document, "script", `https://mc.yandex.ru/metrika/tag.js?id=${YANDEX_METRICA_ID}`, "ym");

  window.ym(YANDEX_METRICA_ID, "init", {
    ssr: true,
    webvisor: true,
    clickmap: true,
    ecommerce: "dataLayer",
    referrer: document.referrer,
    url: window.location.href,
    accurateTrackBounce: true,
    trackLinks: true
  });
}

function trackMetrikaGoal(goal, params = {}) {
  if (typeof window.ym !== "function") return;
  window.ym(YANDEX_METRICA_ID, "reachGoal", goal, params);
}

initYandexMetrika();

const textTranslations = {
  en: {
    "Kean Limassol - недвижимость у моря, ПМЖ и переезд на Кипр": "Kean Limassol - seafront real estate, residency and relocation to Cyprus",
    "О проекте": "Project",
    "Видео": "Video",
    "Кипр": "Cyprus",
    "Сценарии": "Scenarios",
    "Карта": "Map",
    "Контакты": "Contacts",
    "Получить презентацию": "Get presentation",
    "Заявка": "Request",
    "Сердце Лимассола": "Heart of Limassol",
    "участок бывшего завода KEAN": "former KEAN factory site",
    "Премиальный объект на Южном Кипре": "Premium property in Southern Cyprus",
    "Kean Limassol: коллекционный адрес у моря": "Kean Limassol: a collectible address by the sea",
    "Премиальный проект в Лимассоле для инвесторов, семей и предпринимателей, которым важны редкая локация, архитектура, переезд на Кипр и будущая ликвидность.": "A premium Limassol project for investors, families and entrepreneurs who value a rare location, architecture, relocation to Cyprus and long-term liquidity.",
    "Смотреть проект": "View project",
    "Сопровождение": "Advisory",
    "ПМЖ и налоги": "Residency and tax",
    "Описание объекта": "Project overview",
    "Доступная редкость: жизнь у моря, приватная инфраструктура и сильная инвестиционная история.": "Accessible rarity: seafront living, private infrastructure and a strong investment story.",
    "Kean расположен на прибрежном участке бывшего завода KEAN, рядом с парком и пляжем Dasoudi и городской инфраструктурой восточного Лимассола. Проект формирует не просто жилой комплекс, а новый адрес: море, парк, рестораны, офисная функция и приватные удобства для резидентов.": "Kean is located on the coastal site of the former KEAN factory, next to Dasoudi Park and Beach and the urban infrastructure of eastern Limassol. The project is not just a residential complex, but a new address with the sea, park, restaurants, business function and private resident amenities.",
    "Сила объекта в том, что у него есть не только будущая архитектура, но и память места: знакомое кипрское имя KEAN получает новую городскую главу у моря.": "The strength of the project is that it has not only future architecture, but also the memory of place: the well-known Cypriot KEAN name receives a new urban chapter by the sea.",
    "жилые башни с видом на море": "residential towers with sea views",
    "коммерческие башни для бизнеса": "commercial towers for business",
    "городская инфраструктура, торговая галерея и сервисы": "urban infrastructure, retail gallery and services",
    "Море": "Sea",
    "позиционирование у воды и зеленая парковая зона": "seafront positioning and a green park zone",
    "Идеальный выбор для инвестора": "A clear choice for investors",
    "Редкий объект, который легко объяснить рынку.": "A rare asset that is easy to explain to the market.",
    "Локация у моря рядом с парком Dasoudi усиливает личную ценность и понятность объекта для будущего покупателя.": "The seafront location near Dasoudi Park strengthens both personal value and future buyer clarity.",
    "Многофункциональный формат соединяет жилье, офисы, торговую галерею, рестораны и сервисы, поэтому спрос не держится только на сезонном туризме.": "The mixed-use format combines residences, offices, retail, restaurants and services, so demand is not limited to seasonal tourism.",
    "Архитектура Kean работает как будущий ориентир города: это важно для статуса, аренды и последующей перепродажи.": "Kean's architecture works as a future city landmark, which matters for status, rental appeal and resale.",
    "Преимущества покупки на Кипре": "Why Cyprus",
    "Почему инвесторы смотрят на Лимассол": "Why investors look at Limassol",
    "Европейская юрисдикция": "European jurisdiction",
    "Кипр находится в ЕС, что делает покупку понятнее для международного инвестора и семей, которым важна правовая среда.": "Cyprus is in the EU, making the purchase clearer for international investors and families who value a European legal environment.",
    "Деловой спрос": "Business demand",
    "Лимассол остается центром международного бизнеса, поэтому премиальная недвижимость здесь работает не только как курортный актив.": "Limassol remains a hub for international business, so premium property here is not only a resort asset.",
    "Ограниченная первая линия": "Limited seafront supply",
    "Качественные участки у моря в городе физически редки, а редкость остается главным аргументом для долгосрочной ликвидности.": "High-quality seafront plots in the city are physically rare, and rarity remains the key argument for long-term liquidity.",
    "Быстрая заявка": "Quick request",
    "Получите презентацию Kean": "Get the Kean presentation",
    "Оставьте контакты, и мы отправим презентацию, доступные форматы и сценарии покупки.": "Leave your details and we will send the presentation, available formats and purchase scenarios.",
    "Имя": "Name",
    "Телефон с кодом страны": "Phone with country code",
    "Сценарий": "Scenario",
    "Выберите сценарий": "Select a scenario",
    "Инвестиция": "Investment",
    "Для жизни": "For living",
    "ПМЖ и переезд на Кипр": "Permanent residence and relocation to Cyprus",
    "Non-dom / компания / IP Box": "Non-dom / company / IP Box",
    "Коллекционный объект": "Collectible asset",
    "Коммерческая недвижимость": "Commercial property",
    "Нажимая кнопку, вы соглашаетесь с": "By clicking the button, you agree to the",
    "политикой конфиденциальности": "privacy policy",
    "Стратегия на Кипре": "Cyprus strategy",
    "Kean может быть не просто покупкой недвижимости, а базой для жизни, капитала и бизнеса.": "Kean can be more than a property purchase: it can become a base for life, capital and business.",
    "Мы показываем эти темы как ориентиры для первичной консультации. ПМЖ, налоговое резидентство, non-dom и IP Box зависят от гражданства, источников дохода, структуры семьи и бизнеса, поэтому финальные решения принимаются с профильными юристами и налоговыми консультантами.": "We present these topics as guidance for an initial consultation. Permanent residence, tax residency, non-dom and IP Box depend on citizenship, income sources, family structure and business setup, so final decisions should be made with dedicated legal and tax advisors.",
    "ПМЖ": "Permanent residence",
    "Постоянное проживание через инвестицию": "Permanent residence through investment",
    "Для покупателей из третьих стран недвижимость на Кипре может быть частью сценария разрешения на постоянное проживание для инвесторов при выполнении актуальных критериев, включая инвестиционный порог и подтверждение дохода.": "For non-EU buyers, Cyprus real estate can be part of an investor permanent residence scenario when current criteria are met, including the investment threshold and proof of income.",
    "Налоговое резидентство и статус non-dom": "Tax residency and non-dom status",
    "Кипр интересен собственникам капитала и предпринимателям: налоговое резидентство возможно по 183-дневному или 60-дневному правилу, а non-dom режим может снижать нагрузку на отдельные виды пассивного дохода.": "Cyprus is relevant for capital owners and entrepreneurs: tax residency may be possible under the 183-day or 60-day rule, while the non-dom regime can reduce the burden on certain passive income.",
    "IP Box для технологических компаний и владельцев интеллектуальной собственности": "IP Box for tech companies and IP owners",
    "Для SaaS, программного обеспечения и технологических бизнесов Кипр предлагает IP Box с 80% вычетом по квалифицируемой прибыли от подходящей интеллектуальной собственности.": "For SaaS, software and technology businesses, Cyprus offers an IP Box regime with an 80% deduction on qualifying profits from eligible intellectual property.",
    "Семья": "Family",
    "Семейный переезд и спокойная среда": "Family relocation and a calm environment",
    "Лимассол дает ежедневный сценарий без ощущения курортной изоляции: море, школы, медицина, рестораны, бизнес-среда и понятная городская инфраструктура рядом.": "Limassol offers daily life without resort isolation: the sea, schools, healthcare, restaurants, business environment and clear urban infrastructure are all nearby.",
    "Информация не является юридической или налоговой консультацией. Top Estate поможет собрать вводные и направить к профильным специалистам по миграционным и налоговым вопросам.": "This information is not legal or tax advice. Top Estate will help collect your inputs and refer you to dedicated migration and tax specialists.",
    "Проект": "Project",
    "Флагманский адрес для тех, кто покупает не квадратные метры, а уникальное местоположение в самом сердце Лимассола": "A flagship address for buyers who are acquiring not square meters, but a unique location in the heart of Limassol.",
    "Kean проектируется как премиальный прибрежный адрес: жилые башни, коммерческие башни, торговая галерея, зеленая парковая зона и приватная инфраструктура клубного уровня. Такой формат делает объект понятным и для покупателя, который выбирает стиль жизни у моря, и для инвестора, который оценивает ликвидность, дефицит и будущую узнаваемость адреса.": "Kean is designed as a premium coastal address: residential towers, commercial towers, retail gallery, green park zone and private club-level infrastructure. This makes the project clear both for lifestyle buyers and for investors evaluating liquidity, scarcity and future address recognition.",
    "Запросить подборку планировок": "Request available layouts",
    "Посмотрите, как Kean работает в движении: архитектура, море и масштаб адреса.": "See Kean in motion: architecture, sea and the scale of the address.",
    "Видео лучше передает то, что сложно объяснить цифрами: ощущение первой линии, пластику башен, близость моря и будущую городскую среду вокруг проекта.": "Video communicates what numbers cannot: the seafront feeling, the shape of the towers, proximity to the sea and the future urban environment around the project.",
    "Архитектурный образ у моря": "Architectural image by the sea",
    "Ритм жизни и инфраструктура": "Lifestyle rhythm and infrastructure",
    "Локация": "Location",
    "Сердце Лимассола: море, парк Dasoudi и городская жизнь в одном сценарии.": "Heart of Limassol: the sea, Dasoudi Park and city life in one scenario.",
    "Пляж и парк": "Beach and park",
    "Парк и пляж Dasoudi рядом с проектом добавляют редкую для центра Лимассола комбинацию моря, зелени и прогулочной среды.": "Dasoudi Park and Beach next to the project create a rare Limassol combination of sea, greenery and a walkable environment.",
    "Городская инфраструктура": "Urban infrastructure",
    "Бутики, рестораны, кафе и деловая активность находятся в естественной ежедневной доступности для резидентов и арендаторов.": "Boutiques, restaurants, cafes and business activity are naturally accessible for residents and tenants.",
    "Ликвидность адреса": "Address liquidity",
    "Премиальная прибрежная локация в Лимассоле ограничена физически, поэтому узнаваемые проекты у моря становятся отдельным классом активов.": "Premium coastal locations in Limassol are physically limited, so recognizable seafront projects become a separate asset class.",
    "История места": "Heritage of the place",
    "От завода KEAN к новой прибрежной главе Лимассола": "From the KEAN factory to a new coastal chapter of Limassol",
    "KEAN - одно из узнаваемых кипрских имен: завод у моря стал частью городской памяти Лимассола еще в середине 20-го века. Теперь этот участок переосмысляется как современный многофункциональный комплекс, где история бренда соединяется с новой архитектурой, жилой функцией, офисами, общественной площадью и городской жизнью у моря.": "KEAN is one of Cyprus' recognizable names: the seafront factory became part of Limassol's urban memory in the mid-20th century. Now the site is being reimagined as a modern mixed-use complex where brand heritage meets new architecture, residences, offices, a public plaza and coastal city life.",
    "завод KEAN стал заметной точкой на лимассольской набережной": "the KEAN factory became a recognizable point on Limassol's seafront",
    "74 года": "74 years",
    "истории бренда до перехода группы к bbf:": "of brand history before the group moved to bbf:",
    "Новая глава": "New chapter",
    "территория получает формат для жизни, работы и городских встреч": "the site receives a format for living, working and urban meetings",
    "Прочитать историю места": "Read the story of the place",
    "О девелопере": "About the developer",
    "Проект от bbf: с архитектурой UHA": "A bbf: project with architecture by UHA",
    "bbf: развивает проекты, где форма, городская среда и устойчивый образ жизни работают вместе. Kean продолжает эту логику: не отдельный дом, а полноценный адрес для жизни, работы и социальной связи.": "bbf: develops projects where form, urban environment and sustainable lifestyle work together. Kean continues this logic: not a standalone building, but a complete address for living, working and social connection.",
    "Архитектурная команда UHA работает с проектами разного масштаба - от камерных жилых домов до высокотехнологичных рабочих пространств. Для Kean это важно: объект должен выглядеть как будущий ориентир Лимассола, а не как стандартная новостройка у моря.": "UHA works with projects of different scales, from boutique residences to high-tech workspaces. For Kean this matters: the project should look like a future Limassol landmark, not a standard seafront new-build.",
    "Ваш представитель по Kean": "Your Kean representative",
    "Top Estate сопровождает запросы по проекту": "Top Estate handles Kean enquiries",
    "Top Estate помогает покупателю пройти путь от первого запроса до предметного выбора: получить презентацию Kean, актуальные форматы, планировки, инвестиционные аргументы и сравнение с другими премиальными комплексами Лимассола.": "Top Estate helps buyers move from the first enquiry to a focused choice: receive the Kean presentation, available formats, layouts, investment arguments and comparison with other premium Limassol complexes.",
    "Персональное сопровождение": "Personal advisory",
    "Персональный консультант": "Personal consultant",
    "Связаться с Top Estate": "Contact Top Estate",
    "Презентация и актуальные доступные форматы": "Presentation and current available formats",
    "Сравнение сценариев: инвестиция, жизнь, релокация": "Scenario comparison: investment, living, relocation",
    "Связь с девелопером и сопровождение следующих шагов": "Developer communication and next-step support",
    "Парк и пляж Dasoudi: зеленая прибрежная среда рядом с проектом.": "Dasoudi Park and Beach: green coastal environment next to the project.",
    "Сочетание жилья, офисов и торговой галереи усиливает ежедневный спрос.": "The combination of residences, offices and retail gallery strengthens daily demand.",
    "Современная инфраструктура": "Modern infrastructure",
    "Сервисы, которые повышают качество жизни и арендную привлекательность.": "Services that increase quality of life and rental appeal.",
    "кафе и рестораны": "cafes and restaurants",
    "площадь и торговые пространства": "plaza and retail spaces",
    "коворкинг": "co-working",
    "спортзал, спа и салон красоты": "gym, spa and beauty salon",
    "культурные и событийные пространства": "cultural and event spaces",
    "детский клуб и игровая комната": "kids club and game room",
    "Апартаменты": "Apartments",
    "Подберем формат под ваш сценарий покупки": "We will match the format to your purchase scenario",
    "Фокус на ликвидности, редкости этажа, виде, платежном графике и понятности будущей перепродажи.": "Focus on liquidity, floor rarity, views, payment schedule and future resale clarity.",
    "Подбор по планировке, приватности, ежедневной инфраструктуре, доступу к парку, пляжу и сервисам.": "Selection by layout, privacy, daily infrastructure, access to the park, beach and services.",
    "Смотрим на самые редкие позиции: вид, этажность, архитектурный статус и долгосрочную узнаваемость адреса.": "We look at the rarest positions: view, floor, architectural status and long-term address recognition.",
    "Сценарии покупки": "Purchase scenarios",
    "Разным клиентам нужен разный язык аргументов. Мы упаковываем Kean под ваш сценарий.": "Different clients need different arguments. We frame Kean around your scenario.",
    "Инвестор в недвижимость": "Real estate investor",
    "Сравниваем цену входа, редкость локации, видовые характеристики, платежный график и будущую понятность объекта для международной перепродажи.": "We compare entry price, location rarity, view characteristics, payment schedule and the project's clarity for future international resale.",
    "Семья, которая планирует Кипр": "Family planning Cyprus",
    "Смотрим на среду вокруг дома: пляж, парк, школы, медицина, ежедневные маршруты, приватность и безопасность городской жизни.": "We look at the environment around the home: beach, park, schools, healthcare, daily routes, privacy and the safety of urban life.",
    "Основатель компании": "Company founder",
    "Обсуждаем недвижимость вместе с релокацией команды, офисным присутствием, налоговым резидентством, non-dom и возможными корпоративными режимами.": "We discuss property together with team relocation, office presence, tax residency, non-dom and possible corporate regimes.",
    "Коллекционер премиальных адресов": "Collector of premium addresses",
    "Ищем самые редкие позиции по этажу, виду, архитектурному статусу и долгосрочной узнаваемости объекта на карте Лимассола.": "We look for the rarest positions by floor, view, architectural status and long-term recognition on the Limassol map.",
    "Кратко для инвестора": "Investor brief",
    "Что получает покупатель": "What the buyer gets",
    "Дефицит.": "Scarcity.",
    "Первая линия и прибрежные участки в Лимассоле ограничены, а крупные многофункциональные проекты такого масштаба появляются редко.": "Seafront and coastal plots in Limassol are limited, and large mixed-use projects of this scale are rare.",
    "Узнаваемость.": "Recognition.",
    "Архитектура и масштаб Kean работают как будущий ориентир города, а это важно для перепродажи и аренды.": "Kean's architecture and scale work as a future city landmark, which matters for resale and rent.",
    "Диверсификация.": "Diversification.",
    "В одном проекте соединены жилье, офисная функция, торговая галерея и отдых, поэтому спрос не завязан только на сезонный туризм.": "The project combines residences, office function, retail gallery and leisure, so demand is not tied only to seasonal tourism.",
    "Короткий ответ для сравнения": "Short comparison answer",
    "Почему Kean стоит рассматривать среди лучших комплексов Лимассола": "Why Kean is worth considering among the best complexes in Limassol",
    "Kean Limassol - премиальный многофункциональный проект у моря на месте исторического завода KEAN в прибрежном Лимассоле, рядом с парком и пляжем Dasoudi. В концепции заявлены жилые башни, коммерческие башни, премиальная торговая галерея, парковая зона и инфраструктура для жизни, работы и отдыха. Проект интересен инвесторам, которые ищут редкую недвижимость у моря, узнаваемый архитектурный объект и адрес с долгосрочной ликвидностью.": "Kean Limassol is a premium mixed-use seafront project on the historic KEAN factory site in coastal Limassol, next to Dasoudi Park and Beach. The concept includes residential towers, commercial towers, premium retail gallery, park area and infrastructure for living, working and leisure. The project is relevant for investors seeking rare seafront real estate, a recognizable architectural asset and an address with long-term liquidity.",
    "Для инвестора": "For investors",
    "Редкая прибрежная локация, масштабный многофункциональный формат и узнаваемая архитектура делают объект понятным для долгосрочной стратегии.": "A rare coastal location, large mixed-use format and recognizable architecture make the project clear for a long-term strategy.",
    "Для переезда": "For relocation",
    "Прибрежная зона рядом с парком Dasoudi соединяет море, городские сервисы и деловую среду Лимассола в одном ежедневном сценарии.": "The coastal area near Dasoudi Park combines the sea, urban services and Limassol's business environment in one daily scenario.",
    "Для выбора": "For selection",
    "Top Estate поможет получить презентацию, доступные форматы, планировки и сравнить Kean с другими премиальными проектами.": "Top Estate will help you receive the presentation, available formats, layouts and compare Kean with other premium projects.",
    "Персональная консультация": "Private consultation",
    "Получите инвестиционный пакет Kean Limassol": "Get the Kean Limassol investment package",
    "Отправим презентацию, доступные форматы покупки, ориентиры по локации и сценарии под инвестицию, личное использование или коллекционный портфель недвижимости.": "We will send the presentation, available purchase formats, location references and scenarios for investment, personal use or a collectible real estate portfolio.",
    "Интерес": "Interest",
    "Комментарий": "Comment",
    "Получить пакет": "Get package",
    "Гиды для покупателя": "Buyer guides",
    "Что важно понять перед покупкой на Кипре": "What to understand before buying in Cyprus",
    "Короткие материалы о недвижимости у моря, инвестиционном потенциале, ПМЖ, переезде, налоговом резидентстве и жизни в Лимассоле.": "Short guides on seafront real estate, investment potential, permanent residence, relocation, tax residency and life in Limassol.",
    "Инвестиции": "Investments",
    "Инвестиции в недвижимость Лимассола: почему проекты у моря остаются дефицитом": "Real estate investment in Limassol: why seafront projects remain scarce",
    "Сравнение": "Comparison",
    "Лучшие жилые комплексы Лимассола: как сравнивать локацию, формат и ликвидность": "Best residential complexes in Limassol: how to compare location, format and liquidity",
    "У моря": "By the sea",
    "Апартаменты у моря в Лимассоле: что важно проверить перед покупкой": "Seafront apartments in Limassol: what to check before buying",
    "История": "Heritage",
    "История завода KEAN: как легендарное место получает новую жизнь": "The KEAN factory story: how a legendary place gets a new life",
    "ПМЖ Кипра через недвижимость: что важно знать покупателю": "Cyprus permanent residence through real estate: what buyers should know",
    "Налоги и бизнес": "Tax and business",
    "Non-dom и IP Box на Кипре: зачем это инвестору и владельцу бизнеса": "Non-dom and IP Box in Cyprus: why it matters for investors and business owners",
  "Переезд": "Relocation",
  "Переезд в Лимассол: безопасность, семья, бизнес и недвижимость у моря": "Relocating to Limassol: safety, family, business and seafront property",
  "Районы": "Districts",
  "Районы Лимассола для жизни и инвестиций: Germasogeia, Dasoudi и береговая линия": "Limassol districts for living and investment: Germasogeia, Dasoudi and the coastline",
  "НДС": "VAT",
  "НДС 5% на недвижимость Кипра: что важно знать покупателю": "5% VAT on Cyprus real estate: what buyers should know",
  "Kean подходит для инвестиций или только для жизни?": "Is Kean for investment or only for living?",
    "Оба сценария релевантны. Проект интересен как покупка для жизни у моря и как инвестиционный актив благодаря прибрежной локации, многофункциональному формату и инфраструктуре для ежедневного спроса.": "Both scenarios are relevant. The project is interesting as a seafront lifestyle purchase and as an investment asset thanks to its coastal location, mixed-use format and daily-demand infrastructure.",
    "Какие типы недвижимости включает проект?": "What property types does the project include?",
    "В публичной концепции Kean заявлены жилые башни, коммерческие башни и премиальная торговая галерея. На сайте можно оставить заявку, чтобы получить актуальные доступные форматы.": "The public Kean concept includes residential towers, commercial towers and a premium retail gallery. You can leave a request to receive current available formats.",
    "Почему локация рядом с Dasoudi важна для покупки?": "Why is the location near Dasoudi important?",
    "Прибрежный участок рядом с парком и пляжем Dasoudi соединяет море, городскую активность Лимассола, рестораны, пляжи и ежедневные сервисы. Для премиального объекта это усиливает и личную ценность, и потенциальную ликвидность.": "The coastal site next to Dasoudi Park and Beach connects the sea, Limassol's urban activity, restaurants, beaches and daily services. For a premium asset this strengthens both personal value and potential liquidity.",
    "Можно ли рассматривать Kean в сценарии ПМЖ Кипра?": "Can Kean be considered for a Cyprus permanent residence scenario?",
    "Да, но корректно говорить не “ПМЖ гарантировано”, а “покупка недвижимости может быть частью миграционного сценария”. Для разрешения инвестора важны актуальные требования, стоимость и тип объекта, происхождение средств, доход, страховка и состав семьи.": "Yes, but the correct wording is not 'permanent residence is guaranteed', but 'property purchase can be part of a migration scenario'. Current requirements, property value and type, source of funds, income, insurance and family composition matter for an investor permit.",
    "Что такое non-dom и почему это важно инвестору?": "What is non-dom and why does it matter for investors?",
    "Non-dom относится к налоговому статусу физического лица на Кипре и может быть релевантен для дивидендов, процентов и других доходов. Его нельзя обещать всем: сначала нужно проверить налоговое резидентство, домициль и структуру доходов.": "Non-dom is related to an individual's tax status in Cyprus and can be relevant for dividends, interest and other income. It cannot be promised to everyone: tax residency, domicile and income structure must be checked first.",
    "IP Box подходит любому бизнесу?": "Does IP Box suit every business?",
    "Нет. IP Box применяется к квалифицируемой прибыли от подходящей интеллектуальной собственности, например программного обеспечения или патентов, при выполнении nexus-подхода и требований к документам. Для обычной недвижимости это не льгота, а отдельный корпоративный сценарий для владельцев бизнеса.": "No. IP Box applies to qualifying profits from eligible intellectual property, such as software or patents, when the nexus approach and documentation requirements are met. For ordinary real estate this is not a benefit, but a separate corporate scenario for business owners.",
    "Kean расположен на прибрежной оси Лимассола, рядом с морем и парком Dasoudi.": "Kean is located on Limassol's coastal axis, close to the sea and Dasoudi Park.",
    "Координаты проекта: 34.69108996057216, 33.075149082008835. Это участок бывшего завода KEAN в прибрежной части Лимассола, где рядом находятся пляж, парк, рестораны, городские сервисы и деловая инфраструктура.": "Project coordinates: 34.69108996057216, 33.075149082008835. This is the former KEAN factory site in coastal Limassol, close to the beach, park, restaurants, city services and business infrastructure.",
    "Парк и пляж Dasoudi": "Dasoudi Park and Beach",
    "Участок бывшего завода KEAN": "Former KEAN factory site",
    "Открыть в Google Maps": "Open in Google Maps",
    "Оставить заявку": "Leave a request",
    "Политика": "Policy",
    "Презентация Kean": "Kean presentation",
    "Получить презентацию и инвестиционный пакет": "Get the presentation and investment package",
    "Быстрая связь": "Quick contact"
  }
};

const attributeTranslations = {
  en: {
    "Основная навигация": "Main navigation",
    "Открыть меню": "Open menu",
    "Закрыть": "Close",
    "Быстрая связь": "Quick contact",
    "Быстрая заявка": "Quick request",
    "Видео Kean Limassol": "Kean Limassol video",
    "Карта расположения Kean Limassol": "Kean Limassol location map",
    "Kean Limassol на карте": "Kean Limassol on the map",
    "Ключевые преимущества Kean": "Kean key advantages",
    "Консультации Top Estate": "Top Estate advisory",
    "Представитель Top Estate по Kean": "Top Estate representative for Kean",
    "Галерея Kean": "Kean gallery",
    "Контакты Top Estate": "Top Estate contacts",
    "Ваше имя": "Your name",
    "Бюджет, сроки, предпочитаемый способ связи": "Budget, timing, preferred contact method",
    "Введите телефон в международном формате, начиная с +.": "Enter your phone in international format, starting with +."
  }
};

const metaTranslations = {
  en: {
    title: "Kean Limassol - seafront real estate, residency and relocation to Cyprus",
    description: "Kean Limassol is a premium seafront complex on the historic KEAN factory site in coastal Limassol. Investment property, permanent residence, non-dom, IP Box and relocation to Cyprus.",
    keywords: "Kean Limassol, Limassol real estate, seafront apartments Limassol, Cyprus property investment, Cyprus permanent residence, Cyprus non-dom, IP Box Cyprus, relocation to Cyprus"
  },
  ru: {
    title: "Kean Limassol - недвижимость у моря, ПМЖ и переезд на Кипр",
    description: "Kean Limassol - премиальный комплекс у моря на месте исторического завода KEAN в прибрежном Лимассоле. Инвестиционная недвижимость, ПМЖ, non-dom, IP Box и переезд на Кипр.",
    keywords: "Kean Limassol, недвижимость Лимассол, апартаменты Лимассол у моря, инвестиции в недвижимость Кипр, ПМЖ Кипра, non-dom Кипр, IP Box Cyprus, переезд на Кипр"
  }
};

Object.assign(textTranslations.en, {
  "Получить планировки и цены": "Get layouts and prices",
  "Получить планировки и цены в WhatsApp": "Get layouts and prices on WhatsApp",
  "Сравнить Kean с проектами": "Compare Kean with other projects",
  "Сравнить Kean с объектами Лимассола": "Compare Kean with Limassol properties",
  "Ответим в WhatsApp / Telegram: доступные форматы, бюджет, платежный график, сравнение с альтернативами.": "We will reply on WhatsApp / Telegram with available formats, budget guidance, payment schedule and comparison with alternatives.",
  "Что вы получите через 5 минут после заявки": "What you receive within 5 minutes of your request",
  "Мы не отправляем “общий буклет”. Соберем короткое предложение под вашу цель и покажем, где Kean сильнее альтернатив в Лимассоле.": "We do not send a generic brochure. We prepare a short offer around your goal and show where Kean is stronger than Limassol alternatives.",
  "Что входит в ответ после заявки": "What is included after the request",
  "Планировки": "Layouts",
  "Доступные форматы и позиции, которые стоит смотреть первыми.": "Available formats and positions worth reviewing first.",
  "Ориентиры цен": "Price guidance",
  "Понятный диапазон бюджета и входа в проект.": "A clear budget range and entry point for the project.",
  "Платежный график": "Payment schedule",
  "Как распределяются платежи и что уточнить до резерва.": "How payments are structured and what to clarify before reservation.",
  "Сравнение": "Comparison",
  "Kean против других премиальных проектов Лимассола.": "Kean versus other premium Limassol projects.",
  "Цель покупки": "Purchase goal",
  "Инвестиция, жизнь, ПМЖ, переезд или бизнес на Кипре.": "Investment, living, permanent residence, relocation or business in Cyprus.",
  "Сравниваете Кипр с Дубаем, Испанией или Португалией?": "Comparing Cyprus with Dubai, Spain or Portugal?",
  "Покажем различия по входу, налогам, ликвидности и логике переезда. Kean - премиальный проект именно в Лимассоле, поэтому сначала проверим, подходит ли Кипр под вашу задачу.": "We will show differences in entry budget, taxes, liquidity and relocation logic. Kean is a premium project specifically in Limassol, so we first check whether Cyprus fits your task.",
  "Отправим презентацию, актуальные форматы, ориентиры по бюджету и платежному графику в WhatsApp / Telegram.": "We will send the presentation, available formats, budget guidance and payment schedule references via WhatsApp / Telegram.",
  "Kean интересен не только как недвижимость у моря, а как редкий адрес: бывший участок KEAN, прибрежный Лимассол, Dasoudi, mixed-use формат и будущая узнаваемость объекта.": "Kean is compelling not only as seafront real estate, but as a rare address: the former KEAN site, coastal Limassol, Dasoudi, mixed-use format and future recognition of the project.",
  "Получить подборку редких позиций": "Get a selection of rare positions",
  "Получите планировки и цены по Kean": "Get Kean layouts and prices",
  "Оставьте контакты, и мы отправим доступные форматы, ориентиры по бюджету и цели покупки.": "Leave your details and we will send available formats, budget guidance and purchase goals.",
  "Цель (необязательно)": "Goal (optional)",
  "Бизнес": "Business",
  "После заявки": "After the request",
  "Что подготовит Top Estate": "What Top Estate will prepare",
  "Оставьте контакт, и вместо общей презентации мы соберем понятный пакет под ваш сценарий: инвестиция, жизнь у моря, ПМЖ, переезд или коллекционный портфель недвижимости.": "Leave your contact details, and instead of a generic presentation we will prepare a clear package for your scenario: investment, seafront living, permanent residence, relocation or a collectible property portfolio.",
  "Актуальная презентация Kean": "Current Kean presentation",
  "Кратко по концепции, локации, архитектуре, инфраструктуре и сильным инвестиционным аргументам.": "A concise overview of the concept, location, architecture, infrastructure and strong investment arguments.",
  "Доступные форматы и планировки": "Available formats and layouts",
  "Покажем, какие типы недвижимости и позиции стоит рассматривать под ваш бюджет и сроки.": "We will show which property types and positions are worth considering for your budget and timeline.",
  "Ориентиры по бюджету и платежам": "Budget and payment guidance",
  "Обсудим цену входа, платежный график и важные вопросы перед резервированием объекта.": "We will discuss entry price, payment schedule and key questions before reserving a property.",
  "Сравнение с другими проектами": "Comparison with other projects",
  "Сравним Kean с премиальными комплексами Лимассола по локации, ликвидности и сценарию покупки.": "We will compare Kean with premium Limassol complexes by location, liquidity and purchase scenario.",
  "Сценарий покупки под вас": "A purchase scenario for you",
  "Проверим, подходит ли объект под инвестицию, жизнь, ПМЖ, переезд, бизнес на Кипре или редкий адрес в коллекции.": "We will check whether the project fits investment, living, permanent residence, relocation, business in Cyprus or a rare address in a collection.",
  "Получить пакет по Kean": "Get the Kean package",
  "Запросить доступные форматы": "Request available formats",
  "Для кого Kean может быть особенно сильным решением": "Who Kean can be especially strong for",
  "Для инвестора, которому важна ликвидность": "For an investor focused on liquidity",
  "Для семьи, которая хочет Кипр без курортной изоляции": "For a family seeking Cyprus without resort isolation",
  "Для предпринимателя, которому важны город и налоговый сценарий": "For an entrepreneur who values the city and tax scenario",
  "Для коллекционера, который ищет адрес с историей": "For a collector seeking an address with history",
  "Оставьте заявку, и Top Estate подготовит не просто презентацию, а понятный инвестиционный пакет: доступные форматы, планировки, ориентиры по бюджету, сравнение с другими проектами и сценарий покупки.": "Leave a request, and Top Estate will prepare not just a presentation, but a clear investment package: available formats, layouts, budget guidance, comparison with other projects and a purchase scenario.",
  "Еще не готовы покупать?": "Not ready to buy yet?",
  "Можно начать с сравнения. Мы покажем, где Kean сильнее, где есть альтернативы и какой сценарий покупки имеет смысл именно для вас.": "You can start with a comparison. We will show where Kean is stronger, where alternatives exist and which purchase scenario makes sense for you.",
  "Получить инвестиционный пакет": "Get the investment package",
  "Планировки и цены": "Layouts and prices",
  "Получить планировки, цены и инвестиционный пакет": "Get layouts, prices and the investment package",
  "Да, но корректно говорить не \"ПМЖ гарантировано\", а \"покупка недвижимости может быть частью миграционного сценария\". Для разрешения инвестора важны актуальные требования, стоимость и тип объекта, происхождение средств, доход, страховка и состав семьи.": "Yes, but the correct wording is not \"permanent residence is guaranteed\", but \"property purchase can be part of a migration scenario\". Current requirements, property value and type, source of funds, income, insurance and family composition matter for an investor permit.",
  "Статьи": "Articles",
  "Получить": "Get",
  "Запросить": "Request",
  "Задать вопрос": "Ask a question",
  "Получить подборку": "Get selection",
  "Открыть карту": "Open map",
  "Апартаменты у моря в Лимассоле - что проверить перед покупкой": "Seafront apartments in Limassol - what to check before buying",
  "Покупка у моря": "Buying by the sea",
  "Покупка недвижимости у моря требует отдельного чеклиста. Вид на море сам по себе важен, но для премиального объекта нужно оценивать весь сценарий жизни и перепродажи.": "Buying property by the sea requires a separate checklist. A sea view matters, but for a premium asset you need to assess the full lifestyle and resale scenario.",
  "Парк, пляж и городская инфраструктура рядом с проектом.": "Park, beach and urban infrastructure next to the project.",
  "Проверьте не только расстояние до моря": "Check more than distance to the sea",
  "Фраза \"у моря\" может означать разные вещи. Важны видовые характеристики, качество прогулочной среды, соседство с парком, уровень шума, доступность ресторанов, магазинов и деловых районов.": "The phrase \"by the sea\" can mean different things. Views, walkability, proximity to a park, noise level and access to restaurants, shops and business districts all matter.",
  "Оцените инфраструктуру внутри проекта": "Assess the infrastructure inside the project",
  "Для долгосрочной ценности важно, чтобы проект предлагал не только квартиру. Коворкинг, спортзал, спа, салон красоты, кафе, рестораны, торговая галерея и пространства для детей усиливают ежедневный сценарий.": "For long-term value, the project should offer more than an apartment. Co-working, gym, spa, beauty salon, cafes, restaurants, retail gallery and children's spaces strengthen the daily-use scenario.",
  "Смотрите на девелопера и архитектора": "Look at the developer and architect",
  "В премиальном сегменте качество реализации влияет на ликвидность. Kean связан с bbf: как девелопером и UHA как архитектурной командой проекта, что усиливает доверие к концепции и масштабу.": "In the premium segment, execution quality affects liquidity. Kean is associated with bbf: as developer and UHA as the architectural team, which strengthens confidence in the concept and scale.",
  "Сформулируйте инвестиционный сценарий": "Define the investment scenario",
  "Перед покупкой определите, для чего нужен объект: личное проживание, сезонное использование, аренда, перепродажа или коллекционный портфель. Для каждого сценария будут важны разные планировки, этажи и условия покупки.": "Before buying, define the purpose: personal living, seasonal use, rental, resale or a collectible portfolio. Each scenario will prioritize different layouts, floors and purchase terms.",
  "Запросите материалы": "Request the materials",
  "Лучший следующий шаг - получить актуальные планировки, презентацию, доступные опции и консультацию по тому, какие форматы Kean соответствуют вашему сценарию.": "The best next step is to receive current layouts, the presentation, available options and guidance on which Kean formats match your scenario.",
  "Запросить материалы по Kean Limassol": "Request Kean Limassol materials",
  "Короткий чеклист": "Short checklist",
  "Получите подборку доступных форматов Kean и вопросы, которые стоит задать перед покупкой.": "Receive a selection of available Kean formats and the questions worth asking before buying.",
  "История завода KEAN в Лимассоле - новая жизнь места": "The KEAN factory in Limassol - a new life for the place",
  "У Kean Limassol есть редкая для новостройки основа: проект связан не только с морем и архитектурой, но и с городской памятью Лимассола.": "Kean Limassol has a rare foundation for a new project: it is connected not only to the sea and architecture, but also to Limassol's urban memory.",
  "Исторический участок у моря получает новую городскую функцию.": "A historic seafront site receives a new urban function.",
  "KEAN как часть повседневной истории Кипра": "KEAN as part of Cyprus' everyday history",
  "KEAN десятилетиями был одним из самых узнаваемых кипрских брендов напитков. По данным en.philenews, после двух переездов внутри Лимассола строительство фабрики началось в 1951 году и завершилось в 1956-м; завод стал ориентиром на лимассольской прибрежной линии.": "For decades, KEAN was one of Cyprus' most recognizable beverage brands. According to en.philenews, after two moves within Limassol, construction of the factory began in 1951 and was completed in 1956; the factory became a landmark on Limassol's coastal line.",
  "Для покупателя это важно не из ностальгии. Участок с историей легче объяснить: это не безымянная территория под очередную башню, а место, которое уже существовало в ментальной карте города.": "For a buyer, this matters not because of nostalgia. A site with history is easier to explain: it is not an anonymous plot for another tower, but a place that already existed in the city's mental map.",
  "Что изменилось после перехода к bbf:": "What changed after the move to bbf:",
  "В 2023 году KEAN Group перешла к bbf:. Cyprus Mail и CBN писали, что участок бывшего завода площадью около 40 000 кв. м рассматривается для крупной многофункциональной застройки с жилыми и офисными функциями, коммерческими помещениями и общественными пространствами.": "In 2023, KEAN Group moved to bbf:. Cyprus Mail and CBN reported that the former factory site of about 40,000 sq m is being considered for a large mixed-use development with residential and office functions, commercial spaces and public areas.",
  "В публичной подаче bbf: важен мотив уважения к историческому характеру участка и окружающей среде. Поэтому новая глава Kean должна восприниматься не как стирание прошлого, а как переосмысление территории.": "In bbf:'s public positioning, respect for the historic character of the site and its environment is an important theme. The new Kean chapter should therefore be read not as erasing the past, but as reimagining the site.",
  "Почему это усиливает проект": "Why this strengthens the project",
  "Историческое имя KEAN добавляет объекту узнаваемость, которой нет у стандартных новостроек.": "The historic KEAN name gives the project a level of recognition standard new-builds do not have.",
  "Бывший промышленный участок у моря получает новую городскую функцию: жилье, офисы, общественную площадь, сервисы и городскую жизнь.": "A former industrial seafront site receives a new urban function: residences, offices, a public plaza, services and city life.",
  "Для инвестора это более сильная история перепродажи: покупатель понимает не только метры и виды, но и место.": "For an investor, this creates a stronger resale story: the buyer understands not only square meters and views, but also the place.",
  "Для Лимассола это пример перехода от индустриальной памяти к современной прибрежной городской среде.": "For Limassol, it is an example of moving from industrial memory to a modern coastal urban environment.",
  "Новая история места": "A new story for the place",
  "Kean Limassol стоит рассматривать как проект, который соединяет три слоя: память бренда KEAN, редкий прибрежный участок и новую многофункциональную архитектуру. Именно такая комбинация делает адрес коллекционным: у него есть прошлое, понятное настоящее и сильный сценарий будущего.": "Kean Limassol should be viewed as a project that combines three layers: the memory of the KEAN brand, a rare coastal plot and new mixed-use architecture. This combination makes the address collectible: it has a past, a clear present and a strong future scenario.",
  "Источники:": "Sources:",
  "en.philenews о 74-летней истории KEAN": "en.philenews on KEAN's 74-year history",
  "Cyprus Mail о переосмыслении участка": "Cyprus Mail on the site's reimagining",
  "CBN о многофункциональной застройке на историческом участке": "CBN on mixed-use development on the historic site",
  "Запросить презентацию Kean Limassol": "Request the Kean Limassol presentation",
  "Адрес с историей": "An address with history",
  "Координаты проекта: 34.69108996057216, 33.075149082008835. Участок находится на прибрежной оси Лимассола, рядом с парком и пляжем Dasoudi.": "Project coordinates: 34.69108996057216, 33.075149082008835. The site is on Limassol's coastal axis, next to Dasoudi Park and Beach.",
  "Лучшие комплексы Лимассола - как сравнивать премиальную недвижимость": "Best complexes in Limassol - how to compare premium property",
  "При выборе премиального проекта в Лимассоле важно сравнивать не только визуализацию и метраж. Лучший объект должен быть понятен рынку, редок по локации и силен по инфраструктуре.": "When choosing a premium project in Limassol, it is important to compare more than renderings and square meters. The best asset should be clear to the market, rare by location and strong in infrastructure.",
  "Узнаваемый прибрежный адрес проще объяснить рынку.": "A recognizable coastal address is easier to explain to the market.",
  "Критерий 1: адрес и окружение": "Criterion 1: address and surroundings",
  "Для премиального сегмента адрес задает большую часть ценности. Море, пляж, парк, рестораны, деловая среда и повседневная инфраструктура должны работать вместе. Участок Kean рядом с парком и пляжем Dasoudi силен именно этим сочетанием, а история бывшего завода добавляет месту узнаваемость.": "In the premium segment, the address defines much of the value. The sea, beach, park, restaurants, business environment and daily infrastructure should work together. The Kean site near Dasoudi Park and Beach is strong precisely because of this mix, while the former factory story adds recognition.",
  "Критерий 2: формат проекта": "Criterion 2: project format",
  "Обычный жилой комплекс и многофункциональный проект-ориентир решают разные задачи. В таком формате покупатель получает не только квартиру, но и среду: офисы, торговую галерею, кафе, сервисы, инфраструктуру для здоровья и общественные пространства.": "A standard residential complex and a landmark mixed-use project solve different tasks. In this format, the buyer receives not only an apartment, but an environment: offices, retail gallery, cafes, services, wellness infrastructure and public spaces.",
  "Критерий 3: узнаваемость архитектуры": "Criterion 3: architectural recognition",
  "Покупатели коллекционной недвижимости часто ищут объект, который легко назвать и показать. Когда проект становится визуальным ориентиром города, его ценность легче объяснять на вторичном рынке и в аренде.": "Buyers of collectible property often seek an asset that is easy to name and show. When a project becomes a visual landmark, its value is easier to explain in resale and rental markets.",
  "Критерий 4: инфраструктура и ежедневный сценарий": "Criterion 4: infrastructure and daily scenario",
  "Спортзал, спа, салон красоты, коворкинг, кафе, рестораны, детский клуб и событийные пространства помогают проекту работать каждый день. Это особенно важно для долгосрочной аренды и для покупателей, которые планируют жить на Кипре часть года.": "A gym, spa, beauty salon, co-working, cafes, restaurants, kids club and event spaces help the project work every day. This is especially important for long-term rental and for buyers planning to live in Cyprus part of the year.",
  "Где в этом сравнении Kean": "Where Kean sits in this comparison",
  "Kean стоит рассматривать среди премиальных комплексов Лимассола как многофункциональный проект у моря с жилыми башнями, коммерческими башнями, премиальной торговой галереей и приватной инфраструктурой клубного уровня. Он особенно подходит тем, кто ищет узнаваемый объект у моря, а не стандартную квартиру в городской застройке.": "Kean is worth considering among Limassol's premium complexes as a mixed-use seafront project with residential towers, commercial towers, a premium retail gallery and private club-level infrastructure. It is especially relevant for buyers seeking a recognizable seafront asset rather than a standard city apartment.",
  "Получить сравнительный инвестиционный пакет": "Get a comparative investment package",
  "Сравнить Kean": "Compare Kean",
  "Оставьте заявку, чтобы получить планировки, доступные форматы и аргументы для сравнения с другими проектами Лимассола.": "Leave a request to receive layouts, available formats and arguments for comparison with other Limassol projects.",
  "Инвестиции в недвижимость Лимассола у моря - гид Kean": "Investing in seafront real estate in Limassol - Kean guide",
  "Инвестиционный гид": "Investment guide",
  "Лимассол сочетает деловую активность, море, международную аудиторию и ограниченность качественных прибрежных участков. Поэтому проекты у воды нужно оценивать иначе, чем обычные городские апартаменты.": "Limassol combines business activity, the sea, an international audience and limited high-quality coastal plots. That is why waterfront projects should be assessed differently from ordinary city apartments.",
  "Прибрежные участки в Лимассоле ограничены физически.": "Coastal plots in Limassol are physically limited.",
  "Почему первая линия важна для инвестора": "Why the first line matters for investors",
  "В премиальной недвижимости цена формируется не только площадью и отделкой. Решающую роль играет адрес: насколько он редок, насколько легко его объяснить будущему покупателю или арендатору, есть ли рядом море, парк, рестораны и деловая инфраструктура.": "In premium real estate, price is shaped not only by size and finishes. The address plays a decisive role: how rare it is, how easy it is to explain to a future buyer or tenant, and whether the sea, park, restaurants and business infrastructure are nearby.",
  "Прибрежные локации в Лимассоле физически ограничены. Когда объект соединяет вид на море, узнаваемую архитектуру и масштабную инфраструктуру, он начинает работать как коллекционный актив, а не только как жилье.": "Coastal locations in Limassol are physically limited. When a project combines sea views, recognizable architecture and large-scale infrastructure, it starts to work as a collectible asset, not only as housing.",
  "Что отличает многофункциональный проект": "What makes a mixed-use project different",
  "Многофункциональный формат снижает зависимость от одного сценария спроса. В Kean заявлены жилые башни, коммерческие башни, премиальная торговая галерея и приватная инфраструктура. Это значит, что в одном адресе формируется ежедневный поток резидентов, сотрудников, гостей, клиентов ресторанов и сервисов.": "A mixed-use format reduces dependence on a single demand scenario. Kean includes residential towers, commercial towers, a premium retail gallery and private infrastructure. This means one address can generate a daily flow of residents, employees, guests, restaurant clients and service users.",
  "Жилой спрос поддерживает долгосрочную ценность адреса.": "Residential demand supports the long-term value of the address.",
  "Коммерческая функция добавляет деловой трафик.": "The commercial function adds business traffic.",
  "Ритейл и рестораны усиливают повседневную инфраструктуру.": "Retail and restaurants strengthen everyday infrastructure.",
  "Парк, море и инфраструктура повышают премию за образ жизни.": "Park, sea and infrastructure increase the lifestyle premium.",
  "Как оценивать ликвидность": "How to assess liquidity",
  "Перед покупкой важно смотреть не только на цену входа. Оцените, можно ли коротко объяснить ценность объекта, будет ли он понятен международному покупателю, насколько дефицитна локация и какие функции поддерживают спрос в течение года.": "Before buying, look beyond the entry price. Assess whether the asset's value can be explained simply, whether it will be clear to an international buyer, how scarce the location is and which functions support year-round demand.",
  "Kean интересен тем, что его инвестиционная история строится вокруг простого тезиса: будущий ориентир у моря на месте бывшего завода KEAN, рядом с парком и пляжем Dasoudi, с инфраструктурой для жизни, работы и отдыха.": "Kean is compelling because its investment story is built around a simple thesis: a future landmark by the sea on the former KEAN factory site, next to Dasoudi Park and Beach, with infrastructure for living, working and leisure.",
  "Что запросить перед решением": "What to request before deciding",
  "Инвестору стоит запросить актуальную презентацию, доступные форматы недвижимости, планировки, этап проекта, платежный график и сценарии использования. На главной странице можно оставить заявку и получить инвестиционный пакет Kean Limassol.": "An investor should request the current presentation, available property formats, layouts, project stage, payment schedule and use scenarios. On the home page you can leave a request and receive the Kean Limassol investment package.",
  "Запросить инвестиционный пакет Kean": "Request the Kean investment package",
  "Многофункциональный проект на историческом участке у моря для инвестиций, жизни и коллекционного портфеля недвижимости.": "A mixed-use project on a historic seafront site for investment, living and a collectible real estate portfolio.",
  "Non-dom и IP Box на Кипре - гид для инвестора и бизнеса": "Non-dom and IP Box in Cyprus - guide for investors and business",
  "Для части покупателей недвижимость в Лимассоле - это не только актив у моря, а первый шаг к личному присутствию, налоговому резидентству и корпоративной структуре в ЕС.": "For some buyers, property in Limassol is not only a seafront asset, but the first step toward personal presence, tax residency and a corporate structure in the EU.",
  "Личный адрес, офисная среда и городская инфраструктура в одном сценарии.": "Personal address, office environment and city infrastructure in one scenario.",
  "Налоговое резидентство: 183 дня и 60 дней": "Tax residency: 183 days and 60 days",
  "Кипр признает налоговое резидентство физического лица по 183-дневному правилу, а также по 60-дневному правилу при наличии дополнительных связей с Кипром. Для второго сценария важны дни пребывания, бизнес или работа на Кипре, позиция директора в кипрской компании и постоянное жилье в собственности или аренде.": "Cyprus recognizes individual tax residency under the 183-day rule and also under the 60-day rule when additional ties to Cyprus exist. For the second scenario, days of presence, business or employment in Cyprus, directorship in a Cyprus company and a permanent owned or rented home are important.",
  "Именно здесь недвижимость становится частью более широкой картины: не как налоговая льгота сама по себе, а как реальная база присутствия и повседневной жизни.": "This is where property becomes part of a broader picture: not as a tax benefit in itself, but as a real base for presence and daily life.",
  "Что такое non-dom": "What non-dom means",
  "Специальный оборонный сбор (Special Defence Contribution) применяется к отдельным видам доходов у физических лиц, которые одновременно являются налоговыми резидентами и имеют домициль на Кипре. Для налоговых резидентов без кипрского домициля действует освобождение от SDC по определенным доходам, но статус зависит от фактов конкретного человека.": "Special Defence Contribution applies to certain types of income of individuals who are both Cyprus tax residents and domiciled in Cyprus. Tax residents without Cyprus domicile may be exempt from SDC on certain income, but the status depends on the facts of each person.",
  "Нельзя обещать всем \"0% налог\". Корректнее говорить: \"если вы планируете стать налоговым резидентом Кипра, стоит проверить применимость non-dom режима с налоговым консультантом\".": "It is not correct to promise everyone \"0% tax\". A more accurate statement is: \"if you plan to become a Cyprus tax resident, the applicability of the non-dom regime should be checked with a tax advisor\".",
  "IP Box для технологических компаний": "IP Box for technology companies",
  "IP Box - это корпоративный режим, который может быть интересен владельцам программного обеспечения, SaaS, патентов и другой квалифицируемой интеллектуальной собственности. По справочнику PwC, новый кипрский IP Box предусматривает условный вычет 80% от квалифицируемой прибыли по подходящей интеллектуальной собственности при соблюдении nexus-подхода.": "IP Box is a corporate regime that may be relevant to owners of software, SaaS, patents and other qualifying intellectual property. According to PwC, the new Cyprus IP Box provides a notional deduction of 80% of qualifying profits from eligible intellectual property when the nexus approach is met.",
  "Это не аргумент для каждого покупателя недвижимости. Но для основателя технологической компании, который рассматривает Лимассол как личную и деловую базу, сочетание жилья, офиса, налогового резидентства и IP-структуры может быть важной частью решения.": "This is not an argument for every property buyer. But for a technology founder considering Limassol as a personal and business base, the combination of housing, office, tax residency and an IP structure can be an important part of the decision.",
  "Как связать это с покупкой Kean": "How to connect this with buying Kean",
  "Сначала определить личный сценарий: жить постоянно, проводить часть года или переезжать семьей.": "First define the personal scenario: live permanently, spend part of the year or relocate with family.",
  "Затем проверить налоговое резидентство, non-dom и структуру доходов.": "Then check tax residency, non-dom and income structure.",
  "Для бизнеса отдельно оценить кипрскую компанию, реальное присутствие, сотрудников, офис и применимость IP Box.": "For business, separately assess the Cyprus company, real presence, employees, office and IP Box applicability.",
  "После этого выбирать недвижимость как базу, а не как изолированную покупку.": "Only then choose property as a base, not as an isolated purchase.",
  "Полезные источники:": "Useful sources:",
  "PwC о налоговом резидентстве": "PwC on tax residency",
  "PwC о SDC/non-dom": "PwC on SDC/non-dom",
  "PwC о IP Box": "PwC on IP Box",
  "Обсудить Kean в сценарии переезда и бизнеса": "Discuss Kean in a relocation and business scenario",
  "Для предпринимателей": "For entrepreneurs",
  "Kean может быть частью личного и делового присутствия в Лимассоле: жилье, городская инфраструктура и доступ к международной среде.": "Kean can be part of personal and business presence in Limassol: housing, city infrastructure and access to an international environment.",
  "Переезд в Лимассол - безопасность, семья и недвижимость у моря": "Relocating to Limassol - safety, family and seafront property",
  "Покупатель премиальной недвижимости часто выбирает не только дом, а новый режим жизни. Поэтому Лимассол нужно оценивать через ежедневную среду: маршруты, школы, деловую активность, море и ощущение спокойствия.": "A premium property buyer often chooses not only a home, but a new mode of life. Limassol should therefore be assessed through the daily environment: routes, schools, business activity, the sea and a sense of calm.",
  "Море, парк и городские маршруты рядом с будущим домом.": "Sea, park and urban routes next to the future home.",
  "Почему Лимассол выбирают для переезда": "Why Limassol is chosen for relocation",
  "Лимассол отличается от классического курорта: это деловой город у моря. Здесь международная аудитория, офисы, рестораны, сервисы, школы, медицина, пляжи и городская инфраструктура находятся в одном ритме.": "Limassol is different from a classic resort: it is a business city by the sea. An international audience, offices, restaurants, services, schools, healthcare, beaches and urban infrastructure work in one rhythm.",
  "Для семьи это означает меньше компромиссов между \"жить у моря\" и \"жить в городе\". Для предпринимателя - возможность строить личное присутствие рядом с деловой средой и международным комьюнити.": "For a family, this means fewer compromises between \"living by the sea\" and \"living in the city\". For an entrepreneur, it means building personal presence next to a business environment and international community.",
  "Как говорить о безопасности честно": "How to talk about safety honestly",
  "Безопасность - сильный эмоциональный мотив, но его нельзя продавать лозунгом \"здесь нет преступности\". По данным Статистической службы, в 2024 году на Кипре было 5 900 подтвержденных серьезных случаев, а индекс серьезных преступлений составил 605 на 100 000 жителей. Крупнейшей группой были имущественные преступления.": "Safety is a strong emotional driver, but it should not be sold with the slogan \"there is no crime here\". According to the Statistical Service, in 2024 Cyprus had 5,900 confirmed serious cases and a serious crime index of 605 per 100,000 residents. Property crimes were the largest group.",
  "Корректнее говорить так: Кипр воспринимается многими экспатами как спокойная и понятная среда для жизни, но клиенту важно выбирать район, дом, охрану, паркинг, инфраструктуру и ежедневные маршруты.": "A more accurate way to say it: Cyprus is perceived by many expats as a calm and understandable place to live, but the client should still choose the area, building, security, parking, infrastructure and daily routes carefully.",
  "Почему участок рядом с Dasoudi важен": "Why the site near Dasoudi matters",
  "Прибрежная зона рядом с парком и пляжем Dasoudi дает редкий баланс: море и парк находятся рядом, но при этом сохраняется городская доступность ресторанов, магазинов, сервисов и деловой жизни Лимассола.": "The coastal area next to Dasoudi Park and Beach offers a rare balance: the sea and park are nearby, while restaurants, shops, services and Limassol business life remain easily accessible.",
  "Для аренды и будущей перепродажи это тоже важно. Адрес, который легко объяснить за одну фразу, обычно понятнее международному покупателю: \"у моря, рядом с Dasoudi, на месте бывшего завода KEAN\".": "This also matters for rental and future resale. An address that can be explained in one phrase is usually clearer to an international buyer: \"by the sea, next to Dasoudi, on the former KEAN factory site\".",
  "Что проверить семье перед покупкой": "What a family should check before buying",
  "Маршруты до школы, офиса, пляжа и медицинских сервисов.": "Routes to school, office, beach and medical services.",
  "Паркинг, приватность, безопасность здания и доступ к инфраструктуре проекта.": "Parking, privacy, building security and access to project infrastructure.",
  "Планировку под реальный сценарий жизни, а не только красивый вид.": "A layout for real daily life, not only a beautiful view.",
  "Будущую ликвидность: район, этаж, вид, бренд девелопера и масштаб проекта.": "Future liquidity: area, floor, view, developer brand and project scale.",
  "Официальная статистика по преступности:": "Official crime statistics:",
  "статистика преступности CYSTAT за 2024 год": "CYSTAT crime statistics for 2024",
  "Получить подборку Kean для семейного сценария": "Get a Kean selection for a family scenario",
  "Kean расположен рядом с парком и пляжем Dasoudi, где образ жизни у моря, город и инвестиционная логика работают вместе.": "Kean is located next to Dasoudi Park and Beach, where seafront lifestyle, the city and investment logic work together.",
  "ПМЖ Кипра через недвижимость - что важно знать покупателю": "Cyprus permanent residence through real estate - what buyers should know",
  "Недвижимость может быть частью миграционного сценария, но сайт по проекту не должен обещать статус автоматически. Корректная подача помогает привлечь сильного клиента и не создать юридический риск.": "Real estate can be part of a migration scenario, but a project website should not promise status automatically. Accurate wording helps attract a strong client without creating legal risk.",
  "Недвижимость у моря может быть частью более широкой стратегии жизни на Кипре.": "Seafront real estate can be part of a broader life strategy in Cyprus.",
  "Как устроена логика разрешения для инвестора": "How the investor permit logic works",
  "По опубликованным критериям Миграционного департамента, заявитель из третьей страны может рассматривать ускоренную процедуру разрешения на постоянное проживание, если выполняет инвестиционные и качественные критерии. Для покупки дома или квартиры в новом девелоперском проекте в официальных критериях указан порог от 300 000 евро плюс НДС.": "According to the published criteria of the Migration Department, a third-country applicant may consider the fast-track permanent residence permit procedure if investment and qualitative criteria are met. For buying a house or apartment in a new development, the official criteria indicate a threshold from EUR 300,000 plus VAT.",
  "Также оцениваются происхождение средств, перевод денег на Кипр, подтвержденный годовой доход, медицинская страховка, справки о несудимости и состав семьи. Поэтому правильная формулировка для сайта: \"покупка может быть частью сценария ПМЖ\", а не \"покупка гарантирует ПМЖ\".": "Source of funds, transfer of money to Cyprus, proven annual income, medical insurance, police clearance certificates and family composition are also assessed. That is why the right website wording is: \"the purchase can be part of a permanent residence scenario\", not \"the purchase guarantees permanent residence\".",
  "Почему недвижимость у моря усиливает сценарий": "Why seafront property strengthens the scenario",
  "Для семьи, которая рассматривает Кипр долгосрочно, объект должен быть не только формально подходящим по цене. Важны район, ежедневная инфраструктура, планировка, приватность, транспортные маршруты, школы, медицина и понятность будущей перепродажи.": "For a family considering Cyprus long term, the asset should not only formally fit the price threshold. Area, daily infrastructure, layout, privacy, routes, schools, healthcare and future resale clarity all matter.",
  "Kean Limassol находится на прибрежной оси Лимассола, на месте бывшего завода KEAN, рядом с парком и пляжем Dasoudi. Для релокационного сценария это сильная связка: море, парк, городская жизнь, история места и деловая среда Лимассола в одном адресе.": "Kean Limassol is located on Limassol's coastal axis, on the former KEAN factory site, next to Dasoudi Park and Beach. For a relocation scenario, this is a strong combination: sea, park, city life, heritage and Limassol's business environment in one address.",
  "Что проверить до внесения депозита": "What to check before paying a deposit",
  "Подходит ли тип объекта под выбранный миграционный сценарий.": "Whether the property type fits the chosen migration scenario.",
  "Какая сумма должна быть оплачена и каким образом подтверждается источник средств.": "What amount must be paid and how the source of funds is confirmed.",
  "Достаточен ли подтверждаемый доход для заявителя, супруга и детей.": "Whether the proven income is sufficient for the applicant, spouse and children.",
  "Какие документы нужны по семье, страховке и отсутствию судимости.": "Which family, insurance and police clearance documents are needed.",
  "Как покупка оформляется, если используется компания или совместное владение.": "How the purchase is structured if a company or joint ownership is used.",
  "Как Top Estate помогает на первом этапе": "How Top Estate helps at the first stage",
  "Top Estate может подготовить презентацию Kean, актуальные доступные форматы, планировки и первичный список вопросов для юриста. Это экономит время: клиент сразу видит, какой объект подходит под жизнь, инвестицию и потенциальный миграционный сценарий.": "Top Estate can prepare the Kean presentation, current available formats, layouts and an initial list of questions for a lawyer. This saves time: the client immediately sees which asset fits living, investment and a potential migration scenario.",
  "Официальные критерии нужно сверять перед сделкой:": "Official criteria should be checked before the transaction:",
  "критерии разрешения для инвесторов": "investor permit criteria",
  "Запросить консультацию по Kean и сценарию покупки": "Request a consultation on Kean and the purchase scenario",
  "Премиальный адрес у моря, который можно рассматривать вместе со сценарием жизни и долгосрочного присутствия на Кипре.": "A premium seafront address that can be considered together with a life and long-term presence scenario in Cyprus.",
  "Политика конфиденциальности - Kean Limassol": "Privacy Policy - Kean Limassol",
  "Конфиденциальность": "Privacy",
  "Политика конфиденциальности": "Privacy Policy",
  "Форма на сайте собирает имя, контакт, интерес к объекту и комментарий только для обработки заявки по проекту Kean Limassol.": "The form on the site collects name, contact details, interest in the project and comment only to process a Kean Limassol enquiry.",
  "Какие данные используются": "What data is used",
  "Мы используем данные, которые вы добровольно отправляете через форму: имя, телефон, мессенджер, сценарий покупки и комментарий. Эти данные нужны, чтобы отправить презентацию, уточнить запрос и организовать консультацию.": "We use the data you voluntarily submit through the form: name, phone, messenger, purchase scenario and comment. This data is needed to send the presentation, clarify the request and organize a consultation.",
  "Передача данных": "Data transfer",
  "Данные не публикуются на сайте. При подключении CRM или почтового сервиса данные могут передаваться только выбранному оператору обработки заявок.": "Data is not published on the website. If a CRM or email service is connected, the data may be transferred only to the selected enquiry processing operator.",
  "Контакт": "Contact",
  "По вопросам удаления или уточнения данных напишите через WhatsApp или Telegram, указанные на главной странице.": "For deletion or clarification of data, write via WhatsApp or Telegram listed on the home page.",
  "Вернуться на главную страницу проекта и запросить инвестиционный пакет.": "Return to the project home page and request the investment package.",
  "К заявке": "To request"
});

Object.assign(textTranslations.en, {
  "Екатерина Ковалева": "Ekaterina Kovaleva",
  "Цели": "Goals",
  "Оставьте контакты, и мы отправим доступные форматы, ориентиры по бюджету и цели покупки.": "Leave your details and we will send available formats, budget guidance and purchase goals.",
  "Цель": "Goal",
  "Выберите цель": "Select a goal",
  "Что вы получите": "What you will receive",
  "Оставьте контакт, и вместо общей презентации мы соберем понятное предложение под вашу цель: инвестиция, жизнь у моря, ПМЖ, переезд или коллекционный портфель недвижимости.": "Leave your contact details, and instead of a generic presentation we will prepare a clear proposal for your goal: investment, seafront living, permanent residence, relocation or a collectible property portfolio.",
  "Сравним Kean с премиальными комплексами Лимассола по локации, ликвидности и цели покупки.": "We will compare Kean with premium Limassol complexes by location, liquidity and purchase goal.",
  "Цель покупки под вас": "A purchase goal tailored to you",
  "Получить предложение по Kean": "Get a Kean proposal",
  "Для покупателей из третьих стран недвижимость на Кипре может поддерживать цель получить разрешение на постоянное проживание для инвесторов при выполнении актуальных критериев, включая инвестиционный порог и подтверждение дохода.": "For non-EU buyers, Cyprus real estate can support the goal of obtaining an investor permanent residence permit when current criteria are met, including the investment threshold and proof of income.",
  "Лимассол дает повседневную среду без ощущения курортной изоляции: море, школы, медицина, рестораны, бизнес-среда и понятная городская инфраструктура рядом.": "Limassol offers a daily environment without resort isolation: the sea, schools, healthcare, restaurants, business setting and clear urban infrastructure are all nearby.",
  "Сердце Лимассола: море, парк Dasoudi и городская жизнь в одном адресе.": "Heart of Limassol: the sea, Dasoudi Park and city life in one address.",
  "Сравнение целей: инвестиция, жизнь, релокация": "Goal comparison: investment, living, relocation",
  "Подберем формат под вашу цель покупки": "We will match the format to your purchase goal",
  "Цели покупки": "Purchase goals",
  "Четыре частые цели покупки: ликвидность, жизнь у моря, деловая база и редкий адрес в коллекции.": "Four common purchase goals: liquidity, seafront living, a business base and a rare address in a collection.",
  "Ликвидность": "Liquidity",
  "Комфорт": "Comfort",
  "Бизнес": "Business",
  "Редкость": "Rarity",
  "Для предпринимателя, которому важны городская среда и налоговые цели": "For an entrepreneur who values the city environment and tax goals",
  "Прибрежная зона рядом с парком Dasoudi соединяет море, городские сервисы и деловую среду Лимассола в одной повседневной логике.": "The coastal area near Dasoudi Park connects the sea, urban services and Limassol's business environment in one daily logic.",
  "Получите инвестиционное предложение Kean Limassol": "Get the Kean Limassol investment proposal",
  "Оставьте заявку, и Top Estate подготовит не просто презентацию, а понятное инвестиционное предложение: доступные форматы, планировки, ориентиры по бюджету, сравнение с другими проектами и цель покупки.": "Leave a request, and Top Estate will prepare more than a presentation: a clear investment proposal with available formats, layouts, budget guidance, comparison with other projects and your purchase goal.",
  "Можно начать с сравнения. Мы покажем, где Kean сильнее, где есть альтернативы и какая цель покупки имеет смысл именно для вас.": "You can start with a comparison. We will show where Kean is stronger, where alternatives exist and which purchase goal makes sense for you.",
  "Получить инвестиционное предложение": "Get the investment proposal",
  "Обе цели релевантны. Проект интересен как покупка для жизни у моря и как инвестиционный актив благодаря прибрежной локации, многофункциональному формату и инфраструктуре для ежедневного спроса.": "Both goals are relevant. The project is interesting as a seafront lifestyle purchase and as an investment asset thanks to its coastal location, mixed-use format and daily-demand infrastructure.",
  "Можно ли рассматривать Kean под цель ПМЖ Кипра?": "Can Kean be considered for the goal of Cyprus permanent residence?",
  "Да, но корректно говорить не “ПМЖ гарантировано”, а “покупка недвижимости может поддерживать цель переезда и постоянного проживания”. Для разрешения инвестора важны актуальные требования, стоимость и тип объекта, происхождение средств, доход, страховка и состав семьи.": "Yes, but the correct wording is not 'permanent residence is guaranteed', but 'property purchase can support the goal of relocation and long-term residence'. Current requirements, property value and type, source of funds, income, insurance and family composition matter for an investor permit.",
  "Нет. IP Box применяется к квалифицируемой прибыли от подходящей интеллектуальной собственности, например программного обеспечения или патентов, при выполнении nexus-подхода и требований к документам. Для обычной недвижимости это не льгота, а отдельная корпоративная цель для владельцев бизнеса.": "No. IP Box applies to qualifying profits from eligible intellectual property, such as software or patents, when the nexus approach and documentation requirements are met. For ordinary real estate this is not a benefit, but a separate corporate goal for business owners.",
  "Получить планировки, цены и инвестиционное предложение": "Get layouts, prices and the investment proposal",
  "Получить предложение": "Get proposal",
  "Покупка недвижимости у моря требует отдельного чеклиста. Вид на море сам по себе важен, но для премиального объекта нужно оценивать логику жизни и перепродажи.": "Buying property by the sea requires a separate checklist. A sea view matters, but for a premium asset you need to assess the logic of living and resale.",
  "Для долгосрочной ценности важно, чтобы проект предлагал не только квартиру. Коворкинг, спортзал, спа, салон красоты, кафе, рестораны, торговая галерея и пространства для детей усиливают ежедневную ценность объекта.": "For long-term value, the project should offer more than an apartment. Co-working, gym, spa, beauty salon, cafes, restaurants, retail gallery and children's spaces strengthen the property's daily value.",
  "Сформулируйте инвестиционную цель": "Define the investment goal",
  "Перед покупкой определите, для чего нужен объект: личное проживание, сезонное использование, аренда, перепродажа или коллекционный портфель. Для каждой цели будут важны разные планировки, этажи и условия покупки.": "Before buying, define what the property is for: personal living, seasonal use, rental, resale or a collectible portfolio. Each goal will prioritize different layouts, floors and purchase terms.",
  "Лучший следующий шаг - получить актуальные планировки, презентацию, доступные опции и консультацию по тому, какие форматы Kean соответствуют вашей цели.": "The best next step is to receive current layouts, the presentation, available options and guidance on which Kean formats match your goal.",
  "Критерий 4: инфраструктура и повседневная ценность": "Criterion 4: infrastructure and daily value",
  "Получить сравнительное инвестиционное предложение": "Get a comparative investment proposal",
  "Многофункциональный формат снижает зависимость от одного типа спроса. В Kean заявлены жилые башни, коммерческие башни, премиальная торговая галерея и приватная инфраструктура. Это значит, что в одном адресе формируется ежедневный поток резидентов, сотрудников, гостей, клиентов ресторанов и сервисов.": "A mixed-use format reduces dependence on a single type of demand. Kean includes residential towers, commercial towers, a premium retail gallery and private infrastructure. This means one address can generate a daily flow of residents, employees, guests, restaurant clients and service users.",
  "Инвестору стоит запросить актуальную презентацию, доступные форматы недвижимости, планировки, этап проекта, платежный график и цели использования. На главной странице можно оставить заявку и получить инвестиционное предложение Kean Limassol.": "An investor should request the current presentation, available property formats, layouts, project stage, payment schedule and use goals. On the home page you can leave a request and receive the Kean Limassol investment proposal.",
  "Запросить инвестиционное предложение Kean": "Request the Kean investment proposal",
  "Kean Limassol стоит рассматривать как проект, который соединяет три слоя: память бренда KEAN, редкий прибрежный участок и новую многофункциональную архитектуру. Именно такая комбинация делает адрес коллекционным: у него есть прошлое, понятное настоящее и сильная логика будущего.": "Kean Limassol should be viewed as a project that combines three layers: the memory of the KEAN brand, a rare coastal plot and new mixed-use architecture. This combination makes the address collectible: it has a past, a clear present and a strong logic for the future.",
  "Недвижимость может быть частью миграционной цели, но сайт по проекту не должен обещать статус автоматически. Корректная подача помогает привлечь сильного клиента и не создать юридический риск.": "Real estate can be part of a migration goal, but a project website should not promise status automatically. Accurate wording helps attract a strong client without creating legal risk.",
  "Также оцениваются происхождение средств, перевод денег на Кипр, подтвержденный годовой доход, медицинская страховка, справки о несудимости и состав семьи. Поэтому правильная формулировка для сайта: “покупка может быть частью цели ПМЖ”, а не “покупка гарантирует ПМЖ”.": "Source of funds, transfer of money to Cyprus, proven annual income, medical insurance, police clearance certificates and family composition are also assessed. That is why the right website wording is: 'the purchase can be part of a permanent residence goal', not 'the purchase guarantees permanent residence'.",
  "Почему недвижимость у моря усиливает цель": "Why seafront property strengthens the goal",
  "Kean Limassol находится на прибрежной оси Лимассола, на месте бывшего завода KEAN, рядом с парком и пляжем Dasoudi. Для цели релокации это сильная связка: море, парк, городская жизнь, история места и деловая среда Лимассола в одном адресе.": "Kean Limassol is located on Limassol's coastal axis, on the former KEAN factory site, next to Dasoudi Park and Beach. For a relocation goal, this is a strong combination: sea, park, city life, heritage and Limassol's business environment in one address.",
  "Подходит ли тип объекта под выбранную миграционную цель.": "Whether the property type fits the chosen migration goal.",
  "Top Estate может подготовить презентацию Kean, актуальные доступные форматы, планировки и первичный список вопросов для юриста. Это экономит время: клиент сразу видит, какой объект подходит под жизнь, инвестицию и потенциальную миграционную цель.": "Top Estate can prepare the Kean presentation, current available formats, layouts and an initial list of questions for a lawyer. This saves time: the client immediately sees which asset fits living, investment and a potential migration goal.",
  "Запросить консультацию по Kean и цели покупки": "Request a consultation on Kean and the purchase goal",
  "Премиальный адрес у моря, который можно рассматривать вместе с целью жизни и долгосрочного присутствия на Кипре.": "A premium seafront address that can be considered together with the goal of living and long-term presence in Cyprus.",
  "Личный адрес, офисная среда и городская инфраструктура в одной логике.": "A personal address, office environment and urban infrastructure in one logic.",
  "Кипр признает налоговое резидентство физического лица по 183-дневному правилу, а также по 60-дневному правилу при наличии дополнительных связей с Кипром. Для 60-дневного правила важны дни пребывания, бизнес или работа на Кипре, позиция директора в кипрской компании и постоянное жилье в собственности или аренде.": "Cyprus recognizes individual tax residency under the 183-day rule and also under the 60-day rule when additional ties to Cyprus exist. For the 60-day rule, days of presence, business or employment in Cyprus, directorship in a Cyprus company and a permanent owned or rented home are important.",
  "Сначала определить личную цель: жить постоянно, проводить часть года или переезжать семьей.": "First define the personal goal: live permanently, spend part of the year or relocate with family.",
  "Обсудить Kean для цели переезда и бизнеса": "Discuss Kean for relocation and business goals",
  "Планировку под реальные цели жизни, а не только красивый вид.": "A layout for real life goals, not only a beautiful view.",
  "Получить подборку Kean для семейной цели": "Get a Kean selection for a family goal",
  "Мы используем данные, которые вы добровольно отправляете через форму: имя, телефон, мессенджер, цель покупки и комментарий. Эти данные нужны, чтобы отправить презентацию, уточнить запрос и организовать консультацию.": "We use the data you voluntarily submit through the form: name, phone, messenger, purchase goal and comment. This data is needed to send the presentation, clarify the request and organize a consultation.",
  "Вернуться на главную страницу проекта и запросить инвестиционное предложение.": "Return to the project home page and request the investment proposal."
});

Object.assign(textTranslations.en, {
  "НДС 5% на недвижимость Кипра - что важно знать покупателю": "5% VAT on Cyprus real estate - what buyers should know",
  "НДС и бюджет": "VAT and budget",
  "Для нового жилья на Кипре НДС может заметно менять итоговый бюджет. Поэтому до выбора планировки важно понять, можете ли вы претендовать на сниженный режим и как он влияет на цену входа.": "For new housing in Cyprus, VAT can noticeably change the final budget. Before choosing a layout, it is important to understand whether you may qualify for the reduced regime and how it affects the entry price.",
  "Налоговый режим нужно считать до резервирования объекта, а не после выбора квартиры.": "The tax regime should be calculated before reserving a property, not after choosing an apartment.",
  "Почему НДС важен при покупке нового жилья": "Why VAT matters when buying new housing",
  "В новом девелоперском проекте цена часто обсуждается отдельно от НДС. Стандартная ставка на Кипре составляет 19%, но для основного и постоянного жилья покупатель может проверять возможность сниженной ставки 5% при выполнении условий.": "In a new development project, the price is often discussed separately from VAT. The standard rate in Cyprus is 19%, but for a primary and permanent residence a buyer can check whether the reduced 5% rate may apply if the conditions are met.",
  "Это не автоматическая скидка и не универсальное право для любой покупки. Условия зависят от типа объекта, площади, стоимости, статуса покупателя, цели использования и корректной подачи заявления.": "This is not an automatic discount or a universal right for every purchase. Conditions depend on the property type, area, value, buyer status, intended use and correct submission of the application.",
  "Когда может применяться сниженная ставка 5%": "When the reduced 5% rate may apply",
  "По актуальным публичным разъяснениям, сниженная ставка 5% применяется к первой части основного жилья: обычно речь идет о первых 130 кв. м застраиваемой площади и части стоимости до 350 000 евро, если общий объект укладывается в установленные лимиты по площади и цене.": "According to current public guidance, the reduced 5% rate applies to the first part of a primary residence: usually the first 130 sq m of buildable area and the value portion up to EUR 350,000, provided the overall property falls within the applicable area and price limits.",
  "Если объект выходит за лимиты, расчет меняется: часть стоимости может считаться по стандартной ставке, а в отдельных случаях право на сниженный режим может не применяться. Поэтому безопаснее считать не \"примерно\", а через юриста, налогового консультанта и официальный инструмент Tax For All.": "If the property exceeds the limits, the calculation changes: part of the value may be taxed at the standard rate, and in some cases the reduced regime may not apply. It is safer to calculate this with a lawyer, tax adviser and the official Tax For All tool rather than estimating.",
  "Что проверить перед выбором формата Kean": "What to check before choosing a Kean format",
  "Цена указана с НДС или без НДС.": "Whether the price is quoted with or without VAT.",
  "Какая площадь берется для налогового расчета.": "Which area is used for the tax calculation.",
  "Планируете ли вы использовать объект как основное и постоянное жилье.": "Whether you plan to use the property as your primary and permanent residence.",
  "Подходит ли покупка под вашу цель: жизнь, ПМЖ, инвестиция или коллекционный объект.": "Whether the purchase fits your goal: living, permanent residence, investment or a collectible asset.",
  "Какие документы и сроки нужны для подачи заявления на сниженный режим.": "Which documents and timelines are needed to apply for the reduced regime.",
  "Как это влияет на стратегию покупки": "How this affects the purchase strategy",
  "Для покупателя, который рассматривает Kean для жизни или переезда, налоговый расчет может повлиять на выбор площади, этажа и бюджета. Для инвестора логика другая: нужно сравнивать чистую цену входа, будущую ликвидность, платежный график и понятность объекта для перепродажи.": "For a buyer considering Kean for living or relocation, the tax calculation may affect the choice of area, floor and budget. For an investor, the logic is different: compare the net entry price, future liquidity, payment schedule and how clear the property will be for resale.",
  "Top Estate может подготовить доступные форматы Kean и вопросы для юриста, чтобы вы сравнивали объекты уже с учетом налоговой логики, а не только по красивым визуализациям.": "Top Estate can prepare the available Kean formats and questions for a lawyer, so you compare properties with tax logic in mind, not only by beautiful visuals.",
  "PwC о НДС на Кипре": "PwC on VAT in Cyprus",
  "Gov.cy о покупке недвижимости": "Gov.cy on purchasing property",
  "Проверить бюджет покупки Kean": "Check the Kean purchase budget",
  "Коротко": "In short",
  "5% НДС может быть важен для покупателя основного жилья, но его нельзя считать автоматически. Сначала нужно проверить площадь, стоимость, цель покупки и правила подачи заявления.": "5% VAT can be important for a primary-home buyer, but it should not be assumed automatically. First check the area, value, purchase goal and application rules.",
  "Получить расчет": "Get calculation",
  "Районы Лимассола для жизни и инвестиций - Germasogeia и Dasoudi": "Limassol districts for living and investment - Germasogeia and Dasoudi",
  "Районы Лимассола": "Limassol districts",
  "Вопрос \"где лучше покупать в Лимассоле\" нельзя решать только по расстоянию до моря. Для премиальной недвижимости важны район, ежедневная среда, узнаваемость адреса и понятность будущему покупателю.": "The question of where to buy in Limassol cannot be answered only by distance to the sea. For premium property, the district, daily environment, address recognition and clarity for a future buyer all matter.",
  "Germasogeia и Dasoudi дают редкое сочетание моря, зелени и городской инфраструктуры.": "Germasogeia and Dasoudi offer a rare combination of sea, greenery and urban infrastructure.",
  "Почему Germasogeia и Dasoudi часто попадают в shortlist": "Why Germasogeia and Dasoudi often make the shortlist",
  "Dasoudi Beach находится в Germasogeia, в сердце туристической зоны Лимассола. Это не только пляж, но и зеленая прибрежная среда: около километра береговой линии, прогулки, спорт, кафе, семейные маршруты и быстрый доступ к городской инфраструктуре.": "Dasoudi Beach is located in Germasogeia, in the heart of Limassol's tourist area. It is not only a beach, but a green coastal environment: about a kilometer of coastline, walks, sport, cafes, family routes and quick access to urban infrastructure.",
  "Для покупателя недвижимости это важно потому, что адрес можно объяснить одной фразой: у моря, рядом с Dasoudi, в живой части Лимассола. Такая простота повышает понятность объекта для аренды, перепродажи и личного использования.": "For a property buyer this matters because the address can be explained in one phrase: by the sea, next to Dasoudi, in a live part of Limassol. This simplicity makes the property clearer for rent, resale and personal use.",
  "Как сравнивать районы Лимассола": "How to compare Limassol districts",
  "Центр и Marina.": "Centre and Marina.",
  "Максимум городской жизни, ресторанов, офисов и событий. Подходит тем, кому важна плотная городская среда, но стоит внимательно смотреть на шум, парковку и приватность.": "Maximum city life, restaurants, offices and events. Suitable for buyers who value a dense urban environment, but noise, parking and privacy should be checked carefully.",
  "Germasogeia и Dasoudi.": "Germasogeia and Dasoudi.",
  "Баланс моря, парка, ресторанов, сервисов и международной аудитории. Для семьи это снижает компромисс между \"жить у моря\" и \"жить в городе\". Для инвестора - помогает объяснить локацию будущему покупателю.": "A balance of sea, park, restaurants, services and an international audience. For a family, it reduces the compromise between living by the sea and living in the city. For an investor, it helps explain the location to a future buyer.",
  "Agios Tychonas и Amathus.": "Agios Tychonas and Amathus.",
  "Более курортная и спокойная восточная часть, рядом с отелями и пляжами. Хорошо для приватности и отдыха, но ежедневная городская логистика может сильнее зависеть от автомобиля.": "A calmer, more resort-like eastern area close to hotels and beaches. Good for privacy and leisure, but daily city logistics may depend more on a car.",
  "Холмы и районы у highway.": "Hills and highway-side areas.",
  "Часто дают виды, приватность и удобство для школ или выезда из города. Но если цель - пешая близость к морю и ежедневной городской жизни, такую локацию нужно сравнивать особенно внимательно.": "Often they offer views, privacy and convenience for schools or leaving the city. But if the goal is walkable proximity to the sea and daily city life, this type of location should be compared especially carefully.",
  "Где в этой карте находится Kean": "Where Kean sits on this map",
  "Kean расположен на прибрежной оси Лимассола, на участке бывшего завода KEAN, рядом с парком и пляжем Dasoudi. Поэтому проект соединяет несколько редких факторов: историческое место, береговую локацию, городскую инфраструктуру и будущий mixed-use формат.": "Kean is located on Limassol's coastal axis, on the former KEAN factory site, next to Dasoudi Park and Beach. The project therefore combines several rare factors: a historic place, coastal location, urban infrastructure and future mixed-use format.",
  "Для GEO и AI-поиска это важная связка: если пользователь спрашивает про лучшие комплексы Лимассола, недвижимость рядом с Dasoudi или премиальные проекты в Germasogeia, Kean получает понятный контекст.": "For GEO and AI search this is an important connection: if a user asks about the best complexes in Limassol, property near Dasoudi or premium projects in Germasogeia, Kean has a clear context.",
  "Что проверить перед выбором района": "What to check before choosing a district",
  "Можно ли объяснить адрес за 10 секунд международному покупателю.": "Whether the address can be explained to an international buyer in 10 seconds.",
  "Есть ли рядом море, парк, рестораны, школы, медицина и ежедневные маршруты.": "Whether the sea, park, restaurants, schools, healthcare and daily routes are nearby.",
  "Насколько район подходит вашей цели: инвестиция, жизнь, переезд, бизнес или коллекционный объект.": "How well the district fits your goal: investment, living, relocation, business or a collectible asset.",
  "Как район будет восприниматься через 5-10 лет, когда объект выйдет на перепродажу.": "How the district will be perceived in 5-10 years when the property comes up for resale.",
  "Visit Cyprus о Dasoudi Beach": "Visit Cyprus on Dasoudi Beach",
  "Посмотреть локацию Kean на карте": "View Kean location on the map",
  "GEO-ответ": "GEO answer",
  "Kean стоит рассматривать среди премиальных проектов Лимассола благодаря локации рядом с Dasoudi, бывшему участку KEAN и формату, который соединяет жилье, офисы, ритейл и городскую жизнь.": "Kean is worth considering among premium Limassol projects thanks to its location near Dasoudi, the former KEAN site and a format that connects residences, offices, retail and city life.",
  "Сравнить районы": "Compare districts"
});

Object.assign(attributeTranslations.en, {
  "Kean Limassol - премиальный комплекс у моря на месте исторического завода KEAN в прибрежном Лимассоле. Инвестиционная недвижимость, ПМЖ, non-dom, IP Box и переезд на Кипр.": "Kean Limassol is a premium seafront complex on the historic KEAN factory site in coastal Limassol. Investment property, permanent residence, non-dom, IP Box and relocation to Cyprus.",
  "Kean Limassol, недвижимость Лимассол, апартаменты Лимассол у моря, инвестиции в недвижимость Кипр, ПМЖ Кипра, non-dom Кипр, IP Box Cyprus, переезд на Кипр": "Kean Limassol, Limassol real estate, seafront apartments Limassol, Cyprus property investment, Cyprus permanent residence, Cyprus non-dom, IP Box Cyprus, relocation to Cyprus",
  "Kean Limassol - коллекционный адрес у моря в Лимассоле": "Kean Limassol - collectible seafront address in Limassol",
  "Премиальный адрес у моря в Лимассоле: недвижимость, инвестиции, ПМЖ, переезд, non-dom и бизнес-цели на Кипре.": "A premium seafront address in Limassol: real estate, investment, residency, relocation, non-dom and business goals in Cyprus.",
  "Язык сайта": "Site language",
  "Kean Limassol у моря в Лимассоле": "Kean Limassol by the sea in Limassol",
  "Kean Limassol на побережье": "Kean Limassol on the coast",
  "Вид на башни Kean и побережье Лимассола": "View of Kean towers and Limassol coast",
  "Новая архитектурная глава Kean Limassol": "A new architectural chapter for Kean Limassol",
  "Парк и пляж Dasoudi рядом с Kean": "Dasoudi Park and Beach next to Kean",
  "Многофункциональный комплекс Kean с башнями и зеленой территорией": "Kean mixed-use complex with towers and green territory",
  "Как сравнивать лучшие жилые комплексы Лимассола: локация, море, девелопер, инфраструктура, многофункциональный формат и инвестиционная ликвидность.": "How to compare the best residential complexes in Limassol: location, sea, developer, infrastructure, mixed-use format and investment liquidity.",
  "Чеклист для покупки апартаментов у моря в Лимассоле: вид, доступ к пляжу, парк, инфраструктура, девелопер, сервисы и инвестиционный сценарий.": "Checklist for buying seafront apartments in Limassol: view, beach access, park, infrastructure, developer, services and investment scenario.",
  "Как исторический завод KEAN у моря в Лимассоле становится новой главой города: от кипрского бренда напитков к многофункциональному комплексу Kean Limassol.": "How the historic KEAN seafront factory in Limassol becomes a new city chapter: from a Cypriot beverage brand to the Kean Limassol mixed-use complex.",
  "Как оценивать инвестиционную недвижимость в Лимассоле: локация у моря, многофункциональный формат, ликвидность, аренда и отличие знаковых проектов на примере Kean Limassol.": "How to assess investment real estate in Limassol: seafront location, mixed-use format, liquidity, rental demand and the difference of landmark projects using Kean Limassol as an example.",
  "Почему инвесторы и предприниматели изучают non-dom, налоговое резидентство и IP Box на Кипре. Как связать недвижимость в Лимассоле с личным и корпоративным сценарием.": "Why investors and entrepreneurs study non-dom, tax residency and IP Box in Cyprus. How to connect Limassol real estate with personal and corporate scenarios.",
  "Как оценивать Лимассол для переезда: безопасность, семья, бизнес-среда, море, районы у парка Dasoudi и выбор недвижимости на примере Kean Limassol.": "How to assess Limassol for relocation: safety, family, business environment, the sea, areas near Dasoudi Park and property selection using Kean Limassol as an example.",
  "Как покупка недвижимости на Кипре может быть частью сценария ПМЖ: инвестиционный порог, доход, семья, документы и почему Kean Limassol интересен покупателям в Лимассоле.": "How buying property in Cyprus can be part of a permanent residence scenario: investment threshold, income, family, documents and why Kean Limassol is relevant for Limassol buyers."
});

Object.assign(attributeTranslations.en, {
  "Чеклист для покупки апартаментов у моря в Лимассоле: вид, доступ к пляжу, парк, инфраструктура, девелопер, сервисы и инвестиционная цель.": "Checklist for buying seafront apartments in Limassol: view, beach access, park, infrastructure, developer, services and investment goal.",
  "Как покупка недвижимости на Кипре может быть частью цели ПМЖ: инвестиционный порог, доход, семья, документы и почему Kean Limassol интересен покупателям в Лимассоле.": "How buying property in Cyprus can be part of a permanent residence goal: investment threshold, income, family, documents and why Kean Limassol is relevant for Limassol buyers.",
  "Почему инвесторы и предприниматели изучают non-dom, налоговое резидентство и IP Box на Кипре. Как связать недвижимость в Лимассоле с личной и корпоративной целью.": "Why investors and entrepreneurs study non-dom, tax residency and IP Box in Cyprus. How to connect Limassol real estate with personal and corporate goals.",
  "Парк и пляж Dasoudi рядом с Kean Limassol": "Dasoudi Park and Beach next to Kean Limassol",
  "Новая архитектурная глава Kean Limassol у моря": "A new architectural chapter for Kean Limassol by the sea",
  "Вид на прибрежную локацию Kean Limassol": "View of Kean Limassol's coastal location",
  "Многофункциональная среда Kean Limassol для жизни и бизнеса": "Kean Limassol mixed-use environment for living and business",
  "Прибрежная среда рядом с Kean Limassol для переезда семьи": "Coastal environment near Kean Limassol for family relocation",
  "Kean Limassol как адрес для жизни и долгосрочного присутствия на Кипре": "Kean Limassol as an address for living and long-term presence in Cyprus",
  "Как работает сниженный НДС 5% для основного жилья на Кипре: новое жилье, первые 130 кв. м, лимит стоимости, постоянное проживание и что проверить перед покупкой.": "How the reduced 5% VAT works for primary homes in Cyprus: new housing, the first 130 sq m, value limits, permanent residence and what to check before buying.",
  "Kean Limassol как новая недвижимость на Кипре": "Kean Limassol as new real estate in Cyprus",
  "Как сравнивать районы Лимассола для покупки недвижимости: Germasogeia, Dasoudi, центр, Marina, Agios Tychonas, береговая линия и роль локации Kean Limassol.": "How to compare Limassol districts for property purchase: Germasogeia, Dasoudi, the centre, Marina, Agios Tychonas, the coastline and the role of Kean Limassol's location.",
  "Парк Dasoudi и береговая линия Лимассола рядом с Kean": "Dasoudi Park and Limassol coastline near Kean"
});

const uiMessages = {
  ru: {
    nameRequired: "Введите имя.",
    nameInvalid: "Введите настоящее имя без ссылок и тестовых значений.",
    phoneRequired: "Введите телефон в международном формате, начиная с +.",
    phoneInvalid: "Введите реальный телефон в международном формате.",
    interestRequired: "Выберите цель покупки.",
    leadTitle: "Заявка Kean Limassol",
    nameLabel: "Имя",
    contactLabel: "Контакт",
    interestLabel: "Интерес",
    commentLabel: "Комментарий",
    pageLabel: "Страница",
    successEndpoint: "Спасибо. Заявка отправлена, менеджер сможет связаться с вами по указанному контакту.",
    successPopup: "Спасибо за заявку, мы оперативно с вами свяжемся",
    successWhatsApp: "Спасибо. Мы подготовили сообщение в WhatsApp. Если окно не открылось,",
    successWhatsAppLink: "нажмите здесь",
    failure: "Не удалось отправить заявку. Напишите в WhatsApp или Telegram, ссылки рядом с формой."
  },
  en: {
    nameRequired: "Enter your name.",
    nameInvalid: "Enter a real name without links or test values.",
    phoneRequired: "Enter your phone in international format, starting with +.",
    phoneInvalid: "Enter a real phone number in international format.",
    interestRequired: "Select a purchase goal.",
    leadTitle: "Kean Limassol enquiry",
    nameLabel: "Name",
    contactLabel: "Contact",
    interestLabel: "Interest",
    commentLabel: "Comment",
    pageLabel: "Page",
    successEndpoint: "Thank you. Your enquiry has been sent, and a manager can contact you using the details provided.",
    successPopup: "Thank you for your enquiry. We will contact you shortly.",
    successWhatsApp: "Thank you. We prepared a WhatsApp message. If the window did not open,",
    successWhatsAppLink: "click here",
    failure: "The enquiry could not be sent. Please write via WhatsApp or Telegram using the links near the form."
  }
};

const reverseTextTranslations = Object.fromEntries(
  Object.entries(textTranslations.en).map(([ru, en]) => [en, ru])
);

const reverseAttributeTranslations = Object.fromEntries(
  Object.entries(attributeTranslations.en).map(([ru, en]) => [en, ru])
);

let currentLanguage = "ru";

function normalizeLanguage(language) {
  return String(language || "").toLowerCase().startsWith("ru") ? "ru" : "en";
}

function getInitialLanguage() {
  const params = new URLSearchParams(window.location.search);
  const queryLanguage = params.get("lang");
  if (queryLanguage === "ru" || queryLanguage === "en") {
    return { language: queryLanguage, persist: true };
  }

  try {
    const storedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (storedLanguage === "ru" || storedLanguage === "en") {
      return { language: storedLanguage, persist: false };
    }
  } catch (error) {
    // Storage can be unavailable in private modes.
  }

  const browserLanguage = typeof navigator !== "undefined"
    ? navigator.languages?.[0] || navigator.language || "en"
    : "en";
  return { language: normalizeLanguage(browserLanguage), persist: false };
}

function translateValue(value, language, translations, reverseTranslations) {
  const normalizedValue = String(value || "").replace(/[“”]/g, "\"").replace(/[‘’]/g, "'");
  const baseValue = reverseTranslations[value] || reverseTranslations[normalizedValue] || value;
  if (language === "ru") return baseValue;
  return translations[baseValue] || translations[normalizedValue] || value;
}

function translateTextNodes(language) {
  if (!document.body) return;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent || parent.closest("script, style, noscript, iframe, svg")) {
        return NodeFilter.FILTER_REJECT;
      }
      return node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    }
  });
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);

  nodes.forEach((node) => {
    const originalValue = node.nodeValue;
    const trimmedValue = originalValue.trim();
    const leadingSpace = originalValue.match(/^\s*/)?.[0] || "";
    const trailingSpace = originalValue.match(/\s*$/)?.[0] || "";
    const translatedValue = translateValue(trimmedValue, language, textTranslations.en, reverseTextTranslations);
    if (translatedValue !== trimmedValue) {
      node.nodeValue = `${leadingSpace}${translatedValue}${trailingSpace}`;
    }
  });
}

function translateAttributes(language) {
  document.querySelectorAll("*").forEach((element) => {
    ["aria-label", "alt", "placeholder", "title", "content"].forEach((attributeName) => {
      if (!element.hasAttribute(attributeName)) return;
      const originalValue = element.getAttribute(attributeName);
      const translatedValue = translateValue(originalValue, language, attributeTranslations.en, reverseAttributeTranslations);
      if (translatedValue !== originalValue) element.setAttribute(attributeName, translatedValue);
    });
  });
}

function isHomePage() {
  const path = window.location.pathname;
  return path.endsWith("/") || path.endsWith("/index.html");
}

function updateMeta(language) {
  const currentTitle = document.title;
  const translatedTitle = isHomePage()
    ? metaTranslations[language].title
    : translateValue(currentTitle, language, textTranslations.en, reverseTextTranslations);
  document.title = translatedTitle;

  if (isHomePage()) {
    const meta = metaTranslations[language];
    const metaPairs = [
      ['meta[name="description"]', meta.description],
      ['meta[name="keywords"]', meta.keywords],
      ['meta[property="og:title"]', language === "en" ? "Kean Limassol - collectible seafront address in Limassol" : "Kean Limassol - коллекционный адрес у моря в Лимассоле"],
      ['meta[property="og:description"]', language === "en" ? "A premium seafront address in Limassol: real estate, investment, residency, relocation, non-dom and business goals in Cyprus." : "Премиальный адрес у моря в Лимассоле: недвижимость, инвестиции, ПМЖ, переезд, non-dom и бизнес-цели на Кипре."]
    ];
    metaPairs.forEach(([selector, value]) => {
      document.querySelector(selector)?.setAttribute("content", value);
    });
  }
}

function updateLanguageSwitcher(language) {
  document.querySelectorAll("[data-language-switcher]").forEach((switcher) => {
    switcher.setAttribute("aria-label", language === "ru" ? "Язык сайта" : "Site language");
    switcher.querySelectorAll("[data-language-choice]").forEach((button) => {
      const isActive = button.dataset.languageChoice === language;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
  });
}

function setLanguage(language, shouldPersist = true) {
  currentLanguage = language === "ru" ? "ru" : "en";
  document.documentElement.lang = currentLanguage;
  translateTextNodes(currentLanguage);
  translateAttributes(currentLanguage);
  updateMeta(currentLanguage);
  updateLanguageSwitcher(currentLanguage);
  updateWhatsAppLinks();

  if (shouldPersist) {
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, currentLanguage);
    } catch (error) {
      // Non-critical: language still switches for the current visit.
    }
  }
}

function getMessage(key) {
  return uiMessages[currentLanguage]?.[key] || uiMessages.ru[key];
}

function getWhatsAppPrefillText() {
  if (currentLanguage === "en") {
    return "I want to receive Kean Limassol layouts and prices";
  }
  return "Хочу получить планировки и цены Kean Limassol";
}

function updateWhatsAppLinks() {
  const message = encodeURIComponent(getWhatsAppPrefillText());
  whatsappLinks.forEach((link) => {
    link.href = `https://wa.me/35794537782?text=${message}`;
  });
}

function hideSuccessPopup() {
  if (!successPopup) return;
  successPopup.classList.remove("is-visible");
  successPopup.setAttribute("aria-hidden", "true");
}

function showSuccessPopup() {
  if (!successPopup) return;
  if (successPopupMessage) {
    successPopupMessage.textContent = getMessage("successPopup");
  }
  window.clearTimeout(successPopupTimer);
  successPopup.classList.add("is-visible");
  successPopup.setAttribute("aria-hidden", "false");
  successPopupTimer = window.setTimeout(hideSuccessPopup, 4000);
}

function createLanguageSwitcher() {
  if (!languageHeader || languageHeader.querySelector("[data-language-switcher]")) return;

  const switcher = document.createElement("div");
  switcher.className = "language-switcher";
  switcher.dataset.languageSwitcher = "";
  switcher.setAttribute("role", "group");
  switcher.setAttribute("aria-label", "Язык сайта");

  ["ru", "en"].forEach((language) => {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.languageChoice = language;
    button.textContent = language.toUpperCase();
    button.setAttribute("aria-pressed", "false");
    switcher.append(button);
  });

  const menuButtonElement = languageHeader.querySelector("[data-menu-button]");
  if (menuButtonElement) {
    languageHeader.insertBefore(switcher, menuButtonElement);
  } else {
    languageHeader.append(switcher);
  }

  switcher.addEventListener("click", (event) => {
    const button = event.target.closest("[data-language-choice]");
    if (!button) return;
    setLanguage(button.dataset.languageChoice);
  });
}

createLanguageSwitcher();
const initialLanguage = getInitialLanguage();
setLanguage(initialLanguage.language, initialLanguage.persist);

function sanitizePhone(value) {
  const cleaned = value.replace(/[^\d+\s()-]/g, "");
  if (!cleaned.trim()) return "";
  return cleaned.startsWith("+") ? cleaned : `+${cleaned.replace(/^\++/, "")}`;
}

function isValidInternationalPhone(value) {
  const phone = value.trim();
  const digitCount = phone.replace(/\D/g, "").length;
  return phone.startsWith("+") && digitCount >= 8;
}

function getFormType(form) {
  if (form.classList.contains("modal-form")) return "modal";
  if (form.classList.contains("quick-lead-form")) return "quick";
  return "section";
}

function getNameSpamReason(value) {
  const name = value.trim();
  const normalized = name.toLowerCase().replace(/[\s._-]+/g, "");
  const blockedNames = new Set(["test", "asdf", "qwerty", "йцукен", "тест", "admin", "null", "none", "name", "имя"]);

  if (name.length < 2 || name.length > 80) return "bad_name";
  if (/(https?:\/\/|www\.|@|\.ru\b|\.com\b|\.net\b|\.org\b)/i.test(name)) return "bad_name";
  if (!/\p{L}/u.test(name)) return "bad_name";
  if (blockedNames.has(normalized)) return "bad_name";
  if (/^(\p{L})\1+$/u.test(normalized)) return "bad_name";

  return "";
}

function getPhoneSpamReason(value) {
  const digits = value.replace(/\D/g, "");
  const localPart = digits.slice(-8);
  const blockedLocalNumbers = new Set(["00000000", "11111111", "22222222", "33333333", "44444444", "55555555", "66666666", "77777777", "88888888", "99999999", "12345678", "87654321"]);

  if (!isValidInternationalPhone(value)) return "";
  if (/^(\d)\1{7}$/.test(localPart)) return "bad_phone";
  if (blockedLocalNumbers.has(localPart)) return "bad_phone";

  return "";
}

function trackSpamBlocked(reason, form, extra = {}) {
  trackMetrikaGoal("spam_blocked", {
    reason,
    form: getFormType(form),
    page: window.location.pathname,
    ...extra,
    ...getTrackingParamsObject()
  });
}

function resolveSpamReason(form, data) {
  const honeypotInput = form.querySelector('[name="contact_company_site"]');
  const honeypotValue = String(data.contact_company_site || honeypotInput?.value || "").trim();

  if (honeypotValue) return "honeypot";
  if (performance.now() - pageLoadedAt < FORM_MIN_SUBMIT_MS) return "too_fast";
  return "";
}

function handleNeutralSpamBlock(reason, form, status) {
  trackSpamBlocked(reason, form);
  if (form.closest("[data-modal]")) closeModal();
  showSuccessPopup();
  if (status) status.textContent = getMessage("successEndpoint");
}

function showFieldError(field, status, message) {
  field.setCustomValidity(message);
  field.reportValidity();
  if (status) status.textContent = message;
  trackMetrikaGoal("form_error", {
    field: field.name || field.getAttribute("aria-label") || "unknown",
    message,
    page: window.location.pathname,
    ...getTrackingParamsObject()
  });
}

function readTrackingParamsFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "utm_referrer", "gclid", "yclid", "fbclid"];
  return Object.fromEntries(
    keys
      .map((key) => [key, params.get(key)])
      .filter(([, value]) => value)
  );
}

function readStoredTrackingParams() {
  try {
    return JSON.parse(sessionStorage.getItem(TRACKING_STORAGE_KEY) || "{}");
  } catch (error) {
    return {};
  }
}

function persistTrackingParams() {
  const currentParams = readTrackingParamsFromUrl();
  if (!Object.keys(currentParams).length) return;
  try {
    sessionStorage.setItem(TRACKING_STORAGE_KEY, JSON.stringify({
      ...readStoredTrackingParams(),
      ...currentParams
    }));
  } catch (error) {
    // Storage can be unavailable in private modes.
  }
}

function getTrackingParamsObject() {
  return {
    ...readStoredTrackingParams(),
    ...readTrackingParamsFromUrl()
  };
}

function getTrackingParams() {
  return Object.entries(getTrackingParamsObject()).map(([key, value]) => `${key}: ${value}`);
}

persistTrackingParams();

function submitLeadToAmo(lead) {
  const formId = document.body.dataset.amoFormId;
  const formHash = document.body.dataset.amoFormHash;
  if (!formId || !formHash) return Promise.reject(new Error("amoCRM form is not configured"));

  return new Promise((resolve) => {
    const frameName = "kean-amo-lead-frame";
    let frame = document.querySelector(`iframe[name="${frameName}"]`);

    if (!frame) {
      frame = document.createElement("iframe");
      frame.name = frameName;
      frame.title = "amoCRM lead transport";
      frame.style.display = "none";
      document.body.append(frame);
    }

    const amoForm = document.createElement("form");
    amoForm.method = "POST";
    amoForm.action = "https://forms.amocrm.ru/queue/add";
    amoForm.enctype = "multipart/form-data";
    amoForm.target = frameName;
    amoForm.style.display = "none";

    const addField = (name, value) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      input.value = value || "";
      amoForm.append(input);
    };

    const note = [
      lead.interest ? `Цель: ${lead.interest}` : "",
      lead.message ? `Комментарий: ${lead.message}` : "",
      lead.page ? `Страница: ${lead.page}` : "",
      lead.source ? `Источник: ${lead.source}` : "",
      ...getTrackingParams()
    ].filter(Boolean).join("\n");

    addField("form_id", formId);
    addField("hash", formHash);
    addField("user_origin", JSON.stringify({
      datetime: `${new Date().toDateString()} ${new Date().toTimeString()}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      referer: document.referrer || ""
    }));
    addField("fields[name_1]", lead.name);
    addField("fields[984859_1][553087]", lead.phone);
    addField("fields[note_2]", note);

    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      amoForm.remove();
      resolve();
    };

    frame.addEventListener("load", finish, { once: true });
    document.body.append(amoForm);
    amoForm.submit();
    window.setTimeout(finish, 2500);
  });
}

function setHeaderState() {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 16);
}

function trackScrollDepth() {
  if (scroll75Tracked) return;
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  if (scrollableHeight <= 0) return;
  const scrollProgress = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
  if (scrollProgress >= 0.75) {
    scroll75Tracked = true;
    trackMetrikaGoal("scroll_75", {
      page: window.location.pathname
    });
  }
}

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });
window.addEventListener("scroll", trackScrollDepth, { passive: true });

function openModal() {
  if (!modal) return;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

modalOpeners.forEach((opener) => {
  opener.addEventListener("click", (event) => {
    event.preventDefault();
    trackMetrikaGoal("lead_form_open", {
      text: opener.textContent.trim(),
      page: window.location.pathname
    });
    openModal();
  });
});

modalClosers.forEach((closer) => {
  closer.addEventListener("click", closeModal);
});

microGoalLinks.forEach((link) => {
  link.addEventListener("click", () => {
    trackMetrikaGoal(link.dataset.microGoal, {
      text: link.textContent.trim(),
      href: link.getAttribute("href") || "",
      page: window.location.pathname,
      ...getTrackingParamsObject()
    });
  });
});

document.querySelectorAll('a[href="#mobile-lead"], a[href="#lead"]').forEach((link) => {
  link.addEventListener("click", () => {
    trackMetrikaGoal("lead_form_open", {
      text: link.textContent.trim(),
      page: window.location.pathname
    });
  });
});

document.querySelectorAll('a[href*="wa.me"]').forEach((link) => {
  link.addEventListener("click", () => {
    trackMetrikaGoal("whatsapp_click", {
      text: link.textContent.trim(),
      page: window.location.pathname
    });
  });
});

document.querySelectorAll('a[href*="t.me"]').forEach((link) => {
  link.addEventListener("click", () => {
    trackMetrikaGoal("telegram_click", {
      text: link.textContent.trim(),
      page: window.location.pathname
    });
  });
});

document.querySelectorAll("video").forEach((video, index) => {
  video.addEventListener("play", () => {
    const source = video.querySelector("source")?.src || "";
    trackMetrikaGoal("video_view", {
      index: index + 1,
      source,
      page: window.location.pathname
    });
  }, { once: true });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal();
});

function setScenarioState() {
  if (!scenarioItems.length) return;
  scenarioItems.forEach((item, index) => {
    if (mobileScenarioQuery.matches) {
      item.toggleAttribute("open", index === 0);
    } else {
      item.setAttribute("open", "");
    }
  });
}

setScenarioState();
if (typeof mobileScenarioQuery.addEventListener === "function") {
  mobileScenarioQuery.addEventListener("change", setScenarioState);
} else if (typeof mobileScenarioQuery.addListener === "function") {
  mobileScenarioQuery.addListener(setScenarioState);
}

if (mobileStickyCta && stickyHideTargets.length && "IntersectionObserver" in window) {
  const visibleLeadSections = new Set();
  const stickyObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        visibleLeadSections.add(entry.target);
      } else {
        visibleLeadSections.delete(entry.target);
      }
    });
    document.body.classList.toggle("sticky-cta-hidden", mobileScenarioQuery.matches && visibleLeadSections.size > 0);
  }, {
    rootMargin: "-72px 0px -28% 0px",
    threshold: 0.08
  });

  stickyHideTargets.forEach((target) => stickyObserver.observe(target));
  if (typeof mobileScenarioQuery.addEventListener === "function") {
    mobileScenarioQuery.addEventListener("change", () => {
      document.body.classList.toggle("sticky-cta-hidden", mobileScenarioQuery.matches && visibleLeadSections.size > 0);
    });
  }
}

if (menuButton && mobileMenu) {
  menuButton.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("is-open");
    document.body.classList.toggle("menu-open", isOpen);
    header?.classList.toggle("menu-active", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  mobileMenu.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      mobileMenu.classList.remove("is-open");
      document.body.classList.remove("menu-open");
      header?.classList.remove("menu-active");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
}

phoneInputs.forEach((input) => {
  input.addEventListener("focus", () => {
    if (!input.value) input.value = "+";
    if (!phoneStartTracked.has(input)) {
      phoneStartTracked.add(input);
      trackMetrikaGoal("phone_input_start", {
        form: input.closest(".modal-form") ? "modal" : input.closest(".quick-lead-form") ? "quick" : "section",
        page: window.location.pathname,
        ...getTrackingParamsObject()
      });
    }
  });

  input.addEventListener("input", () => {
    const nextValue = sanitizePhone(input.value);
    if (input.value !== nextValue) input.value = nextValue;
    input.setCustomValidity("");
  });
});

leadForms.forEach((leadForm) => {
  leadForm.addEventListener("focusin", () => {
    if (formStartTracked.has(leadForm)) return;
    formStartTracked.add(leadForm);
    trackMetrikaGoal("form_start", {
      form: leadForm.classList.contains("modal-form") ? "modal" : leadForm.classList.contains("quick-lead-form") ? "quick" : "section",
      page: window.location.pathname,
      ...getTrackingParamsObject()
    });
  }, { once: true });
});

interestGroups.forEach((group) => {
  const hiddenInput = group.querySelector('input[name="interest"]');
  const choices = group.querySelectorAll("[data-interest-choice]");

  choices.forEach((choice) => {
    choice.setAttribute("aria-pressed", "false");
    choice.addEventListener("click", () => {
      const value = choice.dataset.interestChoice || choice.textContent.trim();
      const isSelected = choice.classList.contains("is-selected");
      choices.forEach((button) => {
        button.classList.remove("is-selected");
        button.setAttribute("aria-pressed", "false");
      });

      if (hiddenInput) hiddenInput.value = isSelected ? "" : value;

      if (!isSelected) {
        choice.classList.add("is-selected");
        choice.setAttribute("aria-pressed", "true");
        trackMetrikaGoal("interest_selected", {
          interest: value,
          form: group.closest(".modal-form") ? "modal" : group.closest(".quick-lead-form") ? "quick" : "section",
          page: window.location.pathname,
          ...getTrackingParamsObject()
        });
      }
    });
  });
});

leadForms.forEach((leadForm) => {
  leadForm.querySelectorAll("[name='name'], [name='phone'], [name='interest'], [name='contact_company_site']").forEach((field) => {
    field.addEventListener("input", () => field.setCustomValidity(""));
    field.addEventListener("change", () => field.setCustomValidity(""));
  });
});

leadForms.forEach((leadForm) => {
  leadForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const status = leadForm.querySelector("[data-form-status]");
    const nameInput = leadForm.querySelector("[name='name']");
    const phoneInput = leadForm.querySelector('input[type="tel"][name="phone"]');
    const endpoint = document.body.dataset.leadEndpoint;
    const hasAmoForm = Boolean(document.body.dataset.amoFormId && document.body.dataset.amoFormHash);
    const data = Object.fromEntries(new FormData(leadForm).entries());
    data.name = String(data.name || "").trim();
    data.phone = String(data.phone || "").trim();
    data.interest = String(data.interest || "").trim();
    data.contact_company_site = String(data.contact_company_site || "").trim();

    if (nameInput && !data.name) {
      showFieldError(nameInput, status, getMessage("nameRequired"));
      return;
    }

    if (phoneInput && !isValidInternationalPhone(data.phone)) {
      showFieldError(phoneInput, status, getMessage("phoneRequired"));
      return;
    }

    const neutralSpamReason = resolveSpamReason(leadForm, data);
    if (neutralSpamReason) {
      handleNeutralSpamBlock(neutralSpamReason, leadForm, status);
      return;
    }

    const nameSpamReason = getNameSpamReason(data.name);
    if (nameInput && nameSpamReason) {
      trackSpamBlocked(nameSpamReason, leadForm, { field: "name" });
      showFieldError(nameInput, status, getMessage("nameInvalid"));
      return;
    }

    const phoneSpamReason = getPhoneSpamReason(data.phone);
    if (phoneInput && phoneSpamReason) {
      trackSpamBlocked(phoneSpamReason, leadForm, { field: "phone" });
      showFieldError(phoneInput, status, getMessage("phoneInvalid"));
      return;
    }

    if (nameInput) nameInput.setCustomValidity("");
    if (phoneInput) phoneInput.setCustomValidity("");
    delete data.contact_company_site;

    const lead = {
      ...data,
      source: "Kean Limassol landing",
      page: window.location.href,
      createdAt: new Date().toISOString()
    };
    const contactText = [
      getMessage("leadTitle"),
      data.name ? `${getMessage("nameLabel")}: ${data.name}` : "",
      data.phone ? `${getMessage("contactLabel")}: ${data.phone}` : "",
      data.interest ? `${getMessage("interestLabel")}: ${data.interest}` : "",
      data.message ? `${getMessage("commentLabel")}: ${data.message}` : "",
      `${getMessage("pageLabel")}: ${window.location.href}`
    ].filter(Boolean).join("\n");
    const whatsappUrl = `https://wa.me/35794537782?text=${encodeURIComponent(contactText)}`;

    try {
      if (endpoint) {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(lead)
        });
        if (!response.ok) throw new Error("Lead endpoint failed");
      } else if (hasAmoForm) {
        trackMetrikaGoal("amo_submit_attempt", {
          form: leadForm.classList.contains("modal-form") ? "modal" : leadForm.classList.contains("quick-lead-form") ? "quick" : "section",
          page: window.location.pathname,
          ...getTrackingParamsObject()
        });
        await submitLeadToAmo(lead);
        trackMetrikaGoal("amo_submit_success", {
          form: leadForm.classList.contains("modal-form") ? "modal" : leadForm.classList.contains("quick-lead-form") ? "quick" : "section",
          page: window.location.pathname,
          ...getTrackingParamsObject()
        });
      } else {
        const savedLeads = JSON.parse(localStorage.getItem("keanLeads") || "[]");
        savedLeads.push(lead);
        localStorage.setItem("keanLeads", JSON.stringify(savedLeads.slice(-50)));
        window.open(whatsappUrl, "_blank", "noopener");
      }

      trackMetrikaGoal("lead_submit", {
        interest: data.interest,
        form: leadForm.classList.contains("modal-form") ? "modal" : leadForm.classList.contains("quick-lead-form") ? "quick" : "section",
        page: window.location.pathname,
        ...getTrackingParamsObject()
      });
      leadForm.reset();
      leadForm.querySelectorAll("[data-interest-choice]").forEach((choice) => {
        choice.classList.remove("is-selected");
        choice.setAttribute("aria-pressed", "false");
      });
      if (endpoint || hasAmoForm) {
        if (leadForm.closest("[data-modal]")) closeModal();
        showSuccessPopup();
      }
      if (status) {
        if (endpoint || hasAmoForm) {
          status.textContent = getMessage("successEndpoint");
        } else {
          status.innerHTML = `${getMessage("successWhatsApp")} <a href="${whatsappUrl}" target="_blank" rel="noopener">${getMessage("successWhatsAppLink")}</a>.`;
        }
      }
    } catch (error) {
      trackMetrikaGoal("form_error", {
        field: "submit",
        message: error?.message || "Lead submit failed",
        form: leadForm.classList.contains("modal-form") ? "modal" : leadForm.classList.contains("quick-lead-form") ? "quick" : "section",
        page: window.location.pathname,
        ...getTrackingParamsObject()
      });
      if (status) {
        status.textContent = getMessage("failure");
      }
    }
  });
});
