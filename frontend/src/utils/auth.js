export const BASE_URL = 'https://api.kirill25111.students.nomoredomains.work';

const checkResponse = (res) => {
  if (res.ok) return res.json();
  return Promise.reject(new Error(`Ошибка: ${res.status}`));
};

export const register = (email, password) => fetch(`${BASE_URL}/signup`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ email, password }),
}).then(checkResponse);

export const authorize = (email, password) => fetch(`${BASE_URL}/signin`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ email, password }),
}).then(checkResponse);

export const checkToken = (token) => fetch(`${BASE_URL}/users/me`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
}).then(checkResponse);
