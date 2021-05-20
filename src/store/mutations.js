import {getArticles, getArticlesByCategory, getArticlesByTag} from "@/service/CommonService";

export default {
    getListArticleByCategory(state, payload){
        getArticlesByCategory(payload.categoryId, payload.page).then((res) => {
            if(res.status === 200){
                state.listArticle = res.data.content.content;
                state.currentPage = payload.page;
                state.totalItem = res.data.content.count;
            }
        })
    },

    getListArticlesByTag(state, payload){
        getArticlesByTag(payload.tagId, payload.page).then((res) => {
            if(res.status === 200){
                state.listArticle = res.data.content.content;
                state.currentPage = payload.page;
                state.totalItem = res.data.content.count;
            }
        })
    },

    getArticles(state, page){
        getArticles(page).then((res) => {
            if(res.status === 200){
                state.listArticle = res.data.content.content;
                state.currentPage = page;
                state.totalItem = res.data.content.count;
            }
        })
    }


}