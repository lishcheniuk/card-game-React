import React, { useContext, useRef } from "react";
import { Transition } from "react-transition-group";
import { RootContext } from "../context/rootContext";

export const Alert = () => {
  const { message } = useContext(RootContext);
  const nodeRef = useRef(null);

  const styleDefault = {
    width: "200px",
    position: "fixed",
    zIndex: 1000,
    left: "40%",
    top: "40%",
    backgroundColor: "#000",
    color: "#fff",
    textAlign: "center",
    fontSize: "18px",
    padding: "10px 30px",
    borderRadius: "10px"
  };

  const styleTransition = {
    entering: {
      transform: "scale(0.1)"
    },
    entered: {
      transform: "scale(1)",
      transition: "transform 0.5s"
    },
    exiting: {
      display: "none"
    },
    exited: {
      display: "none"
    }
  };

  return (
    <Transition in={!!message} timeout={500} nodeRef={nodeRef} appear>
      {(state) => (
        <div style={{ ...styleDefault, ...styleTransition[state] }}>
          {message}
        </div>
      )}
    </Transition>
  );
};
