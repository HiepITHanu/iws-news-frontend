<template>
  <div class="post">
    <div class="title">
      <h2><a href="#">{{article.title}}</a></h2>
      <p><small>{{ toTimeString }} by <a href="#">{{ article.account.fullname }}</a></small></p>
    </div>
    <div class="entry">
      <div class="d-flex">
        <div >
          <img class="image" v-bind:src="article.image">
        </div>
        <div>{{article.shortIntro}}
          <p class="links" v-if="article.commentCount > 0"><a href="#" class="comments">{{ article.commentCount }} comments</a> </p>
          <p class="links" v-else><a href="#" class="comments">No Comments</a> </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Article",
  props: {
    article: Object
  },
  computed: {
    toTimeString() {
      const date = new Date(this.article.dateCreated);
      return date.toLocaleString();
    }
  }
}
</script>

<style scoped>
.image{
  width: 200px;
  height: 200px;
}
</style>