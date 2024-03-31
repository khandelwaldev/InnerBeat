import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";
import SongCard from "$/components/cards/SongCard";
import Loader from "$/components/Loader";

const Song = () => {
  const router = useRouter();
  const { id } = router.query;
  const [songData, setSongData] = useState(null);

  useEffect(() => {
    const fetchSongData = async () => {
      try {
        const response = await axios.get(
          `https://innerbeat-api.vercel.app/songs?id=${id}`
        );
        const data = response.data;
        setSongData(data.data[0]); // Access the first item in the data array

      } catch (error) {
        console.error("Error fetching song data:", error);
      }
    };

    if (id) {
      fetchSongData();
    }
  }, [id]);

  if (!songData) {
    return <Loader />;
  }

  const bgUrl = songData.image[2].link;
  return (
    <div className="flex flex-col gap-10">
      {/** Playlist Info */}
      <div
        className="w-full h-[250px] rounded-2xl"
        style={{
          backgroundImage: `url('${bgUrl}')`,
          backgroundSize: "cover",
        }}
      >
        <div className="rounded-2xl w-full h-full bg-black/60 backdrop-blur-sm flex flex-col">
          <div className="flex flex-col p-3">
            <div className="flex items-center p-3 gap-6">
              <div className="w-[150px] h-[150px] sm:w-[200px] sm:h-[200px]">
                <img src={bgUrl} className="rounded-lg" />
              </div>
              <div className="h-[150px] sm:h-[200px] flex flex-col py-3">
                <h1 className="text-white text-3xl font-semibold hidden sm:block">
                  {songData.name}
                </h1>
                <p className="text-base text-white/70 font-medium mt-1">
                  By {songData.primaryArtists}
                </p>
                <div className="mt-5 flex flex-col">
                  <p className="text-sm text-white/80">
                    {'abc'} songs
                  </p>
                  <p className="text-sm text-white/80">
                    {formatCount(songData.playCount)} plays
                  </p>
                </div>
              </div>
            </div>
          </div>
          <h1 className="text-white text-xl font-semibold ml-5 sm:hidden line-clamp-1">
            {songData.name}
          </h1>
        </div>
      </div>

      {/** Song */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <SongCard song={songData} />
          </div>
      </div>
    </div>
  );
};

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

export default Song;
