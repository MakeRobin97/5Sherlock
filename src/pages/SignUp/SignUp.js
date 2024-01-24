import React, { useState } from 'react';
import { useInRouterContext, useNavigate } from 'react-router-dom';
import Input from '../../components/Input/Input';
import CheckBox from '../../components/CheckBox/CheckBox';
import Terms from '../../components/Terms/Terms';
import BASE_API from '../../config';
import './SignUp.scss';
const idReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const pwReg = /^[.@!#$%&'*+-/=?^_`{|}~\w\d]{9,}$/;
const SignUp = () => {
  const navigate = useNavigate();
  const [joinUserInfo, setJoinUserInfo] = useState({
    name: '',
    phoneNumber: '',
    birthday: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const selectList = ['통신사 선택', 'KT', 'SKT', 'LG U+'];
  const [Selected, setSelected] = useState('');
  const handleSelect = e => {
    setSelected(e.target.value);
  };
  const saveJoinUserInfo = event => {
    const { name, value } = event.target;
    setJoinUserInfo({ ...joinUserInfo, [name]: value });
    setErrors({ ...errors, [name]: '' });
    validateField(name, value);
  };
  const validateField = (fieldName, value) => {
    const fieldErrors = {};
    switch (fieldName) {
      case 'name':
        if (value.length > 2) {
          fieldErrors.name = '';
        } else fieldErrors.name = '이름을 입력하세요';
        break;
      case 'phoneNumber':
        if (value.length === 10 || value.length === 11) {
          fieldErrors.phoneNumber = '';
        } else fieldErrors.phoneNumber = '휴대폰번호를 입력하세요';
        break;
      case 'birthday':
        if (value.length === 8) {
          fieldErrors.birthday = '';
        } else fieldErrors.birthday = '생년월일은 8자리여야 합니다';
        break;
      case 'email':
        if (idReg.test(value)) {
          fieldErrors.email = '';
        } else fieldErrors.email = '올바른 이메일 형식을 입력하세요';
        break;
      case 'password':
        if (pwReg.test(value)) {
          fieldErrors.password = '';
        } else fieldErrors.password = '패스워드는 9자 이상이어야 합니다';
        break;
      case 'confirmPassword':
        if (value === joinUserInfo.password) {
          fieldErrors.confirmPassword = '';
        } else fieldErrors.confirmPassword = '비밀번호가 일치하지 않습니다';
        break;
      default:
        break;
    }
    setErrors({ ...errors, ...fieldErrors });
  };

  const handleSignUp = () => {
    alert('회원가입완료!');
    const exData = joinUserInfo;
    delete exData.password;
    delete exData.confirmPassword;
    window.localStorage.setItem('signUpInfo', JSON.stringify(exData));

    navigate('/login');
  };

  // const handleSignUp = e => {
  //   fetch(`${BASE_API}/users/signUp`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json;charset=utf-8',
  //     },
  //     body: JSON.stringify({
  //       name,
  //       phoneNumber,
  //       email,
  //       password,
  //     }),
  //   })
  //     .then(res => {
  //       return res.json();
  //     })
  //     .then(data => {
  //       if (data.message === 'userCreated') {
  //         navigate('/login');
  //       } else {
  //         alert('회원가입에 실패했습니다.');
  //       }
  //     });
  // };
  const { name, phoneNumber, birthday, email, password, confirmPassword } =
    joinUserInfo;
  const isUserInputValid =
    name.length > 0 &&
    phoneNumber.length > 0 &&
    birthday.length === 8 &&
    idReg.test(email) &&
    pwReg.test(password) &&
    password === confirmPassword &&
    isChecked;

  console.log(joinUserInfo);

  return (
    <div className="signUp">
      <header className="header">
        <div className="headerBox">
          <div className="headerText">오셜록 통합멤버십 회원가입</div>
          <img
            className="deleteBtn"
            src="/images/login-img1.png"
            alt="취소버튼"
            onClick={() => navigate('/login')}
          />
        </div>
      </header>
      <div className="joinBox">
        <div className="container">
          <span className="joinGuideText">
            오셜록 통합멤버십 회원가입을 환영합니다!
          </span>
          <span className="joinGuideTextSmall">
            오셜록 통합멤버십에 가입하시면 오설록 쇼핑몰 온/오프라인 매장에서
            상품을 구매할 때마다 현금처럼 사용할 수 있는 포인트 적립과 사용 등
            다양한 혜택을 받으실 수 있습니다.
          </span>
          <form className="joinForm">
            <Input
              scale="first"
              placeholder="이름(실명으로 입력해주세요)"
              type="text"
              name="name"
              onChange={saveJoinUserInfo}
            />
            {errors.name && <div className="error">{errors.name}</div>}
            <Input
              scale="first"
              placeholder="생년월일 8자리(ex.19980905)"
              type="text"
              name="birthday"
              onChange={saveJoinUserInfo}
            />
            {errors.birthday && <div className="error">{errors.birthday}</div>}
            <div className="phoneNumberInput">
              <select
                onChange={handleSelect}
                value={Selected}
                className="phoneOption"
              >
                {selectList.map(item => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </select>
              <Input
                scale="first"
                placeholder="휴대폰번호"
                type="text"
                name="phoneNumber"
                onChange={saveJoinUserInfo}
              />
            </div>
            {errors.phoneNumber && (
              <div className="error">{errors.phoneNumber}</div>
            )}
            <Input
              scale="first"
              placeholder="이메일"
              type="text"
              name="email"
              onChange={saveJoinUserInfo}
            />
            {errors.email && <div className="error">{errors.email}</div>}
            <Input
              scale="first"
              placeholder="비밀번호(9자 이상)"
              type="password"
              name="password"
              onChange={saveJoinUserInfo}
            />
            {errors.password && <div className="error">{errors.password}</div>}
            <Input
              scale="first"
              placeholder="비밀번호 확인"
              type="password"
              name="confirmPassword"
              onChange={saveJoinUserInfo}
            />
            {errors.confirmPassword && (
              <div className="error">{errors.confirmPassword}</div>
            )}
            <CheckBox
              checked={isChecked}
              onChange={handleCheckboxChange}
              label="개인정보 수집 및 이용 동의(필수)"
            ></CheckBox>
            <Terms></Terms>
            <button
              type="button"
              className="signupButton"
              onClick={handleSignUp}
              disabled={!isUserInputValid}
            >
              본인인증 및 회원가입
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
