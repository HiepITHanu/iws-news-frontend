<template>
  <div>
    <Header></Header>
    <div class="container mt-5 mb-5">
      <h4>Add article</h4>
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
          <b-button variant="outline-primary">Cancel</b-button>
        </router-link>
        <b-button variant="outline-primary" v-on:click="submit()">Submit</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import VoerroTagsInput from '@voerro/vue-tagsinput';
import {getTagsName, getCategories} from "@/service/CommonService";
import {createArticle} from "@/service/AuthenService";

export default {
  name: "CreateArticle",
  data() {
    return {
      title: "",
      image: "",
      shortIntro: "",
      content: "",
      validateTitle: null,
      validateImage: null,
      validateShortIntro: null,
      validateContent: null,
      tags: [],
      selectedTags: [],
      disabled: false,
      selectedCategory: [],
      categories: []
    }
  },
  components: {Header, "tags-input": VoerroTagsInput},
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

        createArticle(newArticle).then((res) => {
          console.log(res)
          if(res.status === 201){
            this.$bvModal.msgBoxOk("Successfully!", {
              size: 'sm',
              buttonSize: 'sm',
              okVariant: 'success',
              centered: true
            }).then(()=> {
              this.clear();
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
    },

    clear(){
      this.title = ""
      this.image = ""
      this.shortIntro = ""
      this.content = ""
      this.selectedCategory = []
      this.selectedTags = []
    }
  },

  computed: {

  },
  created() {
    getTagsName().then((res) => {
      this.tags = res.data.content
    })

    getCategories().then((res) => {
      this.categories = res.data.content
    })
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

.text-preview {
  font-size: 24px;
  font-weight: bold;
  color: #9b9b9b;
}

.border-radius {
  border-radius: 10px;
}
</style>