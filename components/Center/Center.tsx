import { useSession } from "next-auth/react";
import { FC, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronDownIcon } from "@heroicons/react/outline";
import shuffle from "lodash.shuffle";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedPlayList } from "../../StoreAtoms/selectedAtom";
import { playListAtom } from "../../StoreAtoms/playListAtom";
import useSpotify from "../../hooks/useSpotify";
import Songs from "../Songs/Songs";
import { signOut } from "next-auth/react";
interface props {}

const colors = [
  "from-indigo-500",
  "from-green-500",
  "from-blue-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
];
const Center: FC<props> = () => {
  const { data: session } = useSession();
  const [color, setcolor] = useState<null | string>(null);
  const spotifyHook = useSpotify();

  const [playList, setplayList] = useRecoilState(playListAtom);
  const playListId = useRecoilValue(selectedPlayList);

  useEffect(() => {
    const selectedColor = shuffle(colors).pop() as string;
    setcolor(selectedColor);
  }, [playListId]);

  useEffect(() => {
    spotifyHook
      .getPlaylist(playListId!)
      .then((data: any) => {
        setplayList(data.body);
      })
      .catch((error) => console.log("error in center component"));
  }, [playListId, spotifyHook]);
  console.log(playList);
  return (
    <div className="flex-grow h-screen overflow-y-scroll">
      <header className="absolute top-5 right-8">
        {session?.user?.image && (
          <div
            className="bg-black space-x-3 opacity-90 hover:opacity-80 
        cursor-pointer rounded-full p-1 pr-2 bg-black flex items-center text-white"
            onClick={() => signOut()}
          >
            <Image
              width={40}
              height={40}
              src={session?.user?.image as string}
              alt="user profile image spotify"
              className="rounded-full"
            />

            <h2>{session?.user?.name}</h2>
            <ChevronDownIcon className="h-5 w-5" />
          </div>
        )}
      </header>

      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black 
        ${color} h-80 text-white p-8`}
      >
        {playList?.images?.[0].url && (
          <>
            <Image
              width={176}
              height={176}
              src={playList?.images?.[0].url}
              alt="user profile image spotify"
              className="rounded-t-lg rounded-b-lg"
            />
            <div>
              <p>PLAYLIST</p>
              <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">
                {playList.name}
              </h1>
            </div>
          </>
        )}
      </section>

      <div>
        <Songs />
      </div>
    </div>
  );
};

export default Center;
