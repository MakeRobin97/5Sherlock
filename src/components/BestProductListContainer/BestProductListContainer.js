import React from 'react';
import './BestProductListContainer.scss';
import { useNavigate, Link } from 'react-router-dom';
import BestProductListCard from '../BestProductListCard/BestProductListCard';

const BestProductListContainer = ({ data, onClick }) => {
  if (!data) {
    return null;
  }
  return (
    <div className="bestProductListContainer">
      {data.map((d, index) => (
        <BestProductListCard
          index={index}
          key={d.id}
          data={d}
          onClick={onClick}
        />
      ))}
    </div>
  );
};
export default BestProductListContainer;
