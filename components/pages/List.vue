<script>
export default {
  name: "List",
  data() {
    return {
      headers: [
        { text: "id", value: "id" },
        { text: "Product", value: "value" }
      ],
      items: []
    };
  },
  mounted() {
    this.$store.dispatch("getList").then(res => {
      this.items = res
    });
  }
};
</script>

<template>
  <v-data-table :headers="headers" :items="items" class="elevation-1">
    <template v-slot:items="pr">
      <td>{{ pr.item.id}}</td>
      <td class="text-xs-right">{{ pr.item.value}}</td>
    </template>
  </v-data-table>
</template>
