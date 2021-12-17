import { atom } from "recoil";
export const playListAtom = atom<null | any>({
  key: "playListAtom",
  default: null,
});
