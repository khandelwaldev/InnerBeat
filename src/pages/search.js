import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Link from "next/link";
import AlbumCard from "$/components/cards/AlbumCard";
import ArtistCard from "$/components/cards/ArtistCard";
import PlaylistCard from "$/components/cards/PlaylistCard";
import SongCard from "$/components/cards/SongCard";
import Loader from "$/components/Loader";

const Search = () => {
  const [searchResults, setSearchResults] = useState(null);

  const router = useRouter();
  const query = router.query.q || "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (query) {
          const response = await fetch(
            `https://innerbeat-api.vercel.app/search/all?query=${encodeURIComponent(
              query
            )}`
          );
          const data = await response.json();
          // console.log(data); // Log the data to the console
          setSearchResults(data);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchData();
  }, [query]);

  const [searchQuery, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  if (!query || query.trim() === "") {
    return (
      <div className="w-full h-[70vh] flex items-center justify-center">
        <form
          className="min-[886px]:hidden h-[55px] bg-primaryBg fixed top-1 left-[40px] right-1 border-b border-hoverBg"
          style={{ zIndex: 9999 }}
          onSubmit={handleSearch}
        >
          <input
            type="text"
            placeholder="Search..."
            className="border-none outline-none bg-transparent pl-3 w-full h-full text-base"
            value={searchQuery}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
        <h1 className="text-2xl font-semibold text-secondaryText">
          What would you like to play?
        </h1>
      </div>
    );
  }

  if (!searchResults) {
    return <Loader />;
  }
  return (
    <div>
      <form
        className="min-[886px]:hidden h-[55px] bg-primaryBg fixed top-1 left-[40px] right-1 border-b border-hoverBg"
        style={{ zIndex: 9999 }}
        onSubmit={handleSearch}
      >
        <input
          type="text"
          placeholder="Search..."
          className="border-none outline-none bg-transparent pl-3 w-full h-full text-base"
          value={searchQuery}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
      {searchResults && (
        <div className="max-[886px]:pt-[70px]">
          {/** Top result */}
          <h1 className="text-2xl font-medium mb-5">Top Result</h1>
          {searchResults.data.topQuery.results.map((result) => {
            if (result.type === "song") {
              return (
                <div key={result.id}>
                  <SongCard song={result} />
                </div>
              );
            } else if (result.type === "artist") {
              return (
                <Link key={result.id} href={result.url}>
                  <ArtistCard artist={result} />
                </Link>
              );
            } else if (result.type === "album") {
              return (
                <Link key={result.id} href={`/album/${result.id}`}>
                  <AlbumCard />
                </Link>
              );
            } else {
              return null;
            }
          })}

          {/** Top Songs */}
          <h1 className="text-2xl font-medium mb-5 mt-6">Top Songs</h1>
          {searchResults.data.songs && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {searchResults.data.songs.results.map((song, index) => (
                <div key={index}>
                  <SongCard song={song} />
                </div>
              ))}
            </div>
          )}

          {/** Top Artists */}
          <h1 className="text-2xl font-medium mb-5 mt-6">Top Artists</h1>
          {searchResults.data.artists && (
            <div className="flex overflow-x-auto gap-6 pb-3 scrollbar-thin">
              {searchResults.data.artists.results.map((artist, index) => (
                <Link href={`/`} key={index}>
                  <ArtistCard artist={artist} />
                </Link>
              ))}
            </div>
          )}

          {/** Top Albums */}
          <h1 className="text-2xl font-medium mb-5 mt-6">Top Albums</h1>
          {searchResults.data.albums && (
            <div className="flex overflow-x-auto gap-6 pb-3 scrollbar-thin">
              {searchResults.data.albums.results.map((album, index) => (
                <Link href={`/album/${album.id}`} key={index}>
                  <AlbumCard album={album} />
                </Link>
              )) || null}
            </div>
          )}

          {/** Top Playlists */}
          <h1 className="text-2xl font-medium mb-5 mt-6">Top Playlists</h1>
          {searchResults.data.playlists && (
            <div className="flex overflow-x-auto gap-6 pb-3 scrollbar-thin">
              {searchResults.data.playlists.results.map((playlist, index) => (
                <Link href={`/playlist/${playlist.id}`} key={index}>
                  <PlaylistCard playlist={playlist} />
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
