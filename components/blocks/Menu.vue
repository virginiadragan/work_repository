<script>
export default {
  name: 'Menu'
}
</script>

<style scoped>
</style>

<template>
 <v-toolbar>
     <v-toolbar-items class="hidden-sm-and-down">
       <v-btn flat href="/#/Create">Create</v-btn>
       <v-btn flat href="/#/List">List</v-btn>
       <v-btn flat href="/#/TreeView">TreeView</v-btn>
       <v-btn flat href="/#/OpenNumPad">OpenNumPad</v-btn>
     </v-toolbar-items>
   </v-toolbar>
</template>