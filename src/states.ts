import { atom } from "recoil";
import { Branch } from "./api/models/branch/branch";

export const appbarTitle = atom({
  key: "appbarTitle",
  default: "Vulder",
});

export const timetableTitle = atom<string | null>({
  key: "timetableTitle",
  default: null,
});

export const actualTimetable = atom<null | Branch>({
  key: "actualTimetable",
  default: null,
});

export const isTimetableView = atom({
  key: "isTimetableView",
  default: false,
});

export const menuOpen = atom({
  key: "menuOpen",
  default: false,
});
