import { useEffect, useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(true);

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const calculateResult = () => {
    try {
      const result = eval(input).toString();

      setHistory((prev) => [...prev, `${input} = ${result}`]);

      setInput(result);
    } catch {
      setInput("Error");
    }
  };

  const clearInput = () => {
    setInput("");
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const deleteLast = () => {
    setInput(input.slice(0, -1));
  };

  const scientificFunction = (func) => {
    try {
      let result;

      switch (func) {
        case "sqrt":
          result = Math.sqrt(eval(input));
          break;

        case "square":
          result = Math.pow(eval(input), 2);
          break;

        case "sin":
          result = Math.sin(eval(input));
          break;

        case "cos":
          result = Math.cos(eval(input));
          break;

        default:
          return;
      }

      result = result.toString();

      setHistory((prev) => [...prev, `${func}(${input}) = ${result}`]);

      setInput(result);
    } catch {
      setInput("Error");
    }
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (
        (e.key >= "0" && e.key <= "9") ||
        ["+", "-", "*", "/", ".", "(", ")", "%"].includes(e.key)
      ) {
        setInput((prev) => prev + e.key);
      }

      if (e.key === "Enter") {
        calculateResult();
      }

      if (e.key === "Backspace") {
        deleteLast();
      }

      if (e.key === "Escape") {
        clearInput();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [input]);

  const buttons = [
  "(",
  ")",
  "%",
  "/",
  "7",
  "8",
  "9",
  "*",
  "4",
  "5",
  "6",
  "-",
  "1",
  "2",
  "3",
  "+",
  "0",
  ".",
  "=",
];

  return (
    <div
      className={
        darkMode
          ? "min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black flex flex-col justify-center items-center px-4 transition-all duration-500"
          : "min-h-screen bg-gradient-to-br from-[#f8ede3] via-[#f9dcc4] to-[#fecdd3] flex flex-col justify-center items-center px-4 transition-all duration-500"
      }
    >

      {/* Floating Glow */}
      <div className="absolute w-72 h-72 bg-cyan-500 blur-3xl opacity-20 rounded-full top-10 left-10"></div>

      <div className="absolute w-72 h-72 bg-purple-500 blur-3xl opacity-20 rounded-full bottom-10 right-10"></div>

      {/* Header */}
      <div className="flex justify-between items-center w-full max-w-md mb-8">

        <h1 className="text-3xl md:text-5xl font-bold text-cyan-400">
          CALCULATOR
        </h1>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-cyan-500 hover:bg-cyan-400 text-black px-5 py-3 rounded-2xl font-bold transition duration-300 shadow-lg"
        >
          {darkMode ? "Light" : "Dark"}
        </button>

      </div>

      {/* Calculator */}
      <div
        className={
          darkMode
            ? "backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-6 w-full max-w-md"
            : "backdrop-blur-lg bg-[#fff8f0]/70 border border-white/50 rounded-3xl shadow-2xl p-6 w-full max-w-md"
        }
      >

        {/* Display */}
        <div
          className={
            darkMode
              ? "bg-black/40 rounded-2xl p-6 text-right text-white text-4xl overflow-x-auto mb-6 shadow-inner"
              : "bg-[#fffaf5] rounded-2xl p-6 text-right text-black text-4xl overflow-x-auto mb-6 shadow-inner"
          }
        >
          {input || "0"}
        </div>

        {/* Top Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-4">

          <button
            onClick={clearInput}
            className="bg-red-500 hover:bg-red-400 text-white py-4 rounded-2xl text-xl font-bold transition duration-300"
          >
            AC
          </button>

          <button
            onClick={deleteLast}
            className="bg-yellow-500 hover:bg-yellow-400 text-black py-4 rounded-2xl text-xl font-bold transition duration-300"
          >
            DEL
          </button>

        </div>

        {/* Scientific Buttons */}
        <div className="grid grid-cols-4 gap-4 mb-4">

          <button
            onClick={() => scientificFunction("sqrt")}
            className="bg-purple-500 hover:bg-purple-400 text-white py-4 rounded-2xl font-bold transition"
          >
            √
          </button>

          <button
            onClick={() => scientificFunction("square")}
            className="bg-purple-500 hover:bg-purple-400 text-white py-4 rounded-2xl font-bold transition"
          >
            x²
          </button>

          <button
            onClick={() => scientificFunction("sin")}
            className="bg-purple-500 hover:bg-purple-400 text-white py-4 rounded-2xl font-bold transition"
          >
            sin
          </button>

          <button
            onClick={() => scientificFunction("cos")}
            className="bg-purple-500 hover:bg-purple-400 text-white py-4 rounded-2xl font-bold transition"
          >
            cos
          </button>

        </div>

        {/* Main Buttons */}
        <div className="grid grid-cols-4 gap-4">

          {buttons.map((btn, index) => (
            <button
              key={index}
              onClick={() =>
                btn === "="
                  ? calculateResult()
                  : handleClick(btn)
              }
              className={`py-5 rounded-2xl text-2xl font-bold transition duration-300 hover:scale-105 shadow-lg
              ${
                btn === "="
                  ? "bg-cyan-500 hover:bg-cyan-400 text-black"
                  : darkMode
                  ? "bg-white/10 hover:bg-white/20 text-white"
                  : "bg-[#fffaf5] hover:bg-[#fde2e4] text-black"
              }`}
            >
              {btn}
            </button>
          ))}

        </div>

      </div>

      {/* History */}
      <div className="mt-10 w-full max-w-md">

        <div className="flex justify-between items-center mb-4">

          <h2 className="text-2xl font-bold text-cyan-400">
            History
          </h2>

          <button
            onClick={clearHistory}
            className="bg-red-500 hover:bg-red-400 px-4 py-2 rounded-xl text-white transition"
          >
            Clear
          </button>

        </div>

        <div
          className={
            darkMode
              ? "bg-white/10 backdrop-blur-lg rounded-2xl p-4 max-h-60 overflow-y-auto border border-white/20"
              : "bg-[#fff8f0]/70 backdrop-blur-lg rounded-2xl p-4 max-h-60 overflow-y-auto border border-white/40"
          }
        >

          {history.length === 0 ? (
            <p className="text-gray-400">
              No calculations yet.
            </p>
          ) : (
            history.map((item, index) => (
              <p
                key={index}
                className={
                  darkMode
                    ? "text-white border-b border-white/10 py-2"
                    : "text-black border-b border-black/10 py-2"
                }
              >
                {item}
              </p>
            ))
          )}

        </div>

      </div>

    </div>
  );
}

export default App;