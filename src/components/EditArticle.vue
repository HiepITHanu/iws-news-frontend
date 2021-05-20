<template>
  <div>
    <Header></Header>
    <div class="container mt-5 mb-5">
      <h4>Edit article</h4>
      <b-form>
        <b-form-group>
          <b-form-input v-model="title" :state="validateTitle" required placeholder="title"></b-form-input>
          <b-form-invalid-feedback :state="validateTitle">Tittle must be 1-100 characters long.
          </b-form-invalid-feedback>
          <b-form-valid-feedback :state="validateTitle"></b-form-valid-feedback>
        </b-form-group>
        <b-form-group>
          <b-form-input v-model="shortIntro" :state="validateShortIntro" required
                        placeholder="Short intro"></b-form-input>
          <b-form-invalid-feedback :state="validateShortIntro">Short intro must be 1-500 characters long.
          </b-form-invalid-feedback>
          <b-form-valid-feedback :state="validateShortIntro"></b-form-valid-feedback>
        </b-form-group>
        <b-form-group>
          <b-form-input v-model="image" :state="validateImage" required placeholder="Image URL"></b-form-input>
          <b-form-invalid-feedback :state="validateImage">Image URL must be 1-255 characters long. Not image url.
          </b-form-invalid-feedback>
          <b-form-valid-feedback :state="validateImage"></b-form-valid-feedback>
        </b-form-group>
        <div class="preview">
          <img v-if="image" :src="image" class="img-preview">
          <div v-else class="text-preview">Image Preview</div>
        </div>
        <b-form-group>
          <b-form-textarea v-model="content" :state="validateContent" required placeholder="Content"></b-form-textarea>
          <b-form-invalid-feedback :state="validateContent">Content must be not blank.</b-form-invalid-feedback>
          <b-form-valid-feedback :state="validateContent"></b-form-valid-feedback>
        </b-form-group>
        <div>
          <tags-input
              element-id="tags"
              v-model="selectedTags"
              placeholder="Tags..."
              :limit=5
              :existing-tags="tags"
              id-field="id"
              text-field="name"
              :hide-input-on-limit="true"
              :typeahead-hide-discard="true"
              :typeahead="true">
            <template v-slot:selected-tag="{ tag, index, removeTag }">
              <span v-html="tag.name"></span>

              <a v-show="!disabled"
                 href="#"
                 class="tags-input-remove"
                 @click.prevent="removeTag(index)"></a>
            </template>
          </tags-input>
        </div>
        <div class="mt-2">
          <tags-input
              element-id="tags"
              v-model="selectedCategory"
              placeholder="Category..."
              :limit=1
              :existing-tags="categories"
              id-field="id"
              text-field="name"
              :hide-input-on-limit="true"
              :typeahead-hide-discard="true"
              :typeahead="true">
            <template v-slot:selected-tag="{ tag, index, removeTag }">
              <span v-html="tag.name"></span>

              <a v-show="!disabled"
                 href="#"
                 class="tags-input-remove"
                 @click.prevent="removeTag(index)"></a>
            </template>
          </tags-input>
        </div>
      </b-form>
      <div style="display: flex; justify-content: space-around" class="mt-2">
        <router-link to="/">
          <b-button variant="outline-primary" @click="this.$router.push('/')">Cancel</b-button>
        </router-link>
        <b-button variant="outline-primary" v-on:click="submit()">Save</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import VoerroTagsInput from '@voerro/vue-tagsinput';
import {getCategories, getDetailArticle, getTagsName} from "@/service/CommonService";
import {editArticle} from "@/service/AuthenService";
export default {
  name: "EditArticle",
  components: {Header, "tags-input": VoerroTagsInput},
  data(){
    return{
      validateTitle: null,
      validateImage: null,
      validateShortIntro: null,
      validateContent: null,
      disabled: false,
      tags: [],
      categories: [],

      title: "",
      shortIntro: "",
      image: '',
      content: '',
      selectedTags: [],
      selectedCategory: []
    }
  },
  created() {
    getDetailArticle(this.$route.params.id).then((res)=>{
      this.title = res.data.content.title
      this.shortIntro = res.data.content.shortIntro
      this.image = res.data.content.image
      this.content = res.data.content.content
      this.selectedTags = res.data.content.tags
      this.selectedCategory.push(res.data.content.category)
    })

    getTagsName().then((res) => {
      this.tags = res.data.content
    })

    getCategories().then((res) => {
      this.categories = res.data.content
    })
  },
  methods: {
    submit() {
      this.validateTitle = !(this.title.length > 100 || this.title.length < 1)

      this.validateImage = !(this.image.length > 255 || this.image.length < 1)

      this.validateShortIntro = !(this.shortIntro.length > 500 || this.shortIntro.length < 1)

      this.validateContent = !(this.content == "")

      if (this.validateTitle && this.validateContent && this.validateShortIntro
          && this.validateImage && this.selectedTags.length > 0 && this.selectedCategory.length === 1) {

        const newArticle = {
          "title": this.title,
          "image": this.image,
          "shortIntro": this.shortIntro,
          "content": this.content,
          "categoryId": this.selectedCategory[0].id,
          "tagIds": this.selectedTags.map(x=> x.id)
        }

        editArticle(this.$route.params.id, newArticle).then((res) => {
          if(res.status === 200){
            this.$bvModal.msgBoxOk("Successfully!", {
              size: 'sm',
              buttonSize: 'sm',
              okVariant: 'success',
              centered: true
            }).then(()=> {
              this.$router.back();
            })
          }
        }).catch(err => {
          if(err) {
            this.$bvModal.msgBoxOk(`Failed!`, {
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
.preview {
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px dotted #9b9b9b;
  margin-bottom: 16px;
}

.img-preview {
  width: 100%;
  height: 100%;
}
</style>