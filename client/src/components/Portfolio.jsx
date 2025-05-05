// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../assets/css/modern_style.css';
// import { saveAs } from 'file-saver';

// function Portfolio() {
//   const [projects, setProjects] = useState([]);
//   const [filter, setFilter] = useState('all');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [file, setFile] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // simulate login
//   const [newProject, setNewProject] = useState({ title: '', category: 'ecommerce', description: '', imageUrl: '' });
//   const [editingProject, setEditingProject] = useState(null);

//   useEffect(() => {
//     // Simuliuotas prisijungimo statusas
//     const token = localStorage.getItem('authToken');
//     setIsLoggedIn(!!token);

//     fetchProjects();
//   }, [filter]);

//   const fetchProjects = async () => {
//     try {
//       const res = await axios.get(`http://localhost:5000/api/projects?category=${filter}`);
//       setProjects(res.data);
//     } catch (err) {
//       console.error('Klaida gaunant projektus:', err);
//     }
//   };

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     setFile(selectedFile);
//     setImagePreview(URL.createObjectURL(selectedFile));
//   };

//   const handleCreate = async (e) => {
//     e.preventDefault();

//     let imageUrl = '';
//     if (file) {
//       const formData = new FormData();
//       formData.append('image', file);
//       try {
//         const res = await axios.post('http://localhost:5000/api/upload', formData);
//         imageUrl = res.data.imageUrl;
//       } catch (err) {
//         console.error('Įkėlimo klaida:', err);
//         return alert('Nepavyko įkelti paveikslėlio');
//       }
//     }

//     try {
//       const res = await axios.post('http://localhost:5000/api/projects', {
//         ...newProject,
//         imageUrl,
//       });
//       setProjects([...projects, res.data]);
//       setNewProject({ title: '', category: 'ecommerce', description: '', imageUrl: '' });
//       setFile(null);
//       setImagePreview(null);
//     } catch (err) {
//       alert('Nepavyko pridėti projekto');
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/projects/${id}`);
//       setProjects(projects.filter(p => p._id !== id));
//     } catch (err) {
//       alert('Nepavyko ištrinti');
//     }
//   };

//   const handleEditSave = async () => {
//     try {
//       const res = await axios.put(`http://localhost:5000/api/projects/${editingProject._id}`, editingProject);
//       setProjects(projects.map(p => p._id === editingProject._id ? res.data : p));
//       setEditingProject(null);
//     } catch (err) {
//       console.error('Nepavyko atnaujinti projekto:', err);
//     }
//   };

//   const exportToCSV = () => {
//     const csv = projects.map(p => ({
//       Pavadinimas: p.title,
//       Kategorija: p.category,
//       Aprašymas: p.description,
//       Nuotrauka: p.imageUrl,
//       Sukurta: new Date(p.createdAt).toLocaleString()
//     }));

//     const headers = Object.keys(csv[0]).join(',');
//     const rows = csv.map(obj => Object.values(obj).join(',')).join('\n');
//     const blob = new Blob([headers + '\n' + rows], { type: 'text/csv;charset=utf-8' });
//     saveAs(blob, 'projektai.csv');
//   };

//   const filteredProjects = projects.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));

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

//       <section className="container mt-4">
//         <h2 className="text-center">Mūsų portfolio</h2>

//         <div className="text-center mb-3">
//           <input
//             type="text"
//             placeholder="🔍 Ieškoti pagal pavadinimą..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="form-control w-50 d-inline-block"
//           />
//           <button className="btn btn-outline-secondary ms-2" onClick={exportToCSV}>📤 Eksportuoti CSV</button>
//         </div>

//         <div className="filter-buttons text-center mb-3">
//           {['all', 'ecommerce', 'business', 'portfolio'].map(cat => (
//             <button
//               key={cat}
//               className={`filter-btn ${filter === cat ? 'active' : ''}`}
//               onClick={() => setFilter(cat)}
//             >
//               {cat === 'all' ? 'Visi' : cat.charAt(0).toUpperCase() + cat.slice(1)}
//             </button>
//           ))}
//         </div>

//         {isLoggedIn && (
//           <form className="mb-4" onSubmit={handleCreate} encType="multipart/form-data">
//             <input placeholder="Pavadinimas" value={newProject.title} onChange={e => setNewProject({ ...newProject, title: e.target.value })} required />
//             <select value={newProject.category} onChange={e => setNewProject({ ...newProject, category: e.target.value })}>
//               <option value="ecommerce">El. parduotuvė</option>
//               <option value="business">Verslas</option>
//               <option value="portfolio">Portfolio</option>
//             </select>
//             <textarea placeholder="Aprašymas" value={newProject.description} onChange={e => setNewProject({ ...newProject, description: e.target.value })}></textarea>
//             <input type="file" accept="image/*" onChange={handleFileChange} />
//             {imagePreview && <img src={imagePreview} alt="Peržiūra" style={{ maxWidth: '150px' }} />}
//             <button type="submit" className="btn btn-success">➕ Pridėti projektą</button>
//           </form>
//         )}

//         <div className="row">
//           {filteredProjects.map(project => (
//             <div key={project._id} className="col-md-4 mb-3">
//               <div className="card h-100 shadow-sm">
//                 <img src={project.imageUrl || '/images/default.jpg'} className="card-img-top" alt={project.title} />
//                 <div className="card-body">
//                   <h5 className="card-title">{project.title}</h5>
//                   <p className="card-text">{project.description}</p>
//                   <p><small>📅 {new Date(project.createdAt).toLocaleString()}</small></p>
//                   {isLoggedIn && (
//                     <>
//                       <button className="btn btn-warning me-2" onClick={() => setEditingProject(project)}>✏️ Redaguoti</button>
//                       <button className="btn btn-danger" onClick={() => handleDelete(project._id)}>🗑️ Ištrinti</button>
//                     </>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {editingProject && (
//         <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5>Redaguoti projektą</h5>
//                 <button onClick={() => setEditingProject(null)} className="btn-close"></button>
//               </div>
//               <div className="modal-body">
//                 <input className="form-control mb-2" value={editingProject.title} onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })} />
//                 <textarea className="form-control mb-2" value={editingProject.description} onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })} />
//                 <select className="form-select mb-3" value={editingProject.category} onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}>
//                   <option value="ecommerce">El. parduotuvė</option>
//                   <option value="business">Verslas</option>
//                   <option value="portfolio">Portfolio</option>
//                 </select>
//               </div>
//               <div className="modal-footer">
//                 <button className="btn btn-secondary" onClick={() => setEditingProject(null)}>Atšaukti</button>
//                 <button className="btn btn-primary" onClick={handleEditSave}>💾 Išsaugoti</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default Portfolio;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/modern_style.css';

function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProject, setEditingProject] = useState(null);
  const [newProject, setNewProject] = useState({ title: '', category: 'ecommerce', description: '', imageUrl: '' });
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 4;

  useEffect(() => {
    fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/projects?category=${filter}`);
      setProjects(res.data);
    } catch (err) {
      console.error('Klaida gaunant projektus:', err);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setImagePreview(URL.createObjectURL(selectedFile));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    let imageUrl = '';
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      try {
        const res = await axios.post('http://localhost:5000/api/upload', formData);
        imageUrl = res.data.imageUrl;
      } catch {
        return alert('Nepavyko įkelti paveikslėlio');
      }
    }

    try {
      const res = await axios.post('http://localhost:5000/api/projects', { ...newProject, imageUrl });
      setProjects([...projects, res.data]);
      setNewProject({ title: '', category: 'ecommerce', description: '', imageUrl: '' });
      setFile(null);
      setImagePreview(null);
    } catch {
      alert('Nepavyko pridėti projekto');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/projects/${id}`);
      setProjects(projects.filter(p => p._id !== id));
    } catch {
      alert('Nepavyko ištrinti');
    }
  };

  const handleEdit = (project) => setEditingProject(project);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingProject(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = async () => {
    try {
      const res = await axios.put(`http://localhost:5000/api/projects/${editingProject._id}`, editingProject);
      setProjects(prev => prev.map(p => p._id === editingProject._id ? res.data : p));
      setEditingProject(null);
    } catch {
      alert('Nepavyko atnaujinti');
    }
  };

  const exportToCSV = () => {
    const csvRows = [
      ['Pavadinimas', 'Kategorija', 'Aprašymas'],
      ...projects.map(p => [p.title, p.category, p.description])
    ];
    const blob = new Blob([csvRows.map(r => r.join(',')).join('\n')], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'portfolio.csv';
    a.click();
  };

  const filteredProjects = projects.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const paginatedProjects = filteredProjects.slice((currentPage - 1) * projectsPerPage, currentPage * projectsPerPage);
  

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
        <h2 className="text-center mb-4">📁 Mūsų portfolio</h2>

        <div className="row mb-4 align-items-center">
          <div className="col-md-6 mb-2">
            {['all', 'ecommerce', 'business', 'portfolio'].map(cat => (
              <button
                key={cat}
                className={`btn me-2 ${filter === cat ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setFilter(cat)}
              >
                {cat === 'all' ? 'Visi' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
          <div className="col-md-6 d-flex">
            <input
              className="form-control me-2"
              type="text"
              placeholder="🔍 Ieškoti..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-outline-secondary" onClick={exportToCSV}>⬇️ CSV</button>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-5 mb-4">
            <form className="card p-4 shadow-sm" onSubmit={handleCreate} encType="multipart/form-data">
              <h5 className="text-center mb-3">➕ Naujas projektas</h5>

              <div className="mb-3">
                <label className="form-label">Pavadinimas</label>
                <input
                  className="form-control"
                  value={newProject.title}
                  onChange={e => setNewProject({ ...newProject, title: e.target.value })}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Kategorija</label>
                <select
                  className="form-select"
                  value={newProject.category}
                  onChange={e => setNewProject({ ...newProject, category: e.target.value })}
                >
                  <option value="ecommerce">El. parduotuvė</option>
                  <option value="business">Verslas</option>
                  <option value="portfolio">Portfolio</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Aprašymas</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={newProject.description}
                  onChange={e => setNewProject({ ...newProject, description: e.target.value })}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Nuotrauka</label>
                <input type="file" className="form-control" onChange={handleFileChange} />
                {imagePreview && <img src={imagePreview} className="img-thumbnail mt-2" alt="Peržiūra" />}
              </div>

              <button type="submit" className="btn btn-success w-100">➕ Pridėti</button>
            </form>
          </div>

          <div className="col-lg-7">
            <div className="row">
              {paginatedProjects.map(project => (
              
                <div key={project._id} className="col-md-6 mb-4">
                  <div className="card h-100 shadow-sm">
                    <img src={project.imageUrl || '/images/default.jpg'} className="card-img-top" alt={project.title} />
                    <div className="card-body">
                      <h5 className="card-title">{project.title}</h5>
                      <p className="card-text">{project.description}</p>
                      <small className="text-muted">📅 {new Date(project.createdAt).toLocaleDateString()}</small>
                      <div className="mt-3">
                        <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEdit(project)}>✏️ Redaguoti</button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(project._id)}>🗑️ Trinti</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {!filteredProjects.length && (
                <div className="text-muted">Projektų nerasta.</div>
              )}
            </div>
          </div>
        </div>
        {/* Puslapiavimas */}
        <div className="pagination d-flex justify-content-center mt-4">
          {[...Array(totalPages).keys()].map(num => (
            <button
              key={num + 1}
              className={`btn btn-sm mx-1 ${currentPage === num + 1 ? 'btn-success' : 'btn-outline-secondary'}`}
              onClick={() => setCurrentPage(num + 1)}
            >
              {num + 1}
            </button>
          ))}
        </div>
      </section>
      

      {editingProject && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Redaguoti</h5>
                <button className="btn-close" onClick={() => setEditingProject(null)}></button>
              </div>
              <div className="modal-body">
                <input name="title" className="form-control mb-2" value={editingProject.title} onChange={handleEditChange} />
                <textarea name="description" className="form-control mb-2" value={editingProject.description} onChange={handleEditChange}></textarea>
                <select name="category" className="form-select" value={editingProject.category} onChange={handleEditChange}>
                  <option value="ecommerce">El. parduotuvė</option>
                  <option value="business">Verslas</option>
                  <option value="portfolio">Portfolio</option>
                </select>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setEditingProject(null)}>Atšaukti</button>
                <button className="btn btn-success" onClick={handleSaveEdit}>💾 Išsaugoti</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Portfolio;
