import "./style.css";
import useTicTacToe from "./useTicTacToe";

const Players = {
  A: 0,
  B: 1,
};

export default function TicTacToe() {
  const {
    buttons,
    handleTurn,
    message,
    handleRestart,
    activePlayer,
    playerTurns,
    PlayerIcon,
  } = useTicTacToe();

  return (
    <>
      <div className="tic-tac-toe">
        {buttons.map((_, index) => {
          const otherPlayer =
            activePlayer === Players.A ? Players.B : Players.A;
          const isOtherPlayerTurn = playerTurns[otherPlayer].includes(
            String(index),
          );
          const isCurrentPlayerTurn = playerTurns[activePlayer].includes(
            String(index),
          );

          let playerSymbol = "";

          if (isOtherPlayerTurn) {
            playerSymbol = PlayerIcon[otherPlayer];
          } else if (isCurrentPlayerTurn) {
            playerSymbol = PlayerIcon[activePlayer];
          }

          return (
            <button
              key={index}
              onClick={handleTurn(index)}
              disabled={!!message}
            >
              {playerSymbol}
            </button>
          );
        })}
      </div>
      {message && (
        <div>
          <h4>{message}</h4>
          <button onClick={handleRestart}>Restart Game</button>
        </div>
      )}
    </>
  );
}
