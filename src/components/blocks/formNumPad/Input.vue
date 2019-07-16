<script>
import SuperNumPad from "@/components/blocks/formNumPad/SuperNumPad"
export default {
  name: "Input",
  components: {
    SuperNumPad//: () => import("@/components/blocks/formNumPad/SuperNumPad")
  },
  props: {
    minVal: {
      type: String,
      required: true
    },
    maxVal: {
      type: String,
      required: true
    },
    precision: {
      type: String,
      required: true
    },
    operations: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      show: true,
      number: "",
    }
  },
  computed: {},
  methods: {
    getValue(value, show) {
      this.number = value
      this.show = show
    },
    clearInput () {
      console.log("hey")
      this.number = "254564"
      console.log('number', this.number)
    }
  }
}
</script>
<template>
  <v-form>
    <v-container fluid>
      <v-layout row wrap>
        <v-flex xs12 sm6>
          <v-text-field
            v-model="number"
            :append-icon="show ? 'visibility' : 'visibility_off'"
            clearable
            type="text"
            readonly
            name="input-10-1"
            @click:clear="number=''"
            @click:append="show = !show"
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
    <!--<NumPad v-if="show" :getValue="getValue" :minVal="minVal" :maxVal="maxVal"/>-->
    <super-num-pad v-if="show" :getValue="getValue" :minVal="minVal" :maxVal="maxVal" :precision="precision" :number="number" :operations="operations"/>
  </v-form>
</template>