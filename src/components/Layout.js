import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";
import ArrowLeftIcon from "./icons/ArrowLeftIcon";
import SearchIcon from "./icons/SearchIcon";
import SettingsIcon from "./icons/SettingsIcon";
import PlayIcon from "./icons/PlayIcon";
import SkipForwardIcon from "./icons/SkipForwardIcon";
import SkipBackwardIcon from "./icons/SkipBackwardIcon";
import DotsVerticalIcon from "./icons/DotsVerticalIcon";
import { usePlayer } from "./player/PlayerContext";
import PauseIcon from "./icons/PauseIcon";
import axios from "axios";
import he from "he";
import BottomPlayer from "./player/BottomPlayer";
import MobNav from "./MobNav";

import { useSession, signIn, signOut } from "next-auth/react";
import Loader from "./Loader";

const Layout = ({ children }) => {
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
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const router = useRouter();

  const [query, setQuery] = useState("");

  const openSearch = () => {
    setIsSearchOpen(true);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
  };

  const inputRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(query)}`);
    closeSearch();
  };

  // useEffect(() => {
  //   inputRef.current.focus();
  // }, []);

  const sideLinks = [
    { label: "Browse", href: "/", type: "library" },
    { label: "Songs", href: "/songs", type: "library" },
    { label: "Albums", href: "/albums", type: "library" },
    { label: "Artists", href: "/artists", type: "library" },
    { label: "Radio", href: "/radio", type: "library" },
    { label: "Recently Played", href: "/recent-played", type: "myMusic" },
    { label: "Favorite Songs", href: "/favorite", type: "myMusic" },
    { label: "Playlists", href: "/playlists", type: "myMusic" },
  ];

  // music info

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

  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        closeSearch();
      }
    };

    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  // check is from instagram
  const [isInstagramBrowser, setIsInstagramBrowser] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor;
    // Check if the user is using Instagram's in-app browser
    if (/Instagram/.test(userAgent)) {
      setIsInstagramBrowser(true);
    }
  }, []);

  const copyURLToClipboard = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url)
      .then(() => {
        alert('URL copied to clipboard!');
      })
      .catch((error) => {
        console.error('Failed to copy URL: ', error);
        alert('Failed to copy URL. Please try again.');
      });
  };
  
  // auth
  const { data, status } = useSession();
  if (status === "loading") return <Loader />;
  if (status === "authenticated") {
    return (
      <div>
        {/** Sidebar */}
        <div className="hidden min-[1242px]:block fixed top-0 left-0 h-full w-[225px] bg-secondaryBg">
          <div className="ml-6 mt-6 flex flex-col gap-6">
            <div>
              <h1 className="text-2xl text-white mb-3 px-3">Library</h1>
              <div className="flex flex-col gap-2">
                {sideLinks.map(
                  (link, index) =>
                    link.type === "library" && (
                      <Link
                        href={link.href}
                        key={index}
                        className={`px-3 py-1 rounded-2xl w-fit ${
                          router.pathname === link.href
                            ? "bg-accent/15"
                            : "hover:bg-hoverBg"
                        } group`}
                      >
                        <span
                          className={`${
                            router.pathname === link.href
                              ? "text-accent"
                              : "text-secondaryText group-hover:text-primaryText"
                          } text-base`}
                        >
                          {link.label}
                        </span>
                      </Link>
                    )
                )}
              </div>
            </div>

            <div>
              <h1 className="text-2xl text-white mb-3 px-3">My Music</h1>
              <div className="flex flex-col gap-2">
                {sideLinks.map(
                  (link, index) =>
                    link.type === "myMusic" && (
                      <Link
                        href={link.href}
                        key={index}
                        className={`px-3 py-1 rounded-2xl w-fit ${
                          router.pathname === link.href
                            ? "bg-accent/15"
                            : "hover:bg-hoverBg"
                        } group`}
                      >
                        <span
                          className={`${
                            router.pathname === link.href
                              ? "text-accent"
                              : "text-secondaryText group-hover:text-primaryText"
                          } text-base`}
                        >
                          {link.label}
                        </span>
                      </Link>
                    )
                )}
              </div>
            </div>
          </div>
        </div>
        {/** Header */}
        <div
          className="max-[886px]:hidden fixed top-0 left-0 min-[1242px]:left-[225px] right-0 h-[50px] bg-primaryBg min-[1242px]:rounded-tl-2xl flex items-center justify-between px-3"
          style={{ zIndex: 999 }}
        >
          <div>
            <span className="text-2xl font-semibold text-accent">
              InnerBeat
            </span>
          </div>

          <div className="w-[500px] h-full flex items-center">
            <form
              className={`bg-primaryBg max-[768px]:left-0 w-[500px] h-[40px] items-center bg-secondaryBg rounded-xl ${
                isSearchOpen ? "flex" : "hidden"
              } `}
              onSubmit={handleSearch}
              ref={searchRef}
            >
              <i
                onClick={closeSearch}
                className="cursor-pointer w-[50px] h-[50px] flex items-center justify-center"
              >
                <ArrowLeftIcon size={23} color={"#fff"} />
              </i>
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent text-base h-full w-[500px] border-none outline-none"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                ref={inputRef}
                autoFocus
              />
              <i className="cursor-pointer w-[50px] h-[50px] flex items-center justify-center">
                <SearchIcon size={22} color={"#fff"} />
              </i>
            </form>
            <div className="w-full h-full flex items-center gap-6">
              <button
                onClick={openSearch}
                className={`w-[40px] h-[35px] items-center justify-center hover:bg-hoverBg rounded-full ${
                  isSearchOpen ? "hidden" : "flex"
                } `}
              >
                <SearchIcon size={23} color={"#fff"} />
              </button>
              {/** Player */}
              <div
                className={`h-[40px] w-full rounded-xl px-2 items-center gap-3 bg-secondaryBg overflow-hidden ${
                  isSearchOpen ? "hidden" : "flex"
                }`}
              >
                {" "}
                {currentSong && (
                  <>
                    <img
                      src={songImage}
                      width={34}
                      height={34}
                      className="rounded-sm"
                    />

                    <div className="w-full h-full flex items-center gap-2">
                      <span className="text-[12px] text-secondaryText">
                        {formatTime(currentTime)}
                      </span>
                      <input
                        type="range"
                        value={currentTime}
                        max={duration}
                        onChange={handleTimeSeek}
                        className="h-1 w-full accent-accent outline-none border-none"
                      />
                      <span className="text-[12px] text-secondaryText">
                        {formatTime(duration)}
                      </span>
                    </div>

                    <div className="flex items-center">
                      <button
                        className="w-[35px] h-full flex items-center justify-center"
                        onClick={handlePrevSong}
                      >
                        <SkipBackwardIcon size={23} color={"#fff"} />
                      </button>
                      <button
                        onClick={handlePlayPauseSong}
                        className="w-[35px] h-full flex items-center justify-center"
                      >
                        {isPlaying ? (
                          <PauseIcon size={23} color={"#fff"} />
                        ) : (
                          <PlayIcon size={22} color={"#fff"} />
                        )}
                      </button>
                      <button
                        className="w-[35px] h-full flex items-center justify-center"
                        onClick={handleNextSong}
                      >
                        <SkipForwardIcon size={23} color={"#fff"} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="h-full w-fit flex items-center gap-5">
            <button className="w-[35px] h-[35px] flex items-center justify-center hover:bg-hoverBg rounded-full">
              <SettingsIcon size={23} color={"#fff"} />
            </button>
            <Link href={`/profile`}>
              <img
                src={data.user.image}
                alt={data.user.name + " photo"}
                width={30}
                height={30}
                className="rounded-full"
              />
            </Link>
          </div>
        </div>

        {/** Main */}
        <main className="fixed top-0 bottom-0 max-[886px]:bottom-[80px] min-[886px]:pt-[50px] right-0 min-[886px]:right-[300px] left-[40px] min-[1242px]:left-[225px] bg-secondaryBg">
          <div className="w-full h-full bg-primaryBg overflow-auto p-5 min-[1242px]:rounded-bl-2xl scrollbar-thin">
            <div>{children}</div>
          </div>
        </main>

        {/** Desktop Player */}
        <div className="hidden min-[886px]:block fixed top-[50px] right-0 bottom-0 w-[300px] p-5">
          <div className="w-full h-full rounded-xl flex flex-col items-center bg-secondaryBg">
            {currentSong && (
              <>
                <div className="w-[200px] mt-5 aspect-square flex justify-center items-center">
                  <img
                    src={songImage}
                    width={200}
                    height={200}
                    className="rounded-2xl aspect-square object-cover"
                  />
                </div>

                <div className="flex flex-col w-full h-full  p-3 mt-3">
                  <div className="w-full h-[54px] flex items-center justify-between cursor-pointer">
                    <div
                      className="h-[40px] flex flex-col"
                      style={{ width: "calc(100% - 45px)" }}
                    >
                      <p className="text-[15px] font-medium line-clamp-1">
                        {he.decode(currentSongTitle)}
                      </p>
                      <p className="text-[12px] font-medium line-clamp-1 text-secondaryText">
                        {artistName}
                      </p>
                    </div>
                    <button className="w-[40px] h-full flex items-center justify-center">
                      <DotsVerticalIcon size={23} color={"#fff"} />
                    </button>
                  </div>
                  <hr className="w-full border border-hoverBg my-6" />
                  {artistInfo && (
                    <div>
                      <div
                        className="w-full h-[150px] rounded-2xl"
                        style={{
                          backgroundImage: `url('${artistInfo.image[2].link}')`,
                          backgroundSize: "cover",
                        }}
                      >
                        <div className="w-full h-full bg-secondaryBg backdrop-blur-sm rounded-2xl flex flex-col p-2">
                          <div className="w-[85px] h-[85px]">
                            <img
                              src={artistInfo.image[2].link}
                              className="w-full h-full rounded-full"
                            />
                          </div>
                          <div className="mt-2">
                            <h1 className="text-base font-[550] text-white lato line-clamp-1">
                              {artistInfo.name}
                            </h1>
                            <span className="text-sm text-white font-medium lato line-clamp-1">
                              {formatCount(artistInfo.fanCount)} monthly
                              listeners
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/** Bottom Player */}
        <BottomPlayer />

        {/** Mob menu */}

        <div className="min-[1242px]:hidden">
          <MobNav />
        </div>
      </div>
    );
  }

  function formatCount(count) {
    if (count === undefined || count === null) {
      return "N/A"; // or any default value you want to return for undefined or null
    }

    if (count >= 1000000000) {
      return (count / 1000000000).toFixed(1) + "B";
    } else if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + "M";
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + "K";
    } else {
      return count.toString();
    }
  }

  return (
     <div className="flex justify-center items-center h-screen bg-primaryBg">
      {isInstagramBrowser ? (
        <div className="w-full px-[15px]">
    <h1 className="text-lg text-white">
    Hello there! 😊 <br /> Unfortunately, my site won't function properly in Instagram's in-built browser. <br /> For the best experience, I recommend opening it in advanced browsers like Chrome or Safari. <br />Don't worry, it's completely safe to use! If you have any questions or need assistance, feel free to reach out to me via my Instagram ID. Happy listening!
    </h1>

    <p className="text-lg text-sky-600 mx-auto font-medium mt-5">Copy Url so you can open it in Chrome or Safari.</p>

    <button className="w-[100px] h-[35px] bg-sky-800 text-white flex items-center justify-center rounded-lg mx-auto mt-6" onClick={copyURLToClipboard}>
      Copy URL
    </button>
  </div>
      ) : (
        <button
          className="flex items-center justify-center gap-2 bg-white text-gray-700 hover:text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition-colors hover:bg-gray-700"
          onClick={() => signIn("google")}
        >
          <img
            src={`data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4=`}
          />
          Sign in with Google
        </button>
      )}
    </div>
  );
};

export default Layout;
