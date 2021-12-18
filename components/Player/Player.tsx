import { FC, useCallback, useEffect, useState, useMemo } from "react";
import Image from "next/image";
import useSpotify from "../../hooks/useSpotify";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import {
  currentTtrackIdState,
  isPlayingState,
} from "../../StoreAtoms/tracksAtoms";
import useSongIngo from "../../hooks/useSongInfo";
import {
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  ReplyIcon,
  RewindIcon,
  VolumeUpIcon,
  SwitchHorizontalIcon,
} from "@heroicons/react/solid";
import debounce from "lodash.debounce";
import {
  HeartIcon,
  VolumeUpIcon as VolumeDownIcon,
} from "@heroicons/react/outline";
interface props {}
const Player: FC<props> = () => {
  const spotifyHook = useSpotify();
  const { data: session, status } = useSession();
  const [currentTtrackId, setCurreTrackId] =
    useRecoilState(currentTtrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setvolume] = useState(50);
  const songInfo = useSongIngo();
  useEffect(() => {
    const fetchCurrentSong = () => {
      if (!songInfo) {
        spotifyHook.getMyCurrentPlayingTrack().then((data: any) => {
          console.log("data aca ", data);
          //la que esta tocando
          setCurreTrackId(data.body?.item?.id);
          spotifyHook.getMyCurrentPlaybackState().then((data: any) => {
            //la cancion anterior
            setIsPlaying(data.body?.is_playing);
          });
        });
      }
    };
    fetchCurrentSong();
    setvolume(50);
  }, [session, spotifyHook, currentTtrackId]);
  console.log("isPlaying", isPlaying);
  const handlePlayPause = () => {
    spotifyHook.getMyCurrentPlaybackState().then((data: any) => {
      if (data?.body?.is_playing) {
        spotifyHook.pause();
        setIsPlaying(false);
      } else {
        spotifyHook.play();
        setIsPlaying(true);
      }
    });
  };

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debouncedChangeHandler(volume);
    }
    return () => debouncedChangeHandler.cancel();
  }, [volume]);

  const debouncedChangeHandler = useMemo(
    () =>
      debounce((volume: any) => {
        spotifyHook.setVolume(volume);
      }, 300),
    []
  );

  return (
    <div
      className="h-24 bg-gradient-to-b from-black 
    to-gray-900 text-white pt-5 pb-2 text-xs 
    md:text-base px-2 md:px-8 grid-cols-3 grid
    "
    >
      {/*Left */}
      <div className="flex item-center space-x-4">
        {songInfo?.album?.images?.[0].url && (
          <Image
            width={70}
            height={30}
            src={songInfo?.album.images?.[0].url}
            alt=""
            className="hidden md:inline h-10 w-10 rounded-full"
          />
        )}

        <div>
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artists?.[0].name}</p>
        </div>
      </div>

      <div className="flex items-center justify-evenly">
        <SwitchHorizontalIcon className="button" />
        <RewindIcon
          className="button"
          onClick={() => spotifyHook.skipToPrevious()}
        />

        {isPlaying ? (
          <PauseIcon className="button w-10 h-10" onClick={handlePlayPause} />
        ) : (
          <PlayIcon className="button w-10 h-10" onClick={handlePlayPause} />
        )}

        <FastForwardIcon
          className="button"
          onClick={() => spotifyHook.skipToNext()}
        />

        <ReplyIcon className="button" />
      </div>

      {/*Rigth */}
      <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
        <VolumeDownIcon
          className="button"
          onClick={() => volume > 0 && setvolume((volume) => volume - 10)}
        />
        <input
          className="w-14 md:w-28"
          type="range"
          min={0}
          max={100}
          onChange={(e) => setvolume(Number(e.target.value))}
          value={volume}
        />
        <VolumeUpIcon
          className="button"
          onClick={() => volume < 100 && setvolume((volume) => volume + 10)}
        />
      </div>
    </div>
  );
};

export default Player;
