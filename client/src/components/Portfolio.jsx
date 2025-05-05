// import React, { useEffect } from 'react';
// import '../assets/css/modern_style.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

// function Portfolio() {
//   useEffect(() => {
//     const buttons = document.querySelectorAll('.filter-btn');
//     const cards = document.querySelectorAll('.project-card');

//     buttons.forEach(btn => {
//       btn.addEventListener('click', () => {
//         const category = btn.getAttribute('data-category');

//         cards.forEach(card => {
//           const cardCategory = card.getAttribute('data-category');
//           if (category === 'all' || cardCategory === category) {
//             card.style.display = 'block';
//           } else {
//             card.style.display = 'none';
//           }
//         });
//       });
//     });
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
//         <h2 className="text-center">Mūsų portfolio</h2>

//         <div className="filter-buttons">
//           <button className="filter-btn" data-category="all">Visi</button>
//           <button className="filter-btn" data-category="ecommerce">El. parduotuvės</button>
//           <button className="filter-btn" data-category="business">Verslo tinklalapiai</button>
//           <button className="filter-btn" data-category="portfolio">Portfolio</button>
//         </div>

//         <div className="row projects-container">
//           <div className="col-md-4 project-card" data-category="ecommerce">
//             <div className="card">
//               <img src="/images/project1.jpg" className="card-img-top" alt="Projektas 1" />
//               <div className="card-body">
//                 <h5 className="card-title">El. parduotuvė</h5>
//                 <p className="card-text">Moderni, patogi naudotojui ir optimizuota parduotuvė.</p>
//               </div>
//             </div>
//           </div>

//           <div className="col-md-4 project-card" data-category="business">
//             <div className="card">
//               <img src="/images/project2.jpg" className="card-img-top" alt="Projektas 2" />
//               <div className="card-body">
//                 <h5 className="card-title">Verslo tinklalapis</h5>
//                 <p className="card-text">Efektyvus ir patikimas tinklalapis Jūsų verslui.</p>
//               </div>
//             </div>
//           </div>

//           <div className="col-md-4 project-card" data-category="portfolio">
//             <div className="card">
//               <img src="/images/project3.jpg" className="card-img-top" alt="Projektas 3" />
//               <div className="card-body">
//                 <h5 className="card-title">Asmeninis portfolio</h5>
//                 <p className="card-text">Minimalistinis dizainas kūrybiškam žmogui.</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }

// export default Portfolio;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../assets/css/modern_style.css';

// function Portfolio() {
//   const [projects, setProjects] = useState([]);
//   const [filter, setFilter] = useState('all');
//   const [newProject, setNewProject] = useState({ title: '', category: 'ecommerce', description: '', imageUrl: '' });

  

//   useEffect(() => {
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

//   const handleCreate = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:5000/api/projects', newProject);
//       setProjects([...projects, res.data]);
//       setNewProject({ title: '', category: 'ecommerce', description: '', imageUrl: '' });
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
//         <h2 className="text-center">Mūsų portfolio</h2>

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

//         <form className="mb-4" onSubmit={handleCreate}>
//           <input placeholder="Pavadinimas" value={newProject.title} onChange={e => setNewProject({ ...newProject, title: e.target.value })} required />
//           <select value={newProject.category} onChange={e => setNewProject({ ...newProject, category: e.target.value })}>
//             <option value="ecommerce">El. parduotuvė</option>
//             <option value="business">Verslas</option>
//             <option value="portfolio">Portfolio</option>
//           </select>
//           <input placeholder="Image URL" value={newProject.imageUrl} onChange={e => setNewProject({ ...newProject, imageUrl: e.target.value })} />
//           <textarea placeholder="Aprašymas" value={newProject.description} onChange={e => setNewProject({ ...newProject, description: e.target.value })}></textarea>
//           <button type="submit" className="btn btn-success">➕ Pridėti projektą</button>
//         </form>

//         <div className="row">
//           {projects.map(project => (
//             <div key={project._id} className="col-md-4 mb-3">
//               <div className="card h-100 shadow-sm">
//                 <img src={project.imageUrl || '/images/default.jpg'} className="card-img-top" alt={project.title} />
//                 <div className="card-body">
//                   <h5 className="card-title">{project.title}</h5>
//                   <p className="card-text">{project.description}</p>
//                   <button className="btn btn-danger" onClick={() => handleDelete(project._id)}>🗑️ Ištrinti</button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>
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
  const [newProject, setNewProject] = useState({ title: '', category: 'ecommerce', description: '', imageUrl: '' });
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    fetchProjects();
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
      } catch (err) {
        console.error('Įkėlimo klaida:', err);
        return alert('Nepavyko įkelti paveikslėlio');
      }
    }

    try {
      const res = await axios.post('http://localhost:5000/api/projects', {
        ...newProject,
        imageUrl,
      });
      setProjects([...projects, res.data]);
      setNewProject({ title: '', category: 'ecommerce', description: '', imageUrl: '' });
      setFile(null);
      setImagePreview(null);
    } catch (err) {
      alert('Nepavyko pridėti projekto');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/projects/${id}`);
      setProjects(projects.filter(p => p._id !== id));
    } catch (err) {
      alert('Nepavyko ištrinti');
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

      <section className="container mt-5">
        <h2 className="text-center">Mūsų portfolio</h2>

        <div className="filter-buttons text-center mb-3">
          {['all', 'ecommerce', 'business', 'portfolio'].map(cat => (
            <button
              key={cat}
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat === 'all' ? 'Visi' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        <form className="mb-4" onSubmit={handleCreate} encType="multipart/form-data">
          <input
            placeholder="Pavadinimas"
            value={newProject.title}
            onChange={e => setNewProject({ ...newProject, title: e.target.value })}
            required
          />
          <select
            value={newProject.category}
            onChange={e => setNewProject({ ...newProject, category: e.target.value })}
          >
            <option value="ecommerce">El. parduotuvė</option>
            <option value="business">Verslas</option>
            <option value="portfolio">Portfolio</option>
          </select>
          <textarea
            placeholder="Aprašymas"
            value={newProject.description}
            onChange={e => setNewProject({ ...newProject, description: e.target.value })}
          ></textarea>

          <input type="file" accept="image/*" onChange={handleFileChange} />
          {imagePreview && <img src={imagePreview} alt="Peržiūra" style={{ maxWidth: '150px', margin: '10px 0' }} />}

          <button type="submit" className="btn btn-success">➕ Pridėti projektą</button>
        </form>

        <div className="row">
          {projects.map(project => (
            <div key={project._id} className="col-md-4 mb-3">
              <div className="card h-100 shadow-sm">
                <img src={project.imageUrl || '/images/default.jpg'} className="card-img-top" alt={project.title} />
                <div className="card-body">
                  <h5 className="card-title">{project.title}</h5>
                  <p className="card-text">{project.description}</p>
                  <button className="btn btn-danger" onClick={() => handleDelete(project._id)}>🗑️ Ištrinti</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Portfolio;
