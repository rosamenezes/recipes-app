import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
  const [login, setLogin] = useState({ email: '', password: '' });
  const history = useHistory();

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };
  const magic6 = 6;
  const isValidEmail = (email) => { const regex = /^[a-z0-9._]+@[a-z0-9_]+\.[a-z]+(\.[a-z]+)?$/i; return regex.test(email); };
  const isTrue = isValidEmail(login.email) && login.password.length > magic6;

  const handleClick = () => {
    localStorage.setItem('user', JSON.stringify({ email: login.email }));
    // localStorage.setItem('doneRecipes', JSON.stringify([{
    //   idMeal: '52977',
    //   type: 'meal',
    //   nationality: 'Turkish',
    // }]));
    history.push('/meals');
  };
  return (
    <form>
      <label htmlFor="email">
        Email:
        <input
          type="text"
          id="email"
          name="email"
          value={ login.email }
          onChange={ handleChange }
          data-testid="email-input"
        />
      </label>
      <label htmlFor="password">
        Senha:
        <input
          type="password"
          id="password"
          name="password"
          value={ login.password }
          onChange={ handleChange }
          data-testid="password-input"
        />
      </label>
      <button
        type="button"
        disabled={ !isTrue }
        onClick={ handleClick }
        data-testid="login-submit-btn"
      >
        Entrar
      </button>
    </form>
  );
}

export default Login;
