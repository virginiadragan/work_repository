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
    }
  },
  data() {
    return {
      show: false,
      number: "",
      rules: {
        required: value => !!value || 'Required.',
        min: v => v >= Number(this.minVal) || 'the number is too small',
      }
    }
  },
  computed: {},
  methods: {
    getValue(value) {
      this.number = value;
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
            :rules="[rules.required, rules.min]"
            type="text"
            readonly
            name="input-10-1"
            @click:append="show = !show"
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
    <!--<NumPad v-if="show" :getValue="getValue" :minVal="minVal" :maxVal="maxVal"/>-->
    <super-num-pad v-if="show" :getValue="getValue" :minVal="minVal" :maxVal="maxVal" />
  </v-form>
</template>