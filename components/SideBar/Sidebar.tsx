import { FC, useEffect, useState } from "react";
import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon,
} from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import useSpotify from "../../hooks/useSpotify";
import { selectedPlayList } from "../../StoreAtoms/selectedAtom";
import { useRecoilState } from "recoil";

interface props {}
const SideBar: FC<props> = () => {
  const { data: session, status } = useSession();
  const [playLists, setplayLists] = useState<any[]>([]);
  const [playListId, setplayListId] = useRecoilState(selectedPlayList);
  const spotifyHook = useSpotify();
  useEffect(() => {
    if (spotifyHook.getAccessToken()) {
      spotifyHook.getUserPlaylists().then((data) => {
        setplayLists(data.body.items);
      });
    }
  }, [session, spotifyHook]);
  console.log("playlist", playLists);
  return (
    <div className="text-gray-500 p-5 text-sm border-r border-gray-900 overflow-y-scroll h-screen">
      <div className="space-y-4">
        <button
          className="flex items-center space-x-2 hover:text-white"
          onClick={() => signOut()}
        >
          <p>Logout</p>
        </button>

        <button className="flex items-center space-x-2 hover:text-white">
          <HomeIcon className="h-5 w-5" />
          <p>Home</p>
        </button>

        <button className="flex items-center space-x-2 hover:text-white">
          <SearchIcon className="h-5 w-5" />
          <p>Search</p>
        </button>

        <button className="flex items-center space-x-2 hover:text-white">
          <LibraryIcon className="h-5 w-5" />
          <p>Your Library</p>
        </button>

        <hr className="border-t-[0.1-px] border-gray-900" />

        <button className="flex items-center space-x-2 hover:text-white">
          <PlusCircleIcon className="h-5 w-5" />
          <p>Create PlayList</p>
        </button>

        <button className="flex items-center space-x-2 hover:text-white">
          <RssIcon className="h-5 w-5" />
          <p>Your Episodes</p>
        </button>

        <button className="flex items-center space-x-2 hover:text-white">
          <HeartIcon className="h-5 w-5" />
          <p>Liked Songs</p>
        </button>

        <hr className="border-t-[0.1-px] border-gray-900" />

        {playLists?.map((playlist: any) => {
          return (
            <p
              className="cursor-pointer hover:text-white"
              key={playlist.id}
              onClick={() => setplayListId(playlist.id)}
            >
              {playlist.name}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default SideBar;
