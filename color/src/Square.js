import React from "react";
import invert from "invert-color";

function Square({ inputColor, hexColor }) {
  const textColor = hexColor ? invert(hexColor, true) : "#000";

  return (
    <section
      className="h-52 w-52 border-solid shadow-xl rounded-md 
        bg-white flex flex-col items-center justify-center"
      style={{ background: inputColor }}
    >
      <p className="text-xl font-sans" style={{ color: textColor }}>
        {inputColor ? inputColor : "No Color"}
      </p>
      <p className="text-xl font-sans" style={{ color: textColor }}>
        {hexColor ? hexColor : null}
      </p>
    </section>
  );
}

export default Square;
