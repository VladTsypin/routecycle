"use client";

import { useEffect, useMemo, useState } from "react";
import { applyInterfaceLanguage } from "./i18n";
import Reveal from "./reveal";

const routes = {
  balanced: {
    label: "Сбалансированный",
    distance: "42,8 км",
    gravel: "68%",
    confidence: 92,
    time: "2:24",
    accent: "#f0542d",
    path: "M54 398 C116 352 123 285 206 279 C291 273 318 351 392 320 C458 292 448 199 528 180 C614 158 661 238 738 193 C796 160 815 99 898 82",
    altPath: "M54 398 C126 370 157 319 226 320 C309 322 338 388 412 352 C477 320 483 239 551 215 C630 187 688 249 756 214 C819 181 833 111 898 82",
    risks: [
      { x: 204, y: 280, level: "review", label: "Покрытие не указано" },
      { x: 529, y: 180, level: "warn", label: "ground · проверить" },
      { x: 738, y: 194, level: "safe", label: "gravel · подтверждено" },
    ],
  },
  scenic: {
    label: "Красивый",
    distance: "48,1 км",
    gravel: "81%",
    confidence: 84,
    time: "2:46",
    accent: "#3c6df0",
    path: "M54 398 C102 329 167 370 208 300 C251 227 312 245 350 188 C394 120 460 145 508 220 C550 287 626 290 659 211 C686 145 751 130 783 181 C817 235 851 141 898 82",
    altPath: "M54 398 C121 372 145 326 211 313 C290 297 321 352 388 323 C449 296 466 223 530 204 C612 179 664 248 741 213 C810 181 833 112 898 82",
    risks: [
      { x: 208, y: 300, level: "safe", label: "forest track" },
      { x: 350, y: 188, level: "warn", label: "grade4 · медленно" },
      { x: 659, y: 211, level: "review", label: "surface=missing" },
    ],
  },
  safe: {
    label: "Надёжный",
    distance: "45,3 км",
    gravel: "54%",
    confidence: 98,
    time: "2:18",
    accent: "#158367",
    path: "M54 398 C119 385 154 345 221 344 C299 341 351 378 416 338 C478 300 501 240 567 221 C644 199 702 238 766 196 C822 160 842 108 898 82",
    altPath: "M54 398 C119 385 154 345 221 344 C299 341 351 378 416 338 C478 300 501 240 567 221 C644 199 702 238 766 196 C822 160 842 108 898 82",
    risks: [
      { x: 221, y: 344, level: "safe", label: "gravel · подтверждено" },
      { x: 567, y: 221, level: "safe", label: "доступ разрешён" },
      { x: 766, y: 196, level: "safe", label: "smoothness=good" },
    ],
  },
};

const issueStats = [
  ["13 578", "подозрительных участков", "в исследовательском наборе по Эстонии"],
  ["1 016", "неопределённых отрезков", "в тестовой зоне Тарту"],
  ["7", "групп сигналов", "от доступа до видимости тропы"],
];

const feedbackEmail = ["gotlib58", "gmail.com"].join("@");

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h11M11 5l5 5-5 5" />
    </svg>
  );
}

function RouteMap({ route, showAlternative }) {
  return (
    <div className="map-stage" style={{ "--route-accent": route.accent }}>
      <div className="map-meta">
        <span>58.3776° N</span>
        <span>TARTU / OTEPÄÄ</span>
        <span>26.7290° E</span>
      </div>
      <svg
        className="map-svg"
        viewBox="0 0 960 480"
        role="img"
        aria-label={`Схема маршрута: ${route.label}`}
      >
        <defs>
          <filter id="routeGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="currentColor" strokeWidth=".7" />
          </pattern>
        </defs>

        <rect width="960" height="480" className="map-grid" fill="url(#grid)" />

        <g className="contours">
          <path d="M-15 62 C122 12 207 113 348 64 S622 9 762 71 S936 123 992 63" />
          <path d="M-34 112 C96 67 219 168 345 119 S584 57 717 117 S920 179 993 130" />
          <path d="M-22 198 C118 137 216 229 346 187 S570 111 725 186 S912 246 993 208" />
          <path d="M-14 272 C85 214 221 299 326 265 S552 185 702 252 S900 326 998 275" />
          <path d="M-11 355 C111 298 223 387 342 344 S579 275 724 335 S913 409 990 359" />
          <path d="M-17 427 C115 375 239 457 359 414 S587 346 731 408 S901 477 993 436" />
        </g>

        <g className="water">
          <path d="M702 -10 C680 78 716 126 684 186 C657 236 654 295 688 354 C708 388 697 435 670 492" />
          <path d="M0 436 C126 393 203 442 301 410 C397 378 452 403 527 454" />
        </g>

        <g className="roads">
          <path d="M-20 312 C137 257 236 291 338 243 S585 186 973 236" />
          <path d="M152 -10 C191 96 139 179 200 265 S285 386 312 491" />
          <path d="M806 -20 C759 92 811 170 767 281 S765 406 791 497" />
        </g>

        {showAlternative && (
          <path d={route.altPath} className="route-alternative" pathLength="1" />
        )}
        <path
          key={route.path}
          d={route.path}
          className="route-line"
          pathLength="1"
          filter="url(#routeGlow)"
        />

        <g className="route-points">
          <circle cx="54" cy="398" r="10" className="point-outer" />
          <circle cx="54" cy="398" r="4" className="point-inner" />
          <circle cx="898" cy="82" r="10" className="point-outer" />
          <circle cx="898" cy="82" r="4" className="point-inner" />
        </g>

        {route.risks.map((risk) => (
          <g
            className={`risk-dot risk-dot--${risk.level}`}
            key={`${risk.x}-${risk.y}`}
            transform={`translate(${risk.x} ${risk.y})`}
          >
            <circle r="13" />
            <circle r="4" />
            <title>{risk.label}</title>
          </g>
        ))}

        <g className="map-labels">
          <text x="28" y="452">ELVA</text>
          <text x="820" y="62">TARTU</text>
          <text x="452" y="111">PANGODI</text>
          <text x="633" y="377">NÕO</text>
        </g>
      </svg>

      <div className="map-legend">
        <span><i className="legend-dot legend-dot--safe" />Проверено</span>
        <span><i className="legend-dot legend-dot--review" />Нужна проверка</span>
        <span><i className="legend-dot legend-dot--warn" />Сложный участок</span>
      </div>
    </div>
  );
}

export default function Home() {
  const [routeKey, setRouteKey] = useState("balanced");
  const [showAlternative, setShowAlternative] = useState(true);
  const [surfaceCheck, setSurfaceCheck] = useState(true);
  const [accessCheck, setAccessCheck] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [language, setLanguage] = useState("ru");

  const route = routes[routeKey];
  const confidence = useMemo(() => {
    const adjustment = (surfaceCheck ? 0 : -11) + (accessCheck ? 0 : -7);
    return Math.max(60, route.confidence + adjustment);
  }, [accessCheck, route.confidence, surfaceCheck]);

  useEffect(() => {
    const onScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(height > 0 ? window.scrollY / height : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const saved = window.localStorage.getItem("routecycle-language");
    if (saved === "ru" || saved === "en") {
      setLanguage(saved);
      return;
    }
    setLanguage(navigator.language.toLowerCase().startsWith("ru") ? "ru" : "en");
  }, []);

  useEffect(() => {
    applyInterfaceLanguage(language);
    window.localStorage.setItem("routecycle-language", language);
    const syncMetadata = () => {
      const nextTitle = language === "en"
        ? "Routecycle — cycling routes without unpleasant surprises"
        : "Routecycle — маршруты без неприятных сюрпризов";
      if (document.title !== nextTitle) {
        document.title = nextTitle;
      }

      const description = document.querySelector('meta[name="description"]');
      const nextDescription = language === "en"
        ? "Routecycle checks OpenStreetMap data and helps plan cycling routes with clear surface, access and risk information."
        : "Routecycle проверяет данные OpenStreetMap и помогает строить веломаршруты с понятным покрытием, доступом и уровнем риска.";
      if (description && description.content !== nextDescription) {
        description.content = nextDescription;
      }
    };
    syncMetadata();
    const frame = window.requestAnimationFrame(() => {
      applyInterfaceLanguage(language);
      syncMetadata();
    });
    const observer = new MutationObserver(syncMetadata);
    observer.observe(document.head, {
      childList: true,
      subtree: true,
      characterData: true,
    });
    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [
    accessCheck,
    confidence,
    language,
    routeKey,
    showAlternative,
    submitted,
    surfaceCheck,
  ]);

  const submitInterest = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const city = data.get("city");
    const bike = data.get("bike");
    const feedback = data.get("feedback") || "—";
    const subject = language === "en"
      ? "Routecycle — rider interest"
      : "Routecycle — интерес велосипедиста";
    const body = language === "en"
      ? `I'm interested in testing Routecycle.\n\nEmail: ${email}\nCity: ${city}\nBike: ${bike}\nWhat I want Routecycle to check: ${feedback}`
      : `Мне интересно протестировать Routecycle.\n\nПочта: ${email}\nГород: ${city}\nВелосипед: ${bike}\nЧто должен проверять Routecycle: ${feedback}`;
    const draft = `${subject}\n\n${body}`;

    navigator.clipboard?.writeText(draft).catch(() => {});
    setSubmitted(true);
    window.setTimeout(() => {
      window.location.href = `mailto:${feedbackEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }, 80);
  };

  return (
    <>
      <a className="skip-link" href="#main-content">
        Перейти к содержимому
      </a>
      <main id="main-content">
      <div
        className="scroll-progress"
        style={{ transform: `scaleX(${scrollProgress})` }}
        aria-hidden="true"
      />

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Routecycle — наверх">
          <span className="brand-mark">
            <i />
            <i />
          </span>
          ROUTECYCLE
        </a>
        <nav aria-label="Основная навигация">
          <a href="#demo">Планировщик</a>
          <a href="#method">Как работает</a>
          <a href="#data">Данные</a>
        </nav>
        <div className="header-actions">
          <button
            className="language-toggle"
            type="button"
            data-language-toggle
            aria-label={language === "ru" ? "Switch to English" : "Переключить на русский"}
            onClick={() => setLanguage((current) => current === "ru" ? "en" : "ru")}
          >
            <span className={language === "ru" ? "is-active" : ""}>RU</span>
            <i aria-hidden="true">/</i>
            <span className={language === "en" ? "is-active" : ""}>EN</span>
          </button>
          <a className="header-cta" href="#waitlist">
            <span className="header-cta-label">Мне интересно</span> <ArrowIcon />
          </a>
        </div>
      </header>

      <section className="hero" id="top">
        <Reveal className="hero-copy">
          <p className="eyebrow">
            <span>01</span> Маршруты, которым можно доверять
          </p>
          <h1>
            Приключение
            <br />
            без <em>сюрпризов.</em>
          </h1>
          <p className="hero-lede">
            Routecycle замечает то, что пропускают обычные планировщики:
            закрытые проезды, непроезжаемые тропы и неизвестное покрытие.
          </p>
          <div className="hero-actions">
            <a className="button button--primary" href="#demo">
              Протестировать маршрут <ArrowIcon />
            </a>
            <a className="text-link" href="#method">
              Посмотреть метод <span>↓</span>
            </a>
          </div>
          <div className="hero-proof">
            <div className="avatars" aria-hidden="true">
              <span>MT</span><span>AK</span><span>+8</span>
            </div>
            <p><strong>Проверено на полевых данных</strong><br />OpenStreetMap · Estonia</p>
          </div>
        </Reveal>

        <Reveal className="hero-visual" delay={0.06}>
          <div className="hero-visual-topline">
            <span>ROUTE PREVIEW</span>
            <span>LIVE / 58.37N</span>
          </div>
          <RouteMap route={routes.balanced} showAlternative />
          <div className="route-ticket">
            <div>
              <span>Маршрут 01</span>
              <strong>Tartu → Elva</strong>
            </div>
            <div className="ticket-score">
              <span>Доверие</span>
              <strong>92</strong><small>/100</small>
            </div>
          </div>
          <p className="vertical-note">LESS GUESSING — MORE RIDING</p>
        </Reveal>
      </section>

      <section className="ticker" aria-label="Преимущества">
        <div>
          <span>проверка покрытия</span><i>✦</i>
          <span>контроль доступа</span><i>✦</i>
          <span>оценка проезжаемости</span><i>✦</i>
          <span>данные openstreetmap</span><i>✦</i>
          <span>проверка покрытия</span><i>✦</i>
          <span>контроль доступа</span><i>✦</i>
        </div>
      </section>

      <section className="problem-section" id="data">
        <div className="section-index">
          <span>02</span>
          <p>Проблема<br />под поверхностью</p>
        </div>
        <div className="problem-copy">
          <h2>
            Карта показывает линию.
            <br />
            Мы показываем, <em>что вас ждёт.</em>
          </h2>
          <p>
            Участок может выглядеть идеально на экране — и закончиться песком,
            закрытым шлагбаумом или тропой, по которой велосипед придётся нести.
            Routecycle собирает сигналы качества в одну понятную оценку.
          </p>
        </div>
        <div className="stats-strip">
          {issueStats.map(([number, label, note]) => (
            <article key={number}>
              <strong>{number}</strong>
              <h3>{label}</h3>
              <p>{note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="planner-section" id="demo">
        <div className="planner-heading">
          <div>
            <p className="eyebrow eyebrow--light"><span>03</span> Живой прототип</p>
            <h2>Выберите, как хотите ехать.</h2>
          </div>
          <p>
            Переключайте характер поездки и правила проверки. Маршрут,
            предупреждения и уровень уверенности меняются вместе с выбором.
          </p>
        </div>

        <div className="planner-shell">
          <aside className="planner-controls">
            <div className="control-block">
              <span className="control-label">Характер маршрута</span>
              <div className="route-tabs" role="tablist" aria-label="Вариант маршрута">
                {Object.entries(routes).map(([key, item]) => (
                  <button
                    key={key}
                    className={routeKey === key ? "is-active" : ""}
                    onClick={() => setRouteKey(key)}
                    role="tab"
                    aria-selected={routeKey === key}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="control-block">
              <span className="control-label">Проверки</span>
              <label className="switch-row">
                <span>
                  Покрытие
                  <small>surface · smoothness · tracktype</small>
                </span>
                <input
                  type="checkbox"
                  checked={surfaceCheck}
                  onChange={(event) => setSurfaceCheck(event.target.checked)}
                />
                <i aria-hidden="true" />
              </label>
              <label className="switch-row">
                <span>
                  Доступ
                  <small>access · bicycle · vehicle</small>
                </span>
                <input
                  type="checkbox"
                  checked={accessCheck}
                  onChange={(event) => setAccessCheck(event.target.checked)}
                />
                <i aria-hidden="true" />
              </label>
              <label className="switch-row">
                <span>
                  Альтернатива
                  <small>показать запасной путь</small>
                </span>
                <input
                  type="checkbox"
                  checked={showAlternative}
                  onChange={(event) => setShowAlternative(event.target.checked)}
                />
                <i aria-hidden="true" />
              </label>
            </div>

            <div className="confidence-card">
              <span>Уверенность маршрута</span>
              <div className="confidence-value">
                <strong>{confidence}</strong><small>/100</small>
              </div>
              <div className="meter"><i style={{ width: `${confidence}%` }} /></div>
              <p>
                {confidence >= 95
                  ? "Все ключевые участки подтверждены."
                  : confidence >= 85
                    ? "Есть участки для быстрой проверки."
                    : "Включите больше проверок перед поездкой."}
              </p>
            </div>
          </aside>

          <div className="planner-map">
            <RouteMap route={route} showAlternative={showAlternative} />
            <div className="route-summary">
              <div><span>Дистанция</span><strong>{route.distance}</strong></div>
              <div><span>Гравий</span><strong>{route.gravel}</strong></div>
              <div><span>В пути</span><strong>{route.time}</strong></div>
              <button type="button" onClick={() => document.querySelector("#waitlist")?.scrollIntoView({ behavior: "smooth" })}>
                Я бы поехал <ArrowIcon />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="waitlist-section" id="waitlist">
        <div className="waitlist-copy">
          <p className="eyebrow"><span>04</span> Подтвердить интерес</p>
          <h2>Хотите проверить<br />свой маршрут?</h2>
          <p>
            Оставьте короткий отклик. Мы подготовим письмо с вашим городом,
            типом велосипеда и пожеланием к проверке маршрута.
          </p>
        </div>
        <form className="waitlist-form" onSubmit={submitInterest}>
          {submitted ? (
            <div className="form-success" role="status">
              <span>✓</span>
              <h3>Черновик готов.</h3>
              <p>
                Мы открыли почтовое приложение и скопировали сообщение.
                Ничего не отправится, пока вы не нажмёте «Отправить».
              </p>
              <button type="button" onClick={() => setSubmitted(false)}>
                Заполнить ещё раз
              </button>
            </div>
          ) : (
            <>
              <label>
                <span>Почта</span>
                <input
                  name="email"
                  type="email"
                  placeholder="rider@example.com"
                  required
                />
              </label>
              <label>
                <span>Ваш город</span>
                <input
                  name="city"
                  type="text"
                  placeholder="Tartu, Tallinn, Riga…"
                  required
                />
              </label>
              <label>
                <span>На чём вы ездите?</span>
                <select name="bike" defaultValue="gravel">
                  <option value="gravel">Gravel</option>
                  <option value="touring">Touring</option>
                  <option value="mtb">MTB</option>
                  <option value="road">Road</option>
                </select>
              </label>
              <label>
                <span>Что важно проверить?</span>
                <textarea
                  name="feedback"
                  placeholder="Покрытие, закрытые проезды, сложность тропы…"
                />
              </label>
              <button className="button button--primary wide-field" type="submit">
                Подтвердить интерес <ArrowIcon />
              </button>
              <small className="wide-field feedback-privacy">
                Откроется ваше почтовое приложение. Сообщение не отправляется автоматически.
              </small>
            </>
          )}
        </form>
      </section>

      <section className="method-section" id="method">
        <div className="method-title">
          <p className="eyebrow"><span>05</span> Под капотом</p>
          <h2>От линии на карте<br />до уверенного старта.</h2>
        </div>
        <div className="method-steps">
          <article>
            <span className="step-number">01</span>
            <div className="step-visual step-visual--scan" aria-hidden="true">
              <i /><i /><i /><i />
            </div>
            <h3>Сканируем маршрут</h3>
            <p>Берём геометрию и теги каждого участка из OpenStreetMap.</p>
            <code>way → tags → geometry</code>
          </article>
          <article>
            <span className="step-number">02</span>
            <div className="step-visual step-visual--signals" aria-hidden="true">
              <b>surface</b><b>access</b><b>mtb:scale</b><b>smoothness</b>
            </div>
            <h3>Читаем сигналы</h3>
            <p>Сопоставляем доступ, покрытие, сложность и видимость тропы.</p>
            <code>7 signal families</code>
          </article>
          <article>
            <span className="step-number">03</span>
            <div className="step-visual step-visual--route" aria-hidden="true">
              <svg viewBox="0 0 240 100"><path d="M9 79 C53 22 82 82 121 47 S186 24 229 11" /></svg>
            </div>
            <h3>Предлагаем путь</h3>
            <p>Показываем риск и альтернативу, не скрывая причину решения.</p>
            <code>route + confidence</code>
          </article>
        </div>
      </section>

      <section className="manifesto">
        <div className="manifesto-grid" aria-hidden="true" />
        <p>Не делаем маршрут короче любой ценой.</p>
        <h2>
          Делаем так, чтобы вы знали,
          <br />
          <em>куда сворачиваете.</em>
        </h2>
        <div className="manifesto-badges">
          <span>NO BLACK BOX</span>
          <span>OSM NATIVE</span>
          <span>RIDER FIRST</span>
        </div>
      </section>

      <footer>
        <a className="brand brand--footer" href="#top">
          <span className="brand-mark"><i /><i /></span>
          ROUTECYCLE
        </a>
        <p>Маршруты без неприятных сюрпризов.</p>
        <div>
          <span>PROTOTYPE 01</span>
          <span>DATA: OPENSTREETMAP</span>
          <span>2026</span>
        </div>
      </footer>
      </main>
    </>
  );
}
