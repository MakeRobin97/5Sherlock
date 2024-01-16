import React, { useState, useEffect } from 'react';
import './MainSlide.scss';

const MainSlide = props => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId2 = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex === 4 ? 0 : prevIndex + 1));
    }, 3000);
    return () => clearInterval(intervalId2);
  }, []);

  console.log('렌더링2');

  return (
    <div className="MainSlide">
      <ul>
        <li className={0 === currentIndex ? 'active' : ''}>
          <img src="/images/main/main-slide1.png" alt="메인 배너1" />
        </li>
        <li className={1 === currentIndex ? 'active' : ''}>
          <img src="/images/main/main-slide2.png" alt="메인 배너1" />
        </li>
        <li className={2 === currentIndex ? 'active' : ''}>
          <img src="/images/main/main-slide3.png" alt="메인 배너1" />
        </li>
        <li className={3 === currentIndex ? 'active' : ''}>
          <img src="/images/main/main-slide4.png" alt="메인 배너1" />
        </li>
        <li className={4 === currentIndex ? 'active' : ''}>
          <img src="/images/main/main-slide5.png" alt="메인 배너1" />
        </li>
      </ul>
    </div>
  );
};

export default MainSlide;
