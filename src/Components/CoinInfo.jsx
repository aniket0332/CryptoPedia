import React from 'react'
import { useState, useEffect } from 'react';
import { HistoricalChart } from '../config/api';
import { CryptoState } from '../Context';
import axios from 'axios';
import { createTheme } from '@mui/system';
import { ThemeProvider } from '@mui/material/styles';
import { CircularProgress } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { chartDays } from './../config/data';
import SelectButton from './SelectButton';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const CoinInfo = ({ coin }) => {

  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);

  const { currency } = CryptoState();
  const [flag, setflag] = useState(false);

  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setflag(true);
    setHistoricData(data.prices);
  };

  useEffect(() => {
   fetchHistoricData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',

        primary: {
          main: '#fff',
        },
    },
  });
  return (
    <ThemeProvider theme = {darkTheme}>
     <div className='ciContainer'>
     {!historicData | flag===false ? (
          <CircularProgress
            style={{ color: "yellow" }}
            size={250}
            thickness={1}
          />
          ) : (
            <>
              <Line
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
                data={{
                  labels: historicData.map((coin) => {
                    let date = new Date(coin[0]);
                    let time =
                      date.getHours() > 12
                        ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                        : `${date.getHours()}:${date.getMinutes()} AM`;
                    return days === 1 ? time : date.toLocaleDateString();
                  }),
  
                  datasets: [
                    {
                      data: historicData.map((coin) => coin[1]),
                      label: `Price ( Past ${days} Days ) in ${currency}`,
                      borderColor: "#EEBC1D",
                    },
                  ],
                }}
              /> 
              {/* <Line options={options} data={data} /> */}
              <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => {setDays(day.value);
                    setflag(false);
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div> 
            </>
          )}   
     </div>
    </ThemeProvider>
  )
}

export default CoinInfo
