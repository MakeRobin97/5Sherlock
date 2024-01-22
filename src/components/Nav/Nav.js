import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BASE_API from '../../config';
import './Nav.scss';

const Nav = () => {
  const navigate = useNavigate();
  const [cartNumber, setCartNumber] = useState(0);
  const [openCheck, setOpenCheck] = useState('unclicked');

  const getCartCount = () => {
    if (!window.localStorage.getItem('localCartList')) {
      setCartNumber(0);
    } else {
      const result = window.localStorage.getItem('localCartList');
      setCartNumber(JSON.parse(result).length);
    }
  };

  // const getCartCount = () => {
  //   fetch(`${BASE_API}/carts/count`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       authorization: window.localStorage.getItem('token'),
  //     },
  //   })
  //     .then(res => res.json())
  //     .then(result => {
  //       setCartNumber(result.cartItemCount);
  //     });
  // };

  useEffect(() => {
    getCartCount();
  }, []);

  const clickCheck = () => {
    if (openCheck === 'clicked') {
      setOpenCheck('unclicked');
    } else {
      setOpenCheck('clicked');
    }
  };

  // 주계산법
  const currentDate = new Date();

  // 현재 날짜의 년도와 달을 가져옵니다.
  const currentYear = currentDate.getFullYear() - 2000;

  const currentMonth = currentDate.getMonth() + 1;

  const currentDay = currentDate.getDate();

  const goToFunction = param => {
    if (param === '/cart' && !isLoggedIn) {
      alert('로그인을 해주세요');
      return;
    }
    navigate(param);
  };

  const logOut = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  const isLoggedIn = localStorage.getItem('token');

  return (
    <div className="nav">
      <div className="navUp">
        <div className="wrapper">
          <div className="navInside">
            <div className={`searchScreenBlack ${openCheck}`}></div>
            <div className={`searchScreen ${openCheck}`}>
              <div className="searchScreenContainer">
                <div className="exit" onClick={clickCheck}>
                  <img src={process.env.PUBLIC_URL + '/images/exit.svg'} />
                </div>
                <div className="hotSearch searchScreenComponent">
                  <div className="hotSearchTitleBar">
                    <div className="hotSearchTitle">인기 검색어</div>
                    <div className="day">{`${currentYear}.${currentMonth}.${currentDay} 기준`}</div>
                  </div>

                  <div className="hotSearchRatings">
                    <div className="hotSearchRating">
                      <div className="ratingGroup">
                        <div className="rating">1</div>
                        <div className="ratingTitle">루이보스</div>
                      </div>
                      <div className="ratingChange">Up</div>
                    </div>

                    <div className="hotSearchRating">
                      <div className="ratingGroup">
                        <div className="rating">2</div>
                        <div className="ratingTitle">떡보의 하루</div>
                      </div>
                      <div className="ratingChange">Down</div>
                    </div>

                    <div className="hotSearchRating">
                      <div className="ratingGroup">
                        <div className="rating">3</div>
                        <div className="ratingTitle">부산밀면</div>
                      </div>
                      <div className="ratingChange">Up</div>
                    </div>

                    <div className="hotSearchRating">
                      <div className="ratingGroup">
                        <div className="rating">4</div>
                        <div className="ratingTitle">게토레이</div>
                      </div>
                      <div className="ratingChange">Up</div>
                    </div>

                    <div className="hotSearchRating">
                      <div className="ratingGroup">
                        <div className="rating">5</div>
                        <div className="ratingTitle">파워에이드</div>
                      </div>
                      <div className="ratingChange">Down</div>
                    </div>
                  </div>
                </div>
                <div className="recentSearch searchScreenComponent">
                  <div className="recentSearchTitleBar">
                    <div className="recentSearchTitle">최근 검색어</div>
                    <div className="day">{`${currentYear}.${currentMonth}.${currentDay} 기준`}</div>
                  </div>
                  <div className="recentSearchInf">최근 검색어가 없습니다.</div>
                </div>
                <div className="nothingSearch searchScreenComponent"></div>
              </div>
            </div>
            <div className="leftNavMenu">
              <div
                className="navLogo"
                onClick={() => {
                  goToFunction('/');
                }}
              >
                <img src={process.env.PUBLIC_URL + '/images/logo.png'} />
              </div>
              <div className="navMenu">
                <ul>
                  <li
                    className="navList"
                    onClick={() => {
                      goToFunction('/product-list');
                    }}
                  >
                    <div className="productNav firstNav">
                      제품
                      <div className="openNavBack" />
                      <div className="openNav">
                        <div className="openNavInside">
                          <div className="openNavContainer">
                            <div className="openNavBox">
                              <div
                                className="openNavTitle"
                                onClick={e => {
                                  e.stopPropagation();
                                  goToFunction('/best-product-list');
                                }}
                              >
                                베스트
                                <div
                                  className="openNavContent"
                                  onClick={e => {
                                    e.stopPropagation();
                                    goToFunction('/best-product-list');
                                  }}
                                >
                                  위클리 베스트
                                </div>
                                <div
                                  className="openNavContent"
                                  onClick={e => {
                                    e.stopPropagation();
                                    goToFunction(
                                      '/best-product-list?category=1',
                                    );
                                  }}
                                >
                                  베스트
                                </div>
                              </div>
                            </div>
                            <div className="openNavBox">
                              <div
                                className="openNavTitle"
                                onClick={e => {
                                  e.stopPropagation();
                                  goToFunction('/product-list');
                                }}
                              >
                                티 제품{' '}
                                <div
                                  className="openNavContent"
                                  onClick={e => {
                                    e.stopPropagation();
                                    goToFunction('/product-list?category=1');
                                  }}
                                >
                                  티 세트
                                </div>
                                <div
                                  className="openNavContent"
                                  onClick={e => {
                                    e.stopPropagation();
                                    goToFunction('/product-list?category=2');
                                  }}
                                >
                                  명차
                                </div>
                                <div
                                  className="openNavContent"
                                  onClick={e => {
                                    e.stopPropagation();
                                    goToFunction('/product-list?category=3');
                                  }}
                                >
                                  녹차/말차
                                </div>
                                <div
                                  className="openNavContent"
                                  onClick={e => {
                                    e.stopPropagation();
                                    goToFunction('/product-list?category=4');
                                  }}
                                >
                                  발효차/홍차
                                </div>
                              </div>
                            </div>
                            <div className="openNavBox">
                              <div
                                className="openNavTitle"
                                onClick={e => {
                                  e.stopPropagation();
                                  goToFunction(
                                    '/product-list?category=teafood',
                                  );
                                }}
                              >
                                티푸드{' '}
                                <div
                                  className="openNavContent"
                                  onClick={e => {
                                    e.stopPropagation();
                                    goToFunction('/product-list?category=5');
                                  }}
                                >
                                  과자/초콜릿
                                </div>
                                <div
                                  className="openNavContent"
                                  onClick={e => {
                                    e.stopPropagation();
                                    goToFunction('/product-list?category=6');
                                  }}
                                >
                                  베이커리
                                </div>
                                <div
                                  className="openNavContent"
                                  onClick={e => {
                                    e.stopPropagation();
                                    goToFunction('/product-list?category=7');
                                  }}
                                >
                                  아이스크림
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="openNavPic">
                            <img
                              src={process.env.PUBLIC_URL + '/images/7.jpg'}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="navList">
                    <div className="presentNav firstNav">선물추천</div>
                  </li>
                  <li className="navList">
                    <div className="dadaNav firstNav">다다일상</div>
                  </li>
                  <li className="navList">
                    <div className="brandNav firstNav">브랜드</div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="navIcon">
              {openCheck === 'unclicked' ? (
                <div className="navIconSearch">
                  <img
                    src={process.env.PUBLIC_URL + '/images/search.svg'}
                    onClick={clickCheck}
                  />
                </div>
              ) : (
                <div className="navIconSearch">
                  <img src={process.env.PUBLIC_URL + '/images/search.svg'} />
                  <input
                    type="text"
                    className="searchInput"
                    placeholder="검색어를 입력해주세요."
                  />
                </div>
              )}

              {isLoggedIn && (
                <div
                  className="navIconCart"
                  onClick={() => {
                    goToFunction('/cart');
                  }}
                >
                  <img src={process.env.PUBLIC_URL + '/images/cart.svg'} />
                  <div className="navIconCartNumber">{cartNumber}</div>
                </div>
              )}

              <div className="navIconMore">
                <img
                  className="moreIcon"
                  src={process.env.PUBLIC_URL + '/images/more.svg'}
                />
                <div className="moreBox">
                  <div className="moreBoxContent">고객센터</div>
                  <div className="moreBoxContent">매장찾기</div>
                  <div className="moreBoxContent">주문배송조회</div>
                  <div className="moreBoxContent">예약조회</div>
                  <div className="moreBoxContent">뷰티포인트 추후적립</div>
                </div>
              </div>

              {isLoggedIn ? (
                <div className="navIconLogIn" onClick={logOut}>
                  로그아웃
                </div>
              ) : (
                <div
                  className="navIconLogIn"
                  onClick={() => {
                    goToFunction('/login');
                  }}
                >
                  로그인
                  <div className="logInBox">
                    <div
                      className="logInBoxContent"
                      onClick={e => {
                        e.stopPropagation();
                        goToFunction('/login');
                      }}
                    >
                      로그인
                    </div>
                    <div
                      className="logInBoxContent"
                      onClick={e => {
                        e.stopPropagation();
                        goToFunction('/signup');
                      }}
                    >
                      회원가입
                    </div>
                  </div>
                </div>
              )}

              <div className="navIconLanguage">
                KOREAN ▼
                <div className="languageBox">
                  <div className="languageBoxContent">한국어</div>
                  <div className="languageBoxContent">English</div>
                  <div className="languageBoxContent">中文</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="navDown" />
    </div>
  );
};
export default Nav;
