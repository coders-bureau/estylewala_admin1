import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const getProductParams = {
    params: {
      type:'Men',
      category:'TShirts',
      brand:'Puma',
      price_lte:1500,
      discount_gte:20,
      q:'printed', // Search term for title
      sortType:'rating', // Sort by rating in descending order
      currentPage:2, // Fetch the products for the second page
    },
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://estylewalabackend.onrender.com/products', getProductParams);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // ... Render the list of products
};

export default ProductList;
