import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Box, TextField, Button } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  aspectRatio: '1',
  width: '40px',
  height: '40px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center', // Center content vertically
}));

const strs = [
  'the fat cats',
  'larger frogs',
  'banana cakes',
  'unsw vs usyd',
  'french toast',
  'hawaii pizza',
  'barack obama',
];

let hashMap = {};

function DirectionStack() {
  const [currentString, setCurrentString] = useState([]);
  const [inputValues, setInputValues] = useState({});

  const resetGame = () => {
    // Reset input values and hashmap
    setInputValues({});
    hashMap = {};

    // Generate a new random string
    const randomIndex = Math.floor(Math.random() * strs.length);
    const randomString = strs[randomIndex];
    const characters = randomString.split('');

    // Randomly choose 3 non-space characters
    const indices = [];
    while (indices.length < 3) {
      const randomCharIndex = Math.floor(Math.random() * characters.length);
      if (characters[randomCharIndex] !== ' ' && !indices.includes(randomCharIndex)) {
        indices.push(randomCharIndex);
      }
    }

    // Replace chosen characters with input fields
    indices.forEach((index) => {
      characters[index] = (
        <TextField
          key={index}
          defaultValue=""
          inputProps={{ maxLength: 1 }}
          style={{ border: 'none', fontSize: '16px', padding: 0, textAlign: 'center'}}
          onChange={(e) => {
            hashMap[index] = e.target.value;
            setTimeout(() => {
                if (checkCorrect(hashMap, randomString)) {
                  alert('Correct');
                  updateGamesWon();
                  resetGame(); // Reset the game
                }
              }, 100);
          }}
        />
      );
    });
    setCurrentString(characters);
  };

  useEffect(() => {
    resetGame(); // Initial game setup
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
      <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
        {currentString.map((char, index) => (
          <Item style = {{padding: '0px'}}key={index}>{char}</Item>
        ))}
      </Stack>
      <Button style= {{marginTop: '20px'}} variant="outlined" color="error" onClick={() => resetGame()}>
        Reset
      </Button>
    </Box>
  );
}

function checkCorrect(hashMap, string) {
    let count = 0;
    for (let key in hashMap) {
        if (hashMap.hasOwnProperty(key)) {
            if (string[key] === hashMap[key]) {
                count++;
            }
        }
    }
    if (count === 3) {
        return true;
    }
    return false;
}

function updateGamesWon() {
    let gamesWon = localStorage.getItem('gamesWon');
    if (!gamesWon) {
        gamesWon = 0;
    }
    gamesWon++;
    localStorage.setItem('gamesWon', gamesWon);
}

export default DirectionStack;
