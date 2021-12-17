import { FC } from "react";
import Image from "next/image";
import { millisToMinutesAndSeconds } from "../../lib/milistominutesandseconds";
import useSpotify from "../../hooks/useSpotify";
import { useRecoilState } from "recoil";
import {
  currentTtrackIdState,
  isPlayingState,
} from "../../StoreAtoms/tracksAtoms";
import spotifyApi from "../../lib/spotify";
interface props {
  track: any;
  order: number;
}
const Song: FC<props> = ({ track, order }) => {
  const spotifyHook = useSpotify();
  const [currentTtrackId, setCurreTrackId] =
    useRecoilState(currentTtrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const playSong = () => {
    setCurreTrackId(track.track.id);
    setIsPlaying(true);
    spotifyHook.play({
      uris: [track.track.uri],
    });
  };
  return (
    <div
      className="grid grid-cols-2 text-gray-500 py-4 
    hover:bg-gray-900 rounded-lg cursor-pointer"
      onClick={playSong}
    >
      <div className="flex items-center space-x-6">
        <p className="pl-2 pr-4">{order + 1}</p>
        <Image
          src={track.track.album.images[0].url}
          alt="album image"
          width={40}
          height={40}
          className=""
        />
        <div>
          <p className="w-36 lg:w-64 truncate text-white">{track.track.name}</p>
          <p className="w-40">{track.track.artists[0].name}</p>
        </div>
      </div>

      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="hidden md:inline truncate w-40">
          {track.track.album.name}
        </p>
        <p className="">{millisToMinutesAndSeconds(track.track.duration_ms)}</p>
      </div>
    </div>
  );
};
export default Song;
