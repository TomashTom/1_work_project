import React, { useEffect } from 'react';
import '../assets/css/modern_style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Portfolio() {
  useEffect(() => {
    const buttons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.project-card');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const category = btn.getAttribute('data-category');

        cards.forEach(card => {
          const cardCategory = card.getAttribute('data-category');
          if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }, []);

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
        <h2 className="text-center">Mūsų portfolio</h2>

        <div className="filter-buttons">
          <button className="filter-btn" data-category="all">Visi</button>
          <button className="filter-btn" data-category="ecommerce">El. parduotuvės</button>
          <button className="filter-btn" data-category="business">Verslo tinklalapiai</button>
          <button className="filter-btn" data-category="portfolio">Portfolio</button>
        </div>

        <div className="row projects-container">
          <div className="col-md-4 project-card" data-category="ecommerce">
            <div className="card">
              <img src="/images/project1.jpg" className="card-img-top" alt="Projektas 1" />
              <div className="card-body">
                <h5 className="card-title">El. parduotuvė</h5>
                <p className="card-text">Moderni, patogi naudotojui ir optimizuota parduotuvė.</p>
              </div>
            </div>
          </div>

          <div className="col-md-4 project-card" data-category="business">
            <div className="card">
              <img src="/images/project2.jpg" className="card-img-top" alt="Projektas 2" />
              <div className="card-body">
                <h5 className="card-title">Verslo tinklalapis</h5>
                <p className="card-text">Efektyvus ir patikimas tinklalapis Jūsų verslui.</p>
              </div>
            </div>
          </div>

          <div className="col-md-4 project-card" data-category="portfolio">
            <div className="card">
              <img src="/images/project3.jpg" className="card-img-top" alt="Projektas 3" />
              <div className="card-body">
                <h5 className="card-title">Asmeninis portfolio</h5>
                <p className="card-text">Minimalistinis dizainas kūrybiškam žmogui.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Portfolio;
