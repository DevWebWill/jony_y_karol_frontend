import store from "./store";
import axios from "axios"

export default {
    state: {
        token: null,
        user: null
    },
    getters: {
        isAuthenticated(state) {
            return state.token && state.user
        },
        getUser(state) {
            return state.user
        },
        getToken(state) {
            return state.token
        },
        getRolesUser: state => {
            if(state.user != null)
                return state.user.roles;
            else
                return null;
        },
        isFullRegistration: state => {
            if(state.user != null)
                return state.user.full_record;
            else
                return null;
        }
    },
    mutations: {
        setToken(state, token) {
            state.token = token
        },
        setUser(state, user) {
            state.user = user
        },
    },
    actions: {
        login({dispatch}, credentials) {
            store.commit('setLoading', true)
            
            return axios.post(import.meta.env.VITE_APP_URL_API+'/auth/login', credentials).then((response) => {
                store.commit('setLoading', false);
                if(response !== undefined && response.data !== undefined) {
                    const token = response.data.token;
                    if(token) {
                        //console.log('ok3', token);
                        localStorage.setItem("st", response.data.token);
                        dispatch('attempt', response.data.token);
                        return response;
                    }
                    
                } else {
                    return;
                }

            }).catch((error) => {
                store.commit('setLoading', false);
                //console.error("Login Failed", error.response);
                throw error;
            })  
        },
        async attempt({commit, state}, token) {
            if(token) {
                commit('setToken', token)
            }

            if(!state.token) {
                return
            }

            try {
                const axiosConfig = {
                    headers: {
                      'Authorization': `Bearer ${token}`,
                      'Content-Type': 'application/json'
                    }
                };
                await axios.get(
                    import.meta.env.VITE_APP_URL_API+'/auth/user', 
                    axiosConfig
                ).then((response) => {
                    let data = response.data;            
                    commit('setUser', data);
                })
                
            } catch (error) {
                commit('setUser', null)
                commit('setToken', null)
                localStorage.removeItem('st')
                //console.error("Profile Failed", error)
            }

            store.commit('setLoading', false)
        },
        async register(_, form) {
            store.commit('setLoading', true);
            //console.log(import.meta.env.VITE_APP_URL_API)
            return await axios.post(import.meta.env.VITE_APP_URL_API+'/auth/register', form).then((response) => {
                store.commit('setLoading', false)
                return response;
            })
            .catch((e) => {
                store.commit('setLoading', false)
                console.error(e.response.data)
            })
        }, 
        logout({commit}) {
            store.commit('setLoading', true);
            localStorage.removeItem('st');
            commit('setUser', null);
            commit('setToken', null);
            store.commit('setLoading', false)
        }
    }
}