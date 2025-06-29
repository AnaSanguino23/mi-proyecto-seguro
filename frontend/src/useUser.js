// src/useUser.js
import { useState, useEffect } from 'react';

export default function useUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula carga de usuario (ej: desde una API)
    setTimeout(() => {
      setUser({ name: 'Anna', email: 'anna@example.com' });
      setLoading(false);
    }, 1000);
  }, []);

  return { user, loading };
}
