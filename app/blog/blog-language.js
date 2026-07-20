"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function BlogLanguage({
  russian,
  english,
  titleRu,
  titleEn,
  descriptionRu,
  descriptionEn,
}) {
  const [language, setLanguage] = useState(null);
  const visibleLanguage = language ?? "ru";

  useEffect(() => {
    const saved = window.localStorage.getItem("routecycle-language");
    if (saved === "ru" || saved === "en") {
      setLanguage(saved);
      return;
    }
    setLanguage(navigator.language.toLowerCase().startsWith("ru") ? "ru" : "en");
  }, []);

  useEffect(() => {
    if (!language) return;
    window.localStorage.setItem("routecycle-language", language);
    document.documentElement.lang = language;
    document.title = language === "en" ? titleEn : titleRu;
    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.content = language === "en" ? descriptionEn : descriptionRu;
    }
  }, [descriptionEn, descriptionRu, language, titleEn, titleRu]);

  return (
    <div className="blog-page">
      <header className="blog-header">
        <Link
          className="brand"
          href="/"
          prefetch={false}
          aria-label="Routecycle — на главную"
        >
          <span className="brand-mark">
            <i />
            <i />
          </span>
          ROUTECYCLE
        </Link>
        <div className="blog-header-actions">
          <Link className="blog-product-link" href="/" prefetch={false}>
            {visibleLanguage === "en" ? "Product" : "Продукт"}
          </Link>
          <button
            className="language-toggle"
            type="button"
            aria-label={
              visibleLanguage === "ru"
                ? "Switch to English"
                : "Переключить на русский"
            }
            onClick={() =>
              setLanguage((current) => (current === "en" ? "ru" : "en"))
            }
          >
            <span className={visibleLanguage === "ru" ? "is-active" : ""}>
              RU
            </span>
            <i aria-hidden="true">/</i>
            <span className={visibleLanguage === "en" ? "is-active" : ""}>
              EN
            </span>
          </button>
        </div>
      </header>
      {visibleLanguage === "en" ? english : russian}
    </div>
  );
}
