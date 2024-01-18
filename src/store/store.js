import { createStore } from 'vuex'
import auth from './auth'

const store = createStore({
    state () {
        return {
            /* baseUrl: 'https://127.0.0.1:8001', */
            baseUrl: import.meta.env.VITE_APP_URL,
            baseUrlApi: import.meta.env.VITE_APP_URL_API,
            isLoading: false,
            count: 0
        }
    },
    mutations: {
        setLoading(state, newLoadingState) {
            state.isLoading = newLoadingState
        },
        increment (state) {
            state.count++
        }
    },
    getters: {
        getLoading: state => {
            return state.isLoading
        },
    },
    actions: {
        
    }, 
    modules: {
        auth
    }
})

export default store;