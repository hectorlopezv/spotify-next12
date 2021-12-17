import { FC } from "react";
import { useRecoilValue } from "recoil";
import { playListAtom } from "../../StoreAtoms/playListAtom";
import Song from "../Song/Song";
interface props {}
const Songs: FC<props> = () => {
  const playlist = useRecoilValue(playListAtom);
  return (
    <div className="text-white px-8 flex flex-col space-y-1 pb-28">
      {playlist?.tracks?.items?.map((track: any, i: number) => (
        <Song key={track.track.id} track={track} order={i} />
      ))}
    </div>
  );
};

export default Songs;
