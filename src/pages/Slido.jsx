import React from 'react';
import Footer from '../components/Footer';
import NestedGrid from '../components/SlidoGrid';
import { Button, Box } from '@mui/material';
import { useState } from 'react';

function Slido() {
  const [isSolved, setIsSolved] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [moveMade, setMoveMade] = useState(false);
  const handleSolveClick = () => {
    // Set isSolved to true or false based on your logic
    setIsSolved(true); // Example: Always set to true for demonstration
    setMoveMade(true);
  };
  const handleResetClick = () => {
    setResetKey((prevKey) => prevKey + 1); // Increment the reset key to force re-render
    setIsSolved(false); // Reset isSolved
    setMoveMade(false);
  };
  return (
    <>
      <NestedGrid key={resetKey} isSolved={isSolved} setIsSolved={setIsSolved} moveMade={moveMade} setMoveMade={setMoveMade}/>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '20px', // Adjust as needed
        }}
      >
        <Button variant="contained" color="success" onClick={handleSolveClick} disabled={isSolved}>
          Solve
        </Button>
        <Button variant="outlined" color="error" sx={{ marginLeft: '10px' }} onClick={handleResetClick} disabled={!moveMade}>
          Reset
        </Button>
      </Box>
      <Footer />
    </>
  );
}

export default Slido;
