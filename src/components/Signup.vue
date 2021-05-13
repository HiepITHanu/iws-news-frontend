<template>
  <div>
    <div style="font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;">
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="/">Home</b-navbar-brand>
      </b-navbar>
    </div>
    <div class="container" style="background-color: white; margin-top: 36px">
      <b-form @submit.stop.prevent="onSubmit" class="w-25 flex justify-content-center align-items-center">
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
        <b-form-group label="Full name">
          <b-form-input type="text" :state="validateFullname" v-model="fullname"></b-form-input>
          <b-form-invalid-feedback :state="validateFullname">Full name is required</b-form-invalid-feedback>
          <b-form-valid-feedback :state="validateFullname"></b-form-valid-feedback>
        </b-form-group>
        <b-form-group>
          <b-button class="btn" variant="success" type="submit">Sign up</b-button>
        </b-form-group>
        <div @click="$router.push('/signin')" style="cursor: pointer">I have already account</div>
        <b-form-group>
          <b-button class="btn" variant="outline-primary" @click="$router.push('/')">Cancel</b-button>
        </b-form-group>
      </b-form>
    </div>
  </div>
</template>

<script>
import {registerUser} from "@/service/AuthenService";

export default {
  name: "Signup",
  data(){
    return{
      username: "",
      password: "",
      fullname: "",
      validateUsername: null,
      validatePassword: null,
      validateFullname: null
    }
  },
  methods:{
    onSubmit(){
      this.validateUsername = this.username.length > 0
      this.validatePassword = this.password.length > 0
      this.validateFullname = this.fullname.length > 0

      if(this.validateUsername && this.validatePassword && this.validateFullname){
        let user = {
          fullname: this.fullname,
          username: this.username,
          password: this.password
        }

        registerUser(user).then((res) => {
          console.log(res)
          this.$bvModal.msgBoxOk("Sign up successfully!", {
            size: 'sm',
            buttonSize: 'sm',
            okVariant: 'success',
            centered: true
          })
        }).catch(err => {
          if(err){
            this.$bvModal.msgBoxOk("Signup failed!", {
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