import './MerchantsSteps.scss';

const steps = [
  {
    title: 'Publicá tus packs',
    description: 'Cargá los excedentes frescos del día desde tu panel. Elegí cuántos packs ofrecer y el horario de retiro que mejor se adapte a tu local.',
  },
  {
    title: 'Recibí reservas pagadas',
    description: 'Los vecinos descubren tus packs, reservan y pagan desde la app. Consultá los pedidos para organizar las entregas.',
  },
  {
    title: 'Validá y entregá',
    description: 'El cliente se acerca en el horario acordado. Validá el retiro con QR o PIN y entregá el pack preparado, sin cobrar en mostrador.',
  },
];

export default function MerchantsSteps() {
  return (
    <section className="merchants-steps" id="como-funciona" aria-labelledby="merchants-steps-title">
      <div className="merchants-steps__inner">
        <div className="merchants-steps__heading">
          <span className="merchants-steps__eyebrow">Operación diaria</span>
          <h2 id="merchants-steps-title">Tu local, en 3 simples pasos</h2>
          <p>Publicá, recibí reservas y entregá. Un proceso simple para sumar a tu rutina.</p>
        </div>
        <ol className="merchants-steps__grid">
          {steps.map(({ title, description }, index) => (
            <li className="merchants-steps__card" key={title}>
              <span className="merchants-steps__number" aria-hidden="true">{index + 1}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
