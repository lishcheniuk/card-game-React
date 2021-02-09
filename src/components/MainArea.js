import React, { useContext } from "react";
import { RootContext } from "../context/rootContext";

export const MainArea = () => {
  const { remainCards, joker, putCards } = useContext(RootContext);

  return (
    <div className="main__area">
      <div className="cards__remain">
        {remainCards.length && (
          <div
            className="card-i joker"
            style={{
              backgroundImage: `url(/images/${joker.img})`,
              backgroundPosition: joker.pos_img
            }}
          ></div>
        )}

        {remainCards.length > 1 && (
          <>
            <div className="card-i remain"></div>
            <div className="cards__remain-length">{remainCards.length}</div>
          </>
        )}
      </div>
      <div className="main__area-action">
        {putCards.map((item, idx) => (
          <div className="reject" key={idx}>
            <div className="reject-wrap">
              <div
                className="card-i"
                style={{
                  backgroundImage: `url(/images/${item[0].img})`,
                  backgroundPosition: item[0].pos_img
                }}
              ></div>
              {item.length === 2 ? (
                <div
                  className="card-i more-card"
                  style={{
                    backgroundImage: `url(/images/${item[1].img})`,
                    backgroundPosition: item[1].pos_img
                  }}
                ></div>
              ) : (
                ""
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
