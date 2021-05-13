<template>
  <div>
    <div id="list_article">
      <div v-for="(item) in this.listArticle" :key="item.id">
        <router-link :to="'/detail-article/' + item.id">
          <Article class="mb-2" :article="item"></Article>
          <br>
        </router-link>
      </div>
    </div>
    <div class="d-flex justify-content-center mt-2">
      <b-pagination
          v-model="currentPage"
          :total-rows="totalItem"
          :per-page="perPage"
          aria-controls="list_article"
      ></b-pagination>
    </div>
  </div>
</template>

<script>
import {getArticles} from "@/service/CommonService";
import Article from "@/components/Article";

export default {
  name: "ListArticle",
  components: {Article},
  data(){
    return {
      listArticle: [],
      currentPage: 0,
      totalItem: 40,
      perPage: 0
    }
  },
  methods: {

  },
  watch: {
    currentPage: function (){
      getArticles(this.currentPage).then((res) => {
        this.listArticle = res.data.content.content
        this.totalItem = res.data.content.total * res.data.content.limit
        this.perPage = res.data.content.limit
      })
    }
  },
  created() {
    this.currentPage = 1;
    getArticles(1).then((res) => {
      this.listArticle = res.data.content.content
      this.totalItem = res.data.content.total * res.data.content.limit
      this.perPage = res.data.content.limit
      console.log(this.totalItem)
    })
  }
}
</script>

<style scoped>
  #list_article{
    padding: 16px;
    width: 770px;
    margin: 32px auto 0;
    border-radius: 10px;
    border: 1px solid black;
  }
</style>