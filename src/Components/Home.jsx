import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';

const Home = () => {


    const Main = styled.div`
     
    width: 100%
    margin-top: 3em;
    background: white;
    height: 100vh;
    display: flex;
    flex-direction: row;
    // flex-wrap: wrap;


    @media only screen and (max-width: 600px) {
        flex-direction: ${props => (props.Main ? props.Main: 'column')};
    }
    `;

   const ProductCard = styled.div`
    width: 25%;
    background: white;
    height: 400px;
    margin-top: 1em;
    margin: 10px;
    // padding: 2em;
    border: 1px solid gray;
    display: flex;
    flex-wrap: wrap;
    box-shadow: -2px 6px 4px 4px gray;

    @media only screen and (max-width: 600px) {
        width: ${props => (props.Container ? props.Container: '100%')};
        margin: ${props => (props.Container ? props.Container : '0' )};
        margin-bottom: ${props => (props.ProductCard ? props.ProductCard: '1em')};
        box-shadow: ${props => (props.ProductCard ? props.ProductCard: '-1px 2px 2px -1px')};

    }
    `;

    const Img = styled.img`
    border-bottom: 1px solid gray;
    margin-left: 1em;
    margin-top: 1em;
    `;

    const Ptitle = styled.h3`
    
    `;

    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        const {data} = await axios.get('https://api-shopease.onrender.com/api/v1/products/get-product');
        console.log(data);
        setProducts(data?.products);
    }

    
    

    useEffect(() => {
        getProducts();
        //eslint-disable-next-line
    }, [])

  return (
    <Main>
      {products?.map((e) => (
        <ProductCard>
        <Img className='card-img' width={'90%'} height={'200px'} src={`https://api-shopease.onrender.com/api/v1/products/get-photo/${e._id}`} alt={`${e.slug}`} />
        <div style={{padding: '10px'}}>
        <Ptitle className='card-title'>Name: {e.name}</Ptitle>
        <h4>{e.price.toLocaleString("en-IN", {style: "currency", currency: "INR"})}</h4>
        <p>{e.description.slice(0,40)}...</p>
        </div>
        </ProductCard>
      ))}

    </Main>
  )
}

export default Home