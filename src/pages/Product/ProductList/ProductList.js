import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Link } from 'react-scroll';
import ProductListContainer from '../../../components/ProductListContainer/ProductListContainer';
import WhiteFilterButton from '../../../components/WhiteFilterButton/WhiteFilterButton';
import GreenFilterButton from '../../../components/GreenFilterButton/GreenFilterButton';
import Pagination from '../../../components/Pagination/Pagination';
import BASE_API from '../../../config';
import './ProductList.scss';

const ProductList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [dataList, setDataList] = useState({});
  const offset = searchParams.get('offset');
  const limit = searchParams.get('limit');
  const category = searchParams.get('category');
  const sort = searchParams.get('sort');
  const product_type = searchParams.get('product_type');

  const getList = () => {
    const fileName =
      offset !== '12' ? 'products1Data.json' : 'products2Data.json';

    const response = fetch(`${BASE_API}/products/products/${fileName}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: window.sessionStorage.getItem('token'),
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
  if (category === 'tea') {
    categoryTitle = '티 제품';
  } else if (category === '1') {
    categoryTitle = '티 세트';
  } else if (category === '2') {
    categoryTitle = '명차';
  } else if (category === '3') {
    categoryTitle = '녹차/말차';
  } else if (category === '4') {
    categoryTitle = '발효차/홍차';
  } else if (category === 'teafood') {
    categoryTitle = '티푸드';
  } else if (category === '5') {
    categoryTitle = '과자/초콜릿';
  } else if (category === '6') {
    categoryTitle = '베이커리';
  } else if (category === '7') {
    categoryTitle = '아이스크림';
  } else {
    categoryTitle = '전체 상품';
  }

  //////////////////////////// sort 필터
  const goToSort = param => {
    if (!param) {
      searchParams.delete('sort');
    } else {
      searchParams.set('sort', param);
    }
    setSearchParams(searchParams);
  };

  ////////////////////product_type 필터
  const goToProductType = param => {
    let product_type_box = [];
    let product_type_result = '';
    // 전체 누르기
    if (!param) {
      searchParams.delete('product_type');
      setSearchParams(searchParams);
      return;
    }

    if (!product_type) {
      searchParams.set('product_type', param);
      setSearchParams(searchParams);
      return;
    }

    // product_type_box안에 기존 요소 넣기
    for (let i = 0; i < product_type.length; i++) {
      if (product_type.substring(i, i + 1) === ',') {
        continue;
      } else {
        product_type_box.push(product_type.substring(i, i + 1));
      }
    }

    // box에서 param과 같으면 삭제, 아니면 추가
    if (product_type_box.includes(param)) {
      product_type_box = product_type_box.filter(element => element !== param);
      if (product_type_box.length === 0) {
        searchParams.delete('product_type');
        setSearchParams(searchParams);
        return;
      }
    } else {
      product_type_box.push(param);
    }

    for (let i = 0; i < product_type_box.length; i++) {
      if (product_type_result === '') {
        product_type_result = product_type_result + product_type_box[i];
      } else {
        product_type_result = product_type_result + ',' + product_type_box[i];
      }
    }
    searchParams.set('product_type', product_type_result);
    setSearchParams(searchParams);
  };

  /////////////////////////카테고리
  const goToCategory = param => {
    searchParams.delete('category');
    searchParams.delete('sort');
    searchParams.delete('product_type');
    searchParams.delete('limit');
    searchParams.delete('offset');
    searchParams.set('category', param);
    if (!param) {
      searchParams.delete('category');
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="productList">
      <div className="bannerBox">
        <h2 className="bannerName">{categoryTitle}</h2>
        <img src={process.env.PUBLIC_URL + categoryImg} />
      </div>
      <div className="container">
        <div className="containerInside">
          <div className="productListBox">
            <div className="leftMenu">
              <div
                className={
                  !category
                    ? 'leftMenuTitle clicked'
                    : 'leftMenuTitle unclicked'
                }
                onClick={() => {
                  goToCategory();
                }}
              >
                제품
              </div>
              <div className="leftMenuCategory">
                <div
                  className={
                    ['tea', '1', '2', '3', '4'].includes(category)
                      ? 'leftMenuTeaProduct leftMenuTeaBtn clicked'
                      : 'leftMenuTeaProduct leftMenuTeaBtn unclicked'
                  }
                  onClick={() => {
                    goToCategory('tea');
                  }}
                >
                  티 제품
                  <div className="leftMenuTeaSubBox">
                    {TEA_PRODUCT_LIST.map(({ id, text, category }) => (
                      <div
                        className="leftMenuTeaSubContent"
                        onClick={e => {
                          e.stopPropagation();
                          goToCategory(category);
                        }}
                        key={id}
                      >
                        <div
                          className={
                            searchParams.get('category') === category
                              ? 'clicked'
                              : 'unclicked'
                          }
                        >
                          {text}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div
                  className={
                    ['teafood', '5', '6', '7'].includes(category)
                      ? 'leftMenuTeaFood leftMenuTeaBtn clicked'
                      : 'leftMenuTeaFood leftMenuTeaBtn unclicked'
                  }
                  onClick={() => goToCategory('teafood')}
                >
                  티푸드
                  <div className="leftMenuTeaSubBox">
                    {TEA_FOOD_LIST.map(({ id, text, category }) => (
                      <div
                        className="leftMenuTeaSubContent"
                        onClick={e => {
                          e.stopPropagation();
                          goToCategory(category);
                        }}
                        key={id}
                      >
                        <div
                          className={
                            searchParams.get('category') === category
                              ? 'clicked'
                              : 'unclicked'
                          }
                        >
                          {text}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="rightMenu">
              <div className="rigthMenuTitleBox">
                <div className="rightMenuTitle">{categoryTitle}</div>
                <div className="rightMenuFilterBox">
                  {SORTING_LIST.map(({ id, text, sort }) => (
                    <WhiteFilterButton
                      key={id}
                      text={text}
                      isSelected={searchParams.get('sort') === sort}
                      onClick={() => goToSort(sort)}
                    />
                  ))}
                </div>
              </div>
              <div className="rightMenuInfoBox">
                <div className="rightMenuInfo">
                  총&nbsp;
                  <span className="rigthMenuInfoNumber">
                    {dataList.productCount}
                  </span>
                  개의 상품이 있습니다.
                </div>
                {!category || ['1', '2', '3', '4', 'tea'].includes(category) ? (
                  <div className="rightMenuTeaFilterBox">
                    {PRODUCT_TYPE_LIST.map(({ id, text, productType }) => (
                      <GreenFilterButton
                        key={id}
                        text={text}
                        isSelected={searchParams
                          .get('product_type')
                          ?.includes(productType)}
                        onClick={() => goToProductType(productType)}
                      />
                    ))}
                  </div>
                ) : null}
              </div>
              <ProductListContainer
                id="refContainer"
                data={dataList.data}
                onClick={postCart}
              />
              <Pagination
                productCount={dataList.productCount}
                onClick={getList}
                offset={offset}
                pageLength="5"
                pageProductNumber="12"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductList;

const TEA_PRODUCT_LIST = [
  { id: 1, text: '전체상품', category: 'tea' },
  { id: 2, text: '티세트', category: '1' },
  { id: 3, text: '명차', category: '2' },
  { id: 4, text: '녹차/말차', category: '3' },
  { id: 5, text: '발효차/홍차', category: '4' },
];

const TEA_FOOD_LIST = [
  { id: 1, text: '전체상품', category: 'teafood' },
  { id: 2, text: '과자/초콜릿', category: '5' },
  { id: 3, text: '베이커리', category: '6' },
  { id: 4, text: '아이스크림', category: '7' },
];

const SORTING_LIST = [
  { id: 1, text: '추천순', sort: null },
  { id: 2, text: '판매순', sort: 'review' },
  { id: 3, text: '신상품순', sort: 'created_at' },
  { id: 4, text: '높은 가격순', sort: 'price' },
  { id: 5, text: '낮은 가격순', sort: '-price' },
];

const PRODUCT_TYPE_LIST = [
  { id: 1, text: '전체', productType: undefined },
  { id: 2, text: '잎차', productType: '1' },
  { id: 3, text: '피라미드', productType: '2' },
  { id: 4, text: '티백', productType: '3' },
  { id: 5, text: '파우더', productType: '4' },
];
