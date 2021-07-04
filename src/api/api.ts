import SearchResponse from "./data/searchResponse";
import LocalConfig from '../assets/configs/local.json';
import School from './data/school';
import axios from "axios";

export default {
  search: async (keywords: string | undefined): Promise<Array<School>> => {
    return await axios.request<SearchResponse>({
      method: 'get',
      url: `/search/find`,
      baseURL: LocalConfig.baseUrl,
      params: {
        input: keywords
      }
    }).then((res) => {
      if (res.status == 200) {
        return res.data.schools
      }

      return Array<School>()
    })
  }
}