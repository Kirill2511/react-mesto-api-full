import React from 'react';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {
  const [data, setData] = React.useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = data;
    onRegister(email, password);
  };

  return (
    <section className="auth">
      <div className="auth__container">
        <h3 className="auth__title">Регистрация</h3>
        <form className="auth__form" onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            className="auth__input"
            id="email"
            name="email"
            placeholder="Email"
            autoComplete="off"
            value={data.email}
          />
          <input
            className="auth__input"
            onChange={handleChange}
            id="password"
            name="password"
            placeholder="Password"
            type="password"
            value={data.password}
          />
          <button className="auth__button-submit" type="submit">
            Зарегистрироваться
          </button>
          <div className="auth__container-register">
            <p className="auth__register">
              Уже зарегистрированы?
              <Link to="/signin" className="auth__link">
                &nbsp;Войти
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Register;
