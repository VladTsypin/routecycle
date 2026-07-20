import Link from "next/link";
import BlogLanguage from "../blog-language";

const articleUrl =
  "https://vladtsypin.github.io/routecycle/blog/why-a-line-is-not-a-route/";
const productUrl =
  "https://routecycle.com/?utm_source=github_pages&utm_medium=referral&utm_campaign=routecycle_blog&utm_content=article_cta";

export const metadata = {
  title: "Почему линия на карте ещё не означает хороший веломаршрут",
  description:
    "Какие данные помогают отличить красивую линию от маршрута, которому велосипедист может доверять.",
  alternates: {
    canonical: "/routecycle/blog/why-a-line-is-not-a-route/",
  },
  openGraph: {
    type: "article",
    url: articleUrl,
    title: "Почему линия на карте ещё не означает хороший веломаршрут",
    description:
      "Какие данные помогают отличить красивую линию от маршрута, которому велосипедист может доверять.",
    publishedTime: "2026-07-20T00:00:00.000Z",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Почему линия на карте ещё не означает хороший веломаршрут",
  alternativeHeadline:
    "Why a line on the map is not yet a good cycling route",
  description:
    "Какие данные помогают отличить красивую линию от маршрута, которому велосипедист может доверять.",
  datePublished: "2026-07-20",
  dateModified: "2026-07-20",
  inLanguage: ["ru", "en"],
  author: {
    "@type": "Organization",
    name: "Routecycle",
    url: "https://routecycle.com/",
  },
  publisher: {
    "@type": "Organization",
    name: "Routecycle",
    url: "https://routecycle.com/",
  },
  mainEntityOfPage: articleUrl,
};

const RussianArticle = () => (
  <article className="blog-article">
    <header className="blog-article-header">
      <Link className="blog-back" href="/blog/" prefetch={false}>
        ← Все статьи
      </Link>
      <p className="blog-kicker">Как это работает</p>
      <h1>Почему линия на карте ещё не означает хороший веломаршрут</h1>
      <p className="blog-article-dek">
        Навигатор может соединить две точки за секунду. Но чтобы велосипедист
        выбрал этот путь, одной геометрии недостаточно: нужны данные о покрытии,
        доступе, сложности и качестве самих данных.
      </p>
      <div className="blog-article-meta">
        <span>20 июля 2026</span>
        <span>6 минут</span>
        <span>Routecycle</span>
      </div>
    </header>

    <div className="blog-article-layout">
      <aside className="blog-article-rail" aria-label="Содержание статьи">
        <span>В статье</span>
        <a href="#geometry">Геометрия и поездка</a>
        <a href="#signals">Три группы сигналов</a>
        <a href="#unknown">Неизвестные данные</a>
        <a href="#rider">Что показать человеку</a>
        <a href="#check">Проверка маршрута</a>
      </aside>

      <div className="article-body">
        <p className="article-lead">
          Линия на карте отвечает только на один вопрос: где проходит путь. Она
          ничего не говорит о том, можно ли там ехать на велосипеде, насколько
          дорога подходит конкретному велосипеду и не окажется ли спокойный на
          экране участок разбитой лесной колеёй.
        </p>

        <h2 id="geometry">Линия описывает геометрию, а не поездку</h2>
        <p>
          Большинство маршрутизаторов начинают с графа дорог: узлов и отрезков,
          которые можно соединить. Алгоритм ищет короткую или быструю
          последовательность этих отрезков. Математически всё может быть
          правильно, а практический результат — нет.
        </p>
        <p>
          Для автомобиля категория дороги часто уже многое объясняет. Для
          велосипеда контекст тоньше. Асфальтовая дорога с быстрым трафиком,
          ровная гравийная дорожка и заросшая лесная тропа могут выглядеть на
          масштабе карты почти одинаково. Велосипедисту важна не только
          проходимость, но и характер поездки.
        </p>

        <h2 id="signals">Три группы сигналов</h2>
        <p>
          Чтобы превратить линию в понятный маршрут, мы собираем сигналы в три
          группы. Первая — <strong>покрытие</strong>: материал, гладкость и
          состояние пути. В OpenStreetMap это могут описывать теги{" "}
          <code>surface</code>, <code>tracktype</code> и{" "}
          <code>smoothness</code>. Они помогают отличить асфальт от гравия,
          плотную грунтовку — от рыхлой или повреждённой поверхности.
        </p>
        <p>
          Вторая группа — <strong>доступ</strong>. Теги <code>access</code>,{" "}
          <code>bicycle</code> и <code>vehicle</code> показывают, разрешено ли
          движение и нет ли специальных ограничений. Отсутствие шлагбаума на
          спутниковом снимке ещё не означает, что дорога публичная.
        </p>
        <p>
          Третья — <strong>пригодность для поездки</strong>: уклон, тип дороги,
          сложность тропы, видимость и близость быстрого трафика. Здесь могут
          пригодиться <code>mtb:scale</code>, высотный профиль и контекст
          соседних сегментов. Каждый сигнал по отдельности несовершенен, но
          вместе они дают более честную картину.
        </p>

        <div className="article-signal-strip" aria-label="Как данные превращаются в оценку">
          <div>
            <span>01 / Линия</span>
            <strong>Геометрия</strong>
            <p>Куда ведёт путь и как соединены его сегменты.</p>
          </div>
          <div>
            <span>02 / Контекст</span>
            <strong>OSM-сигналы</strong>
            <p>Покрытие, доступ, сложность и дорожное окружение.</p>
          </div>
          <div>
            <span>03 / Решение</span>
            <strong>Уверенность</strong>
            <p>Оценка маршрута вместе с причиной, а не чёрный ящик.</p>
          </div>
        </div>

        <h2 id="unknown">Неизвестно — не значит опасно</h2>
        <p>
          В данных важно различать отрицательный и неизвестный сигнал. Если
          участок помечен как закрытый для велосипедов, это прямое ограничение.
          Если у него не указано покрытие, мы просто не знаем, какое оно. Эти
          ситуации требуют разных сообщений и разных действий.
        </p>
        <p>
          Автоматически считать все неизвестные сегменты плохими — значит
          отвергать множество нормальных сельских дорог. Считать их хорошими —
          скрывать реальный риск. Поэтому полезнее показывать уровень
          уверенности и объяснять, каких данных не хватает. Тогда велосипедист
          понимает, где маршрут проверен, а где понадобится собственная оценка.
        </p>

        <blockquote>
          Хорошая рекомендация не обещает идеальную дорогу. Она честно сообщает,
          что известно, что вызывает сомнение и почему.
        </blockquote>

        <h2 id="rider">Что должен увидеть велосипедист</h2>
        <p>
          Пользователю не нужна таблица из десятков тегов. Ему нужны четыре
          понятные вещи: где находится сомнительный участок, чем вызвано
          сомнение, есть ли более надёжная альтернатива и насколько система
          уверена в выводе.
        </p>
        <ul>
          <li>
            <strong>Риск:</strong> конкретный сегмент, а не тревога на весь
            маршрут.
          </li>
          <li>
            <strong>Причина:</strong> неизвестное покрытие, ограничение доступа,
            высокая сложность или сочетание факторов.
          </li>
          <li>
            <strong>Выбор:</strong> оставить быстрый вариант или принять
            небольшой объезд.
          </li>
          <li>
            <strong>Уверенность:</strong> насколько вывод подтверждён доступными
            данными.
          </li>
        </ul>
        <p>
          Такое объяснение особенно важно перед длинной поездкой. Небольшая
          неопределённость рядом с домом — одно. Та же неопределённость на
          удалённом участке маршрута, где нет простого объезда, — совсем другое.
        </p>

        <h2 id="check">Как мы проверяем маршрут</h2>
        <p>
          В Routecycle проверка строится вокруг трёх шагов. Сначала маршрут
          разбивается на короткие сегменты, чтобы локальная проблема не
          растворялась в общей оценке. Затем каждый сегмент обогащается
          доступными дорожными сигналами. Наконец, система выделяет участки,
          которые требуют внимания, и связывает вывод с причиной.
        </p>
        <p>
          Финальная оценка — не попытка решить всё за велосипедиста. Это способ
          быстрее увидеть слабые места и принять решение до старта. Чем понятнее
          объяснение, тем проще доверять маршруту — или вовремя выбрать другой.
        </p>

        <section className="article-cta" aria-labelledby="article-cta-ru">
          <p>Следующий шаг</p>
          <h2 id="article-cta-ru">Проверьте свой маршрут до поездки</h2>
          <span>
            Откройте Routecycle, добавьте маршрут и посмотрите, какие участки
            требуют внимания.
          </span>
          <a href={productUrl}>Протестировать маршрут →</a>
        </section>
      </div>
    </div>
  </article>
);

const EnglishArticle = () => (
  <article className="blog-article">
    <header className="blog-article-header">
      <Link className="blog-back" href="/blog/" prefetch={false}>
        ← All articles
      </Link>
      <p className="blog-kicker">How it works</p>
      <h1>Why a line on the map is not yet a good cycling route</h1>
      <p className="blog-article-dek">
        A navigation engine can connect two points in a second. But a cyclist
        needs more than geometry to trust that path: surface, access,
        rideability, and an honest view of data quality.
      </p>
      <div className="blog-article-meta">
        <span>20 July 2026</span>
        <span>6 min read</span>
        <span>Routecycle</span>
      </div>
    </header>

    <div className="blog-article-layout">
      <aside className="blog-article-rail" aria-label="Article contents">
        <span>In this article</span>
        <a href="#geometry-en">Geometry and the ride</a>
        <a href="#signals-en">Three signal groups</a>
        <a href="#unknown-en">Unknown data</a>
        <a href="#rider-en">What riders should see</a>
        <a href="#check-en">Checking a route</a>
      </aside>

      <div className="article-body">
        <p className="article-lead">
          A line on a map answers one question: where does the path go? It does
          not tell you whether cycling is allowed, whether the surface suits
          your bike, or whether a quiet-looking section is actually a deeply
          rutted forest track.
        </p>

        <h2 id="geometry-en">A line describes geometry, not the ride</h2>
        <p>
          Most routing engines begin with a road graph: nodes and segments that
          can be connected. An algorithm finds a short or fast sequence through
          that graph. The result may be mathematically correct and still be a
          poor ride.
        </p>
        <p>
          Road class often reveals a lot for a car. Cycling is more
          context-sensitive. A paved road with fast traffic, a firm gravel lane,
          and an overgrown woodland trail can look nearly identical at normal
          map scale. A cyclist needs to understand not only whether the segment
          is passable, but what kind of experience it creates.
        </p>

        <h2 id="signals-en">Three groups of signals</h2>
        <p>
          To turn a line into an understandable route, we organise signals into
          three groups. The first is <strong>surface</strong>: its material,
          smoothness, and condition. In OpenStreetMap, tags such as{" "}
          <code>surface</code>, <code>tracktype</code>, and{" "}
          <code>smoothness</code> can help distinguish asphalt from gravel, or a
          firm unpaved road from a loose or damaged one.
        </p>
        <p>
          The second group is <strong>access</strong>. Tags including{" "}
          <code>access</code>, <code>bicycle</code>, and <code>vehicle</code>{" "}
          indicate whether travel is permitted and whether special restrictions
          apply. The absence of a visible barrier in aerial imagery does not
          make a road public.
        </p>
        <p>
          The third is <strong>rideability</strong>: gradient, road type, trail
          difficulty, visibility, and proximity to fast traffic. Signals such
          as <code>mtb:scale</code>, elevation profiles, and neighbouring road
          context can help. Each is imperfect alone; together, they provide a
          more honest picture.
        </p>

        <div className="article-signal-strip" aria-label="How data becomes a route assessment">
          <div>
            <span>01 / Line</span>
            <strong>Geometry</strong>
            <p>Where the path goes and how its segments connect.</p>
          </div>
          <div>
            <span>02 / Context</span>
            <strong>OSM signals</strong>
            <p>Surface, access, difficulty, and the road environment.</p>
          </div>
          <div>
            <span>03 / Decision</span>
            <strong>Confidence</strong>
            <p>A route assessment with a reason, not a black box.</p>
          </div>
        </div>

        <h2 id="unknown-en">Unknown does not mean dangerous</h2>
        <p>
          Negative and unknown signals must remain separate. If a segment is
          explicitly closed to bicycles, that is a direct restriction. If its
          surface is missing, we simply do not know what it is. Those situations
          need different messages and different responses.
        </p>
        <p>
          Treating every unknown segment as bad rejects many perfectly usable
          rural roads. Treating it as good hides genuine risk. A better approach
          is to show confidence and explain what data is missing. Riders can see
          where a route is well supported and where their own judgement may be
          needed.
        </p>

        <blockquote>
          A good recommendation does not promise a perfect road. It explains
          what is known, what is uncertain, and why.
        </blockquote>

        <h2 id="rider-en">What the rider should see</h2>
        <p>
          Riders do not need a table of dozens of raw tags. They need four clear
          answers: where the questionable segment is, what caused the concern,
          whether a more reliable alternative exists, and how confident the
          system is.
        </p>
        <ul>
          <li>
            <strong>Risk:</strong> a specific segment, not an alarm over the
            entire route.
          </li>
          <li>
            <strong>Reason:</strong> unknown surface, access restrictions, high
            difficulty, or a combination of factors.
          </li>
          <li>
            <strong>Choice:</strong> keep the faster option or accept a small
            detour.
          </li>
          <li>
            <strong>Confidence:</strong> how strongly the available data
            supports the conclusion.
          </li>
        </ul>
        <p>
          This explanation matters most before a long ride. A small uncertainty
          close to home is one thing. The same uncertainty on a remote segment
          with no easy alternative is something else entirely.
        </p>

        <h2 id="check-en">How we check a route</h2>
        <p>
          Routecycle uses three steps. First, the route is divided into short
          segments so a local issue is not diluted by an overall score. Next,
          each segment is enriched with available road signals. Finally, the
          system highlights the sections that deserve attention and connects
          each conclusion to a reason.
        </p>
        <p>
          The final assessment is not an attempt to decide everything for the
          rider. It is a faster way to spot weak points and make a decision
          before setting off. The clearer the explanation, the easier it becomes
          to trust the route—or choose another one in time.
        </p>

        <section className="article-cta" aria-labelledby="article-cta-en">
          <p>Next step</p>
          <h2 id="article-cta-en">Check your route before the ride</h2>
          <span>
            Open Routecycle, add a route, and see which sections deserve a
            closer look.
          </span>
          <a href={productUrl}>Test a route →</a>
        </section>
      </div>
    </div>
  </article>
);

export default function ArticlePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogLanguage
        russian={<RussianArticle />}
        english={<EnglishArticle />}
        titleRu="Почему линия на карте ещё не означает хороший веломаршрут — Routecycle"
        titleEn="Why a line on the map is not yet a good cycling route — Routecycle"
        descriptionRu="Какие данные помогают отличить красивую линию от маршрута, которому велосипедист может доверять."
        descriptionEn="The data that separates a line on a map from a cycling route a rider can trust."
      />
    </>
  );
}
