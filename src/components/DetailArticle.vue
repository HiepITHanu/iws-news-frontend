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
      <div>Category: {{ this.category.name }}</div>
      <div>
        Tags: <a class="bg-secondary mr-3 pl-2 pr-2 text-white" v-for="(item) in tags" :key="item.id" href="">#{{ item.name }}</a>
      </div>
    </div>
    <hr class="w-75">
    <!--  Comments-->
    <div id="list-comment" class="container w-75 mt-2">
      <b-form v-if="authen" class="mb-3" @submit.prevent="addComment()">
        <b-form-input class="w-75 container" placeholder="..." v-model="newComment"></b-form-input>
      </b-form>
      <div v-if="allComment.length === 0" class="text-center">No comments</div>
      <div v-else>
        <h4 class="mb-2">Comments</h4>
        <div v-for="item in allComment" :key="item.id">
          <Comment @updateComment="handleEditComment(item.id)" @removeComment="handleRemoveComment" :id="item.id" :comment="item.content" :full-name="item.account.fullname" :created-date="item.dateCreated"></Comment>
        </div>
      </div>
      <div class="d-flex justify-content-center mt-2">
        <b-pagination v-if="allComment.length !== 0"
            v-model="currentPage"
            :total-rows="totalItem"
            :per-page="perPage"
            aria-controls="list_comment"
        ></b-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import {getComments, getDetailArticle} from "@/service/CommonService";
import Comment from "@/components/Comment";
import {editComment, insertComment} from "@/service/AuthenService";
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
      tags: [],
      comments: [],
      newComment: "",
      currentPage: 1,
      totalItem: 0,
      perPage: 0
    }
  },
  components: {Comment, Header},
  methods: {
    addComment(){
      const comment = {
        "content": this.newComment
      }

      insertComment(this.$route.params.id, comment).then((res) => {
        if(res.status === 201){
          getComments(this.$route.params.id, this.currentPage).then((res) => {
            this.comments = res.data.content.content
            this.perPage = 10
            this.totalItem = res.data.content.count;
          })
        }
      })

      this.newComment = ""
    },

    handleRemoveComment(){
      getComments(this.$route.params.id, this.currentPage).then((res) => {
        this.comments = res.data.content.content
        this.perPage = 10
        this.totalItem = res.data.content.count;
      }).catch((err) => {
        console.log(err)
        this.comments = []
      })
    },

    handleEditComment(commentId){
      const content = prompt("Edit comment")
      if(content !== null){
        const newComment = {"content": content};
        editComment(commentId, newComment).then((res) => {
          if(res.status === 200){
            getComments(this.$route.params.id, this.currentPage).then((res) => {
              this.comments = res.data.content.content
              this.perPage = 10
              this.totalItem = res.data.content.count;
            })
          }
        })
      }
    }
  },
  computed: {
    toTimeString() {
      const date = new Date(this.createdAt);
      return date.toLocaleString();
    },

    allComment(){
      return this.comments
    },

    authen(){
      const token = localStorage.getItem('token');
      return token != null;
    }
  },
  watch: {
    currentPage: function (){
      getComments(this.$route.params.id, this.currentPage).then((res) => {
        this.comments = res.data.content.content
        this.perPage = 10
        this.totalItem = res.data.content.count;
      }).catch((err) => {
        console.log(err)
        this.comments = []
      })
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

    this.currentPage = 1
    getComments(this.$route.params.id, this.currentPage).then((res) => {
      if(res.data.content.count !== 0){
        this.comments = res.data.content.content
        this.perPage = 10
        this.totalItem = res.data.content.count;
      }
    }).catch((err) => {
      console.log(err)
      this.comments = []
    })
  }
}
</script>

<style scoped>

</style>