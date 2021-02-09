import React, { useRef, useState } from "react";

export const AudioStart = () => {
  const [audio, setAudio] = useState(false);

  const elAudio = useRef();

  const audioHandler = () => {
    //!audio ? elAudio.current.play().catch((e) => {}) : elAudio.current.pause();
    setAudio(!audio);
  };

  return (
    <>
      <audio ref={elAudio} src="/audio/Sound_20996.mp3" loop></audio>
      <div className="sound" onClick={audioHandler}>
        {!audio ? (
          <i className="fas fa-volume-mute"></i>
        ) : (
          <i className="fas fa-volume-down"></i>
        )}
      </div>
    </>
  );
};
