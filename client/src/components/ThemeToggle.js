// src/components/ThemeToggle.js
import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { Button } from 'react-bootstrap';

function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Button
      variant={theme === 'light' ? 'outline-dark' : 'outline-light'}
      onClick={toggleTheme}
      size="sm"
      className="ms-3"
    >
      {theme === 'light' ? '🌙 Naktis' : '☀️ Šviesa'}
    </Button>
  );
}

export default ThemeToggle;
