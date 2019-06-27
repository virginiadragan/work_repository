import Vue from 'vue'
import Router from 'vue-router'
import Create from '@/components/pages/Create'
import List from '@/components/pages/List'
import TreeView from '@/components/pages/TreeView'
import OpenNumPad from '@/components/pages/OpenNumPad'

Vue.use(Router)
export default new Router({
    routes: [
        {
            path: '/Create',
            name: 'Create',
            component: Create
        },
        {
            path: '/List',
            name: 'List',
            component: List
        },
        {
            path: '/TreeView',
            name: 'TreeView',
            component: TreeView
        },
        {
            path: '/OpenNumPad',
            name: 'OpenNumPad',
            component: OpenNumPad
        }
    ]
  })