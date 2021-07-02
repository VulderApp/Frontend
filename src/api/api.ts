import axios, {AxiosResponse} from 'axios';
import SearchResponse from "./data/searchResponse";
import LocalConfig from '../assets/configs/local.json';

export default {
  search: async (keywords: string | undefined): Promise<AxiosResponse<SearchResponse>> => {
    return await axios.request<SearchResponse>({
      method: 'get',
      url: '/search/find',
      baseURL: LocalConfig.baseUrl,
      params: {
        input: keywords
      }
    })
  }
}