// import React, { useEffect } from 'react';
// import '../assets/css/submissions_style.css';

// function Submissions() {
//   useEffect(() => {
//     const clearBtn = document.getElementById('clear-submissions');
//     const tableBody = document.querySelector('#submissions-table tbody');

//     function loadDummyData() {
//       const dummy = [
//         {
//           name: 'Jonas',
//           email: 'jonas@example.com',
//           phone: '+37061234567',
//           type: 'Techninė pagalba',
//           message: 'Reikia pagalbos su svetaine',
//           status: 'Nauja',
//         },
//         {
//           name: 'Rūta',
//           email: 'ruta@example.com',
//           phone: '+37069876543',
//           type: 'Bendras klausimas',
//           message: 'Kiek kainuoja svetainė?',
//           status: 'Peržiūrėta',
//         },
//       ];

//       dummy.forEach((d) => {
//         const row = document.createElement('tr');
//         row.innerHTML = `
//           <td>${d.name}</td>
//           <td>${d.email}</td>
//           <td>${d.phone}</td>
//           <td>${d.type}</td>
//           <td>${d.message}</td>
//           <td>${d.status}</td>
//           <td><button class="btn">Atsakyti</button></td>
//         `;
//         tableBody.appendChild(row);
//       });
//     }

//     clearBtn.addEventListener('click', () => {
//       tableBody.innerHTML = '';
//     });

//     loadDummyData();
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

//       <section className="submissions-container">
//         <h2>Pateiktos paraiškos</h2>
//         <div className="image-container">
//           <img src="/images/submissions-banner.jpg" alt="Pateiktų paraiškų peržiūra" />
//         </div>

//         <button id="clear-submissions" className="clear-btn">🗑️ Ištrinti visas paraiškas
//         </button>

//         <div className="table-container">
//           <table id="submissions-table">
//             <thead>
//               <tr>
//                 <th>Vardas</th>
//                 <th>El. paštas</th>
//                 <th>Telefono numeris</th>
//                 <th>Užklausos tipas</th>
//                 <th>Žinutė</th>
//                 <th>Būsena</th>
//                 <th>Veiksmai</th>
//               </tr>
//             </thead>
//             <tbody></tbody>
//           </table>
//         </div>
//       </section>
//     </>
//   );
// }

// export default Submissions;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/css/submissions_style.css';

function Submissions() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/contact');
      setSubmissions(res.data);
    } catch (err) {
      console.error('Klaida gaunant paraiškas:', err);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/contact/${id}`, { status: newStatus });
      setSubmissions((prev) =>
        prev.map((s) => (s._id === id ? { ...s, status: res.data.status } : s))
      );
    } catch (err) {
      console.error('Nepavyko atnaujinti būsenos:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/contact/${id}`);
      setSubmissions((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      console.error('Klaida tryniant paraišką:', err);
    }
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
            <li><a href="/portfolio">Portfolio</a></li>
          </ul>
        </nav>
      </header>

      <section className="submissions-container">
        <h2>Pateiktos paraiškos</h2>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Vardas</th>
                <th>El. paštas</th>
                <th>Telefonas</th>
                <th>Tipas</th>
                <th>Žinutė</th>
                <th>Būsena</th>
                <th>Veiksmai</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((s) => (
                <tr key={s._id}>
                  <td>{s.name}</td>
                  <td>{s.email}</td>
                  <td>{s.phone}</td>
                  <td>{s.type}</td>
                  <td>{s.message}</td>
                  <td>
                    <select
                      value={s.status}
                      onChange={(e) => handleStatusChange(s._id, e.target.value)}
                    >
                      <option value="Nauja">Nauja</option>
                      <option value="Apdorojama">Apdorojama</option>
                      <option value="Baigta">Baigta</option>
                      <option value="Peržiūrėta">Peržiūrėta</option>
                    </select>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(s._id)}>🗑️</button>
                  </td>
                </tr>
              ))}
              {submissions.length === 0 && (
                <tr>
                  <td colSpan="7">Nėra pateiktų paraiškų.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

export default Submissions;
