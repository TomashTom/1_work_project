import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/register', form);
      setMsg('Registracija sėkminga!');
    } catch (err) {
      setMsg(err.response?.data?.error || 'Klaida');
    }
  };

  return (
    <div>
      <h2>Registracija</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Vardas" onChange={e => setForm({ ...form, name: e.target.value })} />
        <input placeholder="El. paštas" onChange={e => setForm({ ...form, email: e.target.value })} />
        <input type="password" placeholder="Slaptažodis" onChange={e => setForm({ ...form, password: e.target.value })} />
        <button type="submit">Registruotis</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
}

export default Register;
