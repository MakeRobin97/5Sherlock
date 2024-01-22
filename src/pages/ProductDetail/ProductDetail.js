import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import Modal from '../../components/Modal/Modal';
import ReviewGrade from '../../components/ReviewGrade/ReviewGrade';
import ProductReview from '../../components/ProductReview/ProductReview';
import BASE_API from '../../config';
import './ProductDetail.scss';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [review, setReview] = useState({});
  const [handleSelectToggle, sethandleSelectToggle] = useState(false);
  const [handleSelectToggle2, sethandleSelectToggle2] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [productCount, setProductCount] = useState(1);
  const [packaging, setPackaging] = useState(0);
  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const offset = searchParams.get('offset');

  const getDetailList = () => {
    fetch(`${BASE_API}/products/details/detail${id}Data.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: window.localStorage.getItem('token'),
      },
    })
      .then(res => res.json())
      .then(result => {
        setData(result.data);
      });
  };

  const getReview = () => {
    fetch(`${BASE_API}/products/details/review1Data.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: localStorage.getItem('token'),
      },
    })
      .then(res => res.json())
      .then(result => {
        setReview(result.data);
      });
  };
  useEffect(() => {
    getDetailList();
    getReview();
  }, []);

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

  const closeGiftModal = () => {
    setIsCartModalOpen(false);
  };

  const postCart = () => {
    if (!window.localStorage.getItem('token')) {
      alert('로그인을 해주세요.');
      return;
    }

    const cartListData = {
      id: data.id,
      name: data.name,
      img: data.img,
      price: data.price,
      quantity: productCount,
    };

    const storedCartList =
      JSON.parse(window.localStorage.getItem('localCartList')) || [];

    const isDuplicate = storedCartList.some(
      item => item.id === cartListData.id,
    );

    if (!isDuplicate) {
      storedCartList.push(cartListData);

      window.localStorage.setItem(
        'localCartList',
        JSON.stringify(storedCartList),
      );
      alert('장바구니에 담겼습니다!');
      window.location.reload();
    } else {
      alert('이미 담긴 상품이에요');
    }
  };

  // const postCart = async id => {
  //   if (!window.localStorage.getItem('token')) {
  //     alert('로그인을 해주세요.');
  //     return;
  //   }

  //   const response = await fetch(`${BASE_API}/carts`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       authorization: window.localStorage.getItem('token'),
  //     },
  //     body: JSON.stringify({ productId: id, quantity: 1 }),
  //   });

  //   if (response.ok) {
  //     window.location.reload();
  //   }
  // };

  const goCart = () => {
    navigate('/cart');
  };

  const goLogin = () => {
    navigate('/login');
  };

  const order = () => {
    // const items = [{ id: data.id, quantity: productCount }];

    window.localStorage.setItem('localOrderList', JSON.stringify([data]));
    navigate('/order');
  };

  if (Object.keys(data).length === 0) return null;
  console.log(data);

  const goGift = () => {
    window.localStorage.setItem('localGiftList', JSON.stringify([data]));
    navigate('/gift');
  };

  return (
    <div className="productDetail">
      <div className="productDetailInner">
        <div className="orderWrapper">
          <div className="leftWrapper">
            <div className="productImgWrapper">
              <div className="productImg">
                <p className="badge">{`${
                  data.quantity === 0
                    ? '일시품절'
                    : '' && data.isNew
                    ? '신제품'
                    : ''
                }`}</p>
                <img src={`${data.img}`} alt="제품상세 시크릿 티세트 이미지" />
              </div>
              <div className="relationTo">
                <ul>
                  <li className="toPoint">
                    <i>
                      <img src="/images/icon-coin.png" alt="적립 아이콘" />
                    </i>
                    {`뷰티포인트 ${data.originalPrice / 100}P 적립`}
                  </li>
                  <li className="toTeaPoint">
                    <i>
                      <img
                        src="/images/icon-delivery.png"
                        alt="무료배송 아이콘"
                      />
                    </i>
                    {`찻잎 ${data.originalPrice / 100}P 적립`}
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
                  <li className={`toPackaging ${data.provideBag ? 'on' : ''}`}>
                    <i>
                      <img src="/images/icon-gift.png" alt="포장가능 아이콘" />
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
              <ReviewGrade data={review.averageRating} />
              <div className="goReview">
                <button>
                  REVIEW{' '}
                  <span className="reviewNum">{review.reviewsCount} &gt;</span>
                </button>
              </div>
            </div>
          </div>
          <div className="rightWrapper">
            <p className="category">
              <a className="mainCategory">티제품 &gt;</a>
              <a className="subCategory"> {data.categoryName}</a>
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
                    {Object.keys(data).length !== 0
                      ? data.price.toLocaleString('ko-KR')
                      : null}
                    원
                  </span>
                </span>

                {data.discountRate && (
                  <>
                    <span className="discount"> {data.discountRate}%</span>
                    <span className="lineText">{data.originalPrice}</span>
                  </>
                )}
              </p>
            </div>
            <div className="productSeletWrapper">
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
                  {Object.keys(data).length !== 0
                    ? (data.price * productCount + packaging).toLocaleString(
                        'ko-KR',
                      )
                    : null}
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
              <button className="btnGift" onClick={goGift}>
                선물하기
              </button>
              <button className="btnBasket" onClick={postCart}>
                장바구니
              </button>
              <button
                className="btnBuy"
                onClick={
                  localStorage.getItem('token')
                    ? order
                    : () => setIsBuyModalOpen(true)
                }
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
            <button
              className="btnBack"
              onClick={() => setIsGiftModalOpen(false)}
            >
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
            <p>
              장바구니에 담겼습니다! <br />
              장바구니로 이동하시겠습니까?
            </p>
            <div className="modalBtnWrapper">
              <button
                className="btnOk"
                onClick={() => {
                  closeGiftModal();
                  postCart(data.id);
                }}
              >
                취소
              </button>
              <button
                className="btnClose"
                onClick={() => {
                  postCart(data.id);
                  // console.log(`데이터아이디: ${data.id}`);
                  goCart();
                }}
              >
                확인
              </button>
            </div>
          </Modal>
        )}
        {isBuyModalOpen && (
          <Modal>
            <button
              className="btnBack"
              onClick={() => setIsBuyModalOpen(false)}
            >
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
              <button className="btnClose" onClick={() => navigate('/SignUp')}>
                회원가입
              </button>
            </div>
            <button className="btnNonMembers">비회원으로 구매하기</button>
          </Modal>
        )}
      </div>
      <ProductReview
        reviewsList={review.reviewsList}
        reviewsCount={review.reviewsCount}
        averageRating={review.averageRating}
        onClick={getReview}
        offset={offset}
      />
    </div>
  );
};
export default ProductDetail;
