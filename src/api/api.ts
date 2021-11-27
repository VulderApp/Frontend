import axios, { AxiosResponse } from "axios";
import { FindItem } from "./models/find/FindItem";

const BASE_URL = "http://localhost:5211";

export const getSearchedSchools = async (
  input: string
): Promise<AxiosResponse<Array<FindItem>> | void> =>
  await axios
    .request<Array<FindItem>>({
      baseURL: BASE_URL,
      url: "/school/FindSchools",
      method: "GET",
      params: {
        input: input,
      },
    })
    .catch((err) => err);
