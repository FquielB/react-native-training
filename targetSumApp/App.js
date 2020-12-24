import React, { useState } from "react";
import Game from "./src/components/Game";

export default function App() {
  const [gameId, setGameId] = useState(0);
  //TODO: ADD SCORE AS STATE, RANDOMNUMBERCOUNT AND INITIALSeconds the same, Finally if lost show
  //score and reset it score has to depend on the difficulty of the game is the game is harder more score you won
  //Upgrade the design of the game
  const resetGame = () => {
    setGameId((prevGameId) => prevGameId + 1);
  };
  return (
    <Game
      key={gameId}
      onPlayAgain={resetGame}
      randomNumberCount={6}
      initialSeconds={10}
    />
  );
}
