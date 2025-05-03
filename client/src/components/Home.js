import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate(0); 
  };

  return (
    <>
      <header>
        <div className="logo">Tomash Shop</div>
        <nav>
          <ul>
            <li><Link to="/">Pradžia</Link></li>
            <li><Link to="/apie">Apie mus</Link></li>
            <li><Link to="/kontaktai">Kontaktai</Link></li>
            <li><Link to="/paslaugos">Paslaugos</Link></li>
            <li><Link to="/portfolio">Portfolio</Link></li>

            {!user && (
              <>
                <li><Link to="/register">Registracija</Link></li>
                <li><Link to="/login">Prisijungti</Link></li>
              </>
            )}

            {user && (
              <>
                <li><Link to="/paraiskos">Paraiškos</Link></li>
                <li><Link to="/admin">Admin</Link></li>
                <li className="user-greeting">
                  <span style={{ color: 'white', fontWeight: 'bold' }}>
                    Sveiki, {user.name}
                  </span>
                </li>
                <li>
                  <button onClick={handleLogout} className="logout-button">Atsijungti</button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>

      <section className="hero">
        <h1>Mano modernus tinklapis</h1>
        <p>Sukurtas naudojant šiuolaikinius dizaino principus</p>
        <a href="/apie" className="btn">Sužinokite daugiau</a>
      </section>

      <section className="services">
        <h2>Mūsų paslaugos</h2>
        <div className="services-container">
          <div className="service-box">
            <i className="fas fa-paint-brush"></i>
            <h3>Web dizainas</h3>
            <p>Kuriame modernius, patogius ir patrauklius tinklapių dizainus.</p>
          </div>
          <div className="service-box">
            <i className="fas fa-code"></i>
            <h3>Programavimas</h3>
            <p>Siūlome front-end ir back-end kūrimo paslaugas.</p>
          </div>
          <div className="service-box">
            <i className="fas fa-chart-line"></i>
            <h3>SEO optimizacija</h3>
            <p>Padedame jūsų tinklalapiui iškilti Google paieškoje.</p>
          </div>
          <div className="service-box">
            <i className="fas fa-shopping-cart"></i>
            <h3>El. parduotuvės</h3>
            <p>Projektuojame ir kuriame internetines parduotuves.</p>
          </div>
        </div>
      </section>

      <footer>
        <p>&copy; 2025 Tomash Shop. Visos teisės saugomos.</p>
      </footer>
    </>
  );
}

export default Home;
