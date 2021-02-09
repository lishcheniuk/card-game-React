import React, { useContext, useEffect, useMemo, useState } from "react";
import { Alert } from "../components/Alert";
import { MainArea } from "../components/MainArea";
import { MyArea } from "../components/MyArea";
import { OpponentArea } from "../components/OpponentArea";
import { RootContext } from "../context/rootContext";
import "./MainScreen.scss";

export const MainScreen = ({ exitGame }) => {
  const {
    myCards,
    putCards,
    joker,
    remainCards,
    opponentCards,
    moveCardAction,
    fightOffAction,
    exitGameAction,
    takeCardsAction,
    addCardsAction,
    showAlertAction,
  } = useContext(RootContext);

  const [move, switchMove] = useState(true);
  const [controlButton, showControlButton] = useState(false);
  let timeout = null;

  const isExitGame = useMemo(() => {
    return !remainCards.length && (!myCards.length || !opponentCards.length);
  }, [remainCards, myCards, opponentCards]);

  useEffect(() => {
    if (isExitGame) {
      let timeoutExit = setTimeout(() => {
        clearTimeout(timeoutExit);
        clearTimeout(timeout);

        if (myCards.length) {
          alert("You lose!");
        } else {
          alert("You Win!");
        }
        exit();
      }, 1000);
    }
    // eslint-disable-next-line
  }, [isExitGame]);

  const isAddCards = useMemo(() => {
    return putCards.flat().some((putCard) => {
      const count = myCards.reduce((acc, card) => {
        return (acc += card.name === putCard.name ? 1 : 0);
      }, 0);

      return count > 1;
    });
  }, [putCards, myCards]);

  const exit = () => {
    exitGame();
    exitGameAction();
  };

  const getFightCardIndexComputer = (idx) => {
    return opponentCards.findIndex(
      (card) =>
        card.strong > myCards[idx].strong &&
        (card.type === myCards[idx].type || card.type === joker.type)
    );
  };

  const getAddCardIndexComputer = (idx) => {
    return opponentCards.findIndex((oppItem) => {
      return oppItem.name === myCards[idx].name;
    });
  };

  const isFight = (idx) => {
    let putCard = putCards[putCards.length - 1][0];

    return (
      myCards[idx].strong > putCard.strong &&
      (myCards[idx].type === putCard.type || myCards[idx].type === joker.type)
    );
  };

  const isThrowCards = () => {
    let isThrow = false;

    if (putCards.length) {
      isThrow = putCards.every((item) => item.length === 2);
    }
    return isThrow;
  };

  const isAddCard = (idx) => {
    return putCards.flat().some((card) => {
      return card.name === myCards[idx].name;
    });
  };

  const answerPlayer = (typeAnswer, idx = 0) => {
    if (typeAnswer === "take") {
      if (move) {
        if (isAddCards) {
          showAlertAction("Соперник забирает. Можете подкинуть");
          showControlButton(true);
        } else {
          takeCardsAction(move);
        }
      } else {
        takeCardsAction(move);

        timeout = setTimeout(() => {
          clearTimeout(timeout);
          let index = randomInteger(0, opponentCards.length - 1);
          moveCardAction(move, index);
        }, 1000);
      }
    }

    if (typeAnswer === "pass") {
      takeCardsAction(move);
      showControlButton(false);
    }

    if (typeAnswer === "strike") {
      switchMove((prevState) => !prevState);
      addCardsAction(move);

      if (move) {
        showAlertAction("Ход соперника");

        timeout = setTimeout(() => {
          clearTimeout(timeout);
          let randomInt = randomInteger(0, opponentCards.length - 1);
          moveCardAction(false, randomInt);
        }, 1000);
      }
    }
  };

  const clickCardHandler = (idx) => {
    if (!move) {
      if (isFight(idx)) {
        fightOffAction(move, idx);

        timeout = setTimeout(() => {
          clearTimeout(timeout);

          if (getAddCardIndexComputer(idx) !== -1) {
            moveCardAction(move, getAddCardIndexComputer(idx));
          } else {
            answerPlayer("strike");
            showAlertAction("Ваш ход");
          }
        }, 1000);
      }
    } else {
      if (
        (isAddCard(idx) && isThrowCards()) ||
        putCards.length === 0 ||
        controlButton
      ) {
        moveCardAction(move, idx);

        timeout = setTimeout(() => {
          clearTimeout(timeout);

          if (getFightCardIndexComputer(idx) !== -1) {
            fightOffAction(move, getFightCardIndexComputer(idx));
          } else {
            answerPlayer("take", idx);
          }
        }, 1000);
      }
    }
  };

  return (
    <div className="game__wrap">
      <Alert />

      <OpponentArea cards={opponentCards} />

      <MainArea />

      <MyArea
        isMyMove={move}
        isThrowCards={isThrowCards}
        showButton={controlButton}
        clickButton={answerPlayer}
        clickCard={clickCardHandler}
      />

      <div className="exit control-button" onClick={exit}>
        <i className="fas fa-sign-out-alt"></i> Quit
      </div>
    </div>
  );
};

function randomInteger(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}
