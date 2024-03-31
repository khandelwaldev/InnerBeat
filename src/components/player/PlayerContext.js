import { createContext, useContext, useState, useRef, useEffect } from "react";
import he from "he";

const PlayerContext = createContext();

export function usePlayer() {
  return useContext(PlayerContext);
}

export function PlayerProvider({ children }) {
  const [currentSong, setCurrentSong] = useState(null);
  const [currentSongTitle, setCurrentSongTitle] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playlist, setPlaylist] = useState([]);
  const audioRef = useRef(null);

  const playSong = (song) => {
    if (song && song.name) {
      setCurrentSong(song);
      setCurrentSongTitle(song.name);
    }
  };

  const stopSong = () => {
    setCurrentSong(null);
    setCurrentSongTitle("");
  };

  const handlePlayPauseSong = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handlePrevSong = () => {
    if (playlist.length === 0) return;

    const currentIndex = playlist.findIndex(
      (song) => song.id === currentSong.id
    );
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;

    playSong(playlist[prevIndex]);
  };

  const handleNextSong = () => {
    if (playlist.length === 0) return;

    const currentIndex = playlist.findIndex(
      (song) => song.id === currentSong.id
    );
    const nextIndex = (currentIndex + 1) % playlist.length;

    playSong(playlist[nextIndex]);
  };

  const handleTimeSeek = (e) => {
    const newTime = e.target.value;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleSongEnd = () => {
    handleNextSong();
  };

  const addToPlaylist = (songs) => {
    setPlaylist((prevPlaylist) => {
      if (Array.isArray(songs)) {
        return [...prevPlaylist, ...songs];
      } else if (songs) {
        return [...prevPlaylist, songs];
      }
      return prevPlaylist;
    });
  };

  useEffect(() => {
    audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
    audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);
    audioRef.current.addEventListener("ended", handleSongEnd);

    return () => {
      audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
      audioRef.current.removeEventListener(
        "loadedmetadata",
        handleLoadedMetadata
      );
      audioRef.current.removeEventListener("ended", handleSongEnd);
    };
  }, []);

  useEffect(() => {
    if (currentSong) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: he.decode(currentSong.name),
        artist: currentSong.primaryArtists,
        album: he.decode(currentSong.album.name),
        artwork: [
          {
            src: currentSong.image[2].link,
            sizes: "128x128 256x256",
            type: "image/x-icon",
          },
        ],
      });

      navigator.mediaSession.setActionHandler("previoustrack", handlePrevSong);
      navigator.mediaSession.setActionHandler("nexttrack", handleNextSong);

      document.title = `${he.decode(currentSongTitle)} - InnerBeat`;
      audioRef.current.src = currentSong.downloadUrl[3].link; // Assuming you want 160kbps quality
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      document.title = "InnerBeat";
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [currentSong]);

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        playSong,
        stopSong,
        currentSongTitle,
        isPlaying,
        currentTime,
        duration,
        handlePlayPauseSong,
        handlePrevSong,
        handleNextSong,
        handleTimeSeek,
        isPlaying,
        addToPlaylist,
      }}
    >
      {children}
      <audio ref={audioRef} />
    </PlayerContext.Provider>
  );
}
