import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { usePlayer } from "$/components/player/PlayerContext";
import axios from "axios";
import SongCard from "$/components/cards/SongCard";
import Loader from "$/components/Loader";

const Album = () => {
  const router = useRouter();
  const { id } = router.query;
  const [albumData, setAlbumData] = useState(null);
  const { addToPlaylist } = usePlayer();

  useEffect(() => {
    const fetchAlbumData = async () => {
      try {
        const response = await axios.get(
          `https://innerbeat-api.vercel.app/albums?id=${id}`
        );
        const data = response.data;
        setAlbumData(data.data);

        data.data.songs.forEach((song) => addToPlaylist(song));
      } catch (error) {
        console.error("Error fetching playlist data:", error);
      }
    };

    if (id) {
      fetchAlbumData();
    }
  }, [id]);

  if (!albumData) {
    return <Loader />;
  }

  const bgUrl = albumData.image[2].link;
  return (
    <div className="flex flex-col gap-10">
      {/** Album Info */}
      <div
        className="w-full h-[250px] rounded-2xl"
        style={{
          backgroundImage: `url('${bgUrl}')`,
          backgroundSize: "cover",
        }}
      >
        <div className="rounded-2xl w-full h-full bg-black/60 backdrop-blur-sm flex items-center p-3 gap-6">
          <div className="w-[200px] h-[200px]">
            <img src={bgUrl} className="rounded-lg" />
          </div>
          <div className="h-[200px] flex flex-col py-3">
            <h1 className="text-white text-3xl font-semibold">
              {albumData.name}
            </h1>
            <p className="text-base text-white/70 font-medium mt-1">
              :- {albumData.primaryArtists}
            </p>
            <div className="mt-5 flex flex-col">
              <p className="text-sm text-white/80">{albumData.year}</p>
              <p className="text-sm text-white/80">
                {albumData.songCount} songs
              </p>
            </div>
          </div>
        </div>
      </div>

      {/** Album Songs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {albumData.songs.map((song, index) => (
          <div key={index}>
            <SongCard song={song} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Album;
