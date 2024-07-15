import { useState } from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Board from "./Board";
import GameInfo from "./GameInfo";

export default function Game() {
  const [history, setHistory] = useState({
    historyOfMoves: [null],
    historyOfValues: {},
  });
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const [switchChecked, setSwitchChecked] = useState({ status: false });

  const moves = history.historyOfMoves;
  const values = history.historyOfValues;
  const currentHistoryOfMoves = moves.slice(0, currentMove + 1);
  const currentHistoryOfValues = {};
  for (let x of currentHistoryOfMoves.slice(1)) {
    currentHistoryOfValues[x] = values[x];
  }
  const currentHistory = {
    historyOfMoves: currentHistoryOfMoves,
    historyOfValues: currentHistoryOfValues,
  };

  function recordMove(index, value, backToBoard) {
    const nextMove = [...currentHistoryOfMoves, index];
    const nextValue = { ...currentHistoryOfValues, [index]: value };
    const updatedHistory = {
      ...history,
      historyOfMoves: nextMove,
      historyOfValues: nextValue,
    };
    setHistory(updatedHistory);
    setCurrentMove(nextMove.length - 1);
    backToBoard(updatedHistory);
  }

  function turnSwitch(event) {
    setSwitchChecked({
      ...switchChecked,
      [event.target.name]: event.target.checked,
    });
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  return (
    <>
      <main className="game">
        <div className="game-board">
          <Board
            xIsNext={xIsNext}
            history={currentHistory}
            onPlay={recordMove}
          />
        </div>
        <div className="game-info">
          <div className="game-switch">
            <FormControlLabel
              control={
                <Switch
                  checked={switchChecked.status}
                  onChange={turnSwitch}
                  color="primary"
                  name="status"
                />
              }
              label="Sort history DESC"
            />
          </div>
          <GameInfo
            history={history.historyOfMoves}
            isReverse={switchChecked.status}
            currentMove={currentMove}
            onCurrentMove={jumpTo}
          />
        </div>
      </main>
    </>
  );
}
