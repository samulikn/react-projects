export default function GameInfo({ history, isReverse, currentMove, onCurrentMove }) {
    let start, end, step;
    start = (isReverse) ? history.length - 1 : 0;
    end = (isReverse) ? -1 : history.length;
    step = (isReverse) ? -1 : 1;

    var list = [];

    for (let i = start; i != end; i += step) {
      let index = history[i];
      let row;
      let column;

      if (i > 0) {
        if (index >= 0 && index <= 2) {
          row = 1;
        } 
        else if (index >= 3 && index <= 5) {
          row = 2;
        } else {
          row = 3;
        }

        column = index - (row - 1) * 3 + 1;
      }

      if (i === 0) {
        if (currentMove === 0) {
          list.push(
          <li key={i}>
            <p><i>You are at the start of the game</i></p>
          </li>)
        } else {
          list.push(
          <li key={i}>
            <button onClick={() => onCurrentMove(i)}>Go to the start game</button>
          </li>);
        } 
      } else {
        if (i === currentMove) {
          list.push( 
            <li key={i}>
              <p><i>{'You are at move #' + i + ': row ' + row + ' column ' + column}</i></p>
            </li>);
        } else {
          list.push(
          <li key={i}>
            <button onClick={() => onCurrentMove(i)}>{'Go to the move #' + i}</button>
          </li>); 
        }
      }
    }
    
    if (isReverse) {
      return <ol reversed>{list}</ol>
    } else {
      return <ol>{list}</ol>
    }
  };