export const addNumber = (grid) => {
  // Copie de la grille pour éviter les effets de bord
  const newGrid = grid.map((row) => row.slice());
  const emptyCells = [];

  for (let i = 0; i < newGrid.length; i++) {
    for (let j = 0; j < newGrid[i].length; j++) {
      if (newGrid[i][j] === 0) {
        emptyCells.push({ x: i, y: j });
      }
    }
  }

  if (emptyCells.length > 0) {
    const randCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    newGrid[randCell.x][randCell.y] = Math.random() < 0.9 ? 2 : 4;
  }

  return newGrid;
};

export const moveGrid = (grid, direction) => {
  let rotatedGrid;
  switch (direction) {
    case 'up':
      rotatedGrid = rotateGrid(grid, 3);
      break;
    case 'right':
      rotatedGrid = rotateGrid(grid, 2);
      break;
    case 'down':
      rotatedGrid = rotateGrid(grid, 1);
      break;
    case 'left':
      rotatedGrid = grid;
      break;
    default:
      rotatedGrid = grid;
  }

  let { newGrid, score } = combineTiles(rotatedGrid);

  // Rotation inverse pour revenir à l'orientation initiale
  switch (direction) {
    case 'up':
      newGrid = rotateGrid(newGrid, 1);
      break;
    case 'right':
      newGrid = rotateGrid(newGrid, 2);
      break;
    case 'down':
      newGrid = rotateGrid(newGrid, 3);
      break;
    case 'left':
      newGrid = newGrid;
      break;
    default:
      newGrid = newGrid;
  }
  return { grid: newGrid, score };
};

const rotateGrid = (grid, times) => {
  const newGrid = grid.map((row) => row.slice());
  for (let t = 0; t < (times + 4) % 4; t++) {
    for (let i = 0; i < newGrid.length; i++) {
      for (let j = i; j < newGrid[0].length; j++) {
        [newGrid[i][j], newGrid[j][i]] = [newGrid[j][i], newGrid[i][j]];
      }
    }
    newGrid.forEach((row) => row.reverse());
  }
  return newGrid;
};

const combineTiles = (grid) => {
  let newGrid = grid.map((row) => row.slice());
  let score = 0;

  for (let i = 0; i < newGrid.length; i++) {
    let row = newGrid[i].filter((val) => val !== 0);
    for (let j = 0; j < row.length - 1; j++) {
      if (row[j] === row[j + 1]) {
        row[j] *= 2;
        score += row[j];
        row[j + 1] = 0;
      }
    }
    row = row.filter((val) => val !== 0);
    while (row.length < 4) {
      row.push(0);
    }
    newGrid[i] = row;
  }

  return { newGrid, score };
};

export const checkGameOver = (grid) => {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === 0) return false;
      if (i !== 3 && grid[i][j] === grid[i + 1][j]) return false;
      if (j !== 3 && grid[i][j] === grid[i][j + 1]) return false;
    }
  }
  return true;
};

export const computeScore = (grid) => {
  if (!grid) return 0;
  return grid.flat().reduce((acc, val) => acc + val, 0);
}


export const hasWon = (grid) => {
  return grid.flat().some((val) => val >= 2048);
}

export const applyFireEffect = (grid) => {
  const getRandomNonEmptyTiles = (board) => {
    const positions = [];
    board.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (cell !== 0) {
          positions.push([i, j]);
        }
      });
    });
    
    // Shuffle array and take first 3 positions
    return positions
      .sort(() => Math.random() - 0.5)
      .slice(0, Math.min(3, positions.length));
  };

  const positions = getRandomNonEmptyTiles(grid);
  const board = [...grid].map(row => [...row]);
  positions.forEach(([i, j]) => {
    board[i][j] = 0;
  });

  //si le board est vide, on ajoute un 2
  if (board.flat().every(cell => cell === 0)) {
    console.log("board is empty, adding a 2");
    board[Math.floor(Math.random() * 4)][Math.floor(Math.random() * 4)] = 2;
  }

  return board;
}