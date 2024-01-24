import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Timer from '../../components/Timer/Timer';
import './Cart.scss';
import BASE_API from '../../config';
const Cart = () => {
  const [data, setData] = useState([]);
  const [checkItems, setCheckItems] = useState([]);
  const navigate = useNavigate();

  const getCart = () => {
    const result = JSON.parse(window.localStorage.getItem('localCartList'));
    if (!result) {
      setData([]);
    } else {
      setData(result);
    }
  };

  const minusQuantityFunc = id => {
    const result = data.map(item => {
      if (item.id === id && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setData(result);
  };

  const plusQuantityFunc = id => {
    const result = data.map(item => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setData(result);
  };

  const handleSingleCheck = (checked, id) => {
    if (checked) {
      setCheckItems(prev => [...prev, id]);
    } else {
      setCheckItems(checkItems.filter(el => el !== id));
    }
  };

  const removeCart = id => {
    setData(data.filter(item => item.id !== id));
    window.localStorage.setItem(
      'localCartList',
      JSON.stringify(data.filter(item => item.id !== id)),
    );
    window.location.reload();
  };

  // 체크박스 전체 선택
  const handleAllCheck = checked => {
    if (checked) {
      const idArray = [];
      data.forEach(el => idArray.push(el.id));
      setCheckItems(idArray);
    } else {
      setCheckItems([]);
    }
  };

  const goGift = () => {
    if (checkItems.length === 0) {
      alert('최소 1개의 상품은 담아주세요.');
      return;
    }
    const giftData = data.filter(item => checkItems.includes(item.id));
    window.localStorage.setItem('localGiftList', JSON.stringify(giftData));
    navigate('/gift');
  };

  const saveCart = () => {
    if (checkItems.length === 0) {
      alert('최소 1개의 상품은 담아주세요.');
      return;
    }

    const saveData = data.filter(item => checkItems.includes(item.id));
    window.localStorage.setItem('localOrderList', JSON.stringify(saveData));
    navigate('/order');
  };

  const saveGift = () => {
    if (checkItems.length === 0) {
      alert('최소 1개의 상품은 담아주세요.');
      return;
    }

    const saveData = data.filter(item => checkItems.includes(item.id));
    window.localStorage.setItem('localGiftList', JSON.stringify(saveData));
    navigate('/gift');
  };

  useEffect(() => {
    getCart();
  }, []);

  const totalPrice =
    data.length > 0
      ? data.reduce((total, item) => total + item.price * item.quantity, 0)
      : 0;

  return (
    <div className="cart">
      <div className="inner">
        <header className="header">
          <div className="pageTitle">장바구니</div>
        </header>

        <div className="cartCheck">
          <div className="checkAllBox">
            <input
              id="checkAll"
              className="checkAll"
              type="checkbox"
              onChange={e => handleAllCheck(e.target.checked)}
              checked={data.length === checkItems.length}
            />

            <label htmlFor="checkAll">전체선택</label>
          </div>
        </div>

        <div className="listBox">
          <div className="itemInfoBox">
            {data.map(d => (
              <div className="cartListBox" key={d.id}>
                <input
                  type="checkbox"
                  className="checkOne"
                  onChange={e => handleSingleCheck(e.target.checked, d.id)}
                  checked={checkItems.includes(d.id)}
                />
                <img src={d.img} alt="cartPic" className="itemImage" />
                <div className="itemTitle">{d.name}</div>
                <div className="quantityBox">
                  <div
                    className="minusBox"
                    onClick={() => {
                      minusQuantityFunc(d.id);
                    }}
                  >
                    <img
                      src="/images/minus.png"
                      alt="minusQuantity"
                      className="minusQuantity"
                    />
                  </div>
                  <div className="quantity">{d.quantity}</div>
                  <div
                    className="plusBox"
                    onClick={() => {
                      plusQuantityFunc(d.id);
                    }}
                  >
                    <img
                      src="/images/plus.png"
                      alt="plusQuantity"
                      className="plusQuantity"
                    />
                  </div>
                </div>

                <div className="price">
                  {(d.price * d.quantity).toLocaleString('ko-KR')}원
                </div>
                <img
                  className="removeBtn"
                  src="/images/cancel.png"
                  alt="removeBtn"
                  onClick={() => {
                    removeCart(d.id);
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="totalPriceBox">
          <div className="totalPriceName">총 가격</div>
          <div className="totalPriceData">
            {totalPrice.toLocaleString('ko-KR')}원
          </div>
        </div>
        <div className="cartBtnBox">
          <button className="goGift" onClick={saveGift}>
            선택상품 선물하기
          </button>
          <button className="getOptionItem" onClick={saveCart}>
            선택상품 주문하기
          </button>
        </div>
        <div className="cartMsg">
          장바구니에 보관된 상품은 3개월 후에 삭제 됩니다.
        </div>
        <div className="onlyTodayBox">
          <div className="onlyToday">
            <div className="onlyTodayTitle">오늘만 이 가격</div>
            <div className="onlyTodayInfo">
              오늘 하루만 이 가격으로 구매할 수 있는 상품을 지금 바로
              만나보세요.
            </div>
            <div className="countingTime">
              <Timer hh="10" mm="0" ss="0" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Cart;
