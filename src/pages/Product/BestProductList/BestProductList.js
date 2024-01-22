import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import GreenFilterButton from '../../../components/GreenFilterButton/GreenFilterButton';
import { useSearchParams } from 'react-router-dom';
import BestProductListContainer from '../../../components/BestProductListContainer/BestProductListContainer';
import BASE_API from '../../../config';
import './BestProductList.scss';

const BestProductList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('closed');
  const [filterResult, setFilterResult] = useState('판매순');
  const [searchParams, setSearchParams] = useSearchParams();
  const [dataList, setDataList] = useState([]);
  const category = searchParams.get('category');
  const sort = searchParams.get('sort');

  const getList = () => {
    const fileName =
      category == '1'
        ? 'bestData.json'
        : sort != 'review'
        ? 'weeklyBestData.json'
        : 'weeklyBestDataReview.json';

    fetch(`${BASE_API}/products/bestProducts/${fileName}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: window.localStorage.getItem('token'),
      },
    })
      .then(res => res.json())
      .then(data => {
        setDataList(data);
      });
  };

  const postCart = data => {
    if (!window.localStorage.getItem('token')) {
      alert('로그인을 해주세요.');
      return;
    }

    const cartListData = {
      id: data.id,
      name: data.name,
      img: data.productImg[1].url,
      price: data.price,
      quantity: 1,
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

  //   if (window.confirm('장바구니에 담으시겠습니까?')) {
  //     const response = await fetch(`${BASE_API}/carts`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         authorization: window.localStorage.getItem('token'),
  //       },
  //       body: JSON.stringify({ productId: id, quantity: 1 }),
  //     });

  //     if (response.ok) {
  //       window.location.reload();
  //     }
  //   }
  // };

  useEffect(() => {
    getList();
  }, [searchParams]);

  // 배너 Img 설명
  let categoryImg;

  if (category) {
    categoryImg = `/images/${category}.jpg`;
  } else {
    categoryImg = '/images/teatotal.jpg';
  }

  // 타이틀 설명
  let categoryTitle;
  let weeklyBestFilter = 'unclicked';
  let bestFilter = 'unclicked';
  if (category === '1') {
    categoryTitle = '베스트';
    bestFilter = 'clicked';
  } else {
    categoryTitle = '위클리 베스트';
    weeklyBestFilter = 'clicked';
  }

  // 카테고리 함수
  const goToBestCategory = param => {
    if (!param) {
      searchParams.delete('category');
      setSearchParams(searchParams);
      return;
    }
    searchParams.delete('sort');
    setFilterResult('판매순');
    searchParams.set('category', param);
    setSearchParams(searchParams);
  };

  // 주계산법
  const currentDate = new Date();

  // 현재 날짜의 년도와 달을 가져옵니다.
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  // Date 객체를 이용하여 현재 주를 계산합니다.
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const firstDayOfWeek = firstDayOfMonth.getDay(); // 0 (일요일)부터 6 (토요일)까지의 값
  const currentDay = currentDate.getDate();

  // 현재 주를 계산합니다.
  const currentWeek = Math.ceil((currentDay + firstDayOfWeek) / 7);

  const openFunction = () => {
    if (filter === 'open') {
      setFilter('closed');
    } else {
      setFilter('open');
    }
  };

  const filterBox = param => {
    setFilterResult(param);
    if (param === '리뷰순') {
      searchParams.set('sort', 'review');
      setSearchParams(searchParams);
    } else {
      searchParams.delete('sort');
      setSearchParams(searchParams);
    }
  };

  useEffect(() => {
    const sortChange = () => {
      if (sort) {
        setFilterResult('리뷰순');
      }
    };
    sortChange();
  }, []);

  const CATEGORY_LIST = [
    { id: 1, text: '위클리 베스트', category: null },
    { id: 2, text: '베스트', category: '1' },
  ];

  return (
    <div className="bestProductList">
      <div className="bannerBox">
        <h2 className="bannerName">{categoryTitle}</h2>
        <img src={process.env.PUBLIC_URL + categoryImg} />
      </div>
      <div className="container">
        <div className="containerInside">
          <div className="categoryBox">
            {CATEGORY_LIST.map(({ id, text, category }) => (
              <GreenFilterButton
                key={id}
                text={text}
                isSelected={searchParams.get('category') === category}
                onClick={() => goToBestCategory(category)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="silverLine" />
      <div className="container">
        <div className="containerInside">
          <div className="bestProductListTitleBox">
            {!category ? (
              <>
                <div className="weekInf">{`${currentYear}년 ${
                  currentMonth + 1
                }월 ${currentWeek}째주`}</div>
                <div
                  onClick={openFunction}
                  className={`selectOption ${filter}`}
                >
                  <div className="selectTitle">
                    {filterResult}&nbsp;
                    <img src={process.env.PUBLIC_URL + '/images/up.png'} />
                  </div>
                  <ul className={`selectOptionList ${filter}`}>
                    <li
                      onClick={() => {
                        filterBox('판매순');
                      }}
                    >
                      판매순
                    </li>
                    <li
                      onClick={() => {
                        filterBox('리뷰순');
                      }}
                    >
                      리뷰순
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <div className="inf">
                오설록에서 많이 선물된 선물세트를 모았어요.
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="container listContainer">
        <div className="containerInside">
          {Object.keys(dataList).length > 0 ? (
            <BestProductListContainer data={dataList} onClick={postCart} />
          ) : (
            <div className="noDataMessage">데이터가 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
};
export default BestProductList;
