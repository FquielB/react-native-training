import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import RandomNumber from "./RandomNumber";
import shuffle from "lodash.shuffle";

export default function Game({
  randomNumberCount,
  initialSeconds,
  onPlayAgain,
  calcScore,
  score,
}) {
  const [randomNumbers, setRandomNumbers] = useState([]);
  const [target, setTarget] = useState(0);
  const [selectedIds, setSelectedIds] = useState([]);
  const [gameState, setGameState] = useState("PLAYING");
  const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds);
  const intervalId = useRef();

  useEffect(() => {
    initNumbers();
    initTimer();
    return () => {
      clearInterval(intervalId.current);
    };
  }, []);

  useEffect(() => {
    if (remainingSeconds === 0) {
      clearInterval(intervalId.current);
      setGameState(gameStatus());
    }
  }, [remainingSeconds]);

  useEffect(() => {
    if (target != 0) {
      setGameState(gameStatus());
    }
  }, [selectedIds]);

  useEffect(() => {
    if (gameState !== "PLAYING") {
      calcScore(remainingSeconds, gameState);
    }
  }, [gameState]);

  const initNumbers = () => {
    let randomNumbersValues = Array.from({ length: randomNumberCount }).map(
      () => 1 + Math.floor(10 * Math.random())
    );
    setRandomNumbers(shuffle(randomNumbersValues));
    setTarget(
      randomNumbersValues
        .slice(0, randomNumberCount - 2)
        .reduce((acc, curr) => acc + curr, 0)
    );
  };

  const initTimer = () => {
    intervalId.current = setInterval(() => {
      setRemainingSeconds((prevRemainingSecond) => prevRemainingSecond - 1);
    }, 1000);
  };

  const isNumberSelected = (numberIndex) => {
    return selectedIds.indexOf(numberIndex) != -1;
  };

  const selectNumber = (numberIndex) => {
    setSelectedIds([...selectedIds, numberIndex]);
  };

  const gameStatus = () => {
    const sumSelected = selectedIds.reduce((acc, curr) => {
      return acc + randomNumbers[curr];
    }, 0);
    if (sumSelected < target && remainingSeconds > 0) {
      return "PLAYING";
    }
    clearInterval(intervalId.current);
    if (remainingSeconds === 0) {
      return "LOST";
    } else if (sumSelected > target) {
      return "LOST";
    }

    return "WON";
  };
  return (
    <View style={styles.container}>
      <Text style={styles.score}>Score: {score}</Text>
      <Text style={[styles.target, styles[`STATUS_${gameState}`]]}>
        {target}
      </Text>
      <View style={styles.randomNumbersContainer}>
        {randomNumbers.map((number, index) => (
          <RandomNumber
            key={index}
            id={index}
            number={number}
            isDisable={isNumberSelected(index) || gameState != "PLAYING"}
            onPress={selectNumber}
          />
        ))}
      </View>

      <View style={styles.playAgainBtn}>
        {gameState !== "PLAYING" ? (
          <Button title="Play Again" onPress={() => onPlayAgain(gameState)} />
        ) : null}
      </View>
      <Text style={styles.timer}>Time left: {remainingSeconds}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  target: {
    borderRadius: 10,
    fontSize: 50,
    margin: 50,
    marginTop: 20,
    textAlign: "center",
  },
  randomNumbersContainer: {
    flexWrap: "wrap",
    flex: 0.9,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  STATUS_PLAYING: {
    backgroundColor: "#bbb",
  },
  STATUS_WON: {
    backgroundColor: "green",
  },
  STATUS_LOST: {
    backgroundColor: "red",
  },
  timer: {
    fontSize: 42,
  },
  score: {
    marginTop: 40,
    fontSize: 24,
  },
  playAgainBtn: {
    flex: 0.1,
    marginHorizontal: 20,
  },
});
