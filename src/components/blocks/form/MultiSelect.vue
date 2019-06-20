<script>
  export default {
    data: () => ({
       groups: [
            {
                id: 1,
                name: 'Is11Z'
            },
            {
                id: 2,
                name: 'Is12Z'
            },
            {
                id: 3,
                name: 'Is31Z'
            }
        ],
      selected: []
    }),

    computed: {
      likesAllGroups () {
        return this.selected.length === this.groups.length
      },
      likesSomeGroups () {
        return this.selected.length > 0 && !this.likesAllGroups
      },
      icon () {
        if (this.likesAllGroups) return 'mdi-close-box'
        if (this.likesSomeGroups) return 'mdi-minus-box'
        return 'mdi-checkbox-blank-outline'
      }
    },

    methods: {
      toggle () {
        this.$nextTick(() => {
          if (this.likesAllGroups) {
            this.selected = []
          } else {
            this.selected = this.groups.slice()
          }
        })
      }
    }
  }
</script>
<template>
  <v-select
    v-model="selected"
    :items="groups"
    item-text="name"
    label="Select Item"
    multiple
  >
    <template v-slot:prepend-item>
      <v-list-tile
        ripple
        @click="toggle"
      >
        <v-list-tile-action>
          <v-icon :color="selected.length > 0 ? 'indigo darken-4' : ''">{{ icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Select All</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider class="mt-2"></v-divider>
    </template>
    <template v-slot:append-item>
      <v-divider class="mb-2"></v-divider>
      <v-list-tile disabled>
        <v-list-tile-avatar color="grey lighten-3">
          <v-icon>mdi-food-apple</v-icon>
        </v-list-tile-avatar>

        <v-list-tile-content v-if="likesAllGroups">
          <v-list-tile-title>Holy smokes, someone call the fruit police!</v-list-tile-title>
        </v-list-tile-content>

        <v-list-tile-content v-else-if="likesSomeGroups">
          <v-list-tile-title>Group Count</v-list-tile-title>
          <v-list-tile-sub-title>{{ selected.length }}</v-list-tile-sub-title>
        </v-list-tile-content>
        
      </v-list-tile>
    </template>
  </v-select>
</template>