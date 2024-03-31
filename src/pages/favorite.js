import { useEffect, useState } from "react";
import { supabase } from "$/utils/supabaseClient";
import { useSession } from "next-auth/react";
import { usePlayer } from "$/components/player/PlayerContext";
import SongCard from "$/components/cards/SongCard";

const FavoritesPage = () => {
  const [favoriteSongs, setFavoriteSongs] = useState([]);

  const { addToPlaylist } = usePlayer();

  const { data } = useSession();

  const imgUrl = data.user.image;
  const parts = imgUrl.split("/");
  const id = parts[parts.length - 1];

  const userId = id;

  useEffect(() => {
    const fetchFavoriteSongs = async () => {
      try {
        const { data: favorites, error } = await supabase
          .from("favorites")
          .select("song_data")
          .eq("user_id", userId);

        if (error) {
          throw error;
        }

        // Extract the song data from the response and update state
        setFavoriteSongs(favorites);
        favorites.forEach((favorite) => addToPlaylist(favorite.song_data));
      } catch (error) {
        console.error("Error fetching favorite songs:", error.message);
      }
    };

    fetchFavoriteSongs();
  }, []);

  // console.log(favoriteSongs);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Favorite Songs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {favoriteSongs.map((favorite, index) => (
          <div key={index}>
            <SongCard song={favorite.song_data} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
