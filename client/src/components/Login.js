import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', form);
      setMsg(`Sveiki, ${res.data.user.name}`);
    } catch (err) {
      setMsg(err.response?.data?.error || 'Prisijungimo klaida');
    }
  };

  return (
    <div>
      <h2>Prisijungimas</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="El. paštas" onChange={e => setForm({ ...form, email: e.target.value })} />
        <input type="password" placeholder="Slaptažodis" onChange={e => setForm({ ...form, password: e.target.value })} />
        <button type="submit">Prisijungti</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
}

export default Login;
