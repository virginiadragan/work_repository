<script>
  export default {
    name: 'Input',
    props: {
      fieldName: {
        required: true,
        type: String
      },
      fieldRules: {
        required: true,
        type: Array
      }
    },
    data: () => ({
        value: '',
        valid: false
    }),
    computed: {
      getFieldStatus () {
        return this.$store.getters.getField(this.fieldName)
      }
    },
    methods: {
      setName () {
        const objectField = {name: this.fieldName, value: this.value}
        this.$store.dispatch('setField', objectField)
      }
    }
  }
</script>
<template>
  <v-form v-model="valid">
    <v-container>
      {{getFieldStatus}}
      <v-layout>
        <v-flex
          xs12
          md4
        >
          <v-text-field
            v-model="value"
            @input="setName"
            :rules="fieldRules"
            :counter="10"
            label="Name"
            required
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>