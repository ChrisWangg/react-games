import { CenterFocusStrong } from '@mui/icons-material';
import React from 'react';
import Footer from '../components/Footer';
import { useState, useEffect } from 'react';
import { Button, Typography, Box } from '@mui/material';

function Dashboard () {
  const [gamesWon, setGamesWon] = useState(0);

  useEffect(() => {
    // Check if gamesWon is stored in localStorage
    const storedGamesWon = localStorage.getItem('gamesWon');
    if (storedGamesWon) {
      setGamesWon(parseInt(storedGamesWon));
    } else {
      // Fetch initial value from URL and store in localStorage
      fetch('https://cgi.cse.unsw.edu.au/~cs6080/raw/data/info.json')
        .then((response) => response.json())
        .then((data) => {
          setGamesWon(data.score);
          localStorage.setItem('gamesWon', data.score);
        });
    }
  }, []);

  const resetGamesWon = () => {
    setGamesWon(0);
    localStorage.setItem('gamesWon', 0);
  };
  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '83vh' }}>
        <Typography variant="h2" style={{ color: 'red', textAlign: 'center', fontSize: '2em' }}>Please choose an option from the navbar.</Typography>
        <Typography variant="body1" style={{ textAlign: 'center' }}>Games won: {gamesWon} (<Button onClick={resetGamesWon}>reset</Button>)</Typography>
      </Box>
      <Footer/>
    </>
  );
}

export default Dashboard;