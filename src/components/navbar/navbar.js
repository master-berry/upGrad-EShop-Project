import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppBar, Toolbar, Typography, IconButton, Button, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/system';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logoutSuccess } from '../../common/redux/actions/auth-actions';
import { InputBase } from '@mui/material';

const NavbarAppBar = styled(AppBar)({
  backgroundColor: '#3f51b5',
});

const LeftSection = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
}));

const MiddleSection = styled('div')(({ theme }) => ({
  flex: '1',
  display: 'flex',
  justifyContent: 'center',
}));

const RightSection = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
}));

const SearchContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'rgba(255, 255, 255, 0.15)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  width: '35%',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: '10px 10px 10px 0',
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: 'width 0.3s ease',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const Navbar = ({ setSearchQuery }) => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const isAdmin = useSelector(state => state.auth.isAdmin);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(logoutSuccess());
    navigate('/signin');
  };

  const isSearchVisible = isLoggedIn && (location.pathname !== '/signin' && location.pathname !== '/signup');

  const handleAddProductClick = () => {
    navigate('/add-product');
  };

  const StyledButton = styled(Button)({
    '&:not(:last-child)': {
      marginRight: '8px',
    },
    '&:hover': {
      textDecoration: 'underline',
    },
  });

  const LogoutButton = styled(Button)({
    backgroundColor: 'red',
    color: 'white',
    '&:hover': {
      backgroundColor: '#cc0000',
    },
  });

  const handleSearchInputChange = (event) => {
    const inputValue = event.target.value;
    setSearchInput(inputValue);
    setSearchQuery(inputValue); // Update search query dynamically
  };

  const handleSearch = () => {
    setSearchQuery(searchInput);
    navigate('/products');
  };

  const [searchInput, setSearchInput] = useState('');

  return (
    <NavbarAppBar position="static">
      <Toolbar>
        <LeftSection>
          <IconButton edge="start" color="inherit" aria-label="upGrad E-Shop">
            <ShoppingCartIcon />
          </IconButton>
          <Typography variant="h6">
            upGrad E-Shop
          </Typography>
        </LeftSection>
        <MiddleSection>
          {isSearchVisible && (
            <SearchContainer>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                value={searchInput}
                onChange={handleSearchInputChange}
                onKeyPress={(event) => event.key === 'Enter' && handleSearch()}
              />
            </SearchContainer>
          )}
        </MiddleSection>
        <RightSection>
          {!isLoggedIn && (
            <>
              <StyledButton color="inherit" component={Link} to="/signin">
                Login
              </StyledButton>
              <StyledButton color="inherit" component={Link} to="/signup">
                Sign Up
              </StyledButton>
            </>
          )}
          {isLoggedIn && (
            <>
              <StyledButton color="inherit" component={Link} to="/products">
                Home
              </StyledButton>
              {isAdmin && (
                <StyledButton color="inherit" onClick={handleAddProductClick}>
                  Add Product
                </StyledButton>
              )}
              <Box>
                <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
              </Box>
            </>
          )}
        </RightSection>
      </Toolbar>
    </NavbarAppBar>
  );
};

export default Navbar;
