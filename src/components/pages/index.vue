<template>
  <section>

    <h1>好きなアーティストの名前を検索してみよう！</h1>

    <div class="input">
      <input type="text" placeholder="米津玄師" v-model="input">
    </div>

    <div v-if="items.length >= 1">
      <h2>検索結果: 「{{input}}」</h2>
      <ul>
        <item :src="item.src" :key="index" v-for="(item, index) in items" ></item>
      </ul>
    </div>

    <div class="noresult" v-else>
      <h2>結果がありません</h2>
    </div>
  </section>
</template>

<script>
import item from '../modules/item.vue'
import HttpService from '../../service/http'
import Rx from 'rxjs'

export default {
  components: {
    item
  },
  data() {
    return {
      input: "",
      items: []
    }
  },
  created() {
    let input = this.input
    Rx.Observable
    .interval(10)
    .throttleTime(2000)
    .subscribe(() => {
      if(this.input != input) {
        this.getArtists(this.input)
      }
      input = this.input
    })
  },
  methods: {
    presenter(results) {
      return results.map((result) => {
        return {
          src: result.artworkUrl100.split("100x100").join("500x500")
        }
      })
    },
    getArtists(artistName) {
      const itunesService = new HttpService("https://itunes.apple.com/search")
      itunesService.getArtists({
        term: artistName,
        media: "music",
        entity: "musicTrack"
      })
      .then((res) => {
        this.items = this.presenter(res.data.results)
      })
    },
  }
}
</script>


<style lang="scss">
body, html {
  width: 100%;
  height: 100%;
}
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.input {
  width: 100%;
  display: flex;
  padding: 30px 0;
  justify-content: center;
  input {
    width: 30%;
    font-size: 1.5rem;
    padding: 10px;
    font-weight: bold;
    outline: 0;
  }
}
h1 {
  text-align: center;
  margin: 20px 0;
}
h2 {
  text-align: center;
  font-size: 2rem;
  margin: 30px 0;
}
ul {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  justify-content: flex-start;
}
</style>
