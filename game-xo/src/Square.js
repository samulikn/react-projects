export default function Square({ value, isWinning, onSquareClick }) {
    var className = "square"
    if (isWinning) {
        className = [className, "square-winner"].join(" ")
    }

    return (
      <button className={className} onClick={onSquareClick}>
        {value}
      </button>
    );
  }