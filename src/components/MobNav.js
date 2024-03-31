import Link from "next/link";
import SettingsIcon from "./icons/SettingsIcon";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const MobNav = () => {
  const { data } = useSession();

  const router = useRouter();
  return (
    <div className="fixed top-0 left-0 h-full w-[40px] pt-20 max-[886px]:pt-12 ">
      <div className="flex flex-col w-full h-full items-center">
        <label className="mobLink mb-12">
          <Link
            href={`/`}
            className={`${
              router.pathname === "/"
                ? "text-primaryText"
                : "text-secondaryText"
            }`}
          >
            Home
          </Link>
        </label>
        <label className="mobLink mb-14">
          <Link
            href={`/songs`}
            className={`${
              router.pathname === "/songs"
                ? "text-primaryText"
                : "text-secondaryText"
            }`}
          >
            Songs
          </Link>
        </label>
        <label className="mobLink mb-12">
          <Link
            href={`/albums`}
            className={`${
              router.pathname === "/albums"
                ? "text-primaryText"
                : "text-secondaryText"
            }`}
          >
            Albums
          </Link>
        </label>
        <label className="mobLink mb-14">
          <Link
            href={`/artists`}
            className={`${
              router.pathname === "/artists"
                ? "text-primaryText"
                : "text-secondaryText"
            }`}
          >
            Artists
          </Link>
        </label>
        <label className="mobLink mb-14">
          <Link
            href={`/playlists`}
            className={`${
              router.pathname === "/playlists"
                ? "text-primaryText"
                : "text-secondaryText"
            }`}
          >
            Playlists
          </Link>
        </label>
        <label className="mobLink mb-[30px]">
          <Link
            href={`/library`}
            className={`${
              router.pathname === "/library"
                ? "text-primaryText"
                : "text-secondaryText"
            }`}
          >
            Library
          </Link>
        </label>
        <button className="w-[40px] h-[40px] flex items-center justify-center mb-5">
          <SettingsIcon size={27} color={"#fff"} />
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
  );
};

export default MobNav;
