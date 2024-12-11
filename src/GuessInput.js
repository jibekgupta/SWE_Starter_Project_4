import React, { useState } from 'react';
import TextField from "@mui/material/TextField";

function GuessInput({ allSolutions, foundSolutions, correctAnswerCallback }) {
  const [labelText, setLabelText] = useState("Make your first guess!");
  const [input, setInput] = useState("");

  function evaluateInput() {
    const wordToCheck = input.toLowerCase();
    if (foundSolutions.includes(wordToCheck)) {
      setLabelText(`${wordToCheck} has already been found!`);
    } else if (allSolutions.includes(wordToCheck)) {
      correctAnswerCallback(wordToCheck);
      setLabelText(`${wordToCheck} is correct!`);
    } else {
      setLabelText(`${wordToCheck} is incorrect!`);
    }
    setInput("");
  }

  function keyPress(e) {
    if (e.key === 'Enter') {
      evaluateInput();
    }
  }

  return (
    <div className="Guess-input">
      <div>{labelText}</div>
      <TextField
        onKeyPress={(e) => keyPress(e)}
        onChange={(event) => setInput(event.target.value)}
      />
    </div>
  );
}

export default GuessInput;