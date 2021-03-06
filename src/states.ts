import { atom } from "recoil";
import { Branch } from "./api/models/branch/branch";
import { Timetable } from "./api/models/timetable/timetable";
import { getBooleanItem, getItem } from "./utils/localStorageUtil";
import { LANGUAGE_KEY, LIGHT_MODE_KEY } from "./constants";
import { getLanguageShortCode } from "./utils/languageUtil";

export const subpage = atom({
  key: "subpage",
  default: false,
});

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

export const actualSchoolId = atom<string | undefined>({
  key: "actualSchoolId",
  default: undefined,
});

export const menuOpen = atom({
  key: "menuOpen",
  default: false,
});

export const timetableInfoDialogOpen = atom({
  key: "timetableInfoDialog",
  default: false,
});

export const timetableData = atom<Timetable | null>({
  key: "timetableData",
  default: null,
});

export const errorMessage = atom<string | null>({
  key: "errorMessage",
  default: null,
});

export const networkError = atom<boolean>({
  key: "networkError",
  default: false,
});

export const lightMode = atom<boolean>({
  key: "lightMode",
  default: getBooleanItem(LIGHT_MODE_KEY) ?? true,
});

export const language = atom<string>({
  key: "language",
  default: getItem(LANGUAGE_KEY) ?? getLanguageShortCode(),
});
