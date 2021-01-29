import React from 'react';
import { Link } from 'react-router-dom';

function Login({ onLogin }) {
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
    onLogin(email, password);
  };

  return (
    <section className="auth">
      <div className="auth-container">
        <h3 className="auth__title">Вход</h3>
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
            onChange={handleChange}
            className="auth__input"
            id="password"
            name="password"
            placeholder="Password"
            type="password"
            value={data.password}
          />
          <button className="auth__button-submit" type="submit">
            Войти
          </button>
          <div className="auth__container-register">
            <p className="auth__register">
              Еще не зарегистрированы?
              <Link to="/signup" className="auth__link">
                &nbsp;Зарегистрироваться
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Login;
