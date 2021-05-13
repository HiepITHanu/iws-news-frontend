<template>
  <div>
    <Header></Header>
    <ListArticle></ListArticle>
  </div>
</template>

<script>
import Header from "@/components/Header";
import ListArticle from "@/components/ListArticle";
export default {
  name: "Home",
  components: {ListArticle, Header}
}
</script>

<style scoped>

</style>