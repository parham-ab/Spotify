import { useContext } from "react";
import { SpotifyContext } from "../contexts/SpotifyContextProvider";
import Song from "./Song";

const SongsList = () => {
  const { songData } = useContext(SpotifyContext);
  return (
    <div className="flex flex-col overflow-auto bg-black h-full px-3 py-4">
      <p className="text-[11px] uppercase tracking-widest text-zinc-300 mb-4 px-2">
        All tracks
      </p>
      {songData?.map((item) => (
        <Song item={item} key={item.id} />
      ))}
    </div>
  );
};

export default SongsList;
