import React, { useContext, useRef } from "react";
import { Transition } from "react-transition-group";
import { RootContext } from "../context/rootContext";

export const MyArea = ({
  isMyMove,
  isThrowCards,
  showButton,
  clickButton,
  clickCard,
}) => {
  const btnRef = useRef(null);
  const { myCards, putCards } = useContext(RootContext);

  const getRotateDeg = (idx) => {
    let num =
      myCards.length > 3
        ? 125
        : myCards.length === 3
        ? 110
        : myCards.length === 2
        ? 88
        : 0;
    let num2 = myCards.length > 12 ? 5 : 8;

    return 180 / myCards.length + idx * num2 + num;
  };

  const transitionStyles = {
    entering: {
      opacity: 0,
    },
    entered: {
      opacity: 1,
      transition: "opacity 1s",
    },
    exiting: {
      opacity: 0,
    },
    exited: {
      opacity: 0,
    },
  };
  return (
    <React.Fragment>
      <div className="my__area">
        {myCards.map((card, idx) => (
          <div
            className="card-i"
            key={card.pos_img + idx}
            style={{
              backgroundImage: `url(/images/${card.img})`,
              backgroundPosition: card.pos_img,
              transform: `rotate(${getRotateDeg(idx)}deg)`,
              marginLeft: myCards.length > 10 ? "-80px" : "-60px",
            }}
            onClick={() => clickCard(idx)}
          ></div>
        ))}
      </div>
      <div className="control">
        <Transition
          in={!!putCards.length && !isMyMove && !isThrowCards()}
          timeout={{ enter: 500, exit: 0 }}
          nodeRef={btnRef}
        >
          {(state) => (
            <button
              className="control-button"
              style={{ ...transitionStyles[state] }}
              onClick={clickButton.bind(null, "take")}
            >
              Взять
            </button>
          )}
        </Transition>
        <Transition in={isMyMove} timeout={500} nodeRef={btnRef}>
          {(state) => {
            return isThrowCards() ? (
              <button
                className="control-button"
                style={{ ...transitionStyles[state] }}
                onClick={clickButton.bind(null, "strike")}
              >
                Бито
              </button>
            ) : showButton ? (
              <button
                className="control-button"
                style={{ ...transitionStyles[state] }}
                onClick={clickButton.bind(null, "pass")}
              >
                Пас
              </button>
            ) : (
              ""
            );
          }}
        </Transition>
      </div>
    </React.Fragment>
  );
};
