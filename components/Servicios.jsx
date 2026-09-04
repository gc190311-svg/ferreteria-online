"use client";

export default function Services() {
  return (
    <section className="services-section">
      <div className="services-container">

        {/* ENCABEZADO */}
        <div className="services-header">
          <div className="services-line"></div>

          <h2>
            Nuestros <span>Servicios</span>
          </h2>

          <h3>Soluciones para tus proyectos</h3>

          <p>
            Te acompañamos en cada etapa, con un servicio
            confiable y de calidad.
          </p>
        </div>

        {/* SERVICIO 1 */}
        <div className="service-card">

          <div className="service-icon">
            <svg
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="50" cy="50" r="43" fill="#FFF1B8" />

              <path
                d="M20 52H62"
                stroke="#111827"
                strokeWidth="6"
                strokeLinecap="round"
              />

              <path
                d="M29 43L20 52L29 61"
                stroke="#111827"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <path
                d="M58 34H72L83 47V65H58V34Z"
                fill="#F2B900"
                stroke="#111827"
                strokeWidth="5"
                strokeLinejoin="round"
              />

              <circle
                cx="31"
                cy="68"
                r="7"
                fill="#F2B900"
                stroke="#111827"
                strokeWidth="5"
              />

              <circle
                cx="72"
                cy="68"
                r="7"
                fill="#F2B900"
                stroke="#111827"
                strokeWidth="5"
              />
            </svg>
          </div>

          <div className="service-divider"></div>

          <div className="service-content">
            <h4>Delivery a domicilio</h4>

            <p>
              Envíos rápidos a toda
              <br />
              Lima Metropolitana.
            </p>

            <div className="service-tag">
              <span>●</span>
              Seguridad y puntualidad
            </div>
          </div>

          <div className="service-arrow">
            →
          </div>

        </div>

        {/* SERVICIO 2 */}
        <div className="service-card">

          <div className="service-icon">
            <svg
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="50" cy="50" r="43" fill="#FFF1B8" />

              <path
                d="M31 67L66 32"
                stroke="#111827"
                strokeWidth="8"
                strokeLinecap="round"
              />

              <path
                d="M25 30L39 44"
                stroke="#111827"
                strokeWidth="7"
                strokeLinecap="round"
              />

              <path
                d="M25 30L32 23"
                stroke="#111827"
                strokeWidth="7"
                strokeLinecap="round"
              />

              <path
                d="M66 24C60 25 55 30 55 36C55 39 56 42 58 44L48 54L57 63L67 53C69 55 72 56 75 56C81 56 86 51 87 45L78 49L72 43L75 34L66 24Z"
                fill="#F2B900"
                stroke="#111827"
                strokeWidth="5"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="service-divider"></div>

          <div className="service-content">
            <h4>Asesoría técnica</h4>

            <p>
              Te ayudamos a elegir la
              <br />
              herramienta adecuada.
            </p>

            <div className="service-tag">
              <span>●</span>
              Expertos en ferretería
            </div>
          </div>

          <div className="service-arrow">
            →
          </div>

        </div>

        {/* SERVICIO 3 */}
        <div className="service-card">

          <div className="service-icon">
            <svg
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="50" cy="50" r="43" fill="#FFF1B8" />

              <path
                d="M50 19L58 24L68 23L72 32L81 37L78 47L82 56L73 62L70 72L59 72L50 80L41 72L30 73L27 63L18 57L22 47L19 37L28 32L32 23L42 24L50 19Z"
                fill="#F2B900"
                stroke="#111827"
                strokeWidth="5"
                strokeLinejoin="round"
              />

              <path
                d="M32 49L44 61L68 36"
                stroke="#111827"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="service-divider"></div>

          <div className="service-content">
            <h4>Productos de calidad</h4>

            <p>
              Trabajamos con las
              <br />
              mejores marcas del mercado.
            </p>

            <div className="service-tag">
              <span>★</span>
              Confianza en cada compra
            </div>
          </div>

          <div className="service-arrow">
            →
          </div>

        </div>

        {/* BLOQUE FINAL */}
        <div className="services-bottom">

          <div className="bottom-cart">
            <svg
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 20H27L34 62H78L88 34H31"
                stroke="#111827"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <circle
                cx="39"
                cy="78"
                r="6"
                stroke="#111827"
                strokeWidth="5"
              />

              <circle
                cx="72"
                cy="78"
                r="6"
                stroke="#111827"
                strokeWidth="5"
              />
            </svg>
          </div>

          <div className="bottom-text">
            <p>
              Todo lo que necesitas
              <br />
              para tu hogar y tus proyectos
            </p>
          </div>

          <div className="bottom-message">
            <strong>
              ¡Construyamos
              <br />
              juntos!
            </strong>

            <div className="bottom-underline"></div>
          </div>

        </div>

      </div>

      <style jsx>{`

        /* =========================
           SECCIÓN PRINCIPAL
        ========================= */

        .services-section {
          width: 100%;
          background: #f5f6f8;
          padding: 70px 20px;
          box-sizing: border-box;
        }

        .services-container {
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
        }

        /* =========================
           ENCABEZADO
        ========================= */

        .services-header {
          position: relative;
          margin-bottom: 45px;
        }

        .services-line {
          width: 100px;
          height: 5px;
          background: #f2b900;
          border-radius: 10px;
          margin-bottom: 30px;
        }

        .services-header h2 {
          margin: 0;
          color: #111827;
          font-size: 58px;
          line-height: 1.05;
          font-weight: 800;
          letter-spacing: -1.5px;
        }

        .services-header h2 span {
          color: #f2b900;
        }

        .services-header h3 {
          margin: 12px 0 12px;
          color: #4b5563;
          font-size: 30px;
          line-height: 1.2;
          font-weight: 500;
        }

        .services-header p {
          margin: 0;
          max-width: 720px;
          color: #6b7280;
          font-size: 20px;
          line-height: 1.5;
        }

        /* =========================
           TARJETAS
        ========================= */

        .service-card {
          position: relative;
          display: flex;
          align-items: center;
          width: 100%;
          min-height: 220px;
          margin-bottom: 24px;
          padding: 30px 36px;
          box-sizing: border-box;

          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 28px;

          box-shadow: 0 10px 30px rgba(17, 24, 39, 0.08);

          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease;
        }

        .service-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 35px rgba(17, 24, 39, 0.12);
        }

        /* =========================
           ICONOS
        ========================= */

        .service-icon {
          width: 180px;
          min-width: 180px;
          height: 180px;

          display: flex;
          align-items: center;
          justify-content: center;
        }

        .service-icon svg {
          width: 145px;
          height: 145px;
        }

        /* =========================
           DIVISOR
        ========================= */

        .service-divider {
          width: 2px;
          height: 140px;
          background: #e5e7eb;
          margin: 0 40px;
        }

        /* =========================
           CONTENIDO
        ========================= */

        .service-content {
          flex: 1;
          min-width: 0;
        }

        .service-content h4 {
          margin: 0 0 8px;
          color: #111827;
          font-size: 31px;
          line-height: 1.15;
          font-weight: 800;
        }

        .service-content p {
          margin: 0 0 18px;
          color: #6b7280;
          font-size: 21px;
          line-height: 1.35;
        }

        /* =========================
           ETIQUETAS
        ========================= */

        .service-tag {
          display: inline-flex;
          align-items: center;
          gap: 9px;

          padding: 9px 15px;
          border-radius: 10px;

          background: #fff4cf;
          color: #374151;

          font-size: 17px;
          font-weight: 500;
        }

        .service-tag span {
          color: #f2b900;
          font-size: 18px;
        }

        /* =========================
           FLECHA
        ========================= */

        .service-arrow {
          width: 72px;
          height: 72px;
          min-width: 72px;

          display: flex;
          align-items: center;
          justify-content: center;

          margin-left: 25px;

          border-radius: 50%;
          background: #ffe28a;

          color: #111827;
          font-size: 42px;
          line-height: 1;

          font-weight: 400;
        }

        /* =========================
           BLOQUE INFERIOR
        ========================= */

        .services-bottom {
          display: flex;
          align-items: center;

          min-height: 135px;
          margin-top: 32px;

          padding: 25px 45px;
          box-sizing: border-box;

          background: #f0f1f4;
          border-radius: 28px;
        }

        .bottom-cart {
          width: 75px;
          min-width: 75px;
          height: 75px;
        }

        .bottom-cart svg {
          width: 100%;
          height: 100%;
        }

        .bottom-text {
          flex: 1;
          margin-left: 25px;
        }

        .bottom-text p {
          margin: 0;
          color: #6b7280;
          font-size: 21px;
          line-height: 1.4;
        }

        .bottom-message {
          text-align: center;
          padding-right: 20px;
        }

        .bottom-message strong {
          color: #111827;
          font-size: 30px;
          line-height: 1;

          font-family: cursive;
          font-style: italic;
        }

        .bottom-underline {
          width: 110px;
          height: 4px;

          margin: 8px auto 0;

          background: #f2b900;
          border-radius: 10px;

          transform: rotate(-5deg);
        }

        /* =========================
           TABLET
        ========================= */

        @media (max-width: 800px) {

          .services-section {
            padding: 50px 16px;
          }

          .services-header h2 {
            font-size: 44px;
          }

          .services-header h3 {
            font-size: 24px;
          }

          .services-header p {
            font-size: 18px;
          }

          .service-card {
            padding: 25px;
          }

          .service-icon {
            width: 130px;
            min-width: 130px;
            height: 130px;
          }

          .service-icon svg {
            width: 110px;
            height: 110px;
          }

          .service-divider {
            height: 110px;
            margin: 0 25px;
          }

          .service-content h4 {
            font-size: 24px;
          }

          .service-content p {
            font-size: 17px;
          }

          .service-tag {
            font-size: 14px;
          }

          .service-arrow {
            width: 58px;
            height: 58px;
            min-width: 58px;
            font-size: 34px;
          }
        }

        /* =========================
           MÓVIL
           
           OCULTAMOS COMPLETAMENTE
           LA SECCIÓN EN CELULARES
        ========================= */

        @media (max-width: 600px) {

          .services-section {
            display: none !important;
          }

        }

      `}</style>
    </section>
  );
}