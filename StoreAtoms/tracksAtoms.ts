import { atom } from "recoil";

export const currentTtrackIdState = atom({
  key: "currentTtrackIdState",
  default: null,
});

export const isPlayingState = atom({
  key: "isPlayingState",
  default: false,
});
