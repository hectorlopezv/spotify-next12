import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import spotifyApi from "../lib/spotify";
import {
  currentTtrackIdState,
  isPlayingState,
} from "../StoreAtoms/tracksAtoms";
import useSpotify from "./useSpotify";

const useSongIngo = () => {
  const spotifyHook = useSpotify();

  const [currentTtrackId, setCurreTrackId] =
    useRecoilState(currentTtrackIdState);
  const [songInfo, setsongInfo] = useState<any>(null);

  useEffect(() => {
    const fetchSongInfo = async () => {
      if (currentTtrackId) {
        const trackInfo = await fetch(
          `https://api.spotify.com/v1/tracks/${currentTtrackId}`,
          {
            headers: {
              Authorization: `Bearer ${spotifyHook.getAccessToken()}`,
            },
          }
        ).then((res) => res.json());
        setsongInfo(trackInfo);
      }
    };
    fetchSongInfo();
  }, [currentTtrackId, spotifyHook]);
  return songInfo;
};

export default useSongIngo;
