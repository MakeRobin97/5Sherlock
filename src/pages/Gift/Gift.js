import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import './Gift.scss';
import BASE_API from '../../config';

const Gift = () => {
  const slides = [
    { url: './images/gift/gift1.jpg', title: 'gift1' },
    { url: './images/gift/gift2.jpg', title: 'gift2' },
    { url: './images/gift/gift3.jpg', title: 'gift3' },
    { url: './images/gift/gift4.jpg', title: 'gift4' },
    { url: './images/gift/gift5.jpg', title: 'gift5' },
  ];

  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState(0);
  const [data, setData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userInfo, setUserInfo] = useState({
    letter: '',
    customerName: '',
    customerEmail: '',
    customerPhoneNumber: '',
    receiverName: '',
    receiverPhoneNumber: '',
    receiverAddress: '',
    defaultAddress: '',
    shippingMessage: '',
    payment: '',
    check: '',
    customerPhoneSelect: '',
    receiverPhoneSelect: '',
  });

  const [check, setCheck] = useState(false);
  const checkFunc = checked => {
    if (checked) {
      setCheck(true);
    } else {
      setCheck(false);
    }
  };

  const goCard = id => {
    setCardNumber(id);
  };

  const saveUserInfo = event => {
    const { name, value } = event.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const postOrder = () => {
    if (check === false) {
      alert('동의해주세요');
      return;
    }
    alert('구매해주셔서 감사합니다');
    navigate('/product-list');
  };

  const getOrder = () => {
    const result = JSON.parse(window.localStorage.getItem('localGiftList'));
    setData(result);
  };

  const getUser = () => {
    const infoData = JSON.parse(window.localStorage.getItem('info'));
    setUserData(infoData);
  };

  useEffect(() => {
    getUser();
    getOrder();
  }, []);

  useEffect(() => {
    if (userData === null) {
      return;
    }

    const totalmyPhone = userData.phone;
    const parts = totalmyPhone.split('-');
    const a = parts[0];
    const b = parts.slice(1).join('-');

    setUserInfo({
      letter: '',
      customerName: userData.name,
      customerEmail: userData.email,
      customerPhoneNumber: b,
      shipperName: '',
      receiverName: '',
      receiverPhoneNumber: '',
      receiverAddress: '',
      defaultAddress: '',
      shippingMessage: '',
      payment: '',
      check: '',
      phoneSelect: a,
    });
  }, [userData]);

  if (data === null) {
    return null;
  }

  const totalPrice = data.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <div className="gift">
      <div className="giftInner">
        <div className="orderTitle">
          <h1>선물하기</h1>
        </div>
        <div className="orderContainerWrapper">
          <div className="cardBox">
            <div className="cardList">
              <img
                className={`cardSingle ${cardNumber === 0 ? 'selected' : ''}`}
                src="/images/gift/gift1.jpg"
                alt="cardOne"
                onClick={() => goCard(0)}
              />
              <img
                className={`cardSingle ${cardNumber === 1 ? 'selected' : ''}`}
                src="/images/gift/gift2.jpg"
                alt="cardTwo"
                onClick={() => goCard(1)}
              />
              <img
                className={`cardSingle ${cardNumber === 2 ? 'selected' : ''}`}
                src="/images/gift/gift3.jpg"
                alt="cardThree"
                onClick={() => goCard(2)}
              />
              <img
                className={`cardSingle ${cardNumber === 3 ? 'selected' : ''}`}
                src="/images/gift/gift4.jpg"
                alt="cardFour"
                onClick={() => goCard(3)}
              />
              <img
                className={`cardSingle ${cardNumber === 4 ? 'selected' : ''}`}
                src="/images/gift/gift5.jpg"
                alt="cardFive"
                onClick={() => goCard(4)}
              />
            </div>
            <div className="card">
              <div className="cardContentBox">
                <div
                  className="imageRoll"
                  style={{
                    width: `${slides.length * 420}px`,
                    transform: `translateX(-${cardNumber * 420}px)`,
                  }}
                >
                  <img
                    className="cardPic"
                    src={`/images/gift/gift1.jpg`}
                    alt="cardPic"
                  />
                  <img
                    className="cardPic"
                    src={`/images/gift/gift2.jpg`}
                    alt="cardPic"
                  />
                  <img
                    className="cardPic"
                    src={`/images/gift/gift3.jpg`}
                    alt="cardPic"
                  />
                  <img
                    className="cardPic"
                    src={`/images/gift/gift4.jpg`}
                    alt="cardPic"
                  />
                  <img
                    className="cardPic"
                    src={`/images/gift/gift5.jpg`}
                    alt="cardPic"
                  />
                </div>
                <textarea
                  className="writeSection"
                  placeholder="100자 이내로 입력해주세요."
                  name="letter"
                  onChange={saveUserInfo}
                  maxLength="100"
                />
                <div className="letterNumber">{userInfo.letter.length}/100</div>
              </div>
            </div>
          </div>
          <div className="orderAddressInfo">
            <div className="title">
              <h2>보내는 분</h2>
            </div>
            <div className="oderAddressInput">
              <div className="recipient inputWrapper">
                <span className="inputTitle">이름</span>
                <input
                  type="text"
                  name="customerName"
                  onChange={saveUserInfo}
                  value={userInfo.customerName}
                />
              </div>
              <div className="recipient inputWrapper">
                <span className="inputTitle">이메일</span>
                <input
                  type="text"
                  name="customerEmail"
                  onChange={saveUserInfo}
                  value={userInfo.customerEmail}
                />
              </div>
              <div className="userPhone inputWrapper">
                <span className="inputTitle">휴대전화</span>
                <select
                  name="phoneSelect"
                  id="user-phone1"
                  className="select"
                  onChange={saveUserInfo}
                  value={userInfo.customerPhoneSelectphoneSelect}
                >
                  <option value="010">010</option>
                  <option value="011">011</option>
                  <option value="016">016</option>
                  <option value="017">017</option>
                  <option value="018">018</option>
                  <option value="019">019</option>
                </select>
                <input
                  type="text"
                  name="customerPhoneNumber"
                  onChange={saveUserInfo}
                  value={userInfo.customerPhoneNumber}
                />
              </div>
            </div>
          </div>

          <div className="orderAddressInfo">
            <div className="title">
              <h2>받는 분 정보</h2>
            </div>
            <div className="oderAddressInput">
              <div className="recipient inputWrapper">
                <span className="inputTitle">받는 분</span>
                <input
                  type="text"
                  name="receiverName"
                  onChange={saveUserInfo}
                  placeholder="이름"
                />
              </div>
              <div className="userPhone inputWrapper">
                <span className="inputTitle">휴대전화</span>
                <select
                  name="phoneSelect"
                  id="user-phone1"
                  className="select"
                  onChange={saveUserInfo}
                  value={userInfo.receiverPhoneSelect}
                >
                  <option value="010">010</option>
                  <option value="011">011</option>
                  <option value="016">016</option>
                  <option value="017">017</option>
                  <option value="018">018</option>
                  <option value="019">019</option>
                </select>
                <input
                  type="text"
                  name="receiverPhoneNumber"
                  onChange={saveUserInfo}
                  value={userInfo.receiverPhoneNumber}
                />
              </div>
              <div className="adrress inputWrapper">
                <span className="inputTitle">주소</span>
                <input
                  type="text"
                  name="receiverAddress"
                  onChange={saveUserInfo}
                />
              </div>
            </div>
          </div>

          <div className="orderProductInfo">
            <div className="title">
              <h2>선물상품 확인</h2>
              <span className="total">총 {data.length}건</span>
            </div>
            <ul className="orderList">
              {data.map(item => (
                <li key={item.id}>
                  <div className="productImgWrapper">
                    <div className="productImg">
                      <img src={item.img} alt="주문상품" />
                    </div>
                    <div className="name">{item.name}</div>
                  </div>
                  <div className="priceAndCount">
                    <span className="price">
                      {(item.price * item.quantity).toLocaleString('ko-KR')}원 /
                    </span>
                    <span className="price">{item.quantity}개</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="payWay">
            <div className="title">
              <h2>결제 수단 선택</h2>
            </div>
            <div className="payWayImg">
              <img src="/images/pay.png" alt="결제 수단" />
            </div>
          </div>
          <div className="purchaseConsent">
            <input
              type="checkbox"
              className="consentSelect"
              name="check"
              onChange={e => checkFunc(e.target.checked)}
            />
            <label>
              위 상품의 판매조건을 명확히 확인하였으며, 구매 진행에 동의 합니다.
            </label>
          </div>
        </div>
      </div>
      <div className="rightSection">
        <div className="paymentBox1">
          <div className="list">
            <div className="totalAmount">
              <span>총 상품 금액</span>
              <span>{totalPrice.toLocaleString('ko-KR')}원</span>
            </div>
            <div className="finalPayment">
              <span>결제 예상 금액</span>
              <span className="payment">
                {totalPrice.toLocaleString('ko-KR')}원
              </span>
            </div>
          </div>
          <button className="btnPayment" onClick={postOrder}>
            <span>{totalPrice.toLocaleString('ko-KR')}</span>원 주문하기
          </button>
        </div>
      </div>
    </div>
  );
};
export default Gift;
