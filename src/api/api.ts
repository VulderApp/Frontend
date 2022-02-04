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

const baseClient = axios.create({
  baseURL: BASE_URL,
  adapter: cache.adapter,
  method: "GET",
  maxRedirects: 1,
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
  await baseClient
    .request<Array<FindItem>>({
      url: "/school/FindSchools",
      params: {
        input: input,
      },
    })
    .catch<string>((err: AxiosError) => err.message);

export const getBranches = async (
  schoolId: string
): Promise<AxiosResponse<Array<Branch>> | string> =>
  await baseClient
    .request<Array<Branch>>({
      url: "/branches",
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
  await baseClient
    .request<Timetable>({
      url: "/timetable",
      method: "GET",
      params: {
        schoolId,
        shortPath,
      },
    })
    .catch<string>((err: AxiosError) => err.message);

export const getSchoolDetails = async (
  schoolId: string
): Promise<AxiosResponse<School> | string> =>
  await baseClient
    .request<School>({
      url: "/school/GetSchool",
      method: "GET",
      params: {
        schoolId,
      },
    })
    .catch<string>((err: AxiosError) => err.message);
