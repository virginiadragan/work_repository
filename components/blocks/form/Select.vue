<script>
import SelectChild from '@/components/blocks/form/SelectChild.vue'
  export default {
    name: 'Select',
    props: {
      fieldName: {
        required: true,
        type: String
      }
    },
    components: {
      SelectChild
    },
    data: () => ({
        selected: '',
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
        ]
    }),
    watch: {
      selected () {
        this.setItems()
      }
    },
    computed: {
       getFieldStatus () {
        return this.$store.getters.getField(this.fieldName)
      }
    },
    methods: {
      setItems () {
        const objectField = {
          name: this.fieldName, 
          value: this.selected
        }
        this.$store.dispatch('setField', objectField)
      }
    }
  }
</script>

<template>
  <div>
    <v-container fluid grid-list-xl>
      <v-layout wrap align-center>
        <v-flex xs12 sm6 d-flex>
          <v-select
            :items="groups"
            item-text="name"
            item-value="id"
            v-model="selected"
            label="Select item"
            solo
          ></v-select>
        </v-flex>
      </v-layout>
    </v-container>
    <SelectChild :selectedItem="selected"/>
  </div>
</template>