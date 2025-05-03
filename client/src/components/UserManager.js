import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Button, Modal, Form, Table, Row, Col, Pagination, InputGroup, Container
} from 'react-bootstrap';
import { CSVLink } from 'react-csv';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable'; 



const ADMIN_PASSWORD = process.env.REACT_APP_ADMIN_SECRET || 'Slaptas123';

function UserManager() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    avatarUrl: '',
    dateOfBirth: '',
    address: {
      street: '',
      city: '',
      zip: '',
      country: ''
    }
  });
  const [filter, setFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [passwordPrompt, setPasswordPrompt] = useState({ visible: false, user: null, action: null });
  const [adminInputPassword, setAdminInputPassword] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createPassword, setCreatePassword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [logs, setLogs] = useState([]);



  const fetchUsers = async () => {
    const res = await axios.get('/api/users');
    setUsers(res.data);
  };

  

  useEffect(() => {
    fetchUsers();
  }, []);
 

  useEffect(() => {
    axios.get('/api/logs')
    .then(res => setLogs(res.data));
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (createPassword !== ADMIN_PASSWORD) {
      alert('Neteisingas slaptažodis!');
      return;
    }
    try {
      await axios.post('/api/users', { ...form, password: ADMIN_PASSWORD });
      fetchUsers();
      setForm({ name: '', email: '', phone: '', avatarUrl: '', dateOfBirth: '', address: { street: '', city: '', zip: '', country: '' } });
      setShowCreateModal(false);
      setCreatePassword('');
    } catch (err) {
      alert(err.response?.data?.klaida || 'Klaida kuriant vartotoją');
    }
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
      setForm({
        name: passwordPrompt.user.name || '',
        email: passwordPrompt.user.email || '',
        phone: passwordPrompt.user.phone || '',
        avatarUrl: passwordPrompt.user.avatarUrl || '',
        dateOfBirth: passwordPrompt.user.dateOfBirth?.slice(0, 10) || '',
        address: {
          street: passwordPrompt.user.address?.street || '',
          city: passwordPrompt.user.address?.city || '',
          zip: passwordPrompt.user.address?.zip || '',
          country: passwordPrompt.user.address?.country || ''
        }
      });
      setShowModal(true);
    } else if (passwordPrompt.action === 'delete') {
      await axios.delete(`/api/users/${passwordPrompt.user._id}`, {
        data: { password: ADMIN_PASSWORD }
      });
      fetchUsers();
    }
    setPasswordPrompt({ visible: false, user: null, action: null });
    setAdminInputPassword('');
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/api/users/${editingUser._id}`, {
        ...form,
        password: ADMIN_PASSWORD
      });
      fetchUsers();
      setShowModal(false);
    } catch (err) {
      alert(err.response?.data?.klaida || 'Klaida redaguojant');
    }
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [['Vardas', 'El. paštas', 'Telefonas', 'Gimimo data', 'Adresas']],
      body: users.map((u) => [
        u.name || '',
        u.email || '',
        u.phone || '',
        u.dateOfBirth?.slice(0, 10) || '',
        `${u.address?.street || ''}, ${u.address?.city || ''}, ${u.address?.zip || ''}, ${u.address?.country || ''}`
        
      ]),
    });
    doc.save('users.pdf');
  };
  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(filter.toLowerCase()) ||
    user.email?.toLowerCase().includes(filter.toLowerCase())
  );

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  return (
    <div className="px-4" style={{ width: '90vw', maxWidth: '100vw' }}>
      <Container fluid className="px-5 mt-4">
        <h2 className="text-center mb-4">Vartotojų valdymas</h2>

        {/* <div className="d-flex justify-content-between mb-3">
          <Button variant="success" onClick={() => setShowCreateModal(true)}>➕ Pridėti naują vartotoją</Button>
          <InputGroup style={{ maxWidth: '300px' }}>
            <Form.Control placeholder="Ieškoti pagal vardą ar el. paštą..." value={filter} onChange={(e) => setFilter(e.target.value)} />
          </InputGroup>
        </div> */}
        <Row className="align-items-center justify-content-between mb-3">
          <Col xs="auto">
            <Button variant="success" size="sm" onClick={() => setShowCreateModal(true)}>
              ➕ Pridėti naują vartotoją
            </Button>
          </Col>
          <Col xs={12} sm={6} md={4}>
            <InputGroup size="sm">
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

        <Table striped bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th>Avataras</th>
              <th>Slapyvardis</th>
              <th>El. paštas</th>
              <th>Telefonas</th>
              <th>Gimimo data</th>
              <th>Veiksmai</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map(user => (
              <tr key={user._id}>
                <td>
                  <img src={user.avatarUrl || 'https://via.placeholder.com/40'} alt="avatar" width="40" height="40" />
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone || '-'}</td>
                <td>{user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : '-'}</td>
                <td>
                  <Button variant="info" className="me-2" onClick={() => handleEditClick(user)}>Redaguoti</Button>
                  <Button variant="danger" onClick={() => handleDeleteClick(user)}>Ištrinti</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Pagination className="justify-content-center mt-3">
          {[...Array(totalPages)].map((_, idx) => (
            <Pagination.Item key={idx + 1} active={idx + 1 === currentPage} onClick={() => setCurrentPage(idx + 1)}>
              {idx + 1}
            </Pagination.Item>
          ))}
        </Pagination>

        <h4 className="mt-5">📝 Paskutiniai veiksmai</h4>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Veiksmas</th>
                <th>Vartotojas</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {logs.map(log => (
                <tr key={log._id}>
                  <td>{log.action}</td>
                  <td>{log.userName}</td>
                  <td>{new Date(log.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>


        {/* Modal: Redaguoti */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton><Modal.Title>Redaguoti vartotoją</Modal.Title></Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3"><Form.Label>Vardas</Form.Label>
                <Form.Control value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              </Form.Group>
              <Form.Group className="mb-3"><Form.Label>El. paštas</Form.Label>
                <Form.Control value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              </Form.Group>
              <Form.Group className="mb-3"><Form.Label>Telefonas</Form.Label>
                <Form.Control value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
              </Form.Group>
              <Form.Group className="mb-3"><Form.Label>Avatar URL</Form.Label>
                <Form.Control value={form.avatarUrl} onChange={e => setForm({ ...form, avatarUrl: e.target.value })} />
              </Form.Group>
              <Form.Group className="mb-3"><Form.Label>Gimimo data</Form.Label>
                <Form.Control type="date" value={form.dateOfBirth} onChange={e => setForm({ ...form, dateOfBirth: e.target.value })} />
              </Form.Group>
              <Form.Group className="mb-3"><Form.Label>Gatvė</Form.Label>
              <Form.Control value={form.address.street} onChange={e => setForm({
                ...form,
                address: { ...form.address, street: e.target.value }
              })} />
            </Form.Group>

            <Form.Group className="mb-3"><Form.Label>Miestas</Form.Label>
              <Form.Control value={form.address.city} onChange={e => setForm({
                ...form,
                address: { ...form.address, city: e.target.value }
              })} />
            </Form.Group>

            <Form.Group className="mb-3"><Form.Label>Pašto kodas</Form.Label>
              <Form.Control value={form.address.zip} onChange={e => setForm({
                ...form,
                address: { ...form.address, zip: e.target.value }
              })} />
            </Form.Group>

            <Form.Group className="mb-3"><Form.Label>Šalis</Form.Label>
              <Form.Control value={form.address.country} onChange={e => setForm({
                ...form,
                address: { ...form.address, country: e.target.value }
              })} />
            </Form.Group>

            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Atšaukti</Button>
            <Button variant="primary" onClick={handleUpdate}>Išsaugoti</Button>
          </Modal.Footer>
        </Modal>

        {/* Modal: Naujo vartotojo kūrimas */}
        <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
          <Modal.Header closeButton><Modal.Title>Naujo vartotojo kūrimas</Modal.Title></Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleCreate}>
              <Form.Group className="mb-2"><Form.Label>Slapyvardis</Form.Label>
                <Form.Control required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              </Form.Group>
              <Form.Group className="mb-2"><Form.Label>El. paštas</Form.Label>
                <Form.Control required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              </Form.Group>
              <Form.Group className="mb-2"><Form.Label>Telefonas</Form.Label>
                <Form.Control value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
              </Form.Group>
              <Form.Group className="mb-2"><Form.Label>Avatar URL</Form.Label>
                <Form.Control value={form.avatarUrl} onChange={e => setForm({ ...form, avatarUrl: e.target.value })} />
              </Form.Group>
              <Form.Group className="mb-2"><Form.Label>Gimimo data</Form.Label>
                <Form.Control type="date" value={form.dateOfBirth} onChange={e => setForm({ ...form, dateOfBirth: e.target.value })} />
              </Form.Group>
              <Form.Group className="mb-2"><Form.Label>Administratoriaus slaptažodis</Form.Label>
                <Form.Control required type="password" value={createPassword} onChange={e => setCreatePassword(e.target.value)} />
              </Form.Group>
              <div className="text-end mt-3">
                <Button variant="secondary" onClick={() => setShowCreateModal(false)}>Atšaukti</Button>{' '}
                <Button type="submit" variant="success">Pridėti</Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>

        {/* Modal: Slaptažodžio patvirtinimas redagavimui/šalinimui */}
        <Modal show={passwordPrompt.visible} onHide={() => setPasswordPrompt({ visible: false, user: null, action: null })}>
          <Modal.Header closeButton><Modal.Title>Administratoriaus patvirtinimas</Modal.Title></Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Slaptažodis</Form.Label>
              <Form.Control type="password" value={adminInputPassword} onChange={(e) => setAdminInputPassword(e.target.value)} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setPasswordPrompt({ visible: false, user: null, action: null })}>Atšaukti</Button>
            <Button variant="danger" onClick={confirmAction}>Patvirtinti</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}

export default UserManager;




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import {
//   Button, Modal, Form, Table, Row, Col, Pagination, InputGroup, Container
// } from 'react-bootstrap';
// import { CSVLink } from 'react-csv';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';

// const ADMIN_PASSWORD = process.env.REACT_APP_ADMIN_SECRET || 'Slaptas123';

// function UserManager() {
//   const [users, setUsers] = useState([]);
//   const [form, setForm] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     avatarUrl: '',
//     dateOfBirth: ''
//   });
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
//     try {
//       await axios.post('/api/users', form);
//       fetchUsers();
//       setForm({ name: '', email: '', phone: '', avatarUrl: '', dateOfBirth: '' });
//     } catch (err) {
//       alert(err.response?.data?.klaida || 'Klaida kuriant vartotoją');
//     }
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
//       setForm({
//         name: passwordPrompt.user.name || '',
//         email: passwordPrompt.user.email || '',
//         phone: passwordPrompt.user.phone || '',
//         avatarUrl: passwordPrompt.user.avatarUrl || '',
//         dateOfBirth: passwordPrompt.user.dateOfBirth?.slice(0, 10) || ''
//       });
//       setShowModal(true);
//     } else if (passwordPrompt.action === 'delete') {
//       await axios.delete(`/api/users/${passwordPrompt.user._id}`, {
//         data: { password: ADMIN_PASSWORD }
//       });
//       fetchUsers();
//     }
//     setPasswordPrompt({ visible: false, user: null, action: null });
//     setAdminInputPassword('');
//   };

//   const handleUpdate = async () => {
//     try {
//       await axios.put(`/api/users/${editingUser._id}`, {
//         ...form,
//         password: ADMIN_PASSWORD
//       });
//       fetchUsers();
//       setShowModal(false);
//     } catch (err) {
//       alert(err.response?.data?.klaida || 'Klaida redaguojant');
//     }
//   };

//   const handleExportPDF = () => {
//     const doc = new jsPDF();
//     doc.text('Vartotojų sąrašas', 14, 16);
//     doc.autoTable({
//       head: [['Vardas', 'El. paštas', 'Telefonas', 'Gimimo data']],
//       body: users.map((u) => [u.name, u.email, u.phone, u.dateOfBirth?.slice(0, 10)]),
//     });
//     doc.save('users.pdf');
//   };

//   const filteredUsers = users.filter(user =>
//     user.name?.toLowerCase().includes(filter.toLowerCase()) ||
//     user.email?.toLowerCase().includes(filter.toLowerCase())
//   );

//   const indexOfLast = currentPage * itemsPerPage;
//   const indexOfFirst = indexOfLast - itemsPerPage;
//   const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

//   return (
//     <div className="px-4" style={{ width: '90vw', maxWidth: '100vw' }}>
//       <Container fluid className="px-5 mt-4">
//         <h2 className="text-center mb-4">Vartotojų valdymas</h2>

//         <Form onSubmit={handleCreate} className="row g-2 mb-4">
//           <Col md={2}><Form.Control placeholder="Slapyvardis" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></Col>
//           <Col md={2}><Form.Control placeholder="El. paštas" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></Col>
//           <Col md={2}><Form.Control placeholder="Telefonas" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></Col>
//           <Col md={2}><Form.Control placeholder="Avatar URL" value={form.avatarUrl} onChange={e => setForm({ ...form, avatarUrl: e.target.value })} /></Col>
//           <Col md={2}><Form.Control type="date" value={form.dateOfBirth} onChange={e => setForm({ ...form, dateOfBirth: e.target.value })} /></Col>
//           <Col md={2}><Button type="submit" variant="success">Pridėti</Button></Col>
//         </Form>

//         <Row className="mb-3">
//           <Col md={6}>
//             <Button variant="outline-primary" onClick={handleExportPDF}>📄 PDF eksportas</Button>
//           </Col>
//           <Col md={6} className="text-end">
//             <CSVLink className="btn btn-outline-secondary" data={users} filename="users.csv">📊 CSV eksportas</CSVLink>
//           </Col>
//         </Row>

//         <InputGroup className="mb-3">
//           <Form.Control
//             placeholder="Ieškoti pagal vardą ar el. paštą..."
//             value={filter}
//             onChange={(e) => setFilter(e.target.value)}
//           />
//         </InputGroup>

//         <div className="table-wrapper">
//           <Table striped bordered hover responsive>
//             <thead className="table-dark">
//               <tr>
//                 <th>Avataras</th>
//                 <th>Slapyvardis</th>
//                 <th>El. paštas</th>
//                 <th>Telefonas</th>
//                 <th>Gimimo data</th>
//                 <th>Veiksmai</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentUsers.map(user => (
//                 <tr key={user._id}>
//                   <td>
//                     <img src={user.avatarUrl || 'https://via.placeholder.com/40'} alt="avatar" width="40" height="40" />
//                   </td>
//                   <td>{user.name}</td>
//                   <td>{user.email}</td>
//                   <td>{user.phone || '-'}</td>
//                   <td>{user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : '-'}</td>
//                   <td>
//                     <Button variant="info" className="me-2" onClick={() => handleEditClick(user)}>Redaguoti</Button>
//                     <Button variant="danger" onClick={() => handleDeleteClick(user)}>Ištrinti</Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </div>

//         <Pagination className="justify-content-center mt-3">
//           {[...Array(totalPages)].map((_, idx) => (
//             <Pagination.Item key={idx + 1} active={idx + 1 === currentPage} onClick={() => setCurrentPage(idx + 1)}>
//               {idx + 1}
//             </Pagination.Item>
//           ))}
//         </Pagination>

//         {/* Modal: Redaguoti */}
//         <Modal show={showModal} onHide={() => setShowModal(false)}>
//           <Modal.Header closeButton><Modal.Title>Redaguoti</Modal.Title></Modal.Header>
//           <Modal.Body>
//             <Form>
//               <Form.Group className="mb-3"><Form.Label>Vardas</Form.Label>
//                 <Form.Control value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
//               </Form.Group>
//               <Form.Group className="mb-3"><Form.Label>El. paštas</Form.Label>
//                 <Form.Control value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
//               </Form.Group>
//               <Form.Group className="mb-3"><Form.Label>Telefonas</Form.Label>
//                 <Form.Control value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
//               </Form.Group>
//               <Form.Group className="mb-3"><Form.Label>Avatar URL</Form.Label>
//                 <Form.Control value={form.avatarUrl} onChange={e => setForm({ ...form, avatarUrl: e.target.value })} />
//               </Form.Group>
//               <Form.Group className="mb-3"><Form.Label>Gimimo data</Form.Label>
//                 <Form.Control type="date" value={form.dateOfBirth} onChange={e => setForm({ ...form, dateOfBirth: e.target.value })} />
//               </Form.Group>
//             </Form>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={() => setShowModal(false)}>Atšaukti</Button>
//             <Button variant="primary" onClick={handleUpdate}>Išsaugoti</Button>
//           </Modal.Footer>
//         </Modal>

//         {/* Modal: Slaptažodžio patvirtinimas */}
//         <Modal show={passwordPrompt.visible} onHide={() => setPasswordPrompt({ visible: false, user: null, action: null })}>
//           <Modal.Header closeButton><Modal.Title>Administratoriaus patvirtinimas</Modal.Title></Modal.Header>
//           <Modal.Body>
//             <Form.Group>
//               <Form.Label>Slaptažodis</Form.Label>
//               <Form.Control type="password" value={adminInputPassword} onChange={(e) => setAdminInputPassword(e.target.value)} />
//             </Form.Group>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={() => setPasswordPrompt({ visible: false, user: null, action: null })}>Atšaukti</Button>
//             <Button variant="danger" onClick={confirmAction}>Patvirtinti</Button>
//           </Modal.Footer>
//         </Modal>
//       </Container>
//     </div>
//   );
// }

// export default UserManager;
