<template>
  <div>
    <Header></Header>
    <div class="container w-75 mt-4">
      <h2>{{ title }}</h2>
      <p><small>{{ this.toTimeString }} by <a href="#">{{ authorName }}</a></small></p>
      <p>{{ shortIntro }}</p>
      <div>
        <img :src="this.image" alt="" class="w-100 mb-4">
      </div>
      <p>{{ content }}</p>
      <div>Category: {{ category.name }}</div>
      <div>
        Tags: <a class="bg-secondary mr-3 pl-2 pr-2 text-white" v-for="(item) in tags" :key="item.id" href="">#{{ item.name }}</a>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import {getDetailArticle} from "@/service/CommonService";
export default {
  name: "DetailArticle",
  data(){
    return {
      title: null,
      image: null,
      shortIntro: null,
      createdAt: null,
      authorName: null,
      content: null,
      category: null,
      tags: []
    }
  },
  components: {Header},
  computed: {
    toTimeString() {
      const date = new Date(this.createdAt);
      return date.toLocaleString();
    }
  },
  created() {
    getDetailArticle(this.$route.params.id).then((res)=>{
      this.title = res.data.content.title
      this.image = res.data.content.image
      this.shortIntro = res.data.content.shortIntro
      this.createAt = res.data.content.dateCreated
      this.authorName = res.data.content.account.fullname
      this.content = res.data.content.content
      this.category = res.data.content.category
      this.tags = res.data.content.tags
    })
  }
}
</script>

<style scoped>

</style>