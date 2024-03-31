import { useState, useEffect } from "react";
import HeartFilledIcon from "../icons/HeartFilledIcon";
import HeartIcon from "../icons/HeartIcon";
import { supabase } from "$/utils/supabaseClient";
import { usePlayer } from "../player/PlayerContext";
import he from "he";
import { useSession } from 'next-auth/react';

const SongCard = ({ song }) => {
  const { playSong, currentSong } = usePlayer();
  const [isFavorite, setIsFavorite] = useState(false); 
  const { data } = useSession();
  const imgUrl = data.user.image;
  const parts = imgUrl.split("/");
  const id = parts[parts.length - 1];
  const userId = id;
  const url = song.url;
  const songId = song.id;
  const playingId = currentSong ? currentSong.id : null;

  const name = song.name || song.title

  useEffect(() => {
    const fetchFavoriteSongs = async () => {
      try {
        const { data: favorites, error } = await supabase
          .from("favorites")
          .select("song_id")
          .eq("user_id", userId);
        if (error) {
          throw error;
        }
        const favoriteSongIds = favorites.map(favorite => favorite.song_id);
        setIsFavorite(favoriteSongIds.includes(songId));
      } catch (error) {
        console.error("Error fetching favorite songs:", error.message);
      }
    };
    fetchFavoriteSongs();
  }, [userId, songId]);

  const handlePlayClick = async () => {
    try {
      const response = await fetch(
        `https://innerbeat-api.vercel.app/songs?link=${url}`
      );
      const data = await response.json();
      const song = data.data[0];
      playSong(song);
    } catch (error) {
      console.error("Error fetching song:", error);
    }
  };

  const handleFavoriteClick = async () => {
    setIsFavorite(!isFavorite);
    
    let favoriteData = {
      user_id: userId,
      song_data: song,
      song_id: song.id // primary key
    };
  
    try {
      if (!isFavorite) {
        const { data, error } = await supabase
          .from("favorites")
          .insert([favoriteData]);
        if (error) {
          throw error;
        }
        console.log("Song added to favorites:", data);
      } else {
        const { data, error } = await supabase
          .from("favorites")
          .delete()
          .eq("user_id", userId)
          .eq("song_id", song.id);
        if (error) {
          throw error;
        }
        console.log("Song removed from favorites:", data);
      }
    } catch (error) {
      console.error("Error adding/removing song to/from favorites:", error.message);
    }
  };
  
  
  return (
    <>
      <div
        className={`h-[54px] w-full flex items-center hover:bg-hoverBg
        rounded-lg px-1 cursor-pointer`}
      >
        <div
          className="flex items-center gap-5"
          style={{ width: "calc(100% - 40px)" }}
          onClick={handlePlayClick}
        >
          <img
            src={song.image[2].link}
            className="aspect-square object-cover rounded-sm"
            width={40}
            height={40}
          />
          <div className="flex flex-col">
            <label
              className={`text-base font-medium lato line-clamp-1 ${
                playingId === songId ? "text-accent" : "text-primaryText"
              }`}
            >
              {he.decode(name)}
            </label>
            <label className="text-sm text-secondaryText lato line-clamp-1">
              {song.primaryArtists}
            </label>
          </div>
        </div>
        <button
          className="w-[40px] h-full flex items-center justify-center"
          onClick={handleFavoriteClick}
        >
          {isFavorite ? (
            <HeartFilledIcon size={23} color={"#1ed760"} />
          ) : (
            <HeartIcon size={23} color={"#fff"} />
          )}
        </button>
      </div>
    </>
  );
};

export default SongCard;
