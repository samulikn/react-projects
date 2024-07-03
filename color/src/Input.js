import React from "react";
import colorNames from "colornames";

function Input({ inputColor, setInputColor, hexColor, setHexColor }) {
  return (
    <form
      className="w-3xl flex flex-col gap-3"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        className="w-52 px-1 py-1 rounded-md text-xl border-black border-2"
        autoFocus
        type="text"
        placeholder="Type color name"
        value={inputColor}
        onChange={(e) => {
          setInputColor(e.target.value);
          setHexColor(colorNames(e.target.value));
        }}
      />
    </form>
  );
}

export default Input;
