import React, { useState, useEffect, useMemo } from 'react';
import { GAME_STATE } from './GameState.js';
import Board from './Board.js';
import GuessInput from './GuessInput.js';
import FoundSolutions from './FoundSolutions.js';
import SummaryResults from './SummaryResults.js';
import ToggleGameState from './ToggleGameState.js';
import logo from './logo.png';
import './App.css';

function App() {
  const obj = require('./Boggle_Solutions_Endpoint.json');
  const [allSolutions, setAllSolutions] = useState([]);
  const [foundSolutions, setFoundSolutions] = useState([]);
  const [gameState, setGameState] = useState(GAME_STATE.BEFORE);
  const [grid, setGrid] = useState([]);
  const [totalTime, setTotalTime] = useState(0);
  const [size, setSize] = useState(3);
  const [game, setGame] = useState({});
  const myMap = useMemo(() => new Map(Object.entries(obj)), [obj]);

  useEffect(() => {
    let tmpAllSolutions = game.solutions;
    setAllSolutions(tmpAllSolutions);
  }, [grid, game]);

  useEffect(() => {
    if (gameState === GAME_STATE.IN_PROGRESS) {
      const g = myMap.get(size.toString());
      setGame(g);
      setGrid(g.grid);
      setFoundSolutions([]);
    }
  }, [gameState, size, myMap]);

  function correctAnswerFound(answer) {
    if (allSolutions.includes(answer.toLowerCase()) && !foundSolutions.includes(answer.toLowerCase())) {
      console.log("New correct answer:" + answer);
      setFoundSolutions([...foundSolutions, answer.toLowerCase()]);
    } else {
      console.log("Incorrect answer:" + answer);
    }
  }

  return (
    <div className="App">
      <img src={logo} width="25%" height="25%" className="logo" alt="Bison Boggle Logo" />
      <ToggleGameState
        gameState={gameState}
        setGameState={(state) => setGameState(state)}
        setSize={(state) => setSize(state)}
        setTotalTime={(state) => setTotalTime(state)}
      />
      {gameState === GAME_STATE.IN_PROGRESS && (
        <div>
          <Board board={grid} />
          <GuessInput
            allSolutions={allSolutions}
            foundSolutions={foundSolutions}
            correctAnswerCallback={(answer) => correctAnswerFound(answer)}
          />
          <FoundSolutions
            headerText="Solutions you've found"
            words={foundSolutions}
          />
        </div>
      )}
      {gameState === GAME_STATE.ENDED && (
        <div>
          <Board board={grid} />
          <SummaryResults
            words={foundSolutions}
            totalTime={totalTime}
          />
          <FoundSolutions
            headerText="Missed Words [wordsize > 3]: "
            words={allSolutions.filter(word => !foundSolutions.includes(word.toLowerCase()) && word.length > 3)}
          />
        </div>
      )}
    </div>
  );
}

export default App;