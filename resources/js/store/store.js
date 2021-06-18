import Axios from 'axios';
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
      categoryData: [],
      postData: [],
    },
    getters: {
        categories(state){
            return state.categoryData;
        },
        posts(state){
            return state.postData;
        }
    },
    mutations: {
        receivedCategory(state, payload){
            state.categoryData = payload;
        },
        receivedPost(state, payload){
            state.postData = payload;
        }
    },
    actions: {
        receivedCategory(data){
            axios.get('/api/category')
            .then(res => {
                data.commit('receivedCategory',res.data);

            })
        },
        receivedPost(data){
            axios.get('/api/post')
            .then(res => {
                data.commit('receivedPost',res.data);
            })
        }
    },

})
export default store;
