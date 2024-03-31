import Loader from "$/components/Loader";
import AlbumCard from "$/components/cards/AlbumCard";
import PlaylistCard from "$/components/cards/PlaylistCard";
import DotsVerticalIcon from "$/components/icons/DotsVerticalIcon";
import SearchIcon from "$/components/icons/SearchIcon";
import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const HomePage = () => {
  const [homePageData, setHomePageData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://innerbeat-api.vercel.app/modules?language=hindi,english"
      );
      const data = response.data;
      console.log(data); // Log the data to the console
      setHomePageData(data);
    } catch (error) {
      console.error("Error fetching homepage data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!homePageData) {
    return <Loader />;
  }
  return (
    <div>
      {/** HomePage Data */}
      <div>
        {homePageData && (
          <div>
            {/** Trending Data */}
            <h1 className="text-2xl mb-5 font-medium lato">Trending Now</h1>
            {homePageData.data.trending && (
              <div className="flex flex-col gap-7">
                {/** Trending Songs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {homePageData.data.trending.songs.map((song, index) => (
                    <Link
                      href={`/song/${song.id}`}
                      key={index}
                      className="h-[54px] w-full flex items-center hover:bg-secondaryBg rounded-lg px-1"
                    >
                      <div
                        className="flex items-center gap-5 h-[40px]"
                        style={{ width: "calc(100% - 45px)" }}
                      >
                        <img
                          src={song.image[2].link}
                          className="aspect-square object-cover rounded-lg"
                          width={40}
                          height={40}
                        />
                        <div className="flex flex-col">
                          <p className="text-base font-medium text-primaryText lato line-clamp-1">
                            {song.name}
                          </p>
                          <p className="text-sm text-secondaryText lato line-clamp-1">
                            {song.primaryArtists
                              .map((artist) => artist.name)
                              .join(", ")}
                          </p>
                        </div>
                      </div>
                      <button className="w-[40px] h-[40px] flex items-center justify-center">
                        <DotsVerticalIcon size={23} color={"#fff"} />
                      </button>
                    </Link>
                  ))}
                </div>
                {/** Trending albums */}
                <div className="flex overflow-x-auto gap-6 pb-3 scrollbar-thin">
                  {homePageData.data.trending.albums
                    .slice(0, 7)
                    .map((album, index) => (
                      <Link href={`/album/${album.id}`} key={index}>
                        <AlbumCard album={album} />
                      </Link>
                    ))}
                </div>
              </div>
            )}

            {/** Top ALbums */}
            <h1 className="text-2xl mt-6 mb-5 font-medium lato">Top Albums</h1>
            {homePageData.data.albums && (
              <div className="flex overflow-x-auto gap-6 pb-3 scrollbar-thin">
                {homePageData.data.albums.slice(0, 7).map((album, index) => (
                  <Link href={`/album/${album.id}`} key={index}>
                    <AlbumCard album={album} />
                  </Link>
                ))}
              </div>
            )}

            {/** Top Playlists */}
            <h1 className="text-2xl mt-6 mb-5 font-medium lato">
              Top Playlists
            </h1>
            {homePageData.data.playlists && (
              <div className="flex overflow-x-auto gap-6 pb-3 scrollbar-thin">
                {homePageData.data.playlists
                  .slice(0, 7)
                  .map((playlist, index) => (
                    <Link href={`/playlist/${playlist.id}`} key={index}>
                      <PlaylistCard playlist={playlist} />
                    </Link>
                  ))}
              </div>
            )}

            {/** Top Charts */}
            <h1 className="text-2xl mt-6 mb-5 font-medium lato">Top Charts</h1>
            {homePageData.data.charts && (
              <div className="flex overflow-x-auto gap-6 pb-3 scrollbar-thin">
                {homePageData.data.charts.slice(0, 7).map((playlist, index) => (
                  <Link href={`/playlist/${playlist.id}`} key={index}>
                    <PlaylistCard playlist={playlist} />
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/** Mob Button */}
      <div className="fixed bottom-[100px] right-6 w-[65px] h-[65px] bg-primaryBg rounded-lg min-[886px]:hidden">
        <Link
          href={`/search`}
          className="w-full h-full bg-hoverBg rounded-lg flex items-center justify-center"
        >
          <SearchIcon size={40} color={"#fff"} />
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
