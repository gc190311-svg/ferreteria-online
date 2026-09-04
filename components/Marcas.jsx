"use client";

import { useEffect, useRef } from "react";

export default function Marcas() {
  const carruselRef = useRef(null);
  const intervaloRef = useRef(null);

  const marcas = [
    {
      imagen: "/marcas/truper.png",
      nombre: "TRUPER",
    },
    {
      imagen: "/marcas/anypsa.png",
      nombre: "ANYPSA",
    },
    {
      imagen: "/marcas/cpp.png",
      nombre: "CPP",
    },
    {
      imagen: "/marcas/kamasa.png",
      nombre: "KAMASA",
    },
    {
      imagen: "/marcas/stanley.png",
      nombre: "STANLEY",
    },
    {
      imagen: "/marcas/bticino.png",
      nombre: "BTICINO",
    },
    {
      imagen: "/marcas/indeco.png",
      nombre: "INDECO",
    },
  ];

  /* =====================================================
     MOVER CARRUSEL
  ===================================================== */

  const moverCarrusel = (direccion) => {
    const carrusel = carruselRef.current;

    if (!carrusel) return;

    const tarjeta = carrusel.querySelector(".marca-card");

    if (!tarjeta) return;

    const ancho =
      tarjeta.getBoundingClientRect().width + 18;

    carrusel.scrollBy({
      left: direccion * ancho,
      behavior: "smooth",
    });
  };


  /* =====================================================
     AUTO CARRUSEL
  ===================================================== */

  useEffect(() => {
    const iniciarCarrusel = () => {
      intervaloRef.current = setInterval(() => {
        const carrusel = carruselRef.current;

        if (!carrusel) return;

        const tarjeta =
          carrusel.querySelector(".marca-card");

        if (!tarjeta) return;

        const ancho =
          tarjeta.getBoundingClientRect().width + 18;

        const maxScroll =
          carrusel.scrollWidth -
          carrusel.clientWidth;

        if (
          carrusel.scrollLeft >=
          maxScroll - 10
        ) {
          carrusel.scrollTo({
            left: 0,
            behavior: "smooth",
          });
        } else {
          carrusel.scrollBy({
            left: ancho,
            behavior: "smooth",
          });
        }
      }, 3500);
    };

    iniciarCarrusel();

    return () => {
      if (intervaloRef.current) {
        clearInterval(intervaloRef.current);
      }
    };
  }, []);


  /* =====================================================
     PAUSAR CARRUSEL
  ===================================================== */

  const pausarCarrusel = () => {
    if (intervaloRef.current) {
      clearInterval(intervaloRef.current);

      intervaloRef.current = null;
    }
  };


  /* =====================================================
     REANUDAR CARRUSEL
  ===================================================== */

  const reanudarCarrusel = () => {
    if (intervaloRef.current) return;

    intervaloRef.current = setInterval(() => {
      const carrusel = carruselRef.current;

      if (!carrusel) return;

      const tarjeta =
        carrusel.querySelector(".marca-card");

      if (!tarjeta) return;

      const ancho =
        tarjeta.getBoundingClientRect().width + 18;

      const maxScroll =
        carrusel.scrollWidth -
        carrusel.clientWidth;

      if (
        carrusel.scrollLeft >=
        maxScroll - 10
      ) {
        carrusel.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      } else {
        carrusel.scrollBy({
          left: ancho,
          behavior: "smooth",
        });
      }
    }, 3500);
  };


  return (
    <section className="marcas-section">

      {/* =================================================
          TITULO
      ================================================= */}

      <div className="marcas-header">

        <div className="marcas-linea"></div>

        <h2>
          Trabajamos con las mejores
          <span> marcas</span>
        </h2>

        <p>
          Calidad y confianza para tus proyectos
        </p>

      </div>


      {/* =================================================
          CARRUSEL
      ================================================= */}

      <div
        className="marcas-carrusel-wrapper"
        onMouseEnter={pausarCarrusel}
        onMouseLeave={reanudarCarrusel}
        onTouchStart={pausarCarrusel}
        onTouchEnd={reanudarCarrusel}
      >

        {/* FLECHA IZQUIERDA */}

        <button
          type="button"
          className="marca-arrow marca-arrow-left"
          onClick={() => moverCarrusel(-1)}
          aria-label="Marca anterior"
        >
          ‹
        </button>


        {/* MARCAS */}

        <div
          ref={carruselRef}
          className="marcas-carrusel"
        >

          {marcas.map((marca, index) => (
            <div
              className="marca-card"
              key={`${marca.nombre}-${index}`}
            >

              <div className="marca-logo-container">

                <img
                  src={marca.imagen}
                  alt={marca.nombre}
                  className="marca-logo"
                  loading="lazy"
                />

              </div>

              <div className="marca-nombre">
                {marca.nombre}
              </div>

            </div>
          ))}

        </div>


        {/* FLECHA DERECHA */}

        <button
          type="button"
          className="marca-arrow marca-arrow-right"
          onClick={() => moverCarrusel(1)}
          aria-label="Siguiente marca"
        >
          ›
        </button>

      </div>


      {/* =================================================
          INDICADORES
      ================================================= */}

      <div className="marcas-indicadores">

        <span className="indicador activo"></span>

        <span className="indicador"></span>

        <span className="indicador"></span>

      </div>


      {/* =================================================
          BENEFICIOS
      ================================================= */}

      <div className="marcas-confianza">


        {/* TARJETA 1 */}

        <div className="confianza-item">

          <div className="confianza-icono">
            ✓
          </div>

          <div className="confianza-texto">

            <strong>
              Marcas con garantía
            </strong>

            <span>
              Calidad respaldada
            </span>

          </div>

        </div>


        {/* TARJETA 2 */}

        <div className="confianza-item">

          <div className="confianza-icono">
            ★
          </div>

          <div className="confianza-texto">

            <strong>
              Productos originales
            </strong>

            <span>
              Compra con confianza
            </span>

          </div>

        </div>


        {/* TARJETA 3 */}

        <div className="confianza-item">

          <div className="confianza-icono">
            ♡
          </div>

          <div className="confianza-texto">

            <strong>
              Tu confianza nos impulsa
            </strong>

            <span>
              Siempre contigo
            </span>

          </div>

        </div>

      </div>


      {/* =================================================
          ESTILOS
      ================================================= */}

      <style jsx>{`

        /* =================================================
           SECCION
        ================================================= */

        .marcas-section {
          width: 100%;

          background: #ffffff;

          padding: 65px 20px 60px;

          overflow: hidden;
        }


        /* =================================================
           TITULO
        ================================================= */

        .marcas-header {
          max-width: 1000px;

          margin: 0 auto 38px;

          text-align: center;
        }

        .marcas-linea {
          width: 82px;

          height: 5px;

          margin: 0 auto 22px;

          background: #f2b900;

          border-radius: 20px;
        }

        .marcas-header h2 {
          margin: 0;

          color: #101d35;

          font-size: 42px;

          line-height: 1.15;

          font-weight: 800;

          letter-spacing: -1px;
        }

        .marcas-header h2 span {
          color: #f2b900;
        }

        .marcas-header p {
          margin: 13px 0 0;

          color: #7b8494;

          font-size: 18px;
        }


        /* =================================================
           CONTENEDOR CARRUSEL
        ================================================= */

        .marcas-carrusel-wrapper {
          position: relative;

          width: 100%;

          max-width: 1200px;

          margin: 0 auto;
        }


        /* =================================================
           CARRUSEL
        ================================================= */

        .marcas-carrusel {
          display: flex;

          align-items: center;

          gap: 18px;

          overflow-x: auto;

          overflow-y: hidden;

          scroll-behavior: smooth;

          scroll-snap-type: x mandatory;

          scrollbar-width: none;

          padding: 10px 55px 20px;
        }

        .marcas-carrusel::-webkit-scrollbar {
          display: none;
        }


        /* =================================================
           TARJETA MARCA
        ================================================= */

        .marca-card {
          flex: 0 0 190px;

          height: 150px;

          background: #ffffff;

          border: 1px solid #e8edf3;

          border-radius: 18px;

          box-shadow:
            0 6px 20px
            rgba(16, 29, 53, 0.08);

          display: flex;

          flex-direction: column;

          align-items: center;

          justify-content: center;

          scroll-snap-align: center;

          padding: 12px;

          box-sizing: border-box;

          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease;
        }

        .marca-card:hover {
          transform: translateY(-4px);

          box-shadow:
            0 12px 28px
            rgba(16, 29, 53, 0.13);
        }


        /* =================================================
           LOGO
        ================================================= */

        .marca-logo-container {
          width: 165px;

          height: 92px;

          display: flex;

          align-items: center;

          justify-content: center;
        }

        .marca-logo {
          width: 100%;

          height: 100%;

          object-fit: contain;

          display: block;
        }


        /* =================================================
           NOMBRE MARCA
        ================================================= */

        .marca-nombre {
          margin-top: 5px;

          color: #14213d;

          font-size: 12px;

          line-height: 1.2;

          font-weight: 800;

          text-align: center;
        }


        /* =================================================
           FLECHAS
        ================================================= */

        .marca-arrow {
          position: absolute;

          top: 50%;

          transform: translateY(-50%);

          width: 44px;

          height: 44px;

          border: none;

          border-radius: 50%;

          background: #ffffff;

          color: #14213d;

          box-shadow:
            0 5px 18px
            rgba(0, 0, 0, 0.14);

          font-size: 34px;

          line-height: 1;

          display: flex;

          align-items: center;

          justify-content: center;

          cursor: pointer;

          z-index: 20;

          transition:
            background 0.2s ease,
            transform 0.2s ease;
        }

        .marca-arrow:hover {
          background: #f2b900;

          color: #000000;

          transform:
            translateY(-50%)
            scale(1.05);
        }

        .marca-arrow-left {
          left: 4px;
        }

        .marca-arrow-right {
          right: 4px;
        }


        /* =================================================
           INDICADORES
        ================================================= */

        .marcas-indicadores {
          display: flex;

          align-items: center;

          justify-content: center;

          gap: 8px;

          margin-top: 8px;
        }

        .indicador {
          width: 10px;

          height: 10px;

          border-radius: 50%;

          background: #d9dee6;
        }

        .indicador.activo {
          width: 25px;

          border-radius: 20px;

          background: #f2b900;
        }


        /* =================================================
           BLOQUE BENEFICIOS - PC
        ================================================= */

        .marcas-confianza {
          max-width: 1150px;

          margin: 38px auto 0;

          padding: 20px 25px;

          background: #f5f7fa;

          border: 1px solid #edf0f4;

          border-radius: 20px;

          display: flex;

          align-items: stretch;

          justify-content: space-between;

          gap: 0;
        }


        /* =================================================
           TARJETAS BENEFICIOS
        ================================================= */

        .confianza-item {
          flex: 1;

          display: flex;

          align-items: center;

          justify-content: center;

          gap: 12px;

          padding: 8px 20px;

          min-width: 0;

          box-sizing: border-box;
        }


        /* =================================================
           ICONO BENEFICIO
        ================================================= */

        .confianza-icono {
          width: 46px;

          height: 46px;

          flex-shrink: 0;

          border-radius: 50%;

          background: #ffffff;

          border: 1px solid #e7ebf0;

          color: #14213d;

          display: flex;

          align-items: center;

          justify-content: center;

          font-size: 22px;

          font-weight: 800;

          box-shadow:
            0 3px 10px
            rgba(16, 29, 53, 0.06);
        }


        /* =================================================
           TEXTO BENEFICIO
        ================================================= */

        .confianza-texto {
          min-width: 0;
        }

        .confianza-texto strong {
          display: block;

          color: #14213d;

          font-size: 14px;

          line-height: 1.2;

          font-weight: 800;
        }

        .confianza-texto span {
          display: block;

          color: #7b8494;

          font-size: 12px;

          line-height: 1.3;

          margin-top: 4px;
        }


        /* =================================================
           SEPARADORES
        ================================================= */

        .confianza-item + .confianza-item {
          border-left: 1px solid #dfe4ea;
        }


        /* =================================================
           TABLET
        ================================================= */

        @media (max-width: 900px) {

          .marca-card {
            flex-basis: 175px;

            height: 140px;
          }

          .marca-logo-container {
            width: 150px;

            height: 85px;
          }

          .marcas-header h2 {
            font-size: 36px;
          }

          .confianza-item {
            padding:
              8px 12px;

            gap: 9px;
          }

          .confianza-icono {
            width: 42px;

            height: 42px;

            font-size: 20px;
          }

          .confianza-texto strong {
            font-size: 12px;
          }

          .confianza-texto span {
            font-size: 10px;
          }

        }


        /* =================================================
           MOVIL
        ================================================= */

        @media (max-width: 600px) {

          .marcas-section {
            padding:
              45px 0 45px;
          }


          /* -----------------------------------------------
             TITULO
          ----------------------------------------------- */

          .marcas-header {
            padding: 0 18px;

            margin-bottom: 25px;
          }

          .marcas-linea {
            width: 70px;

            height: 4px;

            margin-bottom: 18px;
          }

          .marcas-header h2 {
            font-size: 30px;

            line-height: 1.12;

            letter-spacing: -0.6px;
          }

          .marcas-header p {
            font-size: 15px;

            line-height: 1.4;

            margin-top: 10px;
          }


          /* -----------------------------------------------
             CARRUSEL
          ----------------------------------------------- */

          .marcas-carrusel {
            gap: 12px;

            padding:
              8px 48px 16px;
          }


          /* -----------------------------------------------
             TARJETAS MARCAS
          ----------------------------------------------- */

          .marca-card {
            flex:
              0 0 calc(
                (100vw - 112px) / 3
              );

            min-width: 105px;

            max-width: 125px;

            height: 125px;

            padding: 8px;

            border-radius: 16px;

            box-shadow:
              0 4px 15px
              rgba(16, 29, 53, 0.08);
          }


          /* -----------------------------------------------
             LOGO MOVIL
          ----------------------------------------------- */

          .marca-logo-container {
            width: 94%;

            height: 78px;
          }

          .marca-logo {
            width: 100%;

            height: 100%;

            object-fit: contain;
          }


          /* -----------------------------------------------
             NOMBRE MARCA
          ----------------------------------------------- */

          .marca-nombre {
            margin-top: 4px;

            font-size: 10px;

            line-height: 1.2;
          }


          /* -----------------------------------------------
             FLECHAS
          ----------------------------------------------- */

          .marca-arrow {
            width: 38px;

            height: 38px;

            font-size: 29px;
          }

          .marca-arrow-left {
            left: 5px;
          }

          .marca-arrow-right {
            right: 5px;
          }


          /* -----------------------------------------------
             INDICADORES
          ----------------------------------------------- */

          .marcas-indicadores {
            margin-top: 10px;

            gap: 7px;
          }

          .indicador {
            width: 9px;

            height: 9px;
          }

          .indicador.activo {
            width: 23px;
          }


          /* -----------------------------------------------
             BENEFICIOS HORIZONTALES
          ----------------------------------------------- */

          .marcas-confianza {

            width:
              calc(100% - 20px);

            margin:
              28px auto 0;

            padding: 0;

            background: transparent;

            border: none;

            border-radius: 0;

            display: flex !important;

            flex-direction: row !important;

            align-items: stretch;

            justify-content: space-between;

            gap: 7px;

            overflow: visible;
          }


          /* -----------------------------------------------
             TARJETA INDIVIDUAL
          ----------------------------------------------- */

          .confianza-item {

            flex:
              0 0 calc(
                (100% - 14px) / 3
              ) !important;

            width:
              calc(
                (100% - 14px) / 3
              ) !important;

            min-width: 0 !important;

            height: 135px;

            margin: 0;

            padding:
              12px 5px;

            background: #f5f7fa;

            border:
              1px solid #e8edf3 !important;

            border-radius: 16px;

            display: flex !important;

            flex-direction: column !important;

            align-items: center !important;

            justify-content: center !important;

            text-align: center;

            gap: 8px;

            box-sizing: border-box;

            box-shadow:
              0 4px 14px
              rgba(16, 29, 53, 0.06);
          }


          /* -----------------------------------------------
             ICONO
          ----------------------------------------------- */

          .confianza-icono {

            width: 40px;

            height: 40px;

            min-width: 40px;

            flex-shrink: 0;

            border-radius: 50%;

            background: #ffffff;

            border:
              1px solid #e5eaf0;

            color: #14213d;

            display: flex !important;

            align-items: center !important;

            justify-content: center !important;

            font-size: 19px;

            box-shadow:
              0 3px 9px
              rgba(16, 29, 53, 0.07);
          }


          /* -----------------------------------------------
             TEXTO
          ----------------------------------------------- */

          .confianza-texto {

            width: 100%;

            min-width: 0;

            text-align: center;
          }

          .confianza-texto strong {

            display: block;

            color: #14213d;

            font-size: 10.5px;

            line-height: 1.2;

            font-weight: 800;
          }

          .confianza-texto span {

            display: block;

            color: #7b8494;

            font-size: 8.5px;

            line-height: 1.25;

            margin-top: 4px;
          }


          /* -----------------------------------------------
             ELIMINAR SEPARADORES EN MOVIL
          ----------------------------------------------- */

          .confianza-item + .confianza-item {
            border-left:
              1px solid #e8edf3 !important;
          }

        }


        /* =================================================
           TELEFONOS PEQUEÑOS
        ================================================= */

        @media (max-width: 380px) {

          .marcas-section {
            padding-top: 40px;
          }

          .marcas-header h2 {
            font-size: 27px;
          }

          .marca-card {

            flex:
              0 0 calc(
                (100vw - 90px) / 3
              );

            min-width: 98px;

            max-width: 108px;

            height: 118px;
          }

          .marca-logo-container {
            height: 72px;
          }

          .marca-nombre {
            font-size: 9px;
          }


          /* BENEFICIOS */

          .marcas-confianza {

            width:
              calc(100% - 12px);

            gap: 5px;
          }

          .confianza-item {

            flex:
              0 0 calc(
                (100% - 10px) / 3
              ) !important;

            width:
              calc(
                (100% - 10px) / 3
              ) !important;

            height: 128px;

            padding:
              9px 3px;

            border-radius: 14px;
          }

          .confianza-icono {

            width: 37px;

            height: 37px;

            min-width: 37px;

            font-size: 17px;
          }

          .confianza-texto strong {
            font-size: 9.5px;
          }

          .confianza-texto span {
            font-size: 7.5px;
          }

        }

      `}</style>

    </section>
  );
}