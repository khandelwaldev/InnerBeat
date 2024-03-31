const ArtistCard = ({ artist }) => {
  return (
    <div
      className="w-[116px] h-[163px] rounded-lg hover:bg-[#e4e0df]"
      style={{ transition: "0.3s all" }}
    >
      <div className="w-full h-full flex flex-col justify-between">
        <div className="w-[116px] h-[116px] aspect-square object-cover">
          <img
            src={artist.image[2].link}
            className="w-full h-full aspect-square object-cover rounded-full"
          />
        </div>
        <div className="w-full h-[36px] flex flex-col items-center justify-center px-1">
          <p className=" text-[13px] font-[550] lato text-primaryText line-clamp-1">
            {artist.title}
          </p>
          <p className=" text-[13px] text-secondaryText lato line-clamp-1">
            {artist.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArtistCard;
