"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "./test-frontend.module.css";

const copy = {
  ru: {
    back: "Вернуться на лендинг",
    title: "Спланируйте следующую поездку",
    test: "ТЕСТОВЫЙ ФРОНТ",
    info: "Информация о прототипе",
    language: "Переключить язык",
    support: "Поддержать проект",
    strava: "Подключить Strava",
    settings: "Сменить тему",
    parameters: "Параметры маршрута",
    collapseParameters: "Свернуть параметры маршрута",
    expandParameters: "Развернуть параметры маршрута",
    road: "Шоссе",
    gravel: "Гравий",
    circle: "Круговой",
    oneWay: "В одну сторону",
    start: "Стартовая точка",
    startValue: "Dorpat, Soola 6, 96039 Tartu, Estonia",
    clear: "Очистить стартовую точку",
    location: "Использовать моё местоположение",
    addStop: "Добавить остановку",
    stop: "Конечная точка",
    stopValue: "Elva, Tartu County, Estonia",
    distance: "Дистанция",
    time: "Время",
    distanceKm: "Дистанция, км",
    movingTime: "Время в движении",
    fitness: "Уровень подготовки",
    beginner: "Начальный",
    intermediate: "Средний",
    advanced: "Продвинутый",
    addAscent: "Добавить набор высоты",
    ascent: "Максимальный набор, м",
    attractions: "Искать достопримечательности",
    explore: "Исследовать новые дороги",
    getRoutes: "Построить маршруты",
    getMoreRoutes: "Показать ещё маршруты",
    building: "Строим варианты…",
    routes: "Маршруты",
    collapseRoutes: "Свернуть маршруты",
    expandRoutes: "Развернуть маршруты",
    current: "Текущие",
    favorites: "Избранное",
    history: "История",
    emptyFavorites: "Избранных маршрутов пока нет.",
    emptyHistory: "История появится после сохранения маршрута.",
    choose: "Выбрать маршрут",
    map: "Схематическая карта тестового маршрута",
    zoomIn: "Увеличить карту",
    zoomOut: "Уменьшить карту",
    mapLayers: "Слои карты",
    save: "Сохранить",
    private: "Приватность",
    share: "Поделиться",
    feedback: "Отзыв",
    reverse: "Развернуть",
    export: "Экспорт",
    elevation: "Профиль высоты",
    points: "Точки интереса",
    photos: "Фото маршрута",
    low: "Низшая точка",
    high: "Высшая точка",
    maxGrade: "Макс. уклон",
    minGrade: "Мин. уклон",
    prototypeNote:
      "Фронтенд-прототип: маршрут и показатели демонстрационные. Проверяйте актуальные ограничения, доступ и состояние дороги перед поездкой.",
    aboutTitle: "О тестовом фронте",
    aboutBody:
      "Это независимая адаптивная версия интерфейса Routecycle. Она повторяет текущую логику планировщика, но не обращается к боевому маршрутизатору и ничего не сохраняет.",
    close: "Закрыть",
    gravelTitle: "Гравийный режим скоро появится",
    gravelBody:
      "В текущем продукте выбор Gravel открывает предварительное уведомление. Тестовая версия сохраняет этот сценарий без сбора email.",
    statusBuilt: "Показаны три демонстрационных маршрута.",
    statusSaved: "Маршрут отмечен как сохранённый только в этой сессии.",
    statusPrivate: "Режим приватности переключён только в прототипе.",
    statusShared: "Ссылка на тестовый маршрут подготовлена.",
    statusFeedback: "Форма отзыва в тестовой версии не отправляет данные.",
    statusReversed: "Направление демонстрационного маршрута изменено.",
    statusExported: "Экспорт имитирован; файл не создан.",
    statusLayers: "Слой схематической карты переключён.",
  },
  en: {
    back: "Back to the landing page",
    title: "Plan your next ride",
    test: "TEST FRONT",
    info: "About this prototype",
    language: "Switch language",
    support: "Support the project",
    strava: "Connect with Strava",
    settings: "Change theme",
    parameters: "Route parameters",
    collapseParameters: "Collapse route parameters",
    expandParameters: "Expand route parameters",
    road: "Road",
    gravel: "Gravel",
    circle: "Circle",
    oneWay: "One way",
    start: "Start point",
    startValue: "Dorpat, Soola 6, 96039 Tartu, Estonia",
    clear: "Clear start point",
    location: "Use my location",
    addStop: "Add stop",
    stop: "Destination",
    stopValue: "Elva, Tartu County, Estonia",
    distance: "Distance",
    time: "Time",
    distanceKm: "Distance in km",
    movingTime: "Moving time",
    fitness: "Fitness level",
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
    addAscent: "Add ascent",
    ascent: "Maximum ascent, m",
    attractions: "Find attractions",
    explore: "Explore new roads",
    getRoutes: "Get Routes",
    getMoreRoutes: "Get More Routes",
    building: "Building options…",
    routes: "Routes",
    collapseRoutes: "Collapse routes",
    expandRoutes: "Expand routes",
    current: "Current",
    favorites: "Favorites",
    history: "History",
    emptyFavorites: "No favorite routes yet.",
    emptyHistory: "History appears after you save a route.",
    choose: "Choose route",
    map: "Schematic map of the test route",
    zoomIn: "Zoom map in",
    zoomOut: "Zoom map out",
    mapLayers: "Map layers",
    save: "Save",
    private: "Private",
    share: "Share",
    feedback: "Feedback",
    reverse: "Reverse",
    export: "Export",
    elevation: "Elevation Profile",
    points: "Points of Interest",
    photos: "Route Photos",
    low: "Lowest point",
    high: "Highest point",
    maxGrade: "Max grade",
    minGrade: "Min grade",
    prototypeNote:
      "Frontend prototype: route and metrics are illustrative. Check current restrictions, access and road conditions before riding.",
    aboutTitle: "About the test frontend",
    aboutBody:
      "This is an independent responsive Routecycle interface. It preserves the current planner logic, but it does not call the production router or persist data.",
    close: "Close",
    gravelTitle: "Gravel mode is coming soon",
    gravelBody:
      "The current product opens an early-access notice for Gravel. This test version preserves that flow without collecting an email address.",
    statusBuilt: "Three demonstration routes are shown.",
    statusSaved: "The route is marked as saved for this session only.",
    statusPrivate: "Privacy was toggled in the prototype only.",
    statusShared: "A test-route link is ready.",
    statusFeedback: "The prototype feedback action does not submit data.",
    statusReversed: "The demonstration route direction was reversed.",
    statusExported: "Export was simulated; no file was created.",
    statusLayers: "The schematic map layer was switched.",
  },
};

const routeOptions = [
  {
    distance: 58,
    ascent: 177,
    time: "2 ч 06 м",
    timeEn: "2 h 06 m",
    path: "M103 442 C190 304 311 351 389 244 C469 134 567 204 663 168 C771 126 858 177 983 96",
  },
  {
    distance: 47,
    ascent: 222,
    time: "1 ч 47 м",
    timeEn: "1 h 47 m",
    path: "M103 442 C227 438 257 294 368 306 C492 320 548 178 659 233 C756 281 832 184 983 96",
  },
  {
    distance: 59,
    ascent: 233,
    time: "2 ч 11 м",
    timeEn: "2 h 11 m",
    path: "M103 442 C168 370 235 449 326 364 C408 286 478 341 561 264 C648 183 720 278 808 207 C875 153 926 145 983 96",
  },
];

function Icon({ name }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };
  const paths = {
    info: <><circle cx="12" cy="12" r="9" /><path d="M12 10v6M12 7h.01" /></>,
    globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></>,
    coffee: <><path d="M5 8h12v8a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V8Z" /><path d="M17 10h2a2 2 0 0 1 0 4h-2M7 4h8" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M19 12a7 7 0 0 0-.1-1l2-1.5-2-3.4-2.4 1A7 7 0 0 0 15 6l-.3-2.6h-4L10.5 6A7 7 0 0 0 9 7.1l-2.4-1-2 3.4L6.7 11a7 7 0 0 0 0 2l-2 1.5 2 3.4 2.3-1A7 7 0 0 0 10.5 18l.3 2.6h4L15 18a7 7 0 0 0 1.5-1.1l2.4 1 2-3.4-2-1.5c.1-.3.1-.7.1-1Z" /></>,
    bike: <><circle cx="6" cy="17" r="4" /><circle cx="18" cy="17" r="4" /><path d="m6 17 4-8 3 8h5l-5-8H9M10 6h4" /></>,
    route: <><path d="M4 7h12M13 4l3 3-3 3M20 17H8M11 14l-3 3 3 3" /></>,
    pin: <><path d="M12 21s7-6 7-12a7 7 0 1 0-14 0c0 6 7 12 7 12Z" /><circle cx="12" cy="9" r="2" /></>,
    target: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3" /></>,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    mountain: <path d="m3 19 6-11 4 7 2-3 6 7H3Z" />,
    camera: <><rect x="3" y="6" width="18" height="14" rx="2" /><circle cx="12" cy="13" r="3" /><path d="m8 6 1-2h6l1 2" /></>,
    compass: <><circle cx="12" cy="12" r="9" /><path d="m15 9-2 4-4 2 2-4 4-2Z" /></>,
    search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></>,
    chevron: <path d="m7 10 5 5 5-5" />,
    trash: <><path d="M4 7h16M9 7V4h6v3M7 7l1 13h8l1-13M10 11v5M14 11v5" /></>,
    star: <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2-5.5-2.9-5.5 2.9 1-6.2L3 9.6l6.2-.9L12 3Z" />,
    lock: <><rect x="5" y="10" width="14" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>,
    share: <><circle cx="18" cy="5" r="2" /><circle cx="6" cy="12" r="2" /><circle cx="18" cy="19" r="2" /><path d="m8 11 8-5M8 13l8 5" /></>,
    feedback: <><path d="M4 4h16v12H9l-5 4V4Z" /><path d="M8 9h8M8 12h5" /></>,
    download: <><path d="M12 3v12M7 10l5 5 5-5" /><path d="M5 20h14" /></>,
    layers: <><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5M3 16l9 5 9-5" /></>,
  };
  return <svg {...common}>{paths[name]}</svg>;
}

function BrandMark() {
  return (
    <svg viewBox="0 0 54 42" aria-hidden="true">
      <path d="m3 10 14-7 19 6 15-6v29l-15 7-19-6-14 6V10Z" fill="#b9ef7f" stroke="#10253f" strokeWidth="1.5" />
      <path d="M17 3v30M36 9v30" fill="none" stroke="#10253f" strokeWidth="1.5" />
      <path d="M35 4c0-5 8-5 8 0 0 5-4 9-4 9s-4-4-4-9Z" fill="#ff6035" stroke="#10253f" strokeWidth="1.5" />
      <circle cx="39" cy="4" r="1.5" fill="#fff" />
    </svg>
  );
}

export default function TestFrontend() {
  const [language, setLanguage] = useState("ru");
  const [dark, setDark] = useState(false);
  const [parametersOpen, setParametersOpen] = useState(true);
  const [routesOpen, setRoutesOpen] = useState(true);
  const [shape, setShape] = useState("circle");
  const [metric, setMetric] = useState("distance");
  const [distance, setDistance] = useState(58);
  const [movingTime, setMovingTime] = useState("2");
  const [fitness, setFitness] = useState("intermediate");
  const [ascentEnabled, setAscentEnabled] = useState(false);
  const [attractions, setAttractions] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [building, setBuilding] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(0);
  const [routeTab, setRouteTab] = useState("current");
  const [detailTab, setDetailTab] = useState("elevation");
  const [modal, setModal] = useState(null);
  const [status, setStatus] = useState("");
  const [zoom, setZoom] = useState(1);
  const [layerAlt, setLayerAlt] = useState(false);
  const [reversed, setReversed] = useState(false);
  const t = copy[language];

  useEffect(() => {
    const saved = window.localStorage.getItem("routecycle-language");
    if (saved === "ru" || saved === "en") setLanguage(saved);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("routecycle-language", language);
  }, [language]);

  const activeRoute = routeOptions[selectedRoute];
  const routePath = useMemo(() => {
    if (shape === "oneWay") {
      return "M103 442 C234 383 271 281 402 302 C539 324 610 181 748 203 C846 219 911 139 983 96";
    }
    return activeRoute.path;
  }, [activeRoute.path, shape]);

  const buildRoutes = () => {
    setBuilding(true);
    setStatus("");
    window.setTimeout(() => {
      setGenerated(true);
      setBuilding(false);
      setRouteTab("current");
      setSelectedRoute(0);
      setStatus(t.statusBuilt);
    }, 480);
  };

  const setActionStatus = (key) => setStatus(t[key]);

  return (
    <div className={`${styles.page}${dark ? ` ${styles.dark}` : ""}`}>
      <a className={styles.skipLink} href="#test-map">
        {t.map}
      </a>

      <aside className={styles.sidebar} aria-label={t.parameters}>
        <header className={styles.header}>
          <Link className={styles.brand} href="/" aria-label={t.back}>
            <BrandMark />
            <span>{t.title}</span>
          </Link>
          <button className={styles.iconButton} type="button" aria-label={t.info} onClick={() => setModal("info")}>
            <Icon name="info" />
          </button>
          <button
            className={styles.languageButton}
            type="button"
            aria-label={t.language}
            onClick={() => {
              setLanguage((value) => (value === "ru" ? "en" : "ru"));
              setStatus("");
            }}
          >
            {language.toUpperCase()}
          </button>
        </header>

        <div className={styles.projectLinks}>
          <span className={styles.testBadge}>{t.test}</span>
          <a className={styles.supportLink} href="https://www.buymeacoffee.com/routecycle" target="_blank" rel="noreferrer">
            <Icon name="coffee" />
            {t.support}
          </a>
          <a className={styles.stravaLink} href="https://routecycle.com/" target="_blank" rel="noreferrer">
            {t.strava}
          </a>
          <button className={styles.iconButton} type="button" aria-label={t.settings} onClick={() => setDark((value) => !value)}>
            <Icon name="settings" />
          </button>
        </div>

        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <h1>{t.parameters}</h1>
            <button
              className={styles.iconButton}
              type="button"
              aria-expanded={parametersOpen}
              aria-label={parametersOpen ? t.collapseParameters : t.expandParameters}
              onClick={() => setParametersOpen((value) => !value)}
            >
              <span className={parametersOpen ? styles.chevronUp : ""}><Icon name="chevron" /></span>
            </button>
          </div>

          {parametersOpen && (
            <div className={styles.cardBody}>
              <div className={styles.segmented} aria-label={t.parameters}>
                <button className={styles.activeSegment} type="button" aria-pressed="true">
                  <Icon name="bike" /> {t.road}
                </button>
                <button type="button" aria-pressed="false" onClick={() => setModal("gravel")}>
                  <Icon name="mountain" /> {t.gravel}
                </button>
              </div>

              <div className={styles.segmented}>
                <button
                  className={shape === "circle" ? styles.activeSegment : ""}
                  type="button"
                  aria-pressed={shape === "circle"}
                  onClick={() => setShape("circle")}
                >
                  <Icon name="route" /> {t.circle}
                </button>
                <button
                  className={shape === "oneWay" ? styles.activeSegment : ""}
                  type="button"
                  aria-pressed={shape === "oneWay"}
                  onClick={() => setShape("oneWay")}
                >
                  <Icon name="route" /> {t.oneWay}
                </button>
              </div>

              <label className={styles.fieldLabel} htmlFor="test-start">
                <Icon name="pin" /> {t.start}
              </label>
              <div className={styles.locationRow}>
                <input id="test-start" defaultValue={t.startValue} />
                <button className={styles.clearButton} type="button" aria-label={t.clear}>
                  <Icon name="close" />
                </button>
                <button className={styles.iconButton} type="button" aria-label={t.location}>
                  <Icon name="target" />
                </button>
              </div>

              {shape === "oneWay" && (
                <>
                  <label className={styles.fieldLabel} htmlFor="test-stop">
                    <Icon name="pin" /> {t.stop}
                  </label>
                  <input className={styles.fullInput} id="test-stop" defaultValue={t.stopValue} />
                </>
              )}

              <button className={styles.textAction} type="button">
                + {t.addStop}
              </button>

              <div className={styles.segmented}>
                <button
                  className={metric === "distance" ? styles.activeSegment : ""}
                  type="button"
                  aria-pressed={metric === "distance"}
                  onClick={() => setMetric("distance")}
                >
                  <Icon name="route" /> {t.distance}
                </button>
                <button
                  className={metric === "time" ? styles.activeSegment : ""}
                  type="button"
                  aria-pressed={metric === "time"}
                  onClick={() => setMetric("time")}
                >
                  <Icon name="clock" /> {t.time}
                </button>
              </div>

              {metric === "distance" ? (
                <label className={styles.rangeField}>
                  <span>{t.distanceKm}</span>
                  <strong>{distance} km</strong>
                  <input
                    type="range"
                    min="20"
                    max="100"
                    value={distance}
                    onChange={(event) => setDistance(Number(event.target.value))}
                  />
                </label>
              ) : (
                <div className={styles.selectGrid}>
                  <label>
                    <span><Icon name="clock" /> {t.movingTime}</span>
                    <select value={movingTime} onChange={(event) => setMovingTime(event.target.value)}>
                      <option value="1.5">1.5 h</option>
                      <option value="2">2 h</option>
                      <option value="3">3 h</option>
                    </select>
                  </label>
                  <label>
                    <span>{t.fitness}</span>
                    <select value={fitness} onChange={(event) => setFitness(event.target.value)}>
                      <option value="beginner">{t.beginner}</option>
                      <option value="intermediate">{t.intermediate}</option>
                      <option value="advanced">{t.advanced}</option>
                    </select>
                  </label>
                </div>
              )}

              <button className={styles.textAction} type="button" onClick={() => setAscentEnabled((value) => !value)}>
                {ascentEnabled ? "−" : "+"} {t.addAscent}
              </button>
              {ascentEnabled && (
                <label className={styles.compactField}>
                  <span>{t.ascent}</span>
                  <input type="number" defaultValue="450" min="0" step="50" />
                </label>
              )}

              <label className={styles.switchRow}>
                <span><Icon name="camera" /> {t.attractions}</span>
                <input type="checkbox" checked={attractions} onChange={(event) => setAttractions(event.target.checked)} />
                <i aria-hidden="true" />
              </label>

              <div className={styles.exploreRow}>
                <span><Icon name="compass" /> {t.explore}</span>
                <a href="https://routecycle.com/" target="_blank" rel="noreferrer">{t.strava}</a>
              </div>

              <button className={styles.primaryButton} type="button" disabled={building} onClick={buildRoutes}>
                <Icon name="search" />
                {building ? t.building : generated ? t.getMoreRoutes : t.getRoutes}
              </button>
            </div>
          )}
        </section>

        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <h2>{t.routes}</h2>
            <div className={styles.cardHeaderActions}>
              {generated && (
                <button className={styles.iconButton} type="button" aria-label={t.clear} onClick={() => setGenerated(false)}>
                  <Icon name="trash" />
                </button>
              )}
              <button
                className={styles.iconButton}
                type="button"
                aria-expanded={routesOpen}
                aria-label={routesOpen ? t.collapseRoutes : t.expandRoutes}
                onClick={() => setRoutesOpen((value) => !value)}
              >
                <span className={routesOpen ? styles.chevronUp : ""}><Icon name="chevron" /></span>
              </button>
            </div>
          </div>

          {routesOpen && (
            <div className={styles.cardBody}>
              <div className={styles.routeTabs} role="tablist" aria-label={t.routes}>
                {["current", "favorites", "history"].map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    role="tab"
                    aria-selected={routeTab === tab}
                    className={routeTab === tab ? styles.activeRouteTab : ""}
                    onClick={() => setRouteTab(tab)}
                  >
                    {t[tab]}
                  </button>
                ))}
              </div>

              {routeTab === "current" && generated && (
                <div className={styles.routeList}>
                  {routeOptions.map((route, index) => (
                    <button
                      key={route.distance}
                      type="button"
                      className={selectedRoute === index ? styles.activeRoute : ""}
                      aria-label={`${t.choose}: ${route.distance} km`}
                      onClick={() => setSelectedRoute(index)}
                    >
                      <span><Icon name="route" /> {route.distance} km</span>
                      <span><Icon name="mountain" /> {route.ascent} m</span>
                      <span><Icon name="clock" /> {language === "ru" ? route.time : route.timeEn}</span>
                    </button>
                  ))}
                </div>
              )}
              {routeTab === "current" && !generated && <p className={styles.emptyState}>{t.getRoutes}</p>}
              {routeTab === "favorites" && <p className={styles.emptyState}>{t.emptyFavorites}</p>}
              {routeTab === "history" && <p className={styles.emptyState}>{t.emptyHistory}</p>}
            </div>
          )}
        </section>

        <p className={styles.liveStatus} role="status" aria-live="polite">{status}</p>

        <div className={styles.sidebarFooter} role="contentinfo">
          <Link href="/">{t.back}</Link>
          <span>ROUTECYCLE · 2026</span>
        </div>
      </aside>

      <main className={styles.workspace}>
        <section className={`${styles.map}${layerAlt ? ` ${styles.altMap}` : ""}`} id="test-map">
          <div className={styles.mapTopControls}>
            <button type="button" aria-label={t.zoomIn} onClick={() => setZoom((value) => Math.min(1.25, value + 0.08))}>+</button>
            <button type="button" aria-label={t.zoomOut} onClick={() => setZoom((value) => Math.max(0.85, value - 0.08))}>−</button>
          </div>
          <svg viewBox="0 0 1100 700" role="img" aria-label={t.map} style={{ "--test-map-zoom": zoom }}>
            <defs>
              <pattern id="test-grid" width="55" height="55" patternUnits="userSpaceOnUse">
                <path d="M55 0H0V55" fill="none" stroke="currentColor" strokeOpacity=".08" />
              </pattern>
              <pattern id="test-buildings" width="80" height="72" patternUnits="userSpaceOnUse">
                <rect x="7" y="8" width="28" height="17" fill="currentColor" opacity=".12" />
                <rect x="44" y="34" width="24" height="26" fill="currentColor" opacity=".09" />
              </pattern>
            </defs>
            <g className={styles.mapZoom}>
              <rect width="1100" height="700" className={styles.mapBase} />
              <rect width="1100" height="700" fill="url(#test-grid)" />
              <path className={styles.forest} d="M0 0h366l52 121-93 126-166-38L0 292V0Zm1100 0H713l-77 140 108 94 175-38 181 70V0ZM0 700V496l172-49 160 87 88 166H0Zm1100 0V472l-181-43-133 92-74 179h388Z" />
              <path className={styles.water} d="M461-20c-32 124 20 191-12 286-31 91-5 158 61 226 50 51 43 137 2 228h113c36-95 31-183-19-251-61-83-83-139-39-234 40-87 28-171 7-255H461Z" />
              <path className={styles.primaryRoad} d="M-30 613C193 500 274 429 435 342S750 193 1135 40" />
              <path className={styles.road} d="M64-20c130 137 154 291 119 475-12 64-2 153 35 265M1062-20C917 99 879 271 903 451c9 69-15 164-61 269M-30 199c205 58 365 30 541-36 181-68 362-35 624 59M-30 493c228-48 367-17 531 55 189 82 379 64 634-29" />
              <rect x="0" y="0" width="1100" height="700" fill="url(#test-buildings)" className={styles.buildings} />
              <g className={styles.placeLabels}>
                <text x="555" y="310">TARTU</text>
                <text x="92" y="517">ELVA</text>
                <text x="825" y="158">LUUNJA</text>
                <text x="289" y="218">NÕO</text>
                <text x="734" y="547">PANGODI</text>
              </g>
              {generated && (
                <>
                  <path
                    d={routePath}
                    className={styles.routeHalo}
                    style={{ transform: reversed ? "scaleX(-1)" : undefined, transformOrigin: "center" }}
                  />
                  <path
                    d={routePath}
                    className={styles.routeLine}
                    style={{ transform: reversed ? "scaleX(-1)" : undefined, transformOrigin: "center" }}
                  />
                </>
              )}
              <g transform="translate(103 442)" className={styles.marker}>
                <path d="M0 22S-18 5-18-8a18 18 0 1 1 36 0C18 5 0 22 0 22Z" />
                <circle cy="-8" r="6" />
              </g>
            </g>
          </svg>
          <div className={styles.mapTools}>
            <button type="button" aria-label={t.location}><Icon name="target" /></button>
            <button type="button" aria-label={t.mapLayers} onClick={() => {
              setLayerAlt((value) => !value);
              setActionStatus("statusLayers");
            }}><Icon name="layers" /></button>
          </div>
          <span className={styles.mapScale}>2 km</span>
          <p className={styles.mapCredit}>SCHEMATIC MAP · TEST DATA</p>

          {generated && (
            <nav className={styles.routeActions} aria-label={t.routes}>
              {[
                ["star", "save", "statusSaved"],
                ["lock", "private", "statusPrivate"],
                ["share", "share", "statusShared"],
                ["feedback", "feedback", "statusFeedback"],
                ["route", "reverse", "statusReversed"],
                ["download", "export", "statusExported"],
              ].map(([icon, label, statusKey]) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => {
                    if (label === "reverse") setReversed((value) => !value);
                    setActionStatus(statusKey);
                  }}
                >
                  <Icon name={icon} />
                  <span>{t[label]}</span>
                </button>
              ))}
            </nav>
          )}
        </section>

        <section className={`${styles.detailPanel}${generated ? ` ${styles.detailPanelVisible}` : ""}`}>
          <div className={styles.detailTabs} role="tablist" aria-label={t.routes}>
            {["elevation", "points", "photos"].map((tab) => (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={detailTab === tab}
                className={detailTab === tab ? styles.activeDetailTab : ""}
                onClick={() => setDetailTab(tab)}
              >
                {t[tab]}
              </button>
            ))}
          </div>

          {detailTab === "elevation" && (
            <div className={styles.elevationPanel}>
              <svg viewBox="0 0 900 130" role="img" aria-label={t.elevation}>
                <path className={styles.elevationFill} d="M0 121V84l31-22 34 15 41-39 39 45 48-8 44 18 39-31 49 34 42-17 45 21 47-42 43 33 43-20 48 25 42-36 41 31 52-24 42 22 51-29 38 34 55-19 47 26V121H0Z" />
                <path className={styles.elevationLine} d="m0 84 31-22 34 15 41-39 39 45 48-8 44 18 39-31 49 34 42-17 45 21 47-42 43 33 43-20 48 25 42-36 41 31 52-24 42 22 51-29 38 34 55-19 47 26" />
              </svg>
              <dl className={styles.metrics}>
                <div><dt>{t.low}</dt><dd>29 m</dd></div>
                <div><dt>{t.high}</dt><dd>90 m</dd></div>
                <div><dt>{t.distance}</dt><dd>{activeRoute.distance}.9 km</dd></div>
                <div><dt>{t.maxGrade}</dt><dd>+12%</dd></div>
                <div><dt>{t.minGrade}</dt><dd>−8%</dd></div>
              </dl>
            </div>
          )}
          {detailTab === "points" && (
            <p className={styles.detailEmpty}>{attractions ? "3 POI · AHHAA · Raadi · Emajõgi" : t.attractions}</p>
          )}
          {detailTab === "photos" && <p className={styles.detailEmpty}>{t.photos} · 0</p>}
          <p className={styles.prototypeNote}>{t.prototypeNote}</p>
        </section>
      </main>

      {modal && (
        <div className={styles.modalBackdrop} role="presentation" onMouseDown={() => setModal(null)}>
          <section
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="test-modal-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button className={styles.modalClose} type="button" aria-label={t.close} onClick={() => setModal(null)}>
              <Icon name="close" />
            </button>
            <p>{t.test}</p>
            <h2 id="test-modal-title">{modal === "gravel" ? t.gravelTitle : t.aboutTitle}</h2>
            <span>{modal === "gravel" ? t.gravelBody : t.aboutBody}</span>
            <button className={styles.primaryButton} type="button" onClick={() => setModal(null)}>
              {t.close}
            </button>
          </section>
        </div>
      )}
    </div>
  );
}
