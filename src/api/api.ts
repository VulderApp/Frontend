import axios, { AxiosError, AxiosResponse } from "axios";
import { FindItem } from "./models/find/FindItem";
import { Branch } from "./models/branch/branch";
import { Timetable } from "./models/timetable/timetable";
import { School } from "./models/school/School";
import { setupCache } from "axios-cache-adapter";
import { Contributor } from "./models/github/contributor";
import { camelizeKeys } from "humps";

const BASE_URL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5133"
    : process.env.API_URL;

const cache = setupCache({
  maxAge: 15 * 60 * 1000,
});

export const getGithubRepoContributors = async (): Promise<
  AxiosResponse<Contributor[]>
> => {
  const client = axios.create({ baseURL: "https://api.github.com" });
  client.interceptors.response.use((response: AxiosResponse) => {
    response.data = camelizeKeys(response.data);

    return response;
  });
  return client.request<Contributor[]>({
    url: "/repos/VulderApp/Frontend/contributors",
  });
};

export const getSearchedSchools = async (
  input: string
): Promise<AxiosResponse<Array<FindItem>> | string> =>
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
    .catch<string>((err: AxiosError) => err.message);

export const getBranches = async (
  schoolId: string
): Promise<AxiosResponse<Array<Branch>> | string> =>
  await axios
    .request<Array<Branch>>({
      baseURL: BASE_URL,
      url: "/branch/GetBranches",
      adapter: cache.adapter,
      maxRedirects: 1,
      method: "GET",
      params: {
        schoolId,
      },
    })
    .catch<string>((err: AxiosError) => err.message);

export const getTimetable = async (
  schoolId: string,
  classname: string,
  shortPath: string
): Promise<AxiosResponse<Timetable> | string> =>
  await axios
    .request<Timetable>({
      baseURL: BASE_URL,
      url: "/timetable/GetTimetable",
      adapter: cache.adapter,
      maxRedirects: 1,
      method: "GET",
      params: {
        schoolId,
        classname,
        shortPath,
      },
    })
    .catch<string>((err: AxiosError) => err.message);

export const getSchoolDetails = async (
  schoolId: string
): Promise<AxiosResponse<School> | string> =>
  await axios
    .request<School>({
      baseURL: BASE_URL,
      url: "/school/GetSchool",
      adapter: cache.adapter,
      maxRedirects: 1,
      method: "GET",
      params: {
        schoolId,
      },
    })
    .catch<string>((err: AxiosError) => err.message);
