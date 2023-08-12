import React, { useEffect, useState } from 'react';
import { Select } from '@chakra-ui/react';
import axios from 'axios';

const CategoryDropdown = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

console.log(categories);
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_API}/admin/allcategories`);
      setCategories(response.data.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleCategoryChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedCategory(selectedValue);
    onSelectCategory(selectedValue);
  };

  return (
    <Select value={selectedCategory} onChange={handleCategoryChange}>
      <option value="" disabled>Select a category</option>
      {categories.map((category) => (
        <option key={category._id} value={category.name}>
          {category.name}
        </option>
      ))}
    </Select>
  );
};

export default CategoryDropdown;
