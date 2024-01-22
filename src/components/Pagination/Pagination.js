import React, { useState, useEffect } from 'react';
import './Pagination.scss';
import { useNavigate, Link } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
const Pagination = ({
  productCount,
  onClick,
  offset,
  pageLength,
  pageProductNumber,
}) => {
  const MoveToTop = () => {
    window.scrollTo({ top: 250 });
  };

  const [searchParams, setSearchParams] = useSearchParams();

  let page = 1;
  if (productCount >= pageProductNumber) {
    page = Math.ceil(productCount / pageProductNumber);
  }
  //   for(let i=1;i<=Math.ceil(productCount/(pageLength*pageProductNumber))){
  //     if(offset<=(i*(pageLength*pageProductNumber)-pageProductNumber)){
  //         offsetBox=i;
  //       }
  //   }
  let pageList = [];
  for (let i = 1; i < page + 1; i++) {
    if (i === 1) {
      pageList.push({ id: i, offset: 0, offsetBox: 1 });
    } else {
      pageList.push({
        id: i,
        offset: (i - 1) * pageProductNumber,
        offsetBox: Math.ceil(i / pageLength),
      });
    }
  }
  const goToPage = param => {
    if (param < 0) {
      return;
    } else if (
      param >
      pageProductNumber * Math.floor(productCount / pageProductNumber)
    ) {
      return;
    } else if (param === productCount) {
      return;
    }
    searchParams.set('offset', param);
    searchParams.set('limit', pageProductNumber);
    setSearchParams(searchParams);
    MoveToTop();
  };

  return (
    <div className="pagination">
      <div className="paginationBox">
        <div
          className="btnStart btnArrow"
          onClick={() => {
            goToPage(0);
          }}
        >
          <img
            src={process.env.PUBLIC_URL + '/images/leftDoubleArrow.png'}
            alt="btnStart"
          ></img>
        </div>
        <div
          className="btnPrev btnArrow"
          onClick={() => {
            goToPage(Number(offset) - Number(pageProductNumber));
          }}
        >
          <img
            src={process.env.PUBLIC_URL + '/images/leftArrow.png'}
            alt="btnPrev"
          ></img>
        </div>
        <div className="pageBox">
          {pageList.map(page => {
            if (
              page.offsetBox ==
              Math.ceil(
                (Number(offset) + Number(pageProductNumber)) /
                  (pageLength * pageProductNumber),
              )
            ) {
              return (
                <div
                  key={page.id}
                  className={`pageBtn ${
                    page.offset == offset || (!offset && page.offset == 0)
                      ? 'clicked'
                      : 'unclicked'
                  }`}
                  onClick={() => {
                    goToPage(page.offset);
                  }}
                >
                  {page.id}
                </div>
              );
            }
          })}
        </div>
        <div
          className="btnNext btnArrow"
          onClick={() => {
            goToPage(Number(offset) + Number(pageProductNumber));
          }}
        >
          <img
            src={process.env.PUBLIC_URL + '/images/leftArrow.png'}
            alt="btnNext"
          ></img>
        </div>
        <div
          className="btnEnd btnArrow"
          onClick={() => {
            goToPage(
              pageProductNumber * Math.floor(productCount / pageProductNumber) -
                pageProductNumber,
            );
          }}
        >
          <img
            src={process.env.PUBLIC_URL + '/images/leftDoubleArrow.png'}
            alt="btEnd"
          ></img>
        </div>
      </div>
    </div>
  );
};
export default Pagination;
