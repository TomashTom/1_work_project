// // import React from 'react';
// // import { Link } from 'react-router-dom';
// // import '../assets/css/styles.css';
// // import '../assets/css/about_style.css';

// // function Apie() {
// //   return (
// //     <>
// //       <header>
// //         <div className="logo">Tomash Shop</div>
// //         <nav>
// //           <ul>
// //             <li><Link to="/">Pradžia</Link></li>
// //             <li><Link to="/apie">Apie mus</Link></li>
// //             <li><Link to="/kontaktai">Kontaktai</Link></li>
// //             <li><Link to="/paraiskos">Paraiškos</Link></li>
// //             <li><Link to="/paslaugos">Paslaugos</Link></li>
// //             <li><Link to="/portfolio">Projektai</Link></li>
// //           </ul>
// //         </nav>
// //       </header>

// //       <section className="about-section">
// //         <div className="about-text">
// //           <h2>Kas mes?</h2>
// //           <p>Esame profesionali komanda, kuri specializuojasi tinklapių kūrime.</p>
// //         </div>
// //         <div className="about-image">
// //           <img src="/images/team.jpg" alt="Mūsų komanda" />
// //         </div>
// //       </section>

// //       <section className="content">
// //         <h2 className="section-title">Mūsų darbai</h2>
// //       </section>

// //       <section className="gallery">
// //         <div className="gallery-wrapper">
// //           <div className="gallery-track">
// //             <img src="/images/images1.jpg" alt="Tinklapio pavyzdys 1" />
// //             <img src="/images/images2.jpg" alt="Tinklapio pavyzdys 2" />
// //             <img src="/images/images3.jpg" alt="Tinklapio pavyzdys 3" />
// //             <img src="/images/images4.jpg" alt="Tinklapio pavyzdys 4" />
// //             <img src="/images/images5.jpg" alt="Tinklapio pavyzdys 5" />
// //             <img src="/images/images6.jpg" alt="Tinklapio pavyzdys 6" />
// //           </div>
// //         </div>
// //       </section>

// //       <section className="team-section">
// //         <h2>Mūsų komanda</h2>
// //         <div className="team-carousel">
// //           <div className="team-track">
// //             <div className="team-member">
// //               <img src="/images/person1.jpg" alt="Komandos narys 1" />
// //               <h3>Jonas Kazlauskas</h3>
// //               <p>Patirtis: 10 metų</p>
// //               <p>Darbo pobūdis: Front-end programuotojas</p>
// //             </div>
// //             <div className="team-member">
// //               <img src="/images/person2.jpg" alt="Komandos narys 2" />
// //               <h3>Rūta Petrauskaitė</h3>
// //               <p>Patirtis: 8 metai</p>
// //               <p>Darbo pobūdis: UX/UI dizainerė</p>
// //             </div>
// //             <div className="team-member">
// //               <img src="/images/person3.jpg" alt="Komandos narys 3" />
// //               <h3>Dainius Vaitkus</h3>
// //               <p>Patirtis: 12 metų</p>
// //               <p>Darbo pobūdis: Back-end programuotojas</p>
// //             </div>
// //             <div className="team-member">
// //               <img src="/images/person4.jpg" alt="Komandos narys 4" />
// //               <h3>Laura Mikalauskaitė</h3>
// //               <p>Patirtis: 6 metai</p>
// //               <p>Darbo pobūdis: Projektų vadovė</p>
// //             </div>
// //             <div className="team-member">
// //               <img src="/images/person5.jpg" alt="Komandos narys 5" />
// //               <h3>Tomas Jurkaitis</h3>
// //               <p>Patirtis: 9 metai</p>
// //               <p>Darbo pobūdis: SEO specialistas</p>
// //             </div>
// //           </div>
// //         </div>
// //       </section>

// //       <footer>
// //         <p>&copy; 2025 Tomash Shop. Visos teisės saugomos.</p>
// //       </footer>
// //     </>
// //   );
// // }

// // export default Apie;


// import React, { useState, useMemo } from 'react';
// import { Link } from 'react-router-dom';
// import '../assets/css/styles.css';
// import '../assets/css/about_style.css';

// function Apie() {
//   const [roleFilter, setRoleFilter] = useState('Visi');

//   const teamMembers = [
//     {
//       name: 'Jonas Kazlauskas',
//       experience: 10,
//       role: 'Front-end programuotojas',
//       img: '/images/person1.jpg'
//     },
//     {
//       name: 'Rūta Petrauskaitė',
//       experience: 8,
//       role: 'UX/UI dizainerė',
//       img: '/images/person2.jpg'
//     },
//     {
//       name: 'Dainius Vaitkus',
//       experience: 12,
//       role: 'Back-end programuotojas',
//       img: '/images/person3.jpg'
//     },
//     {
//       name: 'Laura Mikalauskaitė',
//       experience: 6,
//       role: 'Projektų vadovė',
//       img: '/images/person4.jpg'
//     },
//     {
//       name: 'Tomas Jurkaitis',
//       experience: 9,
//       role: 'SEO specialistas',
//       img: '/images/person5.jpg'
//     }
//   ];

//   const roles = ['Visi', ...new Set(teamMembers.map(m => m.role))];

//   const filteredMembers = useMemo(() => {
//     if (roleFilter === 'Visi') return teamMembers;
//     return teamMembers.filter(m => m.role === roleFilter);
//   }, [roleFilter]);

//   return (
//     <>
//       <header>
//         <div className="logo">Tomash Shop</div>
//         <nav>
//           <ul>
//             <li><Link to="/">Pradžia</Link></li>
//             <li><Link to="/apie">Apie mus</Link></li>
//             <li><Link to="/kontaktai">Kontaktai</Link></li>
//             <li><Link to="/paraiskos">Paraiškos</Link></li>
//             <li><Link to="/paslaugos">Paslaugos</Link></li>
//             <li><Link to="/portfolio">Projektai</Link></li>
//           </ul>
//         </nav>
//       </header>

//       <section className="about-section">
//         <div className="about-text">
//           <h2>Kas mes?</h2>
//           <p>Esame profesionali komanda, kuri specializuojasi tinklapių kūrime.</p>
//         </div>
//         <div className="about-image">
//           <img src="/images/team.jpg" alt="Mūsų komanda" />
//         </div>
//       </section>

//       <section className="content">
//         <h2 className="section-title">Mūsų darbai</h2>
//       </section>

//       <section className="gallery">
//         <div className="gallery-wrapper">
//           <div className="gallery-track">
//             <img src="/images/images1.jpg" alt="Tinklapio pavyzdys 1" />
//             <img src="/images/images2.jpg" alt="Tinklapio pavyzdys 2" />
//             <img src="/images/images3.jpg" alt="Tinklapio pavyzdys 3" />
//             <img src="/images/images4.jpg" alt="Tinklapio pavyzdys 4" />
//             <img src="/images/images5.jpg" alt="Tinklapio pavyzdys 5" />
//             <img src="/images/images6.jpg" alt="Tinklapio pavyzdys 6" />
//           </div>
//         </div>
//       </section>

//       <section className="team-section">
//       <h2>Mūsų komanda</h2>

//       {/* Filtravimo select */}
//       <div style={{ textAlign: 'center', margin: '20px 0' }}>
//         <label htmlFor="roleFilter" style={{ fontWeight: 'bold', marginRight: '10px' }}>Filtruoti pagal rolę:</label>
//         <select
//           id="roleFilter"
//           value={roleFilter}
//           onChange={(e) => setRoleFilter(e.target.value)}
//           className="custom-select"
//           style={{
//             padding: '8px 12px',
//             borderRadius: '6px',
//             border: '1px solid #ccc',
//             fontSize: '16px'
//           }}
//         >
//           {roles.map((role, idx) => (
//             <option key={idx} value={role}>{role}</option>
//           ))}
//         </select>
//       </div>

//       {/* Komandos atvaizdavimas */}
//       {roleFilter === 'Visi' ? (
//         <div className="team-carousel">
//           <div className="team-track">
//             {filteredMembers.map((member, idx) => (
//               <div key={idx} className="team-member">
//                 <img src={member.img} alt={member.name} />
//                 <h3>{member.name}</h3>
//                 <p>Patirtis: {member.experience} metai(-ų)</p>
//                 <p>Darbo pobūdis: {member.role}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       ) : (
//         <div className="team-grid">
//           {filteredMembers.map((member, idx) => (
//             <div key={idx} className="team-member">
//               <img src={member.img} alt={member.name} />
//               <h3>{member.name}</h3>
//               <p>Patirtis: {member.experience} metai(-ų)</p>
//               <p>Darbo pobūdis: {member.role}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </section>
//           <footer>
//             <p>&copy; 2025 Tomash Shop. Visos teisės saugomos.</p>
//           </footer>
//         </>
//       );
//     }

// export default Apie;


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/styles.css';
import '../assets/css/about_style.css';

function Apie() {
  const [roleFilter, setRoleFilter] = useState('Visi');

  const teamMembers = [
    {
      name: 'Jonas Kazlauskas',
      role: 'Front-end programuotojas',
      experience: 10,
      img: '/images/person1.jpg'
    },
    {
      name: 'Rūta Petrauskaitė',
      role: 'UX/UI dizainerė',
      experience: 8,
      img: '/images/person3.jpg'
    },
    {
      name: 'Dainius Vaitkus',
      role: 'Back-end programuotojas',
      experience: 12,
      img: '/images/person2.jpg'
    },
    {
      name: 'Laura Mikalauskaitė',
      role: 'Projektų vadovė',
      experience: 6,
      img: '/images/person6.jpg'
    },
    {
      name: 'Tomas Jurkaitis',
      role: 'SEO specialistas',
      experience: 9,
      img: '/images/person5.jpg'
    },
    {
      name: 'Tomas Jurkaitis',
      role: 'SEO specialistas',
      experience: 9,
      img: '/images/person4.jpg'
    }
  ];

  const roles = ['Visi', ...Array.from(new Set(teamMembers.map(m => m.role)))];
  const filteredMembers = roleFilter === 'Visi'
    ? teamMembers
    : teamMembers.filter(m => m.role === roleFilter);

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

        <div className="team-filter">
          <label htmlFor="roleFilter">Filtruoti pagal rolę:</label>
          <select
            id="roleFilter"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="custom-select"
          >
            {roles.map((role, idx) => (
              <option key={idx} value={role}>{role}</option>
            ))}
          </select>
        </div>

        {roleFilter === 'Visi' ? (
          <div className="team-carousel-wrapper">
            <div className="team-carousel-track">
              {teamMembers.map((member, idx) => (
                <div key={idx} className="team-member moving">
                  <img src={member.img} alt={member.name} />
                  <h3>{member.name}</h3>
                  <p>Patirtis: {member.experience} metai(-ų)</p>
                  <p>Darbo pobūdis: {member.role}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="team-grid">
            {filteredMembers.map((member, idx) => (
              <div key={idx} className="team-member">
                <img src={member.img} alt={member.name} />
                <h3>{member.name}</h3>
                <p>Patirtis: {member.experience} metai(-ų)</p>
                <p>Darbo pobūdis: {member.role}</p>
              </div>
            ))}
          </div>
        )}


      </section>

      <footer>
        <p>&copy; 2025 Tomash Shop. Visos teisės saugomos.</p>
      </footer>
    </>
  );
}

export default Apie;
