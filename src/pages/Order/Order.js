import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import './Order.scss';
import BASE_API from '../../config';

const Order = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userInfo, setUserInfo] = useState({
    customerName: '',
    customerEmail: '',
    customerPhoneNumber: '',
    shipperName: '',
    receiverName: '',
    receiverPhoneNumber: '',
    receiverAddress: '',
    defaultAddress: '',
    select: '',
    shippingMessage: '',
    payment: '',
  });

  const saveUserInfo = event => {
    const { name, value } = event.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const postOrder = () => {
    alert('구매해주셔서 감사합니다');
    navigate('/product-list');
  };

  const getOrder = () => {
    const result = JSON.parse(window.localStorage.getItem('localOrderList'));
    setData(result);
  };

  const getUser = () => {
    const infoData = JSON.parse(window.localStorage.getItem('signUpInfo'));
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
    setUserInfo({
      customerName: userData.name,
      customerEmail: userData.email,
      customerPhoneNumber: userData.phoneNumber,
      shipperName: '',
      receiverName: '',
      receiverPhoneNumber: '',
      receiverAddress: '',
      defaultAddress: '',
      select: '',
      shippingMessage: '',
      payment: '',
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
    <div className="order">
      <div className="orderInner">
        <div className="orderTitle">
          <h1></h1>
        </div>
        <div className="orderContainerWrapper">
          <div className="orderUserInfo">
            <div className="title">
              <h2>주문고객정보</h2>
              <span>{userInfo.customerName}</span>
            </div>
            <div className="orderInfoInput">
              <div className="userName inputWrapper">
                <span className="inputTitle">이름</span>
                <input
                  type="text"
                  name="customerName"
                  onChange={saveUserInfo}
                  value={userInfo.customerName}
                />
              </div>
              <div className="userEmail inputWrapper">
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
                <input
                  type="num"
                  name="customerPhoneNumber"
                  onChange={saveUserInfo}
                  value={userInfo.customerPhoneNumber}
                />
              </div>
              <div className="sender inputWrapper">
                <span className="inputTitle">보내는 분</span>
                <input type="text" name="shipperName" onChange={saveUserInfo} />
              </div>
            </div>
            <div className="userNotice">
              <div className="noticeInner">
                <div className="noticeText">
                  보내는 분 별도 표기하더라도 고객님 정보보호를 위해 마스킹
                  처리되어 발송됩니다.
                </div>
                <p className="noticeEx">
                  예&#41; 오설록 -&#62; 오*록 / 오설록몰 -&#62; 오설**
                </p>
              </div>
            </div>
          </div>
          <div className="orderAddressInfo">
            <div className="title">
              <h2>배송지정보</h2>
            </div>
            <div className="oderAddressInput">
              <div className="recipient inputWrapper">
                <span className="inputTitle">받는 분</span>
                <input
                  type="text"
                  name="receiverName"
                  onChange={saveUserInfo}
                />
              </div>
              <div className="userPhone inputWrapper">
                <span className="inputTitle">휴대전화</span>
                <input
                  type="num"
                  name="receiverPhoneNumber"
                  onChange={saveUserInfo}
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
            <div className="deliveryRequest">
              <div className="text">배송 요청사항</div>
              <select
                name="select"
                className="requestSelect"
                onChange={saveUserInfo}
              >
                <option>배송 요청사항 선택</option>
                <option>경비실에 맡겨주세요</option>
                <option>배송전에 미리 연락주세요</option>
                <option>직접 입력</option>
              </select>
            </div>
          </div>
          <div className="orderProductInfo">
            <div className="title">
              <h2>주문상품</h2>
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
            <input type="checkbox" className="consentSelect" />
            <label>
              위 상품의 판매조건을 명확히 확인하였으며, 구매 진행에 동의 합니다.
            </label>
          </div>
        </div>
      </div>
      <div className="rightSection">
        <div className="paymentBox">
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
export default Order;
