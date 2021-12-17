import { atom } from "recoil";

export const selectedPlayList = atom<number | null>({
  key: "IdPlayList",
  default: null,
});
