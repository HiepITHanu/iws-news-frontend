<template>
  <div style="font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="/">Home</b-navbar-brand>
      <b-navbar-brand>
        <b-dropdown text="Category" class="m-md-2">
          <b-dropdown-item v-for="(item) in this.categories" :key="item.id" @click="selectCategory(item.id)">
            {{ item.name }}
          </b-dropdown-item>
        </b-dropdown>
      </b-navbar-brand>
      <b-navbar-brand>
        <b-dropdown text="Tags" class="m-md-2">
          <b-dropdown-item v-for="(item) in this.tags" :key="item.id" @click="selectTag(item.id)">
            {{ item.name }}
          </b-dropdown-item>
        </b-dropdown>
      </b-navbar-brand>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="/create-article" v-if="authentication">+ New Post</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">

          <b-nav-item-dropdown right v-if="authentication">
            <template #button-content><em>{{ fullName }}</em></template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="/my-articles">My blogs</b-dropdown-item>
            <b-dropdown-item @click="logout" >Log Out</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item class="col-sm" to="/signin" v-else>Login</b-nav-item>
          <b-nav-item class="col-sm" to="/signup" v-if="!authentication">Signup</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import {getCategories, getTagsName} from "@/service/CommonService";

export default {
  name: "Header",
  data(){
    return{
      authentication: false,
      fullName: "",
      categories: [],
      tags: []
    }
  },
  computed: {
    auth: function(){
      if(localStorage.getItem('username')){
        return true;
      }
      return false
    }
  },
  methods: {
    logout(){
      localStorage.removeItem('token')
      localStorage.removeItem('fullName')
      this.$router.push('/signin')
    },

    selectCategory(categoryId){
      this.$store.dispatch("getListArticleByCate", {"categoryId": categoryId,"page": 1})
    },

    selectTag(tagId){
      this.$store.dispatch("getListArticleByTag", {"tagId": tagId,"page":  1})
    }
  },
  created() {
    if(localStorage.getItem('token')){
      this.authentication = true
      this.fullName = localStorage.getItem("fullName")
    }

    getCategories().then((res) => {
      this.categories = res.data.content;
    })

    getTagsName().then((res) => {
      this.tags = res.data.content;
    })

  }
}
</script>

<style scoped>

</style>