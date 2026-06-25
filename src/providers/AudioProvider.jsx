import { useEffect, useRef } from "react";
import useSpotifyStore from "../store/spotifyStore";

const AudioProvider = ({ children }) => {
  const audioRef = useRef(null);
  const { setSongTrack, nextSongHandle } = useSpotifyStore();

  useEffect(() => {
    setSongTrack(audioRef.current);
  }, []);

  return (
    <>
      <audio ref={audioRef} onEnded={nextSongHandle} />
      {children}
    </>
  );
};

export default AudioProvider;
