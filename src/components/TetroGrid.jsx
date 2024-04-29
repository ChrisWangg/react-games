import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 100,
  },
  cell: {
    backgroundColor: 'transparent',
    border: '1px solid #333333',
    minHeight: '50px',
    flex: '1 0 auto', // Maintain equal width for all cells
  },
  black: {
    backgroundColor: 'black',
  },
  green: {
    backgroundColor: 'rgb(0,255,0)',
  },
}));

export default function CustomGrid() {
  const classes = useStyles();
  const [blackCell, setBlackCell] = useState(null);
  const [finishedBlocks, setFinishedBlocks] = useState([]);
  const [gameActive, setGameActive] = useState(false);

  useEffect(() => {
    let interval;
    if (gameActive) {
      interval = setInterval(() => {
        setBlackCell((prevBlackCell) => {
          if (checkIfFailed(prevBlackCell, finishedBlocks)) {
            alert('Failed');   
            setTimeout(() => {
              resetGame();
            }, 500);
          }
          if (prevBlackCell >= 110 || isNextCellGreen(prevBlackCell, finishedBlocks)) {
            setFinishedBlocks((prevBlocks) => [...prevBlocks, prevBlackCell]);
            return 0;
          }
          return prevBlackCell === null ? 0 : prevBlackCell + 10;
        });
      }, 100);
    }

    if (checkIfSuccess(finishedBlocks)) {
      alert('Congrats!');
      setTimeout(() => {
        updateGamesWon();
        resetGame();
      }, 100);
    }

    const handleKeyPress = (event) => {
      if (event.key === 'ArrowLeft') {
        setBlackCell((prevBlackCell) => prevBlackCell - 1);
      } else if (event.key === 'ArrowRight') {
        setBlackCell((prevBlackCell) => prevBlackCell + 1);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [gameActive, finishedBlocks]);

  const handleBoardClick = () => {
    setGameActive(true);
  };

  const resetGame = () => {
    setBlackCell(null);
    setFinishedBlocks([]);
    setGameActive(false);
  };

  const numRows = 12;
  const numCols = 10;

  return (
    <>
      <div className={classes.root} onClick={handleBoardClick}>
        <Grid container spacing={0}>
          {[...Array(numRows)].map((_, rowIdx) => (
            <Grid container item key={rowIdx} xs={12} spacing={0} style={{ justifyContent: 'center' }}>
              {[...Array(numCols)].map((_, colIdx) => (
                <Grid item key={colIdx} xs={1} spacing={0}>
                  <div className={`${classes.cell} ${finishedBlocks.includes(rowIdx * numCols + colIdx) ? classes.green : (rowIdx * numCols + colIdx === blackCell ? classes.black : '')}`}></div>
                </Grid>
              ))}
            </Grid>
          ))}
        </Grid>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Button onClick={() => resetGame()} style={{ justifyContent: 'center' }}>Reset</Button>
      </div>
    </>
  );
}

function isNextCellGreen(cellNo, finishedBlocks) {
  return finishedBlocks.includes(cellNo + 10);
}

function checkIfSuccess(finishedBlocks) {
  return [...Array(10)].every((_, i) => finishedBlocks.includes(110 + i));
}

function checkIfFailed(cellNo, finishedBlocks) {
  return finishedBlocks.includes(cellNo);
}

function updateGamesWon() {
  let gamesWon = localStorage.getItem('gamesWon');
  if (!gamesWon) {
    gamesWon = 0;
  }
  gamesWon++;
  localStorage.setItem('gamesWon', gamesWon);
}
