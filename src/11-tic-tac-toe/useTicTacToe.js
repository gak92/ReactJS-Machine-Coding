import { useState } from "react";

const Players = {
  A: 0,
  B: 1,
};

const PlayerIcon = {
  [Players.A]: "X",
  [Players.B]: "O",
};

const DefaultTurns = {
  [Players.A]: [],
  [Players.B]: [],
};

const WinningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function useTicTacToe() {
  const buttons = Array.from({ length: 9 }, (_, index) => index + 1);
  const [activePlayer, setActivePlayer] = useState(Players.A);
  const [playerTurns, setPlayerTurns] = useState(structuredClone(DefaultTurns));
  const [message, setMessage] = useState("");

  function handleTurn(index) {
    return () => {
      const newPlayer = activePlayer === Players.A ? Players.B : Players.A;

      const playerATurn = playerTurns[Players.A];
      const playerBTurn = playerTurns[Players.B];

      if (
        playerATurn.includes(String(index)) ||
        playerBTurn.includes(String(index))
      ) {
        return;
      }

      const oldPlayerTurns = structuredClone(playerTurns);
      oldPlayerTurns[activePlayer].push(String(index));

      const isWon = isPlayerWon(oldPlayerTurns[activePlayer]);

      if (isWon) {
        setPlayerTurns(oldPlayerTurns);
        setMessage(`${PlayerIcon[activePlayer]} Won the Game`);
        return;
      }
      setPlayerTurns(oldPlayerTurns);
      setActivePlayer(newPlayer);
    };
  }

  function isPlayerWon(playerTurns) {
    console.log("playerTurns", playerTurns);

    return WinningCombinations.some((combination) => {
      const [a, b, c] = combination;
      return (
        playerTurns.includes(String(a)) &&
        playerTurns.includes(String(b)) &&
        playerTurns.includes(String(c))
      );
    });
  }

  //   console.log(playerTurns);

  function handleRestart() {
    setPlayerTurns(structuredClone(DefaultTurns));
    setActivePlayer(Players.A);
    setMessage("");
  }

  return {
    buttons,
    handleTurn,
    message,
    handleRestart,
    activePlayer,
    playerTurns,
    PlayerIcon,
  };
}

export default useTicTacToe;
