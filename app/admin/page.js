import Link from "next/link";
import BlogLanguage from "../blog/blog-language";

export const metadata = {
  title: "Routecycle Content Admin",
  description: "Управление контентом лендинга и блога Routecycle.",
  alternates: {
    canonical: "/routecycle/admin/",
  },
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
  },
};

const github = {
  landing:
    "https://github.com/VladTsypin/routecycle/edit/main/app/page.js",
  blogIndex:
    "https://github.com/VladTsypin/routecycle/edit/main/app/blog/page.js",
  article:
    "https://github.com/VladTsypin/routecycle/edit/main/app/blog/why-a-line-is-not-a-route/page.js",
  deploy:
    "https://github.com/VladTsypin/routecycle/actions/workflows/deploy-pages.yml",
};

function ExternalAction({ href, children, primary = false }) {
  return (
    <a
      className={`admin-action${primary ? " admin-action--primary" : ""}`}
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
}

const RussianAdmin = () => (
  <main className="admin-shell">
    <p className="blog-kicker">CONTENT ADMIN · ROUTECYCLE</p>
    <h1>Управление контентом.</h1>
    <p className="admin-intro">
      Редактируйте лендинг и материалы блога из одного места. Доступ к
      сохранению проверяет GitHub: изменения сможет публиковать только участник
      репозитория с правом записи.
    </p>

    <section className="admin-section" aria-labelledby="admin-blog-ru">
      <header>
        <div>
          <span>01</span>
          <h2 id="admin-blog-ru">Блог</h2>
        </div>
        <p>1 опубликованный материал</p>
      </header>

      <article className="admin-content-row">
        <div className="admin-content-meta">
          <span>Опубликовано</span>
          <time dateTime="2026-07-20">20.07.2026</time>
        </div>
        <div>
          <p>RU / EN · 6 минут</p>
          <h3>Почему линия на карте ещё не означает хороший веломаршрут</h3>
        </div>
        <div className="admin-row-actions">
          <Link
            className="admin-action"
            href="/blog/why-a-line-is-not-a-route/"
            prefetch={false}
          >
            Открыть
          </Link>
          <ExternalAction href={github.article} primary>
            Редактировать ↗
          </ExternalAction>
        </div>
      </article>

      <div className="admin-secondary-actions">
        <ExternalAction href={github.blogIndex}>
          Редактировать список статей ↗
        </ExternalAction>
      </div>
    </section>

    <section className="admin-section" aria-labelledby="admin-landing-ru">
      <header>
        <div>
          <span>02</span>
          <h2 id="admin-landing-ru">Лендинг</h2>
        </div>
        <p>RU / EN · GitHub Pages</p>
      </header>
      <div className="admin-landing-row">
        <div>
          <p>Главная страница</p>
          <h3>Routecycle — маршруты без неприятных сюрпризов</h3>
        </div>
        <div className="admin-row-actions">
          <Link className="admin-action" href="/" prefetch={false}>
            Открыть
          </Link>
          <ExternalAction href={github.landing} primary>
            Редактировать ↗
          </ExternalAction>
        </div>
      </div>
    </section>

    <aside className="admin-publish-note">
      <div>
        <span>Как публикуются изменения</span>
        <p>
          Нажмите «Редактировать», войдите в GitHub, внесите изменения и
          сохраните commit в ветку main. GitHub Pages автоматически пересоберёт
          сайт.
        </p>
      </div>
      <ExternalAction href={github.deploy}>
        Статус публикации ↗
      </ExternalAction>
    </aside>
  </main>
);

const EnglishAdmin = () => (
  <main className="admin-shell">
    <p className="blog-kicker">CONTENT ADMIN · ROUTECYCLE</p>
    <h1>Content management.</h1>
    <p className="admin-intro">
      Edit the landing page and blog from one place. GitHub controls write
      access, so only repository collaborators with permission can publish
      changes.
    </p>

    <section className="admin-section" aria-labelledby="admin-blog-en">
      <header>
        <div>
          <span>01</span>
          <h2 id="admin-blog-en">Blog</h2>
        </div>
        <p>1 published article</p>
      </header>

      <article className="admin-content-row">
        <div className="admin-content-meta">
          <span>Published</span>
          <time dateTime="2026-07-20">20 JUL 2026</time>
        </div>
        <div>
          <p>RU / EN · 6 min read</p>
          <h3>Why a line on the map is not yet a good cycling route</h3>
        </div>
        <div className="admin-row-actions">
          <Link
            className="admin-action"
            href="/blog/why-a-line-is-not-a-route/"
            prefetch={false}
          >
            Open
          </Link>
          <ExternalAction href={github.article} primary>
            Edit ↗
          </ExternalAction>
        </div>
      </article>

      <div className="admin-secondary-actions">
        <ExternalAction href={github.blogIndex}>
          Edit article list ↗
        </ExternalAction>
      </div>
    </section>

    <section className="admin-section" aria-labelledby="admin-landing-en">
      <header>
        <div>
          <span>02</span>
          <h2 id="admin-landing-en">Landing page</h2>
        </div>
        <p>RU / EN · GitHub Pages</p>
      </header>
      <div className="admin-landing-row">
        <div>
          <p>Home page</p>
          <h3>Routecycle — cycling routes without unpleasant surprises</h3>
        </div>
        <div className="admin-row-actions">
          <Link className="admin-action" href="/" prefetch={false}>
            Open
          </Link>
          <ExternalAction href={github.landing} primary>
            Edit ↗
          </ExternalAction>
        </div>
      </div>
    </section>

    <aside className="admin-publish-note">
      <div>
        <span>How publishing works</span>
        <p>
          Select “Edit”, sign in to GitHub, make the change, and commit it to
          main. GitHub Pages will rebuild the site automatically.
        </p>
      </div>
      <ExternalAction href={github.deploy}>
        Deployment status ↗
      </ExternalAction>
    </aside>
  </main>
);

export default function AdminPage() {
  return (
    <BlogLanguage
      russian={<RussianAdmin />}
      english={<EnglishAdmin />}
      titleRu="Админка Routecycle — управление контентом"
      titleEn="Routecycle Admin — content management"
      descriptionRu="Управление контентом лендинга и блога Routecycle."
      descriptionEn="Manage Routecycle landing page and blog content."
    />
  );
}
