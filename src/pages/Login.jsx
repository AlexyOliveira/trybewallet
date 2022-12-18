import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { saveLogedEmail } from '../redux/actions';
import './login.css';
import logo from '../images/logo.png';

class Login extends Component {
  state = {
    email: '',
    password: '',
    isButtonDisable: true,
  };

  handleChange = (event) => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const passwordLength = 5;
    this.setState(
      {
        [event.target.name]: event.target.value,
      },
      () => {
        const { password, email } = this.state;
        this.setState({
          isButtonDisable:
            password.length <= passwordLength
            || !(email.includes('@') && emailRegex.test(email)),
        });
      },
    );
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email } = this.state;
    const { dispatch, history } = this.props;
    dispatch(saveLogedEmail(email));
    localStorage.setItem('email', email);
    history.push('/carteira');
  };

  render() {
    const { isButtonDisable } = this.state;
    return (

      <div className="mainContainer">
        <div className="formContainer">
          <img src={ logo } alt="" />
          <form onSubmit={ this.handleSubmit }>
            <input
              onChange={ this.handleChange }
              data-testid="email-input"
              placeholder="insira um email"
              type="text"
              name="email"
            />
            <input
              onChange={ this.handleChange }
              data-testid="password-input"
              placeholder="insira uma senha qualquer de 6 dígitos"
              type="password"
              name="password"
            />
            <Button disabled={ isButtonDisable } type="submit">Entrar</Button>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: Proptypes.func,
}.isRequired;

export default connect()(Login);
