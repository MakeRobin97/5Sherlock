import React, { useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './BestSlide.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProductImgBox from '../../components/ProductImgBox/ProductImgBox';
const BestSlide = ({ data, onClick }) => {
  const slickRef = useRef(null);
  const previous = useCallback(() => slickRef.current.slickPrev(), []);
  const next = useCallback(() => slickRef.current.slickNext(), []);

  const navigate = useNavigate();
  console.log(data);
  const settings = {
    arrows: true,
    dots: false, // 페이지 인디케이터 표시 여부
    infinite: true, // 무한 루프
    speed: 500, // 애니메이션 속도
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 5, // 한 번에 표시할 슬라이드 수
    slidesToScroll: 1, // 한 번에 스크롤할 슬라이드 수
  };

  const goToDetail = id => {
    navigate(`/product-detail/${id}`);
  };

  return (
    <div className="back">
      <img
        className="leftBtn"
        src="./images/leftArrow.png"
        alt="leftBtn"
        onClick={previous}
      />
      <img
        className="rightBtn"
        src="./images/leftArrow.png"
        alt="rightBtn"
        onClick={next}
      />
      <Slider {...settings} ref={slickRef}>
        {data?.map((slide, index) => (
          <li>
            <div className="box">
              <ProductImgBox data={slide} onClick={onClick} />
              <div
                className="productInfo"
                onClick={() => {
                  goToDetail(slide.id);
                }}
              >
                <p className="bestName">{slide.name}</p>
                <span className="originalPrice">{slide.originalPrice}원</span>
                <p className="price">
                  {slide.price}원
                  <span className="discount">
                    &nbsp;&nbsp;{slide.discountRate}%
                  </span>
                </p>
              </div>
            </div>
          </li>
        ))}
      </Slider>
    </div>
  );
};
export default BestSlide;
