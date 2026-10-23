import './PublicViewPage.scss';

export default function PublicViewPage({ eyebrow, title, description }) {
  return (
    <main className="public-view">
      <section className="public-view__message" aria-labelledby="public-view-title">
        <p className="public-view__eyebrow">{eyebrow}</p>
        <h1 id="public-view-title">{title}</h1>
        <p className="public-view__description">{description}</p>
      </section>
    </main>
  );
}
