export default function PrivacyPage() {
  return (
    <main>
      <div>
        <div>
          <div></div>
          <div>
            <h1>Política de Privacidad y Protección de Datos</h1>
            <p>Última actualización: Octubre 2026 • gosalvi.com</p>
          </div>
        </div>

        <div>
          <section>
            <h2>1. Responsable del Tratamiento</h2>
            <p>
              Salvi Food Technologies (en adelante, «Salvi») es responsable del
              tratamiento de los datos personales suministrados por los usuarios
              y comercios en la plataforma accesible mediante{' '}
              <strong>gosalvi.com</strong> y sus aplicaciones móviles nativas
              para Android e iOS.
            </p>
          </section>

          <section>
            <h2>2. Datos Recopilados y su Finalidad</h2>
            <p>
              <strong>a) Datos de Identificación y Contacto:</strong> Nombre,
              dirección de correo electrónico y teléfono de contacto para
              gestionar las reservas de boxes sorpresa, permitir el acceso
              seguro con credenciales cifradas y facilitar la entrega física en
              los locales gastronómicos asociados.
            </p>
            <p>
              <strong>b) Geolocalización (GPS):</strong> Con el consentimiento
              explícito del usuario, Salvi utiliza las coordenadas del
              dispositivo en primer plano exclusivamente para calcular la
              distancia a los comercios y mostrar las ofertas por proximidad
              geográfica.{' '}
              <em>
                Salvi no realiza seguimiento en segundo plano ni comparte tu
                ubicación con terceros.
              </em>
            </p>
            <p>
              <strong>c) Identificadores de Notificaciones (Push FCM):</strong>{' '}
              Token único de dispositivo para enviar alertas operativas sobre el
              estado del pedido, recordatorios de horario de retiro y
              notificaciones del compañero Koty.
            </p>
            <p>
              <strong>d) País aproximado por IP:</strong> En la primera visita,
              consultamos la dirección IP con{' '}
              <a href="https://country.is/">country.is</a> para seleccionar
              Argentina o Colombia en la interfaz. No requiere GPS y no
              guardamos esa IP en la base de datos de Salvi. Puedes cambiar el
              país en el selector; tu elección se conserva en el almacenamiento
              local del navegador y tiene prioridad sobre la detección
              automática.
            </p>
          </section>

          <section>
            <h2>3. Seguridad Financiera y Pagos</h2>
            <p>
              Salvi{' '}
              <strong>
                no almacena ni procesa números de tarjetas de crédito o débito
              </strong>{' '}
              en sus servidores propios. Todas las operaciones de cobro se
              ejecutan a través de procesadores de pago certificados
              internacionalmente bajo el estándar PCI-DSS (Mercado Pago y
              Stripe), garantizando la total confidencialidad e integridad
              financiera.
            </p>
          </section>

          <section>
            <h2>4. No Venta de Datos a Terceros</h2>
            <p>
              Salvi no comercializa, no alquila ni cede bases de datos de
              usuarios a agencias de publicidad o entidades comerciales
              externas. La información se utiliza de forma estricta para la
              operativa del servicio de rescate de alimentos.
            </p>
          </section>

          <section>
            <h2>
              5. Derechos de Acceso, Rectificación y Supresión (Derechos ARCO)
            </h2>
            <p>
              De acuerdo con la Ley N° 25.326 y estándares internacionales
              (GDPR), podés solicitar en cualquier momento el acceso,
              rectificación o eliminación completa de tu cuenta y datos
              personales. Podés hacerlo:
            </p>
            <ul>
              <li>
                Directamente dentro de la aplicación móvil: ingresando a{' '}
                <em>Mi Perfil &gt; Ajustes &gt; Eliminar Cuenta</em>.
              </li>
              <li>
                Siguiendo las instrucciones de nuestra página de{' '}
                <a href="/eliminar-cuenta">baja de cuenta y datos personales</a>
                .
              </li>
              <li>
                Por correo electrónico a: <strong>soporte@gosalvi.com</strong>.
              </li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
