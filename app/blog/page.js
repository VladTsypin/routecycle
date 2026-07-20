import Link from "next/link";
import BlogLanguage from "./blog-language";

export const metadata = {
  title: "Блог Routecycle — данные, маршруты и уверенность перед поездкой",
  description:
    "Практические материалы Routecycle о качестве веломаршрутов, данных OpenStreetMap и проверке покрытия и доступа.",
  alternates: {
    canonical: "/routecycle/blog/",
  },
  openGraph: {
    type: "website",
    url: "/routecycle/blog/",
    title: "Блог Routecycle",
    description:
      "Как читать данные маршрута и замечать проблемы до начала поездки.",
  },
};

const articleHref = "/blog/why-a-line-is-not-a-route/";

export default function BlogPage() {
  const russian = (
    <main className="blog-index">
      <p className="blog-kicker">ROUTECYCLE JOURNAL · 01</p>
      <h1>Маршруты, данные и то, что скрыто между точками.</h1>
      <p className="blog-index-intro">
        Практические разборы о том, как заранее замечать плохое покрытие,
        закрытые проезды и участки, где уверенность данных ниже обычной.
      </p>

      <section className="blog-list" aria-label="Статьи">
        <article className="blog-list-item">
          <div className="blog-list-meta">
            <time dateTime="2026-07-20">20.07.2026</time>
            <span>6 минут</span>
          </div>
          <div>
            <p>МЕТОД · ДАННЫЕ</p>
            <h2>
              <Link href={articleHref} prefetch={false}>
                Почему линия на карте ещё не означает хороший веломаршрут
              </Link>
            </h2>
            <p className="blog-list-description">
              Какие сигналы покрытия, доступа и проезжаемости стоит проверить,
              прежде чем доверять красивой линии на экране.
            </p>
          </div>
          <Link
            className="blog-list-arrow"
            href={articleHref}
            prefetch={false}
            aria-label="Читать статью"
          >
            →
          </Link>
        </article>
      </section>
    </main>
  );

  const english = (
    <main className="blog-index">
      <p className="blog-kicker">ROUTECYCLE JOURNAL · 01</p>
      <h1>Routes, data and what hides between the points.</h1>
      <p className="blog-index-intro">
        Practical notes on spotting poor surfaces, restricted access and
        low-confidence data before a ride begins.
      </p>

      <section className="blog-list" aria-label="Articles">
        <article className="blog-list-item">
          <div className="blog-list-meta">
            <time dateTime="2026-07-20">20 JUL 2026</time>
            <span>6 min read</span>
          </div>
          <div>
            <p>METHOD · DATA</p>
            <h2>
              <Link href={articleHref} prefetch={false}>
                Why a line on the map is not yet a good cycling route
              </Link>
            </h2>
            <p className="blog-list-description">
              The surface, access and rideability signals worth checking before
              trusting a clean-looking line on a screen.
            </p>
          </div>
          <Link
            className="blog-list-arrow"
            href={articleHref}
            prefetch={false}
            aria-label="Read the article"
          >
            →
          </Link>
        </article>
      </section>
    </main>
  );

  return (
    <BlogLanguage
      russian={russian}
      english={english}
      titleRu="Блог Routecycle — маршруты и данные"
      titleEn="Routecycle Blog — routes and data"
      descriptionRu="Практические материалы о качестве веломаршрутов, покрытии, доступе и данных OpenStreetMap."
      descriptionEn="Practical notes on cycling route quality, surfaces, access and OpenStreetMap data."
    />
  );
}
