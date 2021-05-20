import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import getters from './getters'
import actions from './actions.js'
import mutations from './mutations'

export default new Vuex.Store({
    state: {
        listArticle: [],
        currentPage: 0,
        totalItem: 0,
        perPage: 10
    },
    getters,
    actions,
    mutations
})