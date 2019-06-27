<script>
import Tree from '@/components/blocks/form/treeView/Tree.vue'
  export default {
    name: 'TreeView',
     components: {
        Tree
    },
    data: () => ({
      treeExample: [
        {
          title: 'Item 1',
          children: [
            {
              title: 'Item 1.1',
              children: [
                {
                  title: 'Item 1.1.1'
                },
                {
                  title: 'Item 1.1.2'
                },
                {
                  title: 'Item 1.1.3'
                }
              ]
            },
            {
              title: 'Item 1.2'
            },
            {
              title: 'Item 1.3'
            }
          ]
        },
        {
          title: 'Item 2',
          children: [
            {
              title: 'Item 1.1'
            },
            {
              title: 'Item 1.2'
            },
            {
              title: 'Item 1.3'
            }
          ]
        }
      ],
    }),
    computed: {
      
    },
    methods: {

    }
  }
</script>
<template>
  <div>
    <Tree :treeValue="treeExample"/>
  </div>
</template>