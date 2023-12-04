import Square from './Square';

export default function Board({ xIsNext, history, IsWinner, onPlay, onFinish }) {
  let moves =  history.historyOfMoves;
  let values = history.historyOfValues;
  let lastMove = moves.length == 1 ? 0 : moves.length - 1;
  let player = xIsNext ? "X" : "O";
   
    function handleClick(index, player) {
      if (moves.includes(index) || IsWinner) {
        return;
      }

      onPlay(index, player, updatedHistory => {
          const winner = calculateWinner(index, updatedHistory);
          onFinish(winner);
        }); 
    }

    let status;
    if (IsWinner) {
      status = 'Winner: ' + IsWinner.winner;
    } else if (lastMove === 9 && !IsWinner) {
        status = 'Its draw!';
    } else {
      status = 'Next player: ' + player;
    }

    let rows = 3;
    let columns = 3;
  
    return(
    <>
      <div className="status">{status}</div>
      {Array.from({ length: rows }, (_, r) =>
        <div className="board-row" key={r}>
        {Array.from({ length: columns }, (_, c) => {
          let index = r * columns + c;
          let value = values[index];
          let isWinning = IsWinner && IsWinner.location.some(i => i === index);
          return <Square key={index} value={value} isWinning={isWinning} onSquareClick={() => handleClick(index, player)} />
        })}
      </div>
      )}
    </>
    )
  }


  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  function calculateWinner( index, history ) {
    const result = {};
    const checkLines = [];
    const valuesToCheck = history.historyOfValues;
    lines.forEach(l => {if (l.includes(index)) checkLines.push(l)});
  
    for (let i = 0; i < checkLines.length; i++) {
      const [a, b, c] = checkLines[i]

      if (valuesToCheck[a] && valuesToCheck[a] === valuesToCheck[b] && valuesToCheck[a] === valuesToCheck[c]) {
        result.winner = valuesToCheck[a];
        result.location = checkLines[i];
        return result;
      }
    } 
    return null;
  }