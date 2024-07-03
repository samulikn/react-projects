import Square from "./Square";
import Input from "./Input";
import { useState } from "react";
import "./index.css";

function App() {
  const [inputColor, setInputColor] = useState("");
  const [hexColor, setHexColor] = useState("");

  return (
    <div className="flex flex-col gap-3 justify-start items-center min-h-screen bg-slate-100 w-3xl font-serif">
      <h1 className="text-5xl my-8 text-slate-900">Change Color</h1>
      <Square inputColor={inputColor} hexColor={hexColor} />
      <Input
        inputColor={inputColor}
        setInputColor={setInputColor}
        hexColor={hexColor}
        setHexColor={setHexColor}
      />
    </div>
  );
}

export default App;
