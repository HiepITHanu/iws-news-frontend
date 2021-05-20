export default {
    initListArticle({commit}, page){
        commit('getArticles', page)
    },

    getListArticleByCate({commit}, payload) {
        commit('getListArticleByCategory', payload)
    },

    getListArticleByTag({commit}, payload) {
        commit('getListArticlesByTag', payload)
    }
}