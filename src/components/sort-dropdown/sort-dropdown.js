import React, { useState } from 'react';
import { Typography, MenuItem, Select } from '@mui/material';

const SortDropdown = ({ setSortBy }) => {
  const [sortBy, setLocalSortBy] = useState('');

  const handleSortChange = (event) => {
    const value = event.target.value;
    setLocalSortBy(value);

    
    setSortBy(value);
  };

  return (
    <div>
      <Typography variant="subtitle1" style={{ marginLeft: '100px' }}>Sort By:</Typography>
      {/* Sorting dropdown */}
      <Select
        value={sortBy}
        onChange={handleSortChange}
        style={{ marginBottom: '10px', width: '300px', marginLeft: '100px' }} 
        displayEmpty
        renderValue={(value) => (value === '' ? 'Select...' : value)}
        inputProps={{
          'aria-label': 'Select sorting option',
        }}
      >
        <MenuItem value="Default">Default</MenuItem>
        <MenuItem value="Price high to low">Price high to low</MenuItem>
        <MenuItem value="Price low to high">Price low to high</MenuItem>
        <MenuItem value="Newest">Newest</MenuItem>
      </Select>
    </div>
  );
};

export default SortDropdown;
