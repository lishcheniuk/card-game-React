import React from "react";

export const OpponentArea = ({
  cards,
  fightOff,
  moveCard,
  clickButton,
  isMyMove,
  isThrowCards,
  putCards
}) => {
  // const clickCardHandler = (idx) => {
  //   if (isMyMove) {
  //     let timeout = setTimeout(() => {
  //       fightOff(idx);
  //     }, 100);
  //   } else {
  //     moveCard(idx);
  //   }
  // };

  const getRotateDeg = (idx) => {
    let num =
      cards.length > 3
        ? 125
        : cards.length === 3
        ? 110
        : cards.length === 2
        ? 88
        : 0;
    let num2 = cards.length > 12 ? 5 : 8;

    return 180 / cards.length + idx * num2 + num;
  };

  return (
    <div className="oponent__area">
      {cards.map((card, idx) => (
        <div
          className="card-i"
          key={idx}
          style={{
            transform: `rotate(-${getRotateDeg(idx)}deg)`,
            marginLeft: cards.length > 10 ? "-80px" : "-60px"
          }}
        ></div>
      ))}
    </div>
  );
};
