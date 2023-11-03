import React from 'react';
import styled from 'styled-components';

const CartPageContainer = styled.div`
  padding: 20px;
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  padding: 10px;
`;

const ProductImage = styled.img`
  max-width: 80px;
  height: auto;
`;

const ProductDetails = styled.div`
  flex: 1;
  padding-left: 10px;
`;

const ProductTitle = styled.h3`
  font-size: 18px;
  margin: 0;
`;

const ProductPrice = styled.span`
  font-size: 16px;
  font-weight: bold;
`;

const TotalCost = styled.div`
  text-align: right;
  font-size: 20px;
  font-weight: bold;
  margin-top: 20px;
`;

const CartPage = () => {
  const cartItems = [
    { id: 1, name: 'Product 1', price: 49.99, image: 'product1.jpg' },
    { id: 2, name: 'Product 2', price: 29.99, image: 'product2.jpg' },
  ];

  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <CartPageContainer>
      {cartItems.map((item) => (
        <CartItem key={item.id}>
          <ProductImage src={item.image} alt={item.name} />
          <ProductDetails>
            <ProductTitle>{item.name}</ProductTitle>
            <ProductPrice>{item.price.toLocaleString('en-IN', {style: 'currency', currency: 'INR'})}</ProductPrice>
          </ProductDetails>
        </CartItem>
      ))}
      <TotalCost>Total: {total.toLocaleString('en-IN', {style: 'currency', currency: 'INR'})}</TotalCost>
    </CartPageContainer>
  );
};

export default CartPage;
