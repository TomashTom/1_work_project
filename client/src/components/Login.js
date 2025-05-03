import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../assets/css/login.css'; // ← Svarbu: pridėk šitą failą!

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', form);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setMsg(`Sveiki, ${res.data.user.name}`);
      setTimeout(() => navigate('/'), 1000);
    } catch (err) {
      setMsg(err.response?.data?.error || 'Prisijungimo klaida');
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2>Prisijungimas</h2>
        <input
          type="email"
          placeholder="El. paštas"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Slaptažodis"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          required
        />
        <button type="submit">Prisijungti</button>
        {msg && <p className="msg">{msg}</p>}
      </form>
    </div>
  );
}

export default Login;
