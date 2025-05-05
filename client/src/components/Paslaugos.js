// import React, { useEffect } from 'react';
// import '../assets/css/modern_style.css';

// function Services() {
//   useEffect(() => {
//     // Įkeliam Bootstrap modal funkcionalumą
//     import('bootstrap/dist/js/bootstrap.bundle.min.js');
//   }, []);

//   return (
//     <>
//       <header>
//         <div className="logo">Tomash Shop</div>
//         <nav>
//           <ul>
//             <li><a href="/">Pradžia</a></li>
//             <li><a href="/apie">Apie mus</a></li>
//             <li><a href="/kontaktai">Kontaktai</a></li>
//             <li><a href="/paraiskos">Paraiškos</a></li>
//             <li><a href="/paslaugos">Paslaugos</a></li>
//             <li><a href="/portfolio">Portfolio</a></li>
//           </ul>
//         </nav>
//       </header>

//       <section className="container mt-5">
//         <h2 className="text-center">Mūsų paslaugos</h2>
//         <div className="row services-container">
//           <div className="col-md-4">
//             <div className="card">
//               <img src="/images/web-design.jpg" className="card-img-top" alt="Web dizainas" />
//               <div className="card-body">
//                 <h5 className="card-title">Web dizainas</h5>
//                 <p className="card-text">Kuriame unikalius ir modernius tinklalapius.</p>
//                 <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#serviceModal">Sužinoti daugiau</button>
//               </div>
//             </div>
//           </div>

//           <div className="col-md-4">
//             <div className="card">
//               <img src="/images/programming.jpg" className="card-img-top" alt="Programavimas" />
//               <div className="card-body">
//                 <h5 className="card-title">Programavimas</h5>
//                 <p className="card-text">Front-end ir Back-end kūrimo paslaugos.</p>
//                 <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#serviceModal">Sužinoti daugiau</button>
//               </div>
//             </div>
//           </div>

//           <div className="col-md-4">
//             <div className="card">
//               <img src="/images/seo.jpg" className="card-img-top" alt="SEO" />
//               <div className="card-body">
//                 <h5 className="card-title">SEO optimizacija</h5>
//                 <p className="card-text">Padedame pasiekti aukščiausias Google pozicijas.</p>
//                 <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#serviceModal">Sužinoti daugiau</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <div className="modal fade" id="serviceModal" tabIndex="-1" aria-labelledby="serviceModalLabel" aria-hidden="true">
//         <div className="modal-dialog">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title" id="serviceModalLabel">Paslaugos informacija</h5>
//               <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//             </div>
//             <div className="modal-body">
//               <p>Čia gali būti papildoma informacija apie paslaugą...</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Services;
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../assets/css/modern_style.css';

function Services() {
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const services = [
    {
      id: 1,
      title: "Web dizainas",
      image: "/images/web-design.jpg",
      short: "Kuriame unikalius ir modernius tinklalapius.",
      details: "Mes kuriame prisitaikančius, greitus ir UX orientuotus tinklalapius naudodami naujausias technologijas kaip React, Figma, Bootstrap."
    },
    {
      id: 2,
      title: "Programavimas",
      image: "/images/programming.jpg",
      short: "Front-end ir Back-end kūrimo paslaugos.",
      details: "Mūsų komanda kuria pilnus sprendimus su Node.js, Laravel, React, MongoDB, REST API integracijomis ir kita."
    },
    {
      id: 3,
      title: "SEO optimizacija",
      image: "/images/seo.jpg",
      short: "Padedame pasiekti aukščiausias Google pozicijas.",
      details: "Optimizuojame jūsų svetainės greitį, struktūrą, turinį ir raktinius žodžius remdamiesi Google PageSpeed, Semrush ir kitais įrankiais."
    }
  ];

  return (
    <>
      <header>
        <div className="logo">Tomash Shop</div>
        <nav>
          <ul>
            <li><a href="/">Pradžia</a></li>
            <li><a href="/apie">Apie mus</a></li>
            <li><a href="/kontaktai">Kontaktai</a></li>
            <li><a href="/paraiskos">Paraiškos</a></li>
            <li><a href="/paslaugos">Paslaugos</a></li>
            <li><a href="/portfolio">Portfolio</a></li>
          </ul>
        </nav>
      </header>

      <section className="container mt-5">
        <h2 className="text-center mb-4">Mūsų paslaugos</h2>
        <div className="row services-container">
          {services.map(service => (
            <div className="col-md-4 mb-4" key={service.id} data-aos="fade-up">
              <div className="card h-100 shadow-sm">
                <img src={service.image} className="card-img-top" alt={service.title} />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{service.title}</h5>
                  <p className="card-text">{service.short}</p>
                  <button
                    className="btn btn-primary mt-auto"
                    data-bs-toggle="modal"
                    data-bs-target="#serviceModal"
                    onClick={() => setSelectedService(service)}
                  >
                    Sužinoti daugiau
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modalas */}
      <div className="modal fade" id="serviceModal" tabIndex="-1" aria-labelledby="serviceModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="serviceModalLabel">{selectedService?.title}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Uždaryti"></button>
            </div>
            <div className="modal-body">
              <p>{selectedService?.details}</p>
              <a href="/kontaktai" className="btn btn-outline-primary mt-3">Užsisakyti šią paslaugą</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Services;
