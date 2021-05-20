<template>
  <div>
    <Header/>
    <div>
      <b-container>
        <b-table
            :items="items"
            :fields="fields"
            stacked="md"
            show-empty
            small
        >
          <template #cell(name)="row">
            {{ row.value.first }} {{ row.value.last }}
          </template>

          <template #cell(actions)="row">
            <b-button size="sm"
                      @click="edit(row.item, row.index, $event.target)"
                      class="mr-1" variant="outline-primary">Edit</b-button>
            <b-button size="sm" @click="deleteItem(row.item)" variant="danger">Delete</b-button>
          </template>

          <template #row-details="row">
            <b-card>
              <ul>
                <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
              </ul>
            </b-card>
          </template>
        </b-table>
      </b-container>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import {getArticlesByAccountId} from "@/service/CommonService";
import {deleteArticle} from "@/service/AuthenService";

export default {
  name: "BlogManagement",
  components: {Header},
  data(){
    return {
      items: [

      ],
      fields: [
        { key: 'id', label: 'ID', class: 'text-center'},
        { key: 'title', label: 'Title', class: 'text-center' },
        { key: 'dateCreated', label: "Created date", class: "text-center"},
        { key: 'actions', label: 'Actions', class: 'text-center' }

      ],
      infoModal: {
        id: 'info-modal',
        title: '',
        content: ''
      }
    }
  },
  mounted() {

  },
  methods: {
    edit(item, index, target){
      console.log(item)
      console.log(index)
      console.log(target)
      this.$router.push(`/edit-article/${item.id}`)
    },
    deleteItem(item){
      this.$bvModal.msgBoxConfirm("Are you sure?", {
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'danger',
        centered: true
      }).then(value => {
        if(value){
          deleteArticle(item.id).then((res)=>{
            if(res.status === 200){
              this.items.splice(this.items.indexOf(item), 1)
            }
          })
        }
      })

    }
  },
  created() {
    getArticlesByAccountId(localStorage.getItem("accountId")).then((res)=>{

      this.items = res.data.content.content.map(x=> ({
        "id": x.id,
        "title": x.title,
        "dateCreated": new Date(x.dateCreated).toLocaleString()
      }))
    })
  }
}
</script>

<style scoped>

</style>