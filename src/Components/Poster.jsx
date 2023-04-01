import React from 'react'
import { Container, Typography } from '@mui/material';
import Carousel from './Carousel';
import "../App.css";

const Poster = () => {

  return (
    <div className = 'poster'>
      <Container>
        <div>
          <Typography id = 'title'>
            Cryptopedia
          </Typography>
          <Typography id = 'subtitle'>
          All insights you need in one place.
          </Typography>
        </div>
      </Container>
      <Carousel id = 'carousel'/>
    </div>
  )
}

export default Poster
