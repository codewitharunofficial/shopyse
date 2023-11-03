import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

const ProductDetailsContainer = styled.div`
   width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
  flex-wrap: wrap;
  
`;

const ProductImage = styled.img`
  max-width: 50%;
  height: auto;
  border: 2px solid gray;
  border-radius: 3px;
  padding: 20px;

  @media only screen and (max-width: 600px) {
   max-width: ${props => (props.ProductImage ? props.ProductImage: '100%')};
   
    
  }

`;

const ProductInfo = styled.div`
  flex: 1;
  padding: 20px;
  padding-top: 0;


  @media only screen and (max-width: 600px) {
    flex-wrap: ${props => (props.ProductInfo ? props.ProductInfo: 'wrap')};
    
  }
`;

const ProductTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
  padding: 2em;
`;

const ProductDescription = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
  padding: 2em;
`;

const ProductPrice = styled.span`
  font-size: 20px;
  color: #e74c3c;
  font-weight: bold;
  padding: 2em;
`;

const AddToCartButton = styled.button`
  background-color: #3498db;
  color: #fff;
  font-size: 18px;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  margin: 1em;

  @media only screen and (max-width: 768px) {
    margin-left: ${props => (props?.AddToCartButton ? props?.AddToCartButton : '1em')}
  }
`;

const ProductDetailsPage = () => {

   const params = useParams();

   //states

   const [product, setProduct] = useState([]);
   const [id, setId] = useState('');
   const [name, setName] = useState('');
   const [desc, setDesc] = useState('');
   const [price, setPrice] = useState('');



    const getProduct = async () => {
        try {
            
       const {data} = await axios.get(`https://api-shopease.onrender.com/api/v1/products/get-a-product/${params.slug}`);
       console.log(data);
      //  setProduct(data?.product);
       setId(data?.product?._id);
       setPrice(data?.product?.price);
       setName(data?.product?.name);
       setDesc(data?.product?.description);

        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getProduct();
        //eslint-disable-next-line
    },[])

  return (
    <ProductDetailsContainer>
      <ProductImage height={'300px'} width={'300px'} src={`https://api-shopease.onrender.com/api/v1/products/get-photo/${id}`} alt="Product Image" />
      <ProductInfo>
        <ProductTitle>{name}</ProductTitle>
        <ProductDescription>
          {desc}
        </ProductDescription>
        <ProductPrice>{price.toLocaleString('en-IN', {style: 'currency', currency: 'INR'})}</ProductPrice>
        <AddToCartButton>Add to Cart</AddToCartButton>
      </ProductInfo>
    </ProductDetailsContainer>
  );
};

export default ProductDetailsPage;
