import MerchantsHero from './components/MerchantsHero/MerchantsHero';
import './page.scss';

export default function MerchantsPage() {
  return (
    <main className="merchants-page">
      <MerchantsHero />
      <section className="merchants-page__section" id="beneficios-b2b">
        <h2>Beneficios para tu negocio</h2>
        <ul>
          <li>Recuperá parte de tus costos con la comida que no llegaste a vender.</li>
          <li>Acercá tu propuesta a nuevos clientes del barrio.</li>
          <li>Reducí el desperdicio y destacá el compromiso de tu local.</li>
        </ul>
      </section>
      <section className="merchants-page__section" id="como-funciona">
        <h2>Cómo funciona</h2>
        <ol>
          <li>Publicá packs con tus excedentes del día.</li>
          <li>Recibí las reservas desde la app.</li>
          <li>Entregá los pedidos en la franja de retiro indicada.</li>
        </ol>
      </section>
      <section className="merchants-page__section" id="faq">
        <h2>Dudas frecuentes</h2>
        <details>
          <summary>¿Qué productos puedo incluir?</summary>
          <p>Productos elaborados en el día que no hayas llegado a vender y estén en perfecto estado: panes, facturas, sándwiches, tartas, empanadas, pastas o pastelería.</p>
        </details>
        <details>
          <summary>¿Qué pasa si un día vendo todo y no me sobra nada?</summary>
          <p>No tenés obligación de publicar una cantidad fija. Vos manejás tu stock y habilitás packs cuando realmente tenés excedentes.</p>
        </details>
      </section>
    </main>
  );
}
