import axios from 'axios'

export default class HttpService {

  constructor(endpoint, country = "jp") {
    this.endpoint = endpoint
    this.country = country
    this.lang = "ja_jp"
  }

  getArtists({ term, media, entity, limit = 50 }) {
    return axios.get(`${this.endpoint}?term=${term}&media=${media}&entity=${entity}&country=${this.country}&lang=${this.lang}&limit=${limit}`)
  }

}