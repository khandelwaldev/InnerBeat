import { signOut, useSession } from "next-auth/react";

const Profile = () => {
  const { data } = useSession();

  // Function to replace "s96-c" with "s192-c" in the image URL
  const getHighQualityImageUrl = (imageUrl) => {
    return imageUrl.replace("s96-c", "s384-c");
  };

  const highQualityImageUrl = getHighQualityImageUrl(data.user.image);

  const imgUrl = data.user.image
  const parts = imgUrl.split("/"); // Split the URL by "/"
const id = parts[parts.length - 1]; // Get the second-to-last part of the URL
// console.log(id);

  const userId = data.user.id;
  return (
    <div>
      <div className="flex flex-col sm:flex-row items-center sm:gap-8">
        <div className="max-w-[200px] w-full max-h-[200px] h-full">
          <img
            src={highQualityImageUrl}
            alt={data.user.name + " photo"}
            className="rounded-full w-full h-full"
          />
        </div>
        <div className="flex flex-col gap-2 justify-end h-[125px]">
          <h1 className="text-base font-medium text-secondaryText">Profile</h1>
          <h1 className="text-3xl font-bold text-primaryText">
            {data.user.name}
          </h1>
          {/* <p>Userid:- {id}</p> */}
        </div>
      </div>
      <div className="w-full h-full flex items-center justify-center">
        <div className="flex flex-col w-full h-[300px] items-center justify-center gap-6">
          <h1 className="text-2xl font-semibold text-secondaryText">
            More features comming soon
          </h1>
          <button
            onClick={signOut}
            className="w-[140px] h-[40px] border border-hoverBg flex items-center justify-center rounded-xl"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
