import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { saveUser } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      disabled: true,
      logged: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.validateLogin = this.validateLogin.bind(this);
    this.login = this.login.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    this.validateLogin();
  }

  validateLogin() {
    const { email, password } = this.state;
    const minSize = 5;
    const re = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (password.length >= minSize && re.test(email)) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  }

  login() {
    const { saveEmail } = this.props;
    const { email } = this.state;
    saveEmail(email);
    this.setState({
      logged: true,
    });
  }

  render() {
    const { disabled, logged, email, password } = this.state;
    if (logged) {
      return <Redirect to="/carteira" />;
    }
    return (
      <div>
        <label htmlFor="email">
          Email:
          <input
            data-testid="email-input"
            type="text"
            id="email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />

        </label>
        <label htmlFor="password">
          Senha:
          <input
            data-testid="password-input"
            type="password"
            id="password"
            name="password"
            value={ password }
            onChange={ this.handleChange }
          />
        </label>
        <button type="button" disabled={ disabled } onClick={ this.login }>Entrar</button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveEmail: (email) => dispatch(saveUser(email)),
});

Login.propTypes = {
  saveEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
