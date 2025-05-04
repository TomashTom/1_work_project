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
  const [passwordValid, setPasswordValid] = useState(true);
  const [showValidation, setShowValidation] = useState(false);
  const navigate = useNavigate();

  const checkPasswordStrength = (password) => {
    const hasLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSymbol = /[!@#$%^&*]/.test(password);
    return hasLength && hasUppercase && hasNumber && hasSymbol;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'password') {
      setPasswordValid(checkPasswordStrength(value));
    }

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
    setShowValidation(true);

    if (!checkPasswordStrength(form.password)) {
      setMsg('❌ Slaptažodis per silpnas! Reikia bent 8 simbolių, didžiosios raidės, skaičiaus ir specialaus ženklo.');
      return;
    }

    try {
      await axios.post('/api/auth/register', form);
      setMsg('✅ Registracija sėkminga!');
      setTimeout(() => navigate('/login'), 1000);
    } catch (err) {
      setMsg(err.response?.data?.error || '❌ Klaida. Bandykite dar kartą.');
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2>Registracija</h2>

        <input name="name" type="text" placeholder="Slapyvardis" value={form.name} onChange={handleChange} />
        {form.name === '' && showValidation && (
          <p className="validation-error">Įveskite slapyvardį</p>
        )}

        <input name="email" type="email" placeholder="El. paštas" value={form.email} onChange={handleChange} />
        {form.email === '' && showValidation && (
          <p className="validation-error">Įveskite el. paštą</p>
        )}

        <input name="password" type="password" placeholder="Slaptažodis" value={form.password} onChange={handleChange} />
        {!passwordValid && (
          <p className="validation-error">
            Slaptažodyje turi būti bent 8 simboliai, didžioji raidė, skaičius ir specialus simbolis.
          </p>
        )}

        <input name="phone" type="text" placeholder="Telefonas" value={form.phone} onChange={handleChange} />
        {form.phone === '' && showValidation && (
          <p className="validation-error">Įveskite telefono numerį</p>
        )}

        <input name="avatarUrl" type="text" placeholder="Nuotraukos URL (pasirinktinai)" value={form.avatarUrl} onChange={handleChange} />

        <input name="dateOfBirth" type="date" placeholder="Gimimo data" value={form.dateOfBirth} onChange={handleChange} />
        {form.dateOfBirth === '' && showValidation && (
          <p className="validation-error">Pasirinkite gimimo datą</p>
        )}

        <input name="address.street" type="text" placeholder="Gatvė" value={form.address.street} onChange={handleChange} />
        {form.address.street === '' && showValidation && (
          <p className="validation-error">Įveskite gatvę</p>
        )}

        <input name="address.city" type="text" placeholder="Miestas" value={form.address.city} onChange={handleChange} />
        {form.address.city === '' && showValidation && (
          <p className="validation-error">Įveskite miestą</p>
        )}

        <input name="address.zip" type="text" placeholder="Pašto kodas" value={form.address.zip} onChange={handleChange} />
        {form.address.zip === '' && showValidation && (
          <p className="validation-error">Įveskite pašto kodą</p>
        )}

        <input name="address.country" type="text" placeholder="Šalis" value={form.address.country} onChange={handleChange} />
        {form.address.country === '' && showValidation && (
          <p className="validation-error">Įveskite šalį</p>
        )}

        <button type="submit">Registruotis</button>
        {msg && (
          <div className={`msg-box ${msg.startsWith('✅') ? 'success' : 'error'}`}>
            {msg}
          </div>
        )}
      </form>
    </div>
  );
}

export default Register;
