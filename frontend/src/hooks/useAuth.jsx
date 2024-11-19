import { useCallback, useEffect, useState } from 'react';

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const login = useCallback((jwtToken, id) => {
    setToken(jwtToken);
    setUserId(id);
    localStorage.setItem(
      'token',
      JSON.stringify({ userId: jwtToken, token: id })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem('token');
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('token'));
    if (!token && data && data.token) {
      login(data.token, data.userId);
    }
  }, [login, token]);

  return { logout, login, userId, token };
};
