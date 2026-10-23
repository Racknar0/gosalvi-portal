import './UsersSteps.scss';

const steps = [
  {
    title: 'Elegí tu pack sorpresa',
    description: 'Explorá los locales cercanos y encontrá comida rica para rescatar.',
    detail: 'Panaderías, sushi, viandas y café',
  },
  {
    title: 'Reservá y pagá',
    description: 'Elegí tu pack y pagá desde la app con hasta un 70% de descuento.',
    detail: 'Sin costos de envío ni cargos ocultos',
  },
  {
    title: 'Retirá y disfrutá',
    description: 'Pasá por el local en el horario indicado y llevate tu pedido.',
    detail: 'Listo para disfrutar o calentar',
  },
];

export default function UsersSteps() {
  return (
    <section className="users-steps" id="como-funciona" aria-labelledby="users-steps-title">
      <div className="users-steps__inner">
        <div className="users-steps__heading">
          <span className="users-steps__eyebrow">Fácil, rápido y transparente</span>
          <h2 id="users-steps-title">¿Cómo rescatás en 3 simples pasos?</h2>
          <p>Rescatá comida rica, ahorrá y pasá a buscarla. Todo desde la app.</p>
        </div>

        <ol className="users-steps__cards">
          {steps.map(({ title, description, detail }, index) => (
            <li className="users-steps__card" key={title}>
              <span className="users-steps__number" aria-hidden="true">{index + 1}</span>
              <h3>{title}</h3>
              <p>{description}</p>
              <span className="users-steps__detail">{detail}</span>
            </li>
          ))}
        </ol>

      </div>
    </section>
  );
}

