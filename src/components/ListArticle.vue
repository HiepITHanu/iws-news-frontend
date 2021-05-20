<template>
  <div>
    <div id="list_article">
      <div v-for="(item) in getListPost" :key="item.id">
        <router-link :to="'/detail-article/' + item.id">
          <Article class="mb-2" :article="item"></Article>
          <br>
        </router-link>
      </div>
    </div>
    <div class="d-flex justify-content-center mt-2">
      <b-pagination
          v-model="currentPage"
          :total-rows="getTotalItems"
          :per-page="getPerPage"
          aria-controls="list_article"
      ></b-pagination>
    </div>
  </div>
</template>

<script>
import Article from "@/components/Article";

export default {
  name: "ListArticle",
  components: {Article},
  data(){
    return {
      listArticle: [],
      currentPage: 0,
      totalItem: 0,
      perPage: 0
    }
  },
  computed: {
    getListPost(){
      return this.$store.getters.listArticle
    },

    getTotalItems(){
      return this.$store.getters.totalItems
    },

    getPerPage(){
      return this.$store.getters.perPage
    }
  },
  methods: {

  },
  watch: {
    currentPage: function (){
      this.$store.dispatch("initListArticle", this.currentPage)
    }
  },
  created() {
    this.currentPage = 1;
    this.$store.dispatch("initListArticle", 1)
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