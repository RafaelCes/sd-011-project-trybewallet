import React from 'react';
import { Redirect } from 'react-router-dom';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      senha: '',
      login: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.loginOn = this.loginOn.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  validate() {
    const { email, senha } = this.state;
    const minCaracters = 6;
    if (this.validateEmail(email) && senha.length >= minCaracters) {
      return true;
    }
    return false;
  }

  loginOn() {
    if (this.validate()) {
      this.setState({
        login: true,
      });
    }
  }

  render() {
    const { email, senha, login } = this.state;
    const logar = this.validate();

    if (login) return <Redirect to="/carteira" />;

    return (
      <div>
        <form>
          <label htmlFor="login">
            Login
            <input
              onChange={ this.handleChange }
              value={ email }
              type="email"
              name="email"
              data-testid="email-input"
              placeholder="Digite seu email"
            />
          </label>
          <label htmlFor="senha">
            Senha
            <input
              onChange={ this.handleChange }
              value={ senha }
              type="password"
              name="senha"
              data-testid="password-input"
              placeholder="Digite sua senha"
            />
          </label>
        </form>
        <button
          type="button"
          disabled={ !logar }
          onClick={ this.loginOn }
        >
          Entrar
        </button>
      </div>
    );
  }
}

export default Login;
