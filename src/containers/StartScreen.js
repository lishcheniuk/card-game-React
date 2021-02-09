import React, { useContext, useState } from "react";
import { AudioStart } from "../components/AudioStart";
import { RootContext } from "../context/rootContext";
import "./StartScreen.scss";

export const StartScreen = ({ startGame }) => {
  const [loading, setLoading] = useState(false);

  const { shuffleCards, showAlertAction } = useContext(RootContext);

  const enterSound = () => {
    const audio = new Audio("/audio/Sound_mouse.mp3");
    audio.play().catch((err) => {});
  };

  const newGame = () => {
    setLoading(true);

    const timeout = setTimeout(() => {
      clearTimeout(timeout);
      shuffleCards();
      showAlertAction("Вы ходите первым!");
      setLoading(false);
      startGame();
    }, 2000);
  };

  return (
    <div className="start__screen">
      <AudioStart />

      {loading ? (
        <div className="loader"></div>
      ) : (
        <div className="menu">
          <p>
            <b>Menu</b>
          </p>
          <ul>
            <li onClick={newGame} onMouseEnter={enterSound}>
              New Game
            </li>
            <li onMouseEnter={enterSound}>Exit</li>
          </ul>
        </div>
      )}
    </div>
  );
};
