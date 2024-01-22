import React from 'react';
import Counter from '../../components/Counter/Counter';
import './CartList.scss';
const CartList = ({
  cartList,
  setCartList,
  setSelectedItems,
  selectedItems,
}) => {
  const handleCounterChange = (itemId, newQuantity) => {
    // 상품 수량 변경 시 호출되는 함수
    const updatedCartList = cartList.map(item => {
      if (item.productId === itemId) {
        // 해당 상품의 수량을 업데이트
        const updatedItem = {
          ...item,
          quantity: newQuantity,
        };
        return updatedItem;
      } else {
        return item;
      }
    });
    setCartList(updatedCartList);
  };
  const handleCheckboxChange = itemId => {
    setSelectedItems(prevSelectedItems => {
      const updatedSelectedItems = {
        ...prevSelectedItems,
        [itemId]: !prevSelectedItems[itemId],
      };
      return updatedSelectedItems;
    });
  };
  const selectedData = [];
  for (const itemId in selectedItems) {
    if (selectedItems[itemId]) {
      // itemId를 가진 데이터가 선택되었으면 해당 데이터를 selectedData에 추가
      const selectedItem = cartList.find(item => item.id === parseInt(itemId));
      if (selectedItem) {
        const dataToSend = {
          id: selectedItem.id,
          quantity: selectedItem.quantity,
        };
        selectedData.push(dataToSend);
      }
    }
  }

  return (
    <>
      {cartList.map(item => (
        <div className="cartList" key={item.id}>
          <input
            className="checkBox"
            type="checkbox"
            checked={selectedItems[item.id] || false}
            onChange={() => handleCheckboxChange(item.id)}
          />
          <div className="imgBox">
            <img className="image" src={item.img} alt={item.name} />
          </div>
          <div className="itemInfo">
            <div className="itemName">{item.name}</div>
          </div>
          <div className="countPrice">
            <Counter
              itemId={item.id}
              quantity={item.quantity}
              onQuantityChange={handleCounterChange}
            />
            <div className="price">
              {(item.price * item.quantity).toLocaleString()}원
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
export default CartList;
