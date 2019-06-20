import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        fields: {
            name: '',
            age: 0,
            product: '',
            description: ''
        },
        list: []
    },
    mutations: {
        setField: (state, field) => {
            state.fields[field.name] = field.value
        },
        setName: (state, name) => {
            state.name = name
        },
        setProduct: (state, product) => {
            state.product = product
        },
        setList: (state, list) => {
            state.list.push(list)
        },
        clearList: (state) => {
            state.list = []
        }
    },
	getters: {
        getField: state => (fieldName) => { 
            return state.fields[fieldName]
        },
        getName (state) { 
            return state.name
        },
        getProduct (state) {
            return state.product
        },
        getList (state) {
            return state.list
        }
    },
    actions: {
        setField: (context, payload) => {
            context.commit('setField', payload)
            //console.log(context.state.fields)
        },
        setName: (context, payload) => {
            context.commit('setName', payload)
        },
        setProduct: (context, payload) => {
            context.commit('setProduct', payload)
        },
        setList: (context, payload) => {
            context.commit('setList', payload)
        },
        clearList: (context, payload) => {
            context.commit('clearList', payload)
        }
    }
})

export default store