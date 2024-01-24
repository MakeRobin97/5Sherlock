import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Input/Input';
import BASE_API from '../../config';
import './Login.scss';
const idReg = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
const pwReg = /^[.@!#$%&'*+-/=?^_`{|}~\w\d]{9,}$/;
const Login = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });
  const saveUserInfo = event => {
    const { name, value } = event.target;
    setUserInfo({ ...userInfo, [name]: value });
    if (name === 'email' && !idReg.test(value)) {
      setErrorMessage('이메일 형식이 올바르지 않습니다');
    } else if (name === 'password' && !pwReg.test(value)) {
      setErrorMessage('패스워드는 9자 이상이어야 합니다');
    } else {
      clearErrorMessage();
    }
  };
  // const handleLogin = e => {
  //   e.preventDefault();
  //   fetch(`${BASE_API}/users/signIn`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json;charset=utf-8',
  //     },
  //     body: JSON.stringify({
  //       email,
  //       password,
  //     }),
  //   })
  //     .then(res => {
  //       return res.json();
  //     })
  //     .then(result => {
  //       if (result.message === 'signInSuccess' && result.token) {
  //         localStorage.setItem('token', result.token);
  //         navigate('/');
  //         window.location.reload();
  //       } else {
  //         setErrorMessage('아이디 또는 비밀번호가 맞지 않습니다.');
  //       }
  //     });
  // };

  const handleLogin = e => {
    e.preventDefault();

    if (!window.localStorage.getItem('signUpInfo')) {
      return alert('가입되어 있지 않은 이메일입니다.');
    }

    const signUpInfo = JSON.parse(window.localStorage.getItem('signUpInfo'));

    if (userInfo.email !== signUpInfo.email) {
      alert('가입되어 있지 않은 이메일입니다.');
    } else {
      localStorage.setItem('token', 'testoken');
      navigate('/');
    }
  };

  const clearErrorMessage = () => {
    setErrorMessage('');
  };
  const { email, password } = userInfo;
  const isUserInputValid = idReg.test(email) && pwReg.test(password);
  return (
    <div className="Login">
      <header className="header">
        <div className="headerBox">
          <div className="headerText">로그인</div>
          <img
            className="deleteBtn"
            src="/images/login-img1.png"
            alt="취소버튼"
            // onClick={navigate('/')}
          />
        </div>
      </header>
      <div className="loginBox">
        <div className="container">
          <span className="loginGuideText">
            오셜록 계정으로 로그인해주세요.
          </span>
          <form className="loginForm">
            <Input
              scale="first"
              placeholder="이메일 입력"
              name="email"
              onChange={saveUserInfo}
            />
            <Input
              scale="first"
              placeholder="패스워드 입력"
              type="password"
              name="password"
              onChange={saveUserInfo}
            />
            <div className="error">{errorMessage}</div>
          </form>
          <button
            className="loginButton"
            onClick={handleLogin}
            disabled={!isUserInputValid}
          >
            로그인
          </button>
          <div className="joinButton" onClick={() => navigate('/signup')}>
            <span className="a">아직 회원이 아니세요?</span>
            <span className="b">회원가입 &gt; </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
