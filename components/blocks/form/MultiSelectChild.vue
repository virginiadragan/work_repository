<script>
  export default {
    name: 'MultiSelectChild',
    props: {
      selectedItem: {
        required: true,
        type: Array
      }
    },
    data: () => ({
        selected: '',
        items: [],
        students: [
            {
                id: 1,
                name: 'Marin Bumbac',
                parents: {
                    group: 1
                }
            },
            {
                id: 2,
                name: 'Valentin Mihai',
                parents: {
                    group: 1
                }
            },
            {
                id: 3,
                name: 'Virginia Dragan',
                parents: {
                    group: 2
                }
            },
            {
                id: 4,
                name: 'Andrei Boronciuc',
                parents: {
                    group: 3
                }
            }
        ]
    }),
    watch: {
      selected () {
        this.setItems()
      },
      selectedItem () {
        const thiss = this
        this.items = []
        this.selectedItem.forEach(function(elm){
          const students = thiss.students.filter(student => student.parents.group === elm)
          thiss.items = thiss.items.concat(students) 
         })
      }
    },
    computed: {
       getFieldStatus () {
        return this.$store.getters.getField(this.fieldName)
      }
    },
    methods: {
      setItems () {
        const objectField = {name: this.fieldName, value: this.selected}
        this.$store.dispatch('setField', objectField)
      }
    }
  }
</script>

<template>
  <v-container fluid grid-list-xl>
    <v-layout wrap align-center>
      <v-flex xs12 sm6 d-flex>
        <v-select
          :items="items"
          item-text="name"
          v-model="selected"
          label="Select item"
          solo
        ></v-select>
      </v-flex>
    </v-layout>
  </v-container>
</template>