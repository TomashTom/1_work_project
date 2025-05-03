import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserManager() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const fetchUsers = () => {
    axios.get('/api/users')
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/users', { name, email })
      .then(() => {
        fetchUsers();
        setName('');
        setEmail('');
      });
  };

  const handleDelete = (id) => {
    axios.delete(`/api/users/${id}`)
      .then(() => fetchUsers());
  };

  return (
    <div>
      <h2>Vartotojų sąrašas</h2>
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Vardas" />
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="El. paštas" />
        <button type="submit">Pridėti</button>
      </form>

      <ul>
        {users.map(user => (
          <li key={user._id}>
            {user.name} ({user.email})
            <button onClick={() => handleDelete(user._id)}>Ištrinti</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserManager;
