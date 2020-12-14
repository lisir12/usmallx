
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { requserList ,requserCount } from '../../util/request'
const state = {
    list:[],
    total:0,
    page:1,
    size:2
}

const mutations = {
    changeList(state,arr){
        state.list = arr
    },

    changeCount(state,num){
        state.total = num
    },
    
    changePage(state,page){
        state.page = page
    },
    
}

const actions = {
    requestuserList(context){
        requserList(
           { page:context.state.page,
            size:context.state.size}
        ).then(res=>{
            context.commit('changeList',res.data.list)
        })
    },
    requestuserCount(context){
        requserCount().then(res=>{
            context.commit('changeCount',res.data.list[0].total)
        })
    },
    changeCurrentPage(context,page){
        context.commit('changePage',page)
        context.dispatch('requestuserList')
    }
}

const getters = {
    list(state){
        return state.list
    },
    total(state){
        return state.total
    },
    page(state){
        return state.page
    },
    size(state){
        return state.size
    }
}


export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}