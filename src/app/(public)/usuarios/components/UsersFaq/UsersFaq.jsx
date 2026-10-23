import { Icon } from '@iconify/react/offline';
import chevronDownIcon from '@iconify-icons/lucide/chevron-down';
import './UsersFaq.scss';

const questions = [
  { question: '¿Cómo puedo pagar mi pack?', answer: 'Podés pagar desde la app con Mercado Pago, tarjetas de crédito o débito, o tu saldo Salvi. Tu compra queda reservada y confirmada al completar el pago.' },
  { question: '¿Qué es una Mystery Box de Salvi?', answer: 'Es un paquete sorpresa con comida deliciosa elaborada en el día por tus panaderías, cafeterías y restaurantes favoritos. El local arma el pack con sus excedentes que no llegó a vender en su turno, y vos lo rescatás con hasta un 70% de descuento sobre el precio de lista.' },
  { question: '¿Cómo retiro mi compra en el comercio?', answer: 'Una vez que reservás y pagás tu pack en Salvi, la app te indica la franja horaria de retiro. Al llegar al mostrador, simplemente apuntás tu cámara al código QR exhibido en el cartel del local o indicás tu PIN verbal de 4 dígitos y te entregan tu paquete en mano.' },
  { question: '¿En qué estado están los alimentos de las Mystery Boxes?', answer: 'Son alimentos elaborados ese mismo día con materias primas de primera calidad que no llegaron a venderse antes del cierre. Conservan su sabor y calidad para consumir en el momento o darles un toque de calor en casa.' },
  { question: '¿Tengo que pagar algo extra para usar la app?', answer: 'No, Salvi es gratuita para descargar y explorar. Solo pagás el precio rebajado de las cajas sorpresa que decidas rescatar.' },
];

export default function UsersFaq() {
  return (
    <section className="users-faq" id="faq" aria-labelledby="users-faq-title">
      <div className="users-faq__inner">
        <div className="users-faq__heading">
          <span>Resolvemos tus dudas</span>
          <h2 id="users-faq-title">Dudas frecuentes</h2>
        </div>
        {questions.map(({ question, answer }) => (
          <details className="users-faq__item" name="users-faq" key={question}>
            <summary>{question}<Icon icon={chevronDownIcon} aria-hidden="true" /></summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

