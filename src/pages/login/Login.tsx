import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import money from '../../../imgs/money.png';
import { userEmailAction } from '../../redux/actions';
import './index.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [isDisable, setIsDisable] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  const validadeEmail = (emailInput:string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let buttonStatus = true;
    if (password.length < 6) {
      buttonStatus = false;
    } else {
      buttonStatus = true;
    }
    // console.log(buttonStatus);

    const checkPassword = emailRegex.test(emailInput) && buttonStatus;
    // console.log(emailRegex.test(emailInput));

    return checkPassword;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(userEmailAction(email));
    navigate('/carteira');
  };
  return (
    <div className="header-container">
      <div id="form-box">
        <form action="" id="forms" onSubmit={ (event) => handleSubmit(event) }>
          <img src={ money } alt="money-sprite" />
          <p id="img-text">
            Trybe
            {' '}
            <span>Wallet</span>
          </p>
          <input
            placeholder="Email"
            type="email"
            name="email"
            id="email"
            data-testid="email-input"
            value={ email }
            onChange={ (event) => handleChange(event) }
          />
          <input
            placeholder="Senha"
            type="password"
            name="password"
            id="password"
            value={ password }
            data-testid="password-input"
            onChange={ (event) => handleChange(event) }
          />
          <button
            id="form-btn"
            disabled={ !validadeEmail(email) }
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
