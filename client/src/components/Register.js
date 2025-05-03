import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../assets/css/login.css'; // Naudojame tą patį failą kaip Login

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/register', form);
      setMsg('Registracija sėkminga!');
      setTimeout(() => {
        navigate('/login'); // Po registracijos nukreipiama į prisijungimą
      }, 1000);
    } catch (err) {
      setMsg(err.response?.data?.error || 'Klaida');
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2>Registracija</h2>
        <input
          type="text"
          placeholder="Vardas"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
        />
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
        <button type="submit">Registruotis</button>
        {msg && <p className="msg">{msg}</p>}
      </form>
    </div>
  );
}

export default Register;
