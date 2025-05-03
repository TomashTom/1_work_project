import React, { useState } from 'react';
import '../assets/css/contact_style.css';

function Kontaktai() {
  const [charCount, setCharCount] = useState(0);
  const [success, setSuccess] = useState(false);

  const handleMessageChange = (e) => {
    setCharCount(e.target.value.length);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
  };

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
            <li><a href="/portfolio">Projektai</a></li>
          </ul>
        </nav>
      </header>

      <section className="contact-container">
        <div className="contact-wrapper">
          <div className="contact-form">
            <h2>Susisiekite su mumis</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="name"><i className="fas fa-user"></i> Vardas:</label>
                <input type="text" id="name" placeholder="Įveskite savo vardą" required />
              </div>
              <div className="input-group">
                <label htmlFor="email"><i className="fas fa-envelope"></i> El. paštas:</label>
                <input type="email" id="email" placeholder="Įveskite el. pašto adresą" required />
              </div>
              <div className="input-group">
                <label htmlFor="phone"><i className="fas fa-phone"></i> Telefono numeris:</label>
                <input type="tel" id="phone" placeholder="Įveskite telefono numerį" />
              </div>
              <div className="input-group">
                <label htmlFor="request-type"><i className="fas fa-list"></i> Užklausos tipas:</label>
                <select id="request-type" required>
                  <option value="support">Techninė pagalba</option>
                  <option value="sales">Pasiūlymai</option>
                  <option value="general">Bendras klausimas</option>
                </select>
              </div>
              <div className="input-group">
                <label htmlFor="message"><i className="fas fa-comment"></i> Žinutė:</label>
                <textarea
                  id="message"
                  placeholder="Įrašykite savo žinutę..."
                  maxLength="500"
                  onChange={handleMessageChange}
                  required
                ></textarea>
                <small>{charCount}/500 simbolių</small>
              </div>
              <button className="btn" type="submit">Sižsti</button>
              {success && <p style={{ color: 'green', fontWeight: 'bold' }}>Žinutė sėkmingai išsiźsta!</p>}
            </form>
          </div>
          <div className="contact-image">
            <img src="/images/contact2.jpg" alt="Susisiekite su mumis" />
          </div>
        </div>
      </section>
    </>
  );
}

export default Kontaktai;
