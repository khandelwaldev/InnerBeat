import { usePlayer } from "./PlayerContext";
import { useState, useEffect } from "react";
import he from "he";
import PauseIcon from "../icons/PauseIcon";
import PlayIcon from "../icons/PlayIcon";
import SkipForwardIcon from "../icons/SkipForwardIcon";
import SkipBackwardIcon from "../icons/SkipBackwardIcon";
import BottomIcon from "../icons/BottomIcon";

const BottomPlayer = () => {
  const {
    currentSong,
    handlePlayPauseSong,
    isPlaying,
    currentSongTitle,
    currentTime,
    duration,
    handleTimeSeek,
    handlePrevSong,
    handleNextSong,
  } = usePlayer();

  const songImage = currentSong
    ? currentSong.image[2].link
    : "https://github.com/khandelwaldev.png";

  const artistName = currentSong
    ? currentSong.primaryArtists
    : "Not Playing any song";

  const artistId = currentSong ? currentSong.primaryArtistsId : null;

  const mainArtist = artistId ? artistId.split(", ")[0] : "";

  // console.log(mainArtist);

  // artist Info

  const [artistInfo, setArtistInfo] = useState(null);

  useEffect(() => {
    const fetchArtistData = async () => {
      try {
        const response = await axios.get(
          `https://innerbeat-api.vercel.app/artists?id=${mainArtist}`
        );
        const data = response.data;
        setArtistInfo(data.data);
      } catch (error) {
        console.error("Error fetching artist info:", error);
      }
    };

    if (mainArtist) {
      fetchArtistData();
    }
  }, [mainArtist]);

  const [isPlayerOpen, setIsPlayerOpen] = useState(null);

  const openPlayer = () => {
    setIsPlayerOpen(true);
  };

  const closePlayer = () => {
    setIsPlayerOpen(false);
  };
  return (
    <>
      <div
        className="min-[886px]:hidden fixed bottom-0 left-0 w-full h-[70px] bg-primaryBg"
        style={{ zIndex: 9999 }}
      >
        <progress
          value={currentTime}
          max={duration}
          className="h-[2px] w-full absolute top-0"
          style={{ color: "red" }}
        />
        {currentSong && (
          <div className="w-full h-full flex items-center justify-between">
            <div
              className="h-full flex items-center gap-[10px] px-3"
              style={{ width: "calc(100% - 80px)" }}
              onClick={openPlayer}
            >
              <div className="w-[55px] h-[55px]">
                <img src={songImage} className="w-full h-full rounded-md" />
              </div>
              <div
                className="flex flex-col h-[55px] justify-center"
                style={{ width: "calc(100% - 65px)" }}
              >
                <label className="line-clamp-1 text-base font-medium text-primaryText">
                  {he.decode(currentSongTitle)}
                </label>
                <label className="line-clamp-1 text-sm text-secondaryText">
                  {he.decode(artistName)}
                </label>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={handlePlayPauseSong}
                className="w-[40px] h-[55px] flex items-center justify-center"
              >
                {isPlaying ? (
                  <PauseIcon size={23} color={"#fff"} />
                ) : (
                  <PlayIcon size={22} color={"#fff"} />
                )}
              </button>
              <button
                className="w-[40px] h-[55px] flex items-center justify-center"
                onClick={handleNextSong}
              >
                <SkipForwardIcon size={23} color={"#fff"} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/*** Full Screen Player */}
      <div
        className={`fixed bottom-0 left-0 w-full ${
          isPlayerOpen ? "h-full" : "h-0"
        } bg-primaryBg overflow-hidden min-[886px]:hidden`}
        style={{ zIndex: 9999999, transition: "0.3s all" }}
      >
        {currentSong && (
          <div className="w-full h-full bg-secondaryBg flex flex-col items-center justify-center">
            <div className="w-full h-full flex flex-col items-center justify-around">
              <div className="w-[80%]">
                <img src={songImage} className="w-full h-full rounded-md" />
              </div>
              <div className="flex flex-col w-[90%] items-center justify-center">
                <label className="text-2xl font-semibold line-clamp-1">
                  {he.decode(currentSongTitle)}
                </label>
                <label className="text-lg text-secondaryText mt-2 line-clamp-1">
                  {artistName}
                </label>
                <input
                  type="range"
                  value={currentTime}
                  max={duration}
                  onChange={handleTimeSeek}
                  className="h-1 w-full accent-accent outline-none border-none mt-6"
                />
                <div className="w-full flex items-center justify-between mt-2">
                  <span className="text-base font-medium text-secondaryText">
                    {formatTime(currentTime)}
                  </span>
                  <span className="text-base text-secondaryText">
                    {formatTime(duration)}
                  </span>
                </div>
                <div className="flex items-center mt-6 justify-around w-full">
                  <button
                    className="w-[70px] h-[70px] flex items-center justify-center"
                    onClick={handlePrevSong}
                  >
                    <SkipBackwardIcon size={33} color={"#fff"} />
                  </button>
                  <button
                    onClick={handlePlayPauseSong}
                    className="w-[70px] h-[70px] rounded-full flex items-center justify-center bg-primaryBg"
                  >
                    {isPlaying ? (
                      <PauseIcon size={33} color={"#fff"} />
                    ) : (
                      <PlayIcon size={33} color={"#fff"} />
                    )}
                  </button>
                  <button
                    className="w-[70px] h-[70px] flex items-center justify-center"
                    onClick={handleNextSong}
                  >
                    <SkipForwardIcon size={33} color={"#fff"} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {/** Close Button */}
        <button
          onClick={closePlayer}
          className="w-[35px] h-[35px] flex items-center justify-center absolute top-3 left-3"
        >
          <BottomIcon size={35} color={"#fff"} />
        </button>
      </div>
    </>
  );
};

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
};

export default BottomPlayer;
