document.addEventListener('DOMContentLoaded', () => {
    // Mendapatkan elemen-elemen yang diperlukan dari DOM
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const status = document.getElementById('status');
    const restartButton = document.getElementById('restartButton');
  
    // Pemain saat ini dan kondisi awal permainan
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
  
    // Fungsi untuk mengecek pemenang atau permainan seri
    const checkWinner = () => {
      const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];
  
      for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
          return gameBoard[a];
        }
      }
  
      if (!gameBoard.includes('')) {
        return 'T'; // Tandanya permainan seri (Tie)
      }
  
      return null; // Belum ada pemenang
    };
  
    // Fungsi untuk mengecek apakah papan penuh
    const isBoardFull = () => !gameBoard.includes('');
  
    // Fungsi untuk menentukan langkah acak
    const bestMove = () => {
      // Peluang untuk memilih langkah terbaik (misal: 70%)
      const bestMoveProbability = 0.7;
  
      // Jika nilai acak lebih kecil dari peluang, pilih langkah terbaik
      if (Math.random() < bestMoveProbability) {
        const emptyCells = gameBoard.reduce((acc, cell, index) => {
          if (cell === '') {
            acc.push(index);
          }
          return acc;
        }, []);
  
        // Pilih langkah terbaik secara acak dari sel yang kosong
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        return emptyCells[randomIndex];
      } else {
        // Jika nilai acak lebih besar dari peluang, pilih langkah acak
        const emptyCells = gameBoard.reduce((acc, cell, index) => {
          if (cell === '') {
            acc.push(index);
          }
          return acc;
        }, []);
  
        // Pilih langkah acak dari sel yang kosong
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        return emptyCells[randomIndex];
      }
    };
  
    // Fungsi yang dijalankan saat sel pada papan diklik
    const handleClick = (index) => {
      if (!gameBoard[index] && gameActive) {
        gameBoard[index] = currentPlayer;
        cells[index].textContent = currentPlayer;
  
        const winner = checkWinner();
        if (winner) {
          // Permainan berakhir, menampilkan hasil
          gameActive = false;
          if (winner === 'T') {
            status.textContent = "Permainan Seri!";
          } else {
            status.textContent = `${winner} Menang!`;
          }
        } else if (isBoardFull()) {
          // Permainan seri, menampilkan hasil
          gameActive = false;
          status.textContent = "Permainan Seri!";
        } else {
          // Ganti giliran pemain dan lanjutkan permainan
          currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
          status.textContent = `Giliran ${currentPlayer}`;
  
          // Jika giliran komputer, tentukan langkah acak
          if (currentPlayer === 'O') {
            const computerMove = bestMove();
            setTimeout(() => {
              handleClick(computerMove);
            }, 500); // Penundaan untuk memberikan kesan responsif
          }
        }
      }
    };
  
    // Fungsi untuk mereset permainan
    const restartGame = () => {
      gameBoard = ['', '', '', '', '', '', '', '', ''];
      gameActive = true;
      currentPlayer = 'X';
      status.textContent = `Giliran ${currentPlayer}`;
      cells.forEach(cell => {
        cell.textContent = '';
      });
  
      // Jika giliran komputer, tentukan langkah acak
      if (currentPlayer === 'O') {
        const computerMove = bestMove();
        setTimeout(() => {
          handleClick(computerMove);
        }, 500); // Penundaan untuk memberikan kesan responsif
      }
    };
  
    // Menambahkan event listener untuk setiap sel pada papan
    cells.forEach((cell, index) => {
      cell.addEventListener('click', () => handleClick(index));
    });
  
    // Menambahkan event listener untuk tombol restart
    restartButton.addEventListener('click', restartGame);
  });
  