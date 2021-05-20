<template>
  <div>
    <h6>
      <span style="font-size: 16px">{{ fullName }}</span>
      <small class="text-muted ml-2">{{ getDate }}</small>
      <span v-if="authen" class="ml-3" style="cursor: pointer" @click="edit"><b-icon-pencil ></b-icon-pencil></span>
      <span v-if="authen" class="ml-3" style="cursor: pointer" @click="del"><b-icon-trash ></b-icon-trash></span>
    </h6>
    <div class="ml-5 p-2 mb-2 circle-border bg-gray">{{ comment }}</div>
  </div>
</template>

<script>
import {BIconPencil, BIconTrash} from 'bootstrap-vue'
import {deleteComment} from "@/service/AuthenService";
export default {
  name: "Comment",
  components: {BIconPencil, BIconTrash},
  props: {
    id: Number,
    comment: String,
    fullName: String,
    createdDate: Number
  },
  computed: {
    getDate(){
      return new Date(this.createdDate).toLocaleString()
    },

    authen(){
      const token = localStorage.getItem('token');
      return token != null;
    }
  },
  methods: {
    del(){
      deleteComment(this.id).then((res) => {
        if(res.status == 200){
          this.$emit("removeComment")
        }
      })
    },

    edit(){
      this.$emit("updateComment")
    }
  }
}
</script>

<style scoped>
.circle-border{
  border-radius: 10px;
}

.bg-gray{
  background-color: #EBEDF0;
}
</style>