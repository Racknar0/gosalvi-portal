import { Icon } from '@iconify/react/offline';
import chevronDownIcon from '@iconify-icons/lucide/chevron-down';
import './MerchantsFaq.scss';

const questions = [
  { question: '¿Cómo atrae Salvi nuevos clientes a mi mostrador?', answer: 'Salvi funciona como una vidriera para tu barrio. Los vecinos descubren tus packs y, al retirarlos, conocen tu local, tu atención y tus productos. Es una oportunidad para que vuelvan y también conozcan tu carta habitual.' },
  { question: '¿Vender packs afecta los precios de mi carta?', answer: 'Los packs sorpresa se arman con excedentes y varían según lo disponible cada día. El cliente conoce la categoría y el valor del pack, pero no los productos exactos. Así ofrecés una propuesta distinta de tu carta, sin rebajar artículos específicos.' },
  { question: '¿Cómo se organiza el retiro en mostrador?', answer: 'El pedido llega pagado desde la app. Prepará el pack para la franja de retiro que definiste, validá la entrega con QR o PIN y entregáselo al cliente, sin cobrar en mostrador.' },
  { question: '¿Cómo muestra Salvi el compromiso sustentable de mi local?', answer: 'Tu local aparece entre los comercios que rescatan alimentos del barrio. Cada pack que entregás ayuda a aprovechar comida en buen estado y permite que más vecinos conozcan tu compromiso con la reducción del desperdicio.' },
  { question: '¿Cuánto cuesta sumarme como comercio?', answer: 'El alta es gratuita y no hay cuotas mensuales. El modelo contempla una comisión por los packs vendidos; podés consultar las condiciones con el equipo antes de sumarte.' },
  { question: '¿Qué productos puedo incluir en un pack sorpresa?', answer: 'Productos frescos del día que no hayas llegado a vender y estén en perfecto estado: medialunas, panes, facturas, sándwiches, tartas, empanadas, pastas o pastelería.' },
  { question: '¿Qué pasa si un día vendo todo y no me sobra nada?', answer: 'No tenés obligación de publicar una cantidad fija. Vos manejás el stock y solo habilitás packs cuando realmente tenés excedentes.' },
  { question: '¿Puedo hablar con alguien antes de registrarme?', answer: <>Sí. Escribinos por <a href="https://wa.me/5491123849120" target="_blank" rel="noopener noreferrer">WhatsApp al +54 9 11 2384-9120</a> para consultar tus dudas y conocer cómo sumar tu local.</> },
];

export default function MerchantsFaq() {
  return (
    <section className="merchants-faq" id="faq" aria-labelledby="merchants-faq-title">
      <div className="merchants-faq__inner">
        <div className="merchants-faq__heading">
          <span>Resolvemos tus dudas</span>
          <h2 id="merchants-faq-title">Preguntas frecuentes para comercios</h2>
        </div>
        {questions.map(({ question, answer }) => (
          <details className="merchants-faq__item" name="merchants-faq" key={question}>
            <summary>{question}<Icon icon={chevronDownIcon} aria-hidden="true" /></summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
