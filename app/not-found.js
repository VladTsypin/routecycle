export default function NotFound() {
  return (
    <main className="not-found">
      <p>404 · ROUTE NOT FOUND</p>
      <h1>
        Маршрут не найден.
        <br />
        <em>Route not found.</em>
      </h1>
      <a className="button button--primary" href="./">
        Вернуться к Routecycle
      </a>
    </main>
  );
}
