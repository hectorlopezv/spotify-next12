import { atom } from "recoil";

export const selectedPlayList = atom<string | null>({
  key: "IdPlayList",
  default: '37i9dQZEVXcQ9COmYvdajy',
});
