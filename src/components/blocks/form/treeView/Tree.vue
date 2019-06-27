<script>
export default {
  name: "Tree",
  props: {
    treeValue: {
      type: Array,
      required: true
    }
  },
  data: () => ({}),
  computed: {},
  methods: {}
};
</script>
<template>
  <div>
    <div :key="index" v-for="(item, index) in treeValue">
      {{item.title}}
      <div v-if="item.children">
        <Tree class="pl-3" :treeValue="item.children"/>
      </div>
    </div>
  </div>
</template>