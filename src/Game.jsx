import { useState } from "react";

const initialBoard = Array(9).fill(null);
const WINNING_PATTERN = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function calculateWinner(board) {
  for (let i = 0; i < WINNING_PATTERN.length; i++) {
    const [a, b, c] = WINNING_PATTERN[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line: [a, b, c] };
    }
  }
  return null;
}

const Game = () => {
  const [xIsNext, setXIsNext] = useState(true);
  const [board, setboard] = useState(initialBoard);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const currentboard = history[history.length - 1];
  const winner = calculateWinner(board);
  const winningLine = winner?.line || [];

  const handleClick = (i) => {
    if (board[i] || winner) return;

    const newBoard = [...board];
    newBoard[i] = xIsNext ? "✖️" : "⭕";
    setboard(newBoard);
    setXIsNext(!xIsNext);
  };

  const reset = () => {
    setboard(initialBoard);
    setXIsNext("✖️")
  };

  function jumpTo(nextMove) {}

  const squares = board.map((b, i) => {
    const isWinningCell = winningLine.includes(i);
    return (
      <button
        key={i}
        onClick={() => handleClick(i)}
        className={`text-white w-20 h-20 flex justify-center items-center text-5xl
        ${i < 6 ? "border-b-4" : ""}
        ${i % 3 !== 2 ? "border-r-4" : ""}
        border-white-700 border-double outline-0 
        `}
      >
        <span
          className={`text-5xl
    ${isWinningCell && b === "✖️" ? "glow animate-bounce" : ""}
    ${isWinningCell && b === "⭕" ? "glow animate-bounce" : ""}
  `}
        >
          {b}
        </span>
      </button>
    );
  });

  const moves = history.map((_, move) => {
    let description;
    if (move > 0) {
      description = "Go back to move #" + move;
    } else return;

    return (
      <li className="px-3 py-2 bg-gray-500 rounded mb-2">{description}</li>
    );
  });

  return (
    <div className="w-screen h-screen bg-black text-white pt-5 flex flex-col items-center justify-around ">
      <h1 className="text-center text-5xl ">Tic Tac Toe</h1>
      <div className="text-2xl">
        {winner?.winner
          ? `${winner.winner} is Winner`
          : `${xIsNext ? " ✖️" : "⭕"} 's Turn`}{" "}
      </div>
      <div className="grid grid-cols-3">{squares}</div>
      <div className="flex justify-center items-center">
        <button onClick={reset} className="py-2 px-5 bg-neutral-800 rounded">
          Reset
        </button>
      </div>
    </div>
  );
};

export default Game;
