import {
  DISTRIB_CARDS,
  EXIT,
  FIGHT_OFF,
  ADD_CARDS,
  MOVE,
  SHUFFLE,
  START,
  TAKE_CARDS,
  SHOW_ALERT,
  HIDE_ALERT
} from "./types";

export const RootReducer = (state, action) => {
  switch (action.type) {
    case START:
      return {
        ...state
      };

    case SHUFFLE:
      return {
        ...state,
        allCards: action.cards
      };

    case DISTRIB_CARDS:
      const remainCards = state.allCards.concat();
      const joker = remainCards[remainCards.length - 1];

      remainCards.forEach((item, idx) => {
        if (item.type === joker.type) {
          remainCards[idx] = {
            ...remainCards[idx],
            strong: remainCards[idx].strong + 10
          };
        }
      });

      const myCards = remainCards
        .splice(0, 6)
        .sort((a, b) => a.strong - b.strong);
      const opponentCards = remainCards
        .splice(0, 6)
        .sort((a, b) => a.strong - b.strong);

      return {
        ...state,
        remainCards,
        myCards,
        opponentCards,
        joker
      };

    case MOVE:
      const putCardsMove = state.putCards.concat();
      let myCardsMove = state.myCards.concat();
      let currrentMove = "myCards";

      if (!action.isMove) {
        myCardsMove = state.opponentCards.concat();
        currrentMove = "opponentCards";
      }

      putCardsMove.push([myCardsMove[action.index]]);
      myCardsMove.splice(action.index, 1);

      return {
        ...state,
        [currrentMove]: myCardsMove,
        putCards: putCardsMove
      };

    case FIGHT_OFF:
      const putCardsFight = state.putCards.concat();
      let opponentCardsFight = state.opponentCards;
      let currrent = "opponentCards";

      if (!action.isMove) {
        opponentCardsFight = state.myCards;
        currrent = "myCards";
      }

      putCardsFight[putCardsFight.length - 1] = [
        ...putCardsFight[putCardsFight.length - 1],
        opponentCardsFight[action.index]
      ];
      opponentCardsFight = opponentCardsFight.filter(
        (_, idx) => idx !== action.index
      );

      return {
        ...state,
        [currrent]: opponentCardsFight,
        putCards: putCardsFight
      };

    case TAKE_CARDS:
      let opponentCardsTake = state.opponentCards.concat();
      let playerTakeCards = "opponentCards";

      if (!action.isMove) {
        playerTakeCards = "myCards";
        opponentCardsTake = state.myCards.concat();
      }

      return {
        ...state,
        [playerTakeCards]: opponentCardsTake
          .concat(state.putCards.flat())
          .sort((a, b) => a.strong - b.strong),
        putCards: []
      };

    case ADD_CARDS:
      const remainCardsCloneF = state.remainCards.concat();
      let myCardsForward = state.myCards.concat();
      let opponentCardsForward = state.opponentCards.concat();
      let currrentMyCards = "myCards";
      let currentOpponentCards = "opponentCards";

      if (!action.isMove) {
        myCardsForward = state.opponentCards.concat();
        opponentCardsForward = state.myCards.concat();
        currrentMyCards = "opponentCards";
        currentOpponentCards = "myCards";
      }

      if (myCardsForward.length < 6) {
        myCardsForward = [
          ...myCardsForward,
          ...remainCardsCloneF.splice(0, 6 - myCardsForward.length)
        ].sort((a, b) => a.strong - b.strong);
      }

      if (opponentCardsForward.length < 6) {
        opponentCardsForward = [
          ...opponentCardsForward,
          ...remainCardsCloneF.splice(0, 6 - opponentCardsForward.length)
        ].sort((a, b) => a.strong - b.strong);
      }

      return {
        ...state,
        putCards: [],
        remainCards: remainCardsCloneF,
        [currentOpponentCards]: opponentCardsForward,
        [currrentMyCards]: myCardsForward
      };

    case SHOW_ALERT:
      return {
        ...state,
        message: action.message
      };

    case HIDE_ALERT:
      return {
        ...state,
        message: ""
      };

    case EXIT:
      return {
        ...state,
        putCards: []
      };

    default:
      return state;
  }
};
