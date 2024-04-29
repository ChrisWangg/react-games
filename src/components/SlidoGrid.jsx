import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import image1 from '../assets/1.png';
import image2 from '../assets/2.png';
import image3 from '../assets/3.png';
import image4 from '../assets/4.png';
import image5 from '../assets/5.png';
import image6 from '../assets/6.png';
import image7 from '../assets/7.png';
import image8 from '../assets/8.png';
import { useState, useEffect } from 'react';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  maxWidth: '150px',
  maxHeight: '150px',
  overflow: 'hidden',
  display: 'inline-block', // Set display to inline-block
}));

function FormRow({ images, rowIndex, onClickImage }) {
  const handleClick = (index) => {
    onClickImage(images[index], rowIndex * 3 + index); // Calculate the correct index
  };

  return (
    <React.Fragment>
      {images.map((image, index) => (
        <Grid item key={index} spacing={0}>
          <Item>
            <img
              src={image}
              alt={`Item${rowIndex * 3 + index + 1}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onClick={() => handleClick(index)}
            />
          </Item>
        </Grid>
      ))}
    </React.Fragment>
  );
}
const initialOrder = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  'https://dummyimage.com/150/ffffff/ffffff.png',
];

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  if (arraysEqual(array, newArray)) {
    shuffleArray(array);
  }
  return newArray;
};

export default function NestedGrid(isSolved) {
  const [images, setImages] = useState(shuffleArray(initialOrder));
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === 'ArrowUp' || event.code === 'ArrowDown') {
        event.preventDefault();
      }
      console.log('Key pressed:', event.key);
      const indexToBeMoved = findIndex(event.key, images);
      if (indexToBeMoved !== -1) {
        const image = findImageAtIndex(images, indexToBeMoved);
        handleClickImage(image, indexToBeMoved);
      }
      
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [images]);
  const resetGame = () => {
    const shuffledArray = shuffleArray(initialOrder);
    setImages(shuffledArray);
  };
  useEffect(() => {
    if (isSolved.isSolved) {
      setImages(initialOrder);
      setTimeout(() => {
        alert('Correct');
        updateGamesWon();
        resetGame();
        // I need to set isSolved to false here so it works again
        isSolved.setIsSolved(false);
      }, 100);
    } else {
      resetGame();
    }
  }, [isSolved.isSolved]);

  const handleClickImage = (image, index) => {
    const emptyIndex = findEmptyCellIndex(images);
    if (index !== emptyIndex) isSolved.setMoveMade(true); 
    if (hasEmptyNeighbourCell(index, images)) {
      const newImages = images.map((img, idx) => {
        if (idx === index) {
          return 'https://dummyimage.com/150/ffffff/ffffff.png'; // Replace clicked image with empty cell
        }
        return img;
      });
      const newImages2 = newImages.map((img, idx) => {
        if (idx === emptyIndex) {
          return image; // Replace clicked image with empty cell
        }
        return img;
      });
      // Set empty index to image here
      setImages(newImages2);
      setTimeout(() => {
        if (arraysEqual(initialOrder, newImages2)) {
          alert('Correct');
          updateGamesWon();
          resetGame(); // Reset the game
        }
      }, 100); 
    }
  };

  return (
    <Box
      sx={{
        marginLeft: 'calc(50% - 250px)',
        display: 'flex',
        minHeight: '75vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Grid container justifyContent="center" alignItems="center" spacing={0}>
        <Grid container item spacing={0}>
          <FormRow
            images={images.slice(0, 3)}
            rowIndex={0}
            onClickImage={handleClickImage}
          />
        </Grid>
        <Grid container item spacing={0}>
          <FormRow
            images={images.slice(3, 6)}
            rowIndex={1}
            onClickImage={handleClickImage}
          />
        </Grid>
        <Grid container item spacing={0}>
          <FormRow
            images={images.slice(6, 9)}
            rowIndex={2}
            onClickImage={handleClickImage}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

function hasEmptyNeighbourCell(position, images) {
  const neighbors = {
    0: [1, 3],
    1: [0, 2, 4],
    2: [1, 5],
    3: [0, 4, 6],
    4: [1, 3, 5, 7],
    5: [2, 4, 8],
    6: [3, 7],
    7: [4, 6, 8],
    8: [5, 7],
  };
  return neighbors[position].some(
    (neighbor) => !isCellOccupied(neighbor, images)
  );
}

function isCellOccupied(position, images) {
  // Check if the image at the given position is not the white one
  return images[position] !== 'https://dummyimage.com/150/ffffff/ffffff.png';
}

function findEmptyCellIndex(images) {
  // Iterate over the images array to find the index of the empty cell
  for (let i = 0; i < images.length; i++) {
    if (images[i] === 'https://dummyimage.com/150/ffffff/ffffff.png') {
      return i; // Return the index of the empty cell
    }
  }
  return -1; // Return -1 if no empty cell is found
}

function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}

function updateGamesWon() {
  let gamesWon = localStorage.getItem('gamesWon');
  if (!gamesWon) {
      gamesWon = 0;
  }
  gamesWon++;
  localStorage.setItem('gamesWon', gamesWon);
}
function findIndex(key, images) {
  const index = findEmptyCellIndex(images);
  if (key === 'ArrowUp') {
    // index here cannot be 6, 7 or 8
    if (index !== 6 && index !== 7 && index !== 8) {
      return index + 3;
    }
  }
  else if (key === 'ArrowDown') {
    // index here cannot be 0, 1, 2
    if (index !== 0 && index !== 1 && index !== 2) {
      return index - 3;
    }
  }
  else if (key === 'ArrowLeft') {
    // index here cannot be 2, 5, 8
    if (index !== 2 && index !== 5 && index !== 8) {
      return index + 1;
    }
  }
  else if (key === 'ArrowRight') {
    // index here cannot be 0, 3, 6
    if (index !== 0 && index !== 3 && index !== 6) {
      return index - 1;
    }
  }
  return -1; // error
}
function findImageAtIndex(images, index) {
  return images[index];
}