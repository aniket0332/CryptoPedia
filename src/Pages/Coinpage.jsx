import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { CryptoState } from '../Context';
import axios from 'axios';
import { SingleCoin } from '../config/api';
import CoinInfo from '../Components/CoinInfo';
import { LinearProgress, Typography } from '@mui/material';
import { numberWithCommas } from './../Components/Carousel';

const Coinpage = () => {
  const { id }  = useParams();
  const [coin, setcoin] = useState();

  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
  
    setcoin(data);
  }

  useEffect(() => {
    fetchCoin();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const htmlFromCMS = coin?.description.en.split(". ")[0];
 
  if(!coin) return <LinearProgress style={{backgroundColor: "yellow"}}/>
  
  return (
    <div className='cpContainer'>
      <div className='cpSideBar'>
        <img src={coin?.image.large}
        alt={coin?.name}
        height="200"
        style={{ marginBottom: 20 }} 
        />
        <Typography variant='h3' className='cpHeading'
               style={{
                fontFamily: "Chakra Petch",
              }}>
         {coin?.name}
        </Typography>
        <Typography 
              style={{
                fontFamily: "Chakra Petch",
              }} 
              variant="subtitle1" 
              className="cpDescription" 
              dangerouslySetInnerHTML={{__html: htmlFromCMS}}>
        </Typography>
        <div className='cpMarketData'>
         <span style={{ display: "flex" }}>
         <Typography variant='h5' className='cpHeading' style={{
                fontFamily: "Chakra Petch",
              }}>
          Rank: 
         </Typography>
         &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Chakra Petch",
              }}
            >
              {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
         </span>
         <span style={{ display: "flex" }}>
         <Typography variant='h5' className='cpHeading' style={{
                fontFamily: "Chakra Petch",
              }}>
          Current Price: 
         </Typography>
         &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Chakra Petch",
              }}
            > {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
         </span>
         <span style={{ display: "flex" }}>
            <Typography variant="h5" className="cpHeading" style={{
                fontFamily: "Chakra Petch",
              }}>
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Chakra Petch",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
        </div>
        </div>

      <CoinInfo coin={coin} />
    </div>
    
  )
}

export default Coinpage
