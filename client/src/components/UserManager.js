// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import {
//   Button, Modal, Form, Table, Container, Row, Col, Pagination, InputGroup
// } from 'react-bootstrap';
// import { CSVLink } from 'react-csv';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
// import '../assets/css/UserManager.css'; 


// const ADMIN_PASSWORD = process.env.REACT_APP_ADMIN_SECRET || 'Slaptas123';

// function UserManager() {
//   const [users, setUsers] = useState([]);
//   const [form, setForm] = useState({ name: '', email: '' });
//   const [filter, setFilter] = useState('');
//   const [showModal, setShowModal] = useState(false);
//   const [editingUser, setEditingUser] = useState(null);
//   const [passwordPrompt, setPasswordPrompt] = useState({ visible: false, user: null, action: null });
//   const [adminInputPassword, setAdminInputPassword] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   const fetchUsers = async () => {
//     const res = await axios.get('/api/users');
//     setUsers(res.data);
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const handleCreate = async (e) => {
//     e.preventDefault();
//     await axios.post('/api/users', form);
//     fetchUsers();
//     setForm({ name: '', email: '' });
//   };

//   const handleEditClick = (user) => {
//     setPasswordPrompt({ visible: true, user, action: 'edit' });
//   };

//   const handleDeleteClick = (user) => {
//     setPasswordPrompt({ visible: true, user, action: 'delete' });
//   };

//   const confirmAction = async () => {
//     if (adminInputPassword !== ADMIN_PASSWORD) {
//       alert('Neteisingas slaptažodis');
//       return;
//     }
//     if (passwordPrompt.action === 'edit') {
//       setEditingUser(passwordPrompt.user);
//       setForm({ name: passwordPrompt.user.name, email: passwordPrompt.user.email });
//       setShowModal(true);
//     } else if (passwordPrompt.action === 'delete') {
//       await axios.delete(`/api/users/${passwordPrompt.user._id}`);
//       fetchUsers();
//     }
//     setPasswordPrompt({ visible: false, user: null, action: null });
//     setAdminInputPassword('');
//   };

//   const handleUpdate = async () => {
//     await axios.put(`/api/users/${editingUser._id}`, form);
//     fetchUsers();
//     setShowModal(false);
//   };

//   const handleExportPDF = () => {
//     const doc = new jsPDF();
//     doc.text('Vartotojų sąrašas', 14, 16);
//     doc.autoTable({
//       head: [['Vardas', 'El. paštas']],
//       body: users.map((u) => [u.name, u.email]),
//     });
//     doc.save('users.pdf');
//   };

//   const filteredUsers = users.filter(user =>
//     user.name.toLowerCase().includes(filter.toLowerCase()) ||
//     user.email.toLowerCase().includes(filter.toLowerCase())
//   );

//   const indexOfLast = currentPage * itemsPerPage;
//   const indexOfFirst = indexOfLast - itemsPerPage;
//   const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

//   return (
//     <Container fluid className="px-5 mt-4">
//       <h2 className="text-center mb-4">Vartotojų valdymas</h2>
//       <Row className="mb-4">
//         <Col md={8}>
//           <Form onSubmit={handleCreate} className="d-flex gap-3 flex-column flex-md-row">
//             <Form.Control placeholder="Vardas" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
//             <Form.Control placeholder="El. paštas" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
//             <Button type="submit" variant="success">Pridėti</Button>
//           </Form>
//         </Col>
//         <Col md={4} className="d-flex justify-content-end align-items-start">
//           <InputGroup>
//             <Form.Control
//               placeholder="Ieškoti pagal vardą ar el. paštą..."
//               value={filter}
//               onChange={(e) => setFilter(e.target.value)}
//             />
//           </InputGroup>
//         </Col>
//       </Row>

//       <Row className="mb-3">
//         <Col md={6}>
//           <Button variant="outline-primary" onClick={handleExportPDF}>📄 PDF eksportas</Button>
//         </Col>
//         <Col md={6} className="text-end">
//           <CSVLink className="btn btn-outline-secondary" data={users} filename="users.csv">📊 CSV eksportas</CSVLink>
//         </Col>
//       </Row>

//       <div className="table-wrapper">
//         <Table striped bordered hover responsive className="shadow-sm rounded table-hover">
//           <thead className="table-dark">
//             <tr>
//               <th>Vardas</th>
//               <th>El. paštas</th>
//               <th>Veiksmai</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentUsers.map(user => (
//               <tr key={user._id}>
//                 <td>{user.name}</td>
//                 <td>{user.email}</td>
//                 <td>
//                   <Button variant="info" className="me-2" onClick={() => handleEditClick(user)}>Redaguoti</Button>
//                   <Button variant="danger" onClick={() => handleDeleteClick(user)}>Ištrinti</Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </div>


//       <Pagination className="justify-content-center">
//         {[...Array(totalPages)].map((_, idx) => (
//           <Pagination.Item key={idx + 1} active={idx + 1 === currentPage} onClick={() => setCurrentPage(idx + 1)}>
//             {idx + 1}
//           </Pagination.Item>
//         ))}
//       </Pagination>

//       {/* Redagavimo modalas */}
//       <Modal show={showModal} onHide={() => setShowModal(false)}>
//         <Modal.Header closeButton><Modal.Title>Redaguoti</Modal.Title></Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group className="mb-3">
//               <Form.Label>Vardas</Form.Label>
//               <Form.Control value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>El. paštas</Form.Label>
//               <Form.Control value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>Atšaukti</Button>
//           <Button variant="primary" onClick={handleUpdate}>Išsaugoti</Button>
//         </Modal.Footer>
//       </Modal>

//       {/* Slaptažodžio modalas */}
//       <Modal show={passwordPrompt.visible} onHide={() => setPasswordPrompt({ visible: false, user: null, action: null })}>
//         <Modal.Header closeButton><Modal.Title>Administratoriaus patvirtinimas</Modal.Title></Modal.Header>
//         <Modal.Body>
//           <Form.Group>
//             <Form.Label>Įveskite administratoriaus slaptažodį</Form.Label>
//             <Form.Control type="password" value={adminInputPassword} onChange={(e) => setAdminInputPassword(e.target.value)} />
//           </Form.Group>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setPasswordPrompt({ visible: false, user: null, action: null })}>Atšaukti</Button>
//           <Button variant="danger" onClick={confirmAction}>Patvirtinti</Button>
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// }

// export default UserManager;




import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Button, Modal, Form, Table, Row, Col, Pagination, InputGroup, Container
} from 'react-bootstrap';
import { CSVLink } from 'react-csv';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ADMIN_PASSWORD = process.env.REACT_APP_ADMIN_SECRET || 'Slaptas123';

function UserManager() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '' });
  const [filter, setFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [passwordPrompt, setPasswordPrompt] = useState({ visible: false, user: null, action: null });
  const [adminInputPassword, setAdminInputPassword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchUsers = async () => {
    const res = await axios.get('/api/users');
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    await axios.post('/api/users', form);
    fetchUsers();
    setForm({ name: '', email: '' });
  };

  const handleEditClick = (user) => {
    setPasswordPrompt({ visible: true, user, action: 'edit' });
  };

  const handleDeleteClick = (user) => {
    setPasswordPrompt({ visible: true, user, action: 'delete' });
  };

  const confirmAction = async () => {
    if (adminInputPassword !== ADMIN_PASSWORD) {
      alert('Neteisingas slaptažodis');
      return;
    }
    if (passwordPrompt.action === 'edit') {
      setEditingUser(passwordPrompt.user);
      setForm({ name: passwordPrompt.user.name, email: passwordPrompt.user.email });
      setShowModal(true);
    } else if (passwordPrompt.action === 'delete') {
      await axios.delete(`/api/users/${passwordPrompt.user._id}`);
      fetchUsers();
    }
    setPasswordPrompt({ visible: false, user: null, action: null });
    setAdminInputPassword('');
  };

  const handleUpdate = async () => {
    await axios.put(`/api/users/${editingUser._id}`, form);
    fetchUsers();
    setShowModal(false);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text('Vartotojų sąrašas', 14, 16);
    doc.autoTable({
      head: [['Vardas', 'El. paštas']],
      body: users.map((u) => [u.name, u.email]),
    });
    doc.save('users.pdf');
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(filter.toLowerCase()) ||
    user.email.toLowerCase().includes(filter.toLowerCase())
  );

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  return (
    <Container fluid className="px-5 mt-4">
      <h2 className="text-center mb-4">Vartotojų valdymas</h2>

      <Row className="mb-4">
        <Col md={8}>
          <Form onSubmit={handleCreate} className="d-flex gap-3 flex-column flex-md-row">
            <Form.Control placeholder="Vardas" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            <Form.Control placeholder="El. paštas" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            <Button type="submit" variant="success">Pridėti</Button>
          </Form>
        </Col>
        <Col md={4}>
          <InputGroup>
            <Form.Control
              placeholder="Ieškoti pagal vardą ar el. paštą..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </InputGroup>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={6}>
          <Button variant="outline-primary" onClick={handleExportPDF}>📄 PDF eksportas</Button>
        </Col>
        <Col md={6} className="text-end">
          <CSVLink className="btn btn-outline-secondary" data={users} filename="users.csv">📊 CSV eksportas</CSVLink>
        </Col>
      </Row>

      <div className="table-wrapper">
        <Table striped bordered hover responsive className="shadow-sm rounded w-100">
          <thead className="table-dark">
            <tr>
              <th>Vardas</th>
              <th>El. paštas</th>
              <th>Veiksmai</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <Button variant="info" className="me-2" onClick={() => handleEditClick(user)}>Redaguoti</Button>
                  <Button variant="danger" onClick={() => handleDeleteClick(user)}>Ištrinti</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Pagination className="justify-content-center">
        {[...Array(totalPages)].map((_, idx) => (
          <Pagination.Item key={idx + 1} active={idx + 1 === currentPage} onClick={() => setCurrentPage(idx + 1)}>
            {idx + 1}
          </Pagination.Item>
        ))}
      </Pagination>

      {/* Modal for Editing */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton><Modal.Title>Redaguoti</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Vardas</Form.Label>
              <Form.Control value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>El. paštas</Form.Label>
              <Form.Control value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Atšaukti</Button>
          <Button variant="primary" onClick={handleUpdate}>Išsaugoti</Button>
        </Modal.Footer>
      </Modal>

      {/* Password Confirmation Modal */}
      <Modal show={passwordPrompt.visible} onHide={() => setPasswordPrompt({ visible: false, user: null, action: null })}>
        <Modal.Header closeButton><Modal.Title>Administratoriaus patvirtinimas</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Įveskite administratoriaus slaptažodį</Form.Label>
            <Form.Control type="password" value={adminInputPassword} onChange={(e) => setAdminInputPassword(e.target.value)} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setPasswordPrompt({ visible: false, user: null, action: null })}>Atšaukti</Button>
          <Button variant="danger" onClick={confirmAction}>Patvirtinti</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default UserManager;
