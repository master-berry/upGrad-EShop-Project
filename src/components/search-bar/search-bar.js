import React, { useEffect, useState } from 'react';
import { Typography, TextField } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  const [localSearchQuery, setLocalSearchQuery] = useState('');

  useEffect(() => {
    setSearchQuery(localSearchQuery);
  }, [localSearchQuery, setSearchQuery]);

  return (
    <div>
      <Typography variant="h4">Products</Typography>
      {/* Search bar */}
      <TextField
        value={localSearchQuery}
        onChange={event => setLocalSearchQuery(event.target.value)}
        label="Search"
        variant="outlined"
        InputProps={{
          endAdornment: <SearchIcon />
        }}
        style={{ marginBottom: '10px' }}
      />
    </div>
  );
};

export default SearchBar;
