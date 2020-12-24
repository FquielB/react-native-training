import React, { useRef, useState } from "react";
import Game from "./src/components/Game";

export default function App() {
  const [gameId, setGameId] = useState(0);
  const [score, setScore] = useState(0);

  const randomNumberCount = useRef(6);
  const initialSeconds = useRef(20);
  const isInitialSecondsUpdated = useRef(false);

  const resetGame = (gameState) => {
    if (gameState === "WON") {
      if (randomNumberCount.current < 12 && !isInitialSecondsUpdated.current) {
        randomNumberCount.current++;
        isInitialSecondsUpdated.current = true;
      }
      if (initialSeconds.current > 5 && isInitialSecondsUpdated.current) {
        initialSeconds.current--;
        isInitialSecondsUpdated.current = false;
      }
    }
    setGameId((prevGameId) => prevGameId + 1);
  };

  const calcScore = (remainingSeconds, gameState) => {
    if (gameState === "WON") {
      setScore(
        (prevScore) =>
          prevScore +
          100 * randomNumberCount.current +
          (1000 / initialSeconds.current) *
            (remainingSeconds / initialSeconds.current)
      );
    } else if (gameState === "LOST") {
      alert(`Good job! Your score is: ${score}`);
      setScore(0);
      randomNumberCount.current = 6;
      initialSeconds.current = 20;
    }
  };

  return (
    <Game
      key={gameId}
      onPlayAgain={resetGame}
      randomNumberCount={randomNumberCount.current}
      initialSeconds={initialSeconds.current}
      calcScore={calcScore}
      score={score}
    />
  );
}
