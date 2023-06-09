import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CryptoState } from '../Context';
import { CoinList } from './../config/api';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { LinearProgress, Typography } from '@mui/material';
import { TextField,Container,TableBody, TableCell, TableRow, TableHead,Table,TableContainer } from '@mui/material';
import { useNavigate  } from 'react-router-dom';
import { numberWithCommas } from './Carousel';
import { Pagination } from '@mui/material';

const CoinsList = () => {
  
  const [coins,setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  const { currency, symbol } = CryptoState();



  const fetchCoins = async() => {

    setLoading(true);

    const { data } = await axios.get(CoinList(currency));

    setCoins(data);
    setLoading(false);
  };

  useEffect(() =>{   
    fetchCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[currency]);
  
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#fff',
      },
    },
  });

  // console.log(coins);

   const handleSearch = () => {
    return coins.filter((coin) => (
      coin.name.toLowerCase().includes(search) || 
      coin.symbol.toLowerCase().includes(search)
    ))
   };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center"}}>
        <Typography variant="h4" style={{ margin: 18, fontFamily: 'Chakra Petch'}}>
          Cryptocurrency Prices by Market cap
        </Typography>
        <TextField
        id ="search"
        label="search"
        variant="outlined"
        style={{ marginBottom:20, width: "100%", fontFamily: 'Chakra Petch'}}
        onChange={(e) => setSearch(e.target.value)}
        InputLabelProps = "white"
        />
        <TableContainer>
            {
              loading ? (
                <LinearProgress style={{backgroundColor: "gold"}} />
              ):(
                 <Table>
                  <TableHead style={{ backgroundColor: "rgba(255, 228, 196, 0.786)" }}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "700",
                        fontFamily: "Chakra Petch",
                      }}
                      key={head}
                      align={head === "Coin" ? "" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;
                    return ( 
                      <TableRow
                        onClick={() => navigate(`/coins/${row.id}`)}
                        id="row"
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            gap: 15,
                          }}
                        >
                          <img
                            src={row?.image}
                            alt={row.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                            key={row.name}
                          />
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: "darkgrey" }}>
                              {row.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}
                          M
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
                 </Table>
              )}
        </TableContainer>

        <Pagination
          count={(handleSearch()?.length / 10).toFixed(0)}
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />

      </Container>
    </ThemeProvider>
  )
}

export default CoinsList;
