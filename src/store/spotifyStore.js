// store/useSpotifyStore.js
import { create } from "zustand";
import toast from "react-hot-toast";
import song1 from "../assets/music/taylor-style.mp3";
import song2 from "../assets/music/Ellie-Goulding-Hate-Me.mp3";
import song3 from "../assets/music/lana-ulteraviolet.mp3";
import pic1 from "../assets/img/taylor.jfif";
import pic2 from "../assets/img/ellie.jfif";
import pic3 from "../assets/img/lana.jfif";

const initialSongs = [
  {
    id: 1,
    title: "Style",
    singer: "Taylor Swift",
    cover: pic1,
    track: song1,
    active: false,
    isFavorite: false,
    isPlaying: false,
  },
  {
    id: 2,
    title: "Hate Me",
    singer: "Ellie Goulding",
    cover: pic2,
    track: song2,
    active: false,
    isFavorite: false,
    isPlaying: false,
  },
  {
    id: 3,
    title: "Ultraviolet",
    singer: "Lana Del Rey",
    cover: pic3,
    track: song3,
    active: false,
    isFavorite: false,
    isPlaying: false,
  },
];

const useSpotifyStore = create((set, get) => ({
  songData: initialSongs,
  songTrack: null,

  getCurrentSong: () => get().songData.filter((item) => item.active),
  setSongTrack: (audioEl) => set({ songTrack: audioEl }),
  playHandle: (id) => {
    const { songData, songTrack } = get();
    const target = songData.find((item) => item.id === id);
    const isAlreadyActive = target.active;
    if (isAlreadyActive) {
      if (target.isPlaying) {
        songTrack.pause();
      } else {
        songTrack.play();
      }
      set({
        songData: songData.map((item) =>
          item.id === id ? { ...item, isPlaying: !item.isPlaying } : item,
        ),
      });
      return;
    }

    songTrack.src = target.track;
    songTrack.load();

    const onCanPlay = () => {
      songTrack.play();
      songTrack.removeEventListener("canplay", onCanPlay);
    };
    songTrack.addEventListener("canplay", onCanPlay);

    set({
      songData: songData.map((item) => ({
        ...item,
        active: item.id === id,
        isPlaying: item.id === id,
      })),
    });
  },

  toggleFavorite: (id) => {
    const { songData } = get();
    const newSongData = songData.map((item) =>
      item.id === id ? { ...item, isFavorite: !item.isFavorite } : item,
    );
    const target = newSongData.find((item) => item.id === id);
    target.isFavorite
      ? toast.success("Added to favorites!", {
          position: "top-center",
          theme: "dark",
        })
      : toast.error("Removed from favorites!", {
          position: "top-center",
          theme: "dark",
        });
    set({ songData: newSongData });
  },

  nextSongHandle: () => {
    const { songData, songTrack, getCurrentSong } = get();
    const current = getCurrentSong();
    if (!current.length) return;
    const index = songData.findIndex((item) => item.id === current[0].id);
    const nextIdx = index === songData.length - 1 ? 0 : index + 1;
    const next = songData[nextIdx];
    songTrack.src = next.track; // or prev.track
    songTrack.load();
    const onCanPlay = () => {
      songTrack.play();
      songTrack.removeEventListener("canplay", onCanPlay);
    };
    songTrack.addEventListener("canplay", onCanPlay);
    set({
      songData: songData.map((item) => ({
        ...item,
        active: item.id === next.id,
        isPlaying: item.id === next.id,
      })),
    });
  },

  prevSongHandle: () => {
    const { songData, songTrack, getCurrentSong } = get();
    const current = getCurrentSong();
    if (!current.length) return;
    const index = songData.findIndex((item) => item.id === current[0].id);
    const prevIdx = index === 0 ? songData.length - 1 : index - 1;
    const prev = songData[prevIdx];
    songTrack.src = prev.track;
    songTrack.play();
    set({
      songData: songData.map((item) => ({
        ...item,
        active: item.id === prev.id,
        isPlaying: item.id === prev.id,
      })),
    });
  },
}));

export default useSpotifyStore;
