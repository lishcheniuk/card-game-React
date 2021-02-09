import React, { useReducer } from "react";
import { RootContext } from "./rootContext";
import { RootReducer } from "./rootReducer";
import { dataCards } from "../data-cards";
import {
  DISTRIB_CARDS,
  SHUFFLE,
  MOVE,
  FIGHT_OFF,
  EXIT,
  TAKE_CARDS,
  ADD_CARDS,
  SHOW_ALERT,
  HIDE_ALERT
} from "./types";

export const RootState = ({ children }) => {
  const initialState = {
    allCards: [],
    remainCards: [],
    myCards: [],
    opponentCards: [],
    joker: null,
    putCards: [],
    message: ""
  };

  const [state, dispatch] = useReducer(RootReducer, initialState);

  const shuffleCards = () => {
    const cards = [];

    dataCards.forEach((item) => {
      item.cards_name.forEach((card) => {
        cards.push({ ...card, type: item.type, img: item.img });
      });
    });

    cards.sort(() => 0.5 - Math.random());

    dispatch({ type: SHUFFLE, cards });
    dispatch({ type: DISTRIB_CARDS });
  };

  const moveCardAction = (isMove, index) => {
    dispatch({ type: MOVE, index, isMove });
  };

  const fightOffAction = (isMove, index) => {
    dispatch({ type: FIGHT_OFF, index, isMove });
  };

  const takeCardsAction = (isMove) => {
    dispatch({ type: TAKE_CARDS, isMove });
    dispatch({ type: ADD_CARDS, isMove });
  };

  const addCardsAction = (isMove) => {
    dispatch({ type: ADD_CARDS, isMove });
  };

  const showAlertAction = (message) => {
    dispatch({ type: SHOW_ALERT, message });

    const timeout = setTimeout(() => {
      clearTimeout(timeout);
      dispatch({ type: HIDE_ALERT });
    }, 1500);
  };

  const exitGameAction = () => {
    dispatch({ type: EXIT });
  };

  return (
    <RootContext.Provider
      value={{
        allCards: state.allCards,
        myCards: state.myCards,
        opponentCards: state.opponentCards,
        remainCards: state.remainCards,
        putCards: state.putCards,
        message: state.message,
        joker: state.joker,
        shuffleCards,
        moveCardAction,
        fightOffAction,
        exitGameAction,
        takeCardsAction,
        addCardsAction,
        showAlertAction
      }}
    >
      {children}
    </RootContext.Provider>
  );
};
