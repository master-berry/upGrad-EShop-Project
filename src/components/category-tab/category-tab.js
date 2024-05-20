import React, { useState, useEffect } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

const CategoryTab = ({ setSelectedCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    fetch('http://localhost:8080/api/products/categories')
      .then(response => response.json())
      .then(data => setCategories(['All', ...data]))
      .catch(error => console.error('Error fetching categories:', error));
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <ToggleButtonGroup
        exclusive
        onChange={(event, newCategory) => setSelectedCategory(newCategory)}
        aria-label="Category tabs"
        style={{ margin: '10px 0' }}
      >
        {categories.map(category => (
          <ToggleButton key={category} value={category}>
            {category}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </div>
  );
};

export default CategoryTab;
