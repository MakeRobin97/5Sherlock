import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BASE_API from '../../config';
import './ProductImgBox.scss';

const ProductImgBox = ({ data, children, onClick }) => {
  const navigate = useNavigate();
  const [productImg, setProductImg] = useState(data.productImg[0].url);
  const goToDetail = id => {
    navigate(`/product-detail/${id}`);
  };
  const showSecondPage = () => {
    setProductImg(data.productImg[1].url);
  };
  const showFirstPage = () => {
    setProductImg(data.productImg[0].url);
  };

  return (
    <div
      className="productImgBox"
      onClick={() => {
        goToDetail(data.id);
      }}
      onMouseEnter={showSecondPage}
      onMouseLeave={showFirstPage}
    >
      <img className="pic" src={productImg} alt="cardImage" />

      <div
        className="picCartBox"
        onClick={e => {
          e.stopPropagation();
          onClick(data);
        }}
      >
        <img
          className="picCart"
          src={process.env.PUBLIC_URL + '/images/shopping-cart.png'}
          alt="cardImage"
        />
      </div>
      {children}
    </div>
  );
};
export default ProductImgBox;
