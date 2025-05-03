import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../assets/css/login.css';

function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
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
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Jei tai address laukų dalis
    if (name.startsWith('address.')) {
      const key = name.split('.')[1];
      setForm(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [key]: value
        }
      }));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/register', form);
      setMsg('Registracija sėkminga!');
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } catch (err) {
      setMsg(err.response?.data?.error || 'Klaida');
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2>Registracija</h2>

        <input name="name" type="text" placeholder="Slapivardis" value={form.name} onChange={handleChange} required />
        <input name="email" type="email" placeholder="El. paštas" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Slaptažodis" value={form.password} onChange={handleChange} required />

        <input name="phone" type="text" placeholder="Telefonas" value={form.phone} onChange={handleChange} />
        <input name="avatarUrl" type="text" placeholder="Nuotraukos URL (pasirinktinai)" value={form.avatarUrl} onChange={handleChange} />
        <input name="dateOfBirth" type="date" placeholder="Gimimo data" value={form.dateOfBirth} onChange={handleChange} />

        <input name="address.street" type="text" placeholder="Gatvė" value={form.address.street} onChange={handleChange} />
        <input name="address.city" type="text" placeholder="Miestas" value={form.address.city} onChange={handleChange} />
        <input name="address.zip" type="text" placeholder="Pašto kodas" value={form.address.zip} onChange={handleChange} />
        <input name="address.country" type="text" placeholder="Šalis" value={form.address.country} onChange={handleChange} />

        <button type="submit">Registruotis</button>
        {msg && <p className="msg">{msg}</p>}
      </form>
    </div>
  );
}

export default Register;
