<template>
  <div>
    <div style="font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;">
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="/">Home</b-navbar-brand>
      </b-navbar>
    </div>
    <div class="container" style="background-color: white; margin-top: 36px">
      <b-form @submit.stop.prevent="onSubmit($event)" class="w-25 flex justify-content-center align-items-center">
        <b-form-group label="Username">
          <b-form-input :state="validateUsername" v-model="username"></b-form-input>
          <b-form-invalid-feedback :state="validateUsername">Username is required</b-form-invalid-feedback>
          <b-form-valid-feedback :state="validateUsername"></b-form-valid-feedback>
        </b-form-group>
        <b-form-group label="Password">
          <b-form-input type="password" :state="validatePassword" v-model="password"></b-form-input>
          <b-form-invalid-feedback :state="validatePassword">Password is required</b-form-invalid-feedback>
          <b-form-valid-feedback :state="validatePassword"></b-form-valid-feedback>
        </b-form-group>
        <b-form-group>
          <b-button class="btn" variant="outline-primary" type="submit">Login</b-button>
        </b-form-group>
        <b-form-group>
          <b-button @click="$router.push('/signup')" class="btn" variant="success">Sign up</b-button>
        </b-form-group>
      </b-form>
    </div>
  </div>
</template>

<script>
import {postAuthenticationRequest} from "@/service/AuthenService";
export default {
  name: "Signin",
  data(){
    return {
      username: "",
      password: "",
      validateUsername: null,
      validatePassword: null,
      errorMessage: ""
    }
  },
  methods: {
    onSubmit(e){
      e.preventDefault()
      this.validateUsername = (this.username.length > 0)
      this.validatePassword = (this.password.length > 0)

      if(this.validateUsername && this.validatePassword){
        let user = {
          username: this.username,
          password: this.password
        }

        postAuthenticationRequest(user).then(
            (res) => {
              this.$bvModal.msgBoxOk("Successfully!", {
                size: 'sm',
                buttonSize: 'sm',
                okVariant: 'success',
                centered: true
              }).then(()=>{
                localStorage.setItem("token", res.headers.authorization)
                localStorage.setItem("fullName", res.data.content.fullname)
                this.$router.push('/')
              })
            }
        ).catch(err => {
          if(err) {
            this.$bvModal.msgBoxOk(`Signin failed!`, {
              size: 'sm',
              buttonSize: 'sm',
              okVariant: 'failure',
              centered: true
            })
          }
        })
      }
    }
  }
}
</script>

<style scoped>
.container{
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn{
  width: 100%;
}
</style>