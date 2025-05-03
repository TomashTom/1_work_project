import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/styles.css';
import '../assets/css/about_style.css';

function Apie() {
  return (
    <>
      <header>
        <div className="logo">Tomash Shop</div>
        <nav>
          <ul>
            <li><Link to="/">Pradžia</Link></li>
            <li><Link to="/apie">Apie mus</Link></li>
            <li><Link to="/kontaktai">Kontaktai</Link></li>
            <li><Link to="/paraiskos">Paraiškos</Link></li>
            <li><Link to="/paslaugos">Paslaugos</Link></li>
            <li><Link to="/portfolio">Projektai</Link></li>
          </ul>
        </nav>
      </header>

      <section className="about-section">
        <div className="about-text">
          <h2>Kas mes?</h2>
          <p>Esame profesionali komanda, kuri specializuojasi tinklapių kūrime.</p>
        </div>
        <div className="about-image">
          <img src="/images/team.jpg" alt="Mūsų komanda" />
        </div>
      </section>

      <section className="content">
        <h2 className="section-title">Mūsų darbai</h2>
      </section>

      <section className="gallery">
        <div className="gallery-wrapper">
          <div className="gallery-track">
            <img src="/images/images1.jpg" alt="Tinklapio pavyzdys 1" />
            <img src="/images/images2.jpg" alt="Tinklapio pavyzdys 2" />
            <img src="/images/images3.jpg" alt="Tinklapio pavyzdys 3" />
            <img src="/images/images4.jpg" alt="Tinklapio pavyzdys 4" />
            <img src="/images/images5.jpg" alt="Tinklapio pavyzdys 5" />
            <img src="/images/images6.jpg" alt="Tinklapio pavyzdys 6" />
          </div>
        </div>
      </section>

      <section className="team-section">
        <h2>Mūsų komanda</h2>
        <div className="team-carousel">
          <div className="team-track">
            <div className="team-member">
              <img src="/images/person1.jpg" alt="Komandos narys 1" />
              <h3>Jonas Kazlauskas</h3>
              <p>Patirtis: 10 metų</p>
              <p>Darbo pobūdis: Front-end programuotojas</p>
            </div>
            <div className="team-member">
              <img src="/images/person2.jpg" alt="Komandos narys 2" />
              <h3>Rūta Petrauskaitė</h3>
              <p>Patirtis: 8 metai</p>
              <p>Darbo pobūdis: UX/UI dizainerė</p>
            </div>
            <div className="team-member">
              <img src="/images/person3.jpg" alt="Komandos narys 3" />
              <h3>Dainius Vaitkus</h3>
              <p>Patirtis: 12 metų</p>
              <p>Darbo pobūdis: Back-end programuotojas</p>
            </div>
            <div className="team-member">
              <img src="/images/person4.jpg" alt="Komandos narys 4" />
              <h3>Laura Mikalauskaitė</h3>
              <p>Patirtis: 6 metai</p>
              <p>Darbo pobūdis: Projektų vadovė</p>
            </div>
            <div className="team-member">
              <img src="/images/person5.jpg" alt="Komandos narys 5" />
              <h3>Tomas Jurkaitis</h3>
              <p>Patirtis: 9 metai</p>
              <p>Darbo pobūdis: SEO specialistas</p>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <p>&copy; 2025 Tomash Shop. Visos teisės saugomos.</p>
      </footer>
    </>
  );
}

export default Apie;
