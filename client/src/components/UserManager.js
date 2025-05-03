import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form, Card, Container, Row, Col, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function UserManager() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '' });
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get('/api/users')
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  };

  const handleCreate = (e) => {
    e.preventDefault();
    axios.post('/api/users', form)
      .then(() => {
        fetchUsers();
        setForm({ name: '', email: '' });
      });
  };

  const handleDelete = (id) => {
    axios.delete(`/api/users/${id}`)
      .then(() => fetchUsers());
  };

  const handleEdit = (user) => {
    setForm({ name: user.name, email: user.email });
    setEditId(user._id);
    setShowModal(true);
  };

  const handleUpdate = () => {
    axios.put(`/api/users/${editId}`, form)
      .then(() => {
        fetchUsers();
        setForm({ name: '', email: '' });
        setEditId(null);
        setShowModal(false);
      });
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Vartotojų valdymas</h2>

      <Card className="mb-4">
        <Card.Body>
          <Form onSubmit={handleCreate}>
            <Row>
              <Col><Form.Control placeholder="Vardas" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required /></Col>
              <Col><Form.Control placeholder="El. paštas" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required /></Col>
              <Col><Button type="submit" variant="success">Pridėti</Button></Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Vardas</th>
            <th>El. paštas</th>
            <th>Veiksmai</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <Button variant="primary" size="sm" className="me-2" onClick={() => handleEdit(user)}>Redaguoti</Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(user._id)}>Ištrinti</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Redaguoti vartotoją</Modal.Title>
        </Modal.Header>
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
          <Button variant="success" onClick={handleUpdate}>Išsaugoti</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default UserManager;
