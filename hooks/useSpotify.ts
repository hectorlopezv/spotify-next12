import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import spotifyApi from "../lib/spotify";

const useSpotify = () => {
  const { data: session, status } = useSession();
  useEffect(() => {
    if (session) {
      if (session.error === "RefreshAccessTokenError") {
        signIn();
      }
      const tokenSession: any = session.user;

      spotifyApi.setAccessToken(tokenSession.accessToken);
    }
  }, [session]);

  return spotifyApi;
};

export default useSpotify;
