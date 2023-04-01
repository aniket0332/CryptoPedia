import React from 'react'
import {AppBar, Box, Toolbar, Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useNavigate  } from 'react-router-dom';
import "../App.css";
import { CryptoState } from '../Context';

const Header = () => {
 
  const {currency, setCurrency} = CryptoState();
  const handleChange = (e) => {
    setCurrency(e.target.value);
  };
  
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',

        primary: {
          main: '#fff',
        },
    },
  });

  const navigate = useNavigate();
  return (
   
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" >
        <Toolbar>
          <Typography id="appbarTypo" onClick={() => navigate("/")} variant="h6" component="div" sx={{ flexGrow: 1 ,  fontSize: "x-large"}} >
            Cryptopedia
          </Typography>
          <Box sx={{ minWidth: 120 }} >
      <FormControl fullWidth size='small' >
        <InputLabel id="appbarTypo" style={{ paddingTop: "6%"}}>Currency</InputLabel>
        <Select id="appbarTypo"
        variant="standard"
          value={currency}
          onChange={handleChange}
        >
          <MenuItem id="appbarTypo" value={"INR"}>INR</MenuItem>
          <MenuItem id="appbarTypo" value={"USD"}>USD</MenuItem>
        </Select>
      </FormControl>
    </Box>
        </Toolbar>
      </AppBar>
    </Box>
     </ThemeProvider>
  );
}

export default Header
