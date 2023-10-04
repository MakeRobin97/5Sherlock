import React, { useState, useEffect, Link } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ProductDetail.scss';
import clipboardCopy from 'clipboard-copy';

import Modal from '../../components/Modal/Modal';

import Nav from '../../components/Nav/Nav';

import ReviewGrade from '../../components/ReviewGrade/ReviewGrade';

const ProductDetail = () => {
  //   const { id } = useParams();
  const navigate = useNavigate();
  const myData = {
    name: '시크릿 티',
    price: 77000,
    originalPrice: 80000,
    discount_rate: 20,
    description:
      '즐겁고 행복한 티타임을 선사하는 달콤하고 향긋한 오설록만의 특별한 블렌디드 티 선물 세트',
    provideBag: true,
    packageService: true,
    category_name: '티 세트',
    category_id: 1,
    descriptionImage: '/images/product-img1.png',
    token: 'dd',
    rating: '4.8',
  };

  const [data, setData] = useState(myData);
  const [handleSelectToggle, sethandleSelectToggle] = useState(false);
  const [handleSelectToggle2, sethandleSelectToggle2] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [originalPrice, setOriginalPrice] = useState(47000);
  const [productCount, setProductCount] = useState(1);
  const [packaging, setPackaging] = useState(0);
  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);

  // useEffect(() => {
  //   fetch(`http://10.58.52.215:8000/threads${id}`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json;charset=utf-8',
  //       authorization: localStorage.getItem('token'),
  //     },
  //   })
  //     .then(res => res.json())
  //     .then(result => {
  // setData(result)
  //       console.log(result);
  //       if (result.message === 'quarySuccess') {
  //         console.log(result.data);
  //       } else {
  //         alert('실패');
  //       }
  //     });
  // }, []);

  useEffect(() => {
    // fetch(`http://10.58.52.200:8000/products/1`, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json;charset=utf-8',
    //     authorization: localStorage.getItem('token'),
    //   },
    // }).then(() => setData(myData));
    // //   .then(res => {
    // //     if (res.status !== 200) {
    // //       alert('실패');
    // //     }
    // //     return res.json();
    // //   })
    // //   .then(result => {
    // //     setData(result.data[0]);
    // //     console.log(result.data[0]);
    // //   });
  }, []);
  localStorage.getItem('token');

  const copyToClipboard = () => {
    const currentURL = 'window.location.href';
    clipboardCopy(currentURL)
      .then(() => alert('링크가 복사되었습니다.'))
      .catch(err => console.error('복사 실패: ', err));
  };

  const selectToggle = () => {
    sethandleSelectToggle(!handleSelectToggle);
  };
  const selectToggle2 = () => {
    sethandleSelectToggle2(!handleSelectToggle2);
  };

  const handleCountPlus = () => {
    setProductCount(productCount + 1);
  };
  const handleCountMinus = () => {
    if (productCount > 1) {
      setProductCount(productCount - 1);
    }
  };
  const handleOptionClick = option => {
    setSelectedOption(option);
    sethandleSelectToggle2(false);
    if (option === '포장함') {
      setPackaging(2000);
    } else {
      setPackaging(0);
    }
  };

  const isPointReward = () => {
    const pointReward = originalPrice / 100;
    return pointReward;
  };

  const openModal = () => {
    setIsGiftModalOpen(true);
  };

  const closeModal = () => {
    setIsGiftModalOpen(false);
  };

  const openGiftModal = () => {
    setIsCartModalOpen(true);
  };

  const closeGiftModal = () => {
    setIsCartModalOpen(false);
  };

  const closeBuyModal = () => {
    setIsBuyModalOpen(false);
  };

  const openBuyModal = () => {
    setIsBuyModalOpen(true);
  };

  const goCart = () => {
    navigate('/Cart');
  };

  return (
    <div className="productDetail">
      <Nav />
      {data && (
        <div className="productDetailInner">
          <div className="orderWrapper">
            <div className="leftWrapper">
              <div className="productImgWrapper">
                <div className="productImg">
                  <p className="badge">추천</p>
                  <img
                    src={`${data.descriptionImage}`}
                    alt="제품상세 시크릿 티세트 이미지"
                  />
                </div>
                <div className="relationTo">
                  <ul>
                    <li className="toPoint">
                      <i>
                        <img src="/images/icon-coin.png" alt="적립 아이콘" />
                      </i>
                      {`뷰티포인트 ${isPointReward()}P 적립`}
                    </li>
                    <li className="toTeaPoint">
                      <i>
                        <img
                          src="/images/icon-delivery.png"
                          alt="무료배송 아이콘"
                        />
                      </i>
                      {`찻잎 ${isPointReward()}P 적립`}
                    </li>
                    <li className="toDeliveryFree">
                      <i>
                        <img
                          src="/images/icon-delivery.png"
                          alt="무료배송 아이콘"
                        />
                      </i>
                      3만원 이상 무료배송
                    </li>
                    <li
                      className={`toPackaging ${data.provideBag ? 'on' : ''}`}
                    >
                      <i>
                        <img
                          src="/images/icon-gift.png"
                          alt="포장가능 아이콘"
                        />
                      </i>
                      (유료)포장가능
                    </li>
                    <li
                      className={`toShoppingBag ${
                        data.packageService ? 'on' : ''
                      }`}
                    >
                      <i>
                        <img
                          src="/images/icon-bag.png"
                          alt="쇼핑백 동봉 아이콘"
                        />
                      </i>
                      쇼핑백 동봉
                    </li>
                  </ul>
                </div>
              </div>
              <div className="reviewWrapper">
                <ReviewGrade data={data} />
                <div className="goReview">
                  <button>
                    REVIEW <span className="reviewNum">12 &gt;</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="rightWrapper">
              <p className="category">
                <a className="mainCategory">티제품 &gt;</a>
                <a className="subCategory"> {data.category_name}</a>
              </p>
              <div className="productInfo">
                <h1 className="productName">{data?.name}</h1>
                <p className="origin">(원산지 : 하단 상품고시정보에 표시)</p>
                <p className="productStory">{data.description}</p>
              </div>
              <div className="iconAndPriceBox">
                <div className="btnBox">
                  <button className="btnUrl" onClick={copyToClipboard}>
                    <img src="/images/main/icon-url-on.png" alt="" />
                    <img
                      className="hoverNone"
                      src="/images/main/icon-url-off.png"
                      alt=""
                    />
                  </button>

                  <a
                    className="btnFacebook"
                    href="https://www.facebook.com/?locale=ko_KR"
                  >
                    <img src="/images/main/icon-facebook-on.png" alt="" />
                    <img
                      className="hoverNone"
                      src="/images/main/icon-facebook-off.png"
                      alt=""
                    />
                  </a>

                  <button className="btnLike">
                    <img src="/images/main/icon-like-on.png" alt="" />
                    <img
                      className="hoverNone"
                      src="/images/main/icon-like-off.png"
                      alt=""
                    />
                  </button>
                </div>
                <p className="productPriceInfo">
                  <span className="price">
                    <span>
                      {data ? data.price.toLocaleString('ko-KR') : null}
                    </span>
                    원
                  </span>
                  <span className="discount"> {data.discount_rate}%</span>
                  <span className="lineText">{data.originalPrice}</span>
                </p>
              </div>
              <div className="productSeletWrapper">
                {/* <div className="additionalSelect">
                <div class="selected" onClick={selectToggle}>
                  <div className="selectedValue">추가상품 선택</div>
                  <div className="selectArrow">
                    <img
                      src="/images/select-arrow.png"
                      alt="셀렉트 박스 화살표 아이콘"
                    ></img>
                  </div>
                </div>
                <ul className={handleSelectToggle ? 'on' : ''}>
                  <li className="option">
                    <p className="optionText">녹차 밀크 스프레드 세트</p>
                    <p className="optionPrice">
                      <span className="lineText">20,000원</span>
                      <strong>
                        <span>&nbsp;&nbsp;17,000</span>원
                      </strong>
                      <span className="discount"> 15%</span>
                    </p>
                  </li>
                  <li className="option">
                    <p className="optionText">신 오브 제주</p>
                    <p className="optionPrice">
                      <span className="lineText">27,000원</span>
                      <strong>
                        <span>&nbsp;20,250</span>원
                      </strong>
                      <span className="discount"> 25%</span>
                    </p>
                  </li>
                </ul>
              </div> */}
                <div className="buyNumWrapper">
                  <div className="buyNumCount">
                    <span>구매수량</span>
                    <p className="countButton">
                      <button className="minus" onClick={handleCountMinus}>
                        -
                      </button>
                      <span>{productCount}</span>
                      <button className="plus" onClick={handleCountPlus}>
                        +
                      </button>
                    </p>
                  </div>
                  <div
                    className={`packagingSelect ${
                      data.packageService ? 'on' : ''
                    }`}
                  >
                    <div className="selected" onClick={selectToggle2}>
                      <div className="selectedValue">
                        {selectedOption || '포장가능 (+2000)'}
                      </div>
                      <div className="selectArrow">
                        <img
                          src="/images/select-arrow.png"
                          alt="아래 화살표"
                        ></img>
                      </div>
                    </div>
                    <ul className={handleSelectToggle2 ? 'on' : ''}>
                      <li
                        className={`option ${
                          selectedOption === '포장함' ? 'selected' : ''
                        }`}
                        onClick={() => handleOptionClick('포장함')}
                      >
                        포장함
                      </li>
                      <li
                        className={`option ${
                          selectedOption === '포장안함' ? 'selected' : ''
                        }`}
                        onClick={() => handleOptionClick('포장안함')}
                      >
                        포장안함
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="priceSum">
                <p className="sumText">상품금액 합계</p>
                <p className="sum">
                  <span>
                    {(data.price * productCount + packaging).toLocaleString(
                      'ko-KR',
                    )}
                    원
                  </span>
                </p>
                <span
                  className={`freeDelivery ${
                    data.price * productCount + packaging >= 30000 ? 'on' : ''
                  }`}
                >
                  무료배송
                </span>
              </div>
              <div className="btnDecision">
                <button
                  className="btnGift"
                  onClick={data.token ? { goCart } : { openModal }}
                >
                  선물하기
                </button>
                <button className="btnBasket" onClick={openGiftModal}>
                  장바구니
                </button>
                <button
                  className="btnBuy"
                  onClick={data.token ? { goCart } : { openBuyModal }}
                >
                  바로구매
                </button>
              </div>
            </div>
          </div>
          <div className="contentsWrapper">
            <div className="contentsNav">
              <ul>
                <li>
                  <a href="#">상품상세</a>
                </li>
                <li>
                  <a href="#">
                    고객리뷰 <span>492개</span>
                  </a>
                </li>
                <li>
                  <a href="#">상품고시정보</a>
                </li>
              </ul>
            </div>
            <div className="contentsImg">
              <img src="/images/Detail.png" alt="상품 디테일 이미지" />
            </div>
          </div>
          {isGiftModalOpen && (
            <Modal>
              <button className="btnBack" onClick={closeModal}>
                <img src="/images/login-img1.png" alt="닫기 버튼" />
              </button>
              <p>선물하기는 로그인 후 이용가능합니다.</p>
              <button className="btnOk" onClick={() => navigate('/Login')}>
                확인
              </button>
            </Modal>
          )}
          {isCartModalOpen && (
            <Modal>
              <button className="btnBack" onClick={closeGiftModal}>
                <img src="/images/login-img1.png" alt="닫기 버튼" />
              </button>
              <p>장바구니로 이동하시겠습니까?</p>
              <div className="modalBtnWrapper">
                <button className="btnOk" onClick={closeGiftModal}>
                  취소
                </button>
                <button className="btnClose" onClick={goCart}>
                  확인
                </button>
              </div>
            </Modal>
          )}
          {isBuyModalOpen && (
            <Modal>
              <button className="btnBack" onClick={closeBuyModal}>
                <img src="/images/login-img1.png" alt="닫기 버튼" />
              </button>
              <p>
                회원으로 구매하시면
                <br />
                할인 및 포인트 적립, 구매 금액별 사은품 등의
                <br />
                혜택을 받으실 수 있습니다.
              </p>
              <div className="modalBtnWrapper">
                <button className="btnOk" onClick={() => navigate('/Login')}>
                  로그인
                </button>
                <button
                  className="btnClose"
                  onClick={() => navigate('/SignUp')}
                >
                  회원가입
                </button>
              </div>
              <button className="btnNonMembers">비회원으로 구매하기</button>
            </Modal>
          )}
        </div>
      )}
    </div>
  );
};
export default ProductDetail;
