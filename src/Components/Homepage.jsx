import React from 'react';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Price } from './Price';
import toast from 'react-hot-toast';
import Loader from '../Loader';


//price based filter layout

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2em;
  margin-left: 10px;
`;

const FilterOption = styled.div`
  display: flex;
  align-items: center;
`;

const RadioLabel = styled.label`
  margin-right: 8px;
`;

const RadioInput = styled.input`
  margin-right: 4px;
`;


// category based filter options layout

const Title = styled.h2`
margin-left: 10px;
`;

const FilterCategory = styled.div`
  display: flex;
  align-items: center;
`;

const CheckboxLabel = styled.label`
  margin-right: 8px;
`;

const CheckboxInput = styled.input`
  margin-right: 4px;
`;

//product rendering layout


const CardContainer = styled.div`
  border: 1px solid #e1e1e1;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CardImage = styled.img`
//   width: 100%;
//   height: 200px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 20px;
`;

const CardTitle = styled.h2`
  font-size: 18px;
  margin: 0;
  margin-bottom: 10px;
`;

const CardPrice = styled.p`
  font-size: 16px;
  color: #e44d26;
  margin: 0;
`;

const CardDescription = styled.p`
font-size: 16px;
  color: #000;
  margin: 0;
`;

const Links = styled(Link)`
color: #016289;
font-size: 24px;
`;


//pagination layout

const PaginationContainer = styled.div`
  align-self: center;
  display: flex;
  justify-content: center;
  margin: 20px 10px;
`;

const NextButton = styled.button`
  background-color: ${(props) => (props.active ? '#007bff' : '#fff')};
  color: ${(props) => (props.active ? '#fff' : '#007bff')};
  border: 1px solid #007bff;
  border-radius: 5px;
  padding: 5px 10px;
  margin: 0 5px;
  cursor: pointer;
  padding: 20px;
`;




function HomePage() {

  //api call to fetch products
  //states

  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  // const [selectedCategories, setSelectedCategories] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);


  //functions and API calls


  //fetching all categories from API

  const getCategories = async () => {
    try {

      const { data } = await axios.get('https://api-shopease.onrender.com/api/v1/category/category');
      console.log(data);
      setCategories(data?.category)
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    getCategories();
    //eslint-disable-next-line
  }, [])


  //fetching all Products from API

  const getProducts = async () => {
    try {

      setLoading(true)
      const { data } = await axios.get(
        `https://api-shopease.onrender.com/api/v1/products/product-list/${page}`
      );

      if (data?.success) {
        setProducts(data.products);
        setLoading(false)
      } else {
        toast.error("Error While Fetching The Page Data");
      }
    } catch (error) {
      setLoading(false)
      console.log(error);
    }

  }




  useEffect(() => {
    if (!checked.length || !radio.length) getProducts();
    //eslint-disable-next-line
  }, [checked.length, radio.length]);


  //filter by  category

  const handleFilter = (value, id) => {
    let all = [...checked]
    if (value) {
      all.push(id);
    } else {
      all = all.filter(c => c !== id)
    }
    setChecked(all);
  }

  //applying filters to the products

  const filters = async () => {
    try {

      const { data } = await axios.post('https://api-shopease.onrender.com/api/v1/products/product-filters', { checked, radio });
      console.log(data);
      setProducts(data?.products);

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (checked.length || radio.length) filters();
  }, [checked.length, radio.length]);


  //getting total count of products

  const getTotal = async () => {
    try {

      const { data } = await axios.get('https://api-shopease.onrender.com/api/v1/products/product-count');

      if (data?.success) {
        setTotal(data?.total)
      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (!categories.length || !Price.length) getTotal();

  }, [categories.length, Price.length]);


  //paginagtion load more products

  const loadMore = async () => {
    try {

      setLoading(true);
      const { data } = await axios.get(`https://api-shopease.onrender.com/api/v1/products/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products])

    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);



  return (
    <>

      <FilterContainer> <Title>Filter By Category</Title>
        {categories.map((e) => (
          <FilterCategory key={e._id}>
            <CheckboxLabel>
              <CheckboxInput
                type="checkbox"
                // checked={selectedCategories.includes(e._id)}
                onChange={(c) => handleFilter(c.target.checked, e._id)}
              />
              {e.name}
            </CheckboxLabel>
          </FilterCategory>
        ))}
      </FilterContainer>

      <FilterContainer> <Title>Filter By Price</Title>
        {Price.map((p) => (
          <FilterOption key={p._id}>
            <RadioLabel >
              <RadioInput
                type="radio"
                name="price"
                // checked={p.array}
                onChange={(e) => setRadio(e.target.value)}
                value={p.range}
              />
              {p.name}
            </RadioLabel>
          </FilterOption>
        ))}
      </FilterContainer>
      {!products ? (<Loader />) : (

        products?.map((e) => (
          <CardContainer key={e._id}>
            <CardImage onClick={() => navigate(`/product-details/${e.slug}`)} width={'300px'} height={'280px'} src={`https://api-shopease.onrender.com/api/v1/products/get-photo/${e._id}`} alt={e.slug} />
            <CardContent>
              <CardTitle>{e.name}</CardTitle>
              <CardPrice>{e.price.toLocaleString("en-IN", { style: "currency", currency: "INR" })}</CardPrice>
              <CardDescription>{e.description.slice(0, 100)}...<Links to={`/product-details/${e.slug}`} >more</Links></CardDescription>

            </CardContent>
          </CardContainer>
        ))

      )}

      {products && products.length < total && (
        <PaginationContainer>
          <NextButton onClick={(e) => { e.preventDefault(); setPage(page + 1) }}>{loading ? (<Loader />) : 'Load More'}</NextButton>
        </PaginationContainer>
      )}

    </>
  );
}

export default HomePage;
