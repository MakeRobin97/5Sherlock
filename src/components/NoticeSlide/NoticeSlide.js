import React, { useState, useEffect } from 'react';
import './NoticeSlide.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const NoticeSlide = props => {
  const slides = [
    '[공지] 오설록몰 개인정보처리방침 변경 안내 (23. 09. 26)',
    '[공지] 23년 추석 배송마감 안내',
    '[공지] 오설록 차 제품 고시 정보 변경 안내',
  ];

  const settings = {
    arrows: false,
    dots: false, // 페이지 인디케이터 표시 여부
    infinite: true, // 무한 루프
    speed: 500, // 애니메이션 속도
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1, // 한 번에 표시할 슬라이드 수
    slidesToScroll: 1, // 한 번에 스크롤할 슬라이드 수
    vertical: true,
  };

  return (
    <div className="NoticeSlide NoticeSlide2">
      <span>공지사항</span>
      <div className="slideWrapper">
        <ul className="slide">
          <Slider {...settings}>
            {slides.map((slide, index) => (
              <li key={index}>{slide}</li>
            ))}
          </Slider>
        </ul>
      </div>
    </div>
  );
};
export default NoticeSlide;
