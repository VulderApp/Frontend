import { atom } from "recoil";

export const appbarTitle = atom({
  key: "appbarTitle",

  default: "Vulder",
});

export const isTimetableView = atom({
  key: "isTimetableView",
  default: false,
});

export const menuOpen = atom({
  key: "menuOpen",
  default: false,
});
