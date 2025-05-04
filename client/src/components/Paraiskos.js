

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import '../assets/css/submissions_style.css';

// function Submissions() {
//   const [submissions, setSubmissions] = useState([]);

//   useEffect(() => {
//     fetchSubmissions();
//   }, []);

  
//   const fetchSubmissions = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/contact');
//       setSubmissions(res.data);
//     } catch (err) {
//       console.error('Klaida gaunant paraiškas:', err);
//     }
//   };

//   const handleStatusChange = async (id, newStatus) => {
//     try {
//       const res = await axios.put(`http://localhost:5000/api/contact/${id}`, { status: newStatus });
//       setSubmissions((prev) =>
//         prev.map((s) => (s._id === id ? { ...s, status: res.data.status } : s))
//       );
//     } catch (err) {
//       console.error('Nepavyko atnaujinti būsenos:', err);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/contact/${id}`);
//       setSubmissions((prev) => prev.filter((s) => s._id !== id));
//     } catch (err) {
//       console.error('Klaida tryniant paraišką:', err);
//     }
//   };

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

//         <div className="table-container">
//           <table>
//             <thead>
//               <tr>
//                 <th>Vardas</th>
//                 <th>El. paštas</th>
//                 <th>Telefonas</th>
//                 <th>Tipas</th>
//                 <th>Žinutė</th>
//                 <th>Būsena</th>
//                 <th>Veiksmai</th>
//               </tr>
//             </thead>
//             <tbody>
//               {submissions.map((s) => (
//                 <tr key={s._id}>
//                   <td>{s.name}</td>
//                   <td>{s.email}</td>
//                   <td>{s.phone}</td>
//                   <td>{s.type}</td>
//                   <td>{s.message}</td>
//                   <td>
//                     <select
//                       value={s.status}
//                       onChange={(e) => handleStatusChange(s._id, e.target.value)}
//                     >
//                       <option value="Nauja">Nauja</option>
//                       <option value="Apdorojama">Apdorojama</option>
//                       <option value="Baigta">Baigta</option>
//                       <option value="Peržiūrėta">Peržiūrėta</option>
//                     </select>
//                   </td>
//                   <td>
//                     <button onClick={() => handleDelete(s._id)}>🗑️</button>
//                   </td>
//                 </tr>
//               ))}
//               {submissions.length === 0 && (
//                 <tr>
//                   <td colSpan="7">Nėra pateiktų paraiškų.</td>
//                 </tr>
//               )}
//             </tbody>
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
  const [editingData, setEditingData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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

  const handleEdit = (entry) => {
    setEditingData(entry);
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(`http://localhost:5000/api/contact/${editingData._id}`, editingData);
      setSubmissions((prev) =>
        prev.map((s) => (s._id === editingData._id ? res.data : s))
      );
      setEditingData(null);
    } catch (err) {
      console.error('Nepavyko atnaujinti įrašo:', err);
    }
  };

  // Pagination logic
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = submissions.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(submissions.length / itemsPerPage);

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

        {editingData && (
          <div className="form edit-form">
            <h3>Redaguoti paraišką</h3>
            <input name="name" value={editingData.name} onChange={(e) => setEditingData({ ...editingData, name: e.target.value })} />
            <input name="email" value={editingData.email} onChange={(e) => setEditingData({ ...editingData, email: e.target.value })} />
            <input name="phone" value={editingData.phone} onChange={(e) => setEditingData({ ...editingData, phone: e.target.value })} />
            <input name="type" value={editingData.type} onChange={(e) => setEditingData({ ...editingData, type: e.target.value })} />
            <textarea name="message" value={editingData.message} onChange={(e) => setEditingData({ ...editingData, message: e.target.value })}></textarea>
            <select value={editingData.status} onChange={(e) => setEditingData({ ...editingData, status: e.target.value })}>
              <option value="Nauja">Nauja</option>
              <option value="Apdorojama">Apdorojama</option>
              <option value="Baigta">Baigta</option>
              <option value="Peržiūrėta">Peržiūrėta</option>
            </select>
            <button onClick={handleUpdate}>💾 Išsaugoti</button>
            <button onClick={() => setEditingData(null)}>❌ Atšaukti</button>
          </div>
        )}

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
              {currentItems.map((s) => (
                <tr key={s._id}>
                  <td>{s.name}</td>
                  <td>{s.email}</td>
                  <td>{s.phone}</td>
                  <td>{s.type}</td>
                  <td>{s.message}</td>
                  <td>
                    <select value={s.status} onChange={(e) => handleStatusChange(s._id, e.target.value)}>
                      <option value="Nauja">Nauja</option>
                      <option value="Apdorojama">Apdorojama</option>
                      <option value="Baigta">Baigta</option>
                      <option value="Peržiūrėta">Peržiūrėta</option>
                    </select>
                  </td>
                  <td>
                    <button onClick={() => handleEdit(s)}>✏️</button>
                    <button onClick={() => handleDelete(s._id)}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={currentPage === i + 1 ? 'active' : ''}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Submissions;

