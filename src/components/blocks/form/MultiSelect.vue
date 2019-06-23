<script>
import MultiSelectChild from '@/components/blocks/form/MultiSelectChild.vue'
  export default {
    data: () => ({
       groups: [
            {
                id: 1,
                name: 'Is11Z'
            },
            {
                id: 2,
                name: 'Is21Z'
            },
            {
                id: 3,
                name: 'Is31Z'
            }
        ],
      selected: []
    }),
    components: {
      MultiSelectChild
    },
    computed: {
      likesSomeGroups () {
        return this.selected.length > 0 && !this.likesAllGroups
      },
      icon () {
        if (this.likesSomeGroups) return 'mdi-minus-box'
        return 'mdi-checkbox-blank-outline'
      }
    },
  }
</script>
<template>
  <div>
    <v-select
      v-model="selected"
      :items="groups"
      item-text="name"
      item-value="id"
      label="Select Item"
      multiple
    >
      <template v-slot:append-item>
        <v-divider class="mb-2"></v-divider>
        <v-list-tile disabled>
          <v-list-tile-avatar color="grey lighten-3">
            <v-icon>mdi-food-apple</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content v-if="likesSomeGroups">
            <v-list-tile-title>Group Count</v-list-tile-title>
            <v-list-tile-sub-title>{{ selected.length }}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-select>
    <MultiSelectChild :selectedItem="selected"/>
  </div>
</template>