import axios, { AxiosResponse } from "axios";
import { FindItem } from "./models/find/FindItem";
import { Branch } from "./models/branch/branch";
import { Timetable } from "./models/timetable/timetable";
import { School } from "./models/school/School";

const BASE_URL = "http://localhost:5133";

export const getSearchedSchools = async (
  input: string
): Promise<AxiosResponse<Array<FindItem>> | void> =>
  await axios
    .request<Array<FindItem>>({
      baseURL: BASE_URL,
      url: "/school/FindSchools",
      maxRedirects: 1,
      method: "GET",
      params: {
        input: input,
      },
    })
    .catch((err) => err);

export const getBranches = async (
  schoolId: string
): Promise<AxiosResponse<Array<Branch>> | void> =>
  await axios
    .request<Array<Branch>>({
      baseURL: BASE_URL,
      url: "/branch/GetBranches",
      maxRedirects: 1,
      method: "GET",
      params: {
        schoolId,
      },
    })
    .catch((err) => err);

export const getTimetable = async (
  schoolId: string,
  classname: string,
  shortPath: string
): Promise<AxiosResponse<Timetable>> =>
  await axios
    .request<Timetable>({
      baseURL: BASE_URL,
      url: "/timetable/GetTimetable",
      maxRedirects: 1,
      method: "GET",
      params: {
        schoolId,
        classname,
        shortPath,
      },
    })
    .catch((err) => err);

export const getSchoolDetails = async (
  schoolId: string
): Promise<AxiosResponse<School>> =>
  await axios.request<School>({
    baseURL: BASE_URL,
    url: "/school/GetSchool",
    maxRedirects: 1,
    method: "GET",
    params: {
      schoolId,
    },
  });
