<script>
export default {
  name: "NumPad",
  props: {
    getValue: {
      type: Function,
      required: true
    },
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
    number: {
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
      value: this.number,
      pointChar: ".",
      activeButtons: {
        digits: [true, true, true, true, true, true, true, true, true, true],
        functional: {
          ok: true,
          sign: true
        }
      },
      currentValue: "",
      intermediateResult: this.number,
      operation: "",
      hasOperation: false,
      clickEqual: false,
      operationsHistory: "",
      rules: {
        min: v => v >= Number(this.minVal) || "the number is too small",
        max: v => v <= Number(this.maxVal) || "the number is too big"
      }
    };
  },
  computed: {
    isActiveDigitButton() {
      return this.activeButtons.digits;
    }
  },
  mounted() {
    this.handleActiveButtons();
    this.hasError();
  },
  methods: {
    hasError() {
      if (
        Number(this.minVal) > Number(this.maxVal) ||
        isNaN(this.minVal) ||
        isNaN(this.maxVal)
      ) {
        this.deactivateAllDigits();
        return true;
      }
      return false;
    },
    getDigit(digit) {
      if (!this.activeButtons.digits[digit]) {
        return;
      }
      this.pushDigit(digit);
      this.handleActiveButtons();
    },
    handleActiveButtons() {
      this.handleActiveDigitButtons();
      this.isActiveSignButton();
      this.isActivePointButton();
      this.isActiveBackspaceButton();
      this.isActiveOkButton();
      this.isActiveArithmeticButtons();
      this.isActiveEqualButton();
    },
    // TODO
    isActiveArithmeticButtons() {
      return !this.operations
    },
    isActiveEqualButton() {
      return  !(
        this.value === "" ||
        this.clickEqual ||
        !this.operations ||
        this.operation === ""
      )
    },
    isActiveOkButton() {
      return (
        Number(this.value) < Number(this.minVal) ||
        Number(this.value) > Number(this.maxVal) ||
        this.value === "" ||
        (!this.clickEqual && this.operation !== "")
      )
    },
    handleActiveDigitButtons() {
      let max = this.getMaxPossibleDigit();
      if (this.value === "0" && !this.hasOperation) {
        console.log("hey")
        max = 0;
      }
      if (this.hasPoint()) {
        console.log(this.checkPrecision())
        max = this.checkPrecision();
      }
      for (let i = 0; i < max; i++) {
        this.activeButtons.digits.splice(i, 1, true);
      }
      for (let i = max; i <= 9; i++) {
        this.activeButtons.digits.splice(i, 1, false);
      }
    },
    getMaxPossibleDigit() {
      this.activateAllDigits()
      if(this.intermediateResult === ""){
        return this.maxPossibleDigit()
      }else{
        return this.maxPossibleArithmeticDigit()
      }
    },
    maxPossibleDigit (i) {
      for (let i = 0; i <= 9; i++) {
        if(Number(this.value.concat(i)) > Number(this.maxVal)){
          return i
        }         
      }
      return 10
    },
    maxPossibleArithmeticDigit () {
      for (let i = 0; i <= 9; i++) {
        const op = Number(this.currentValue) * 10 + i
        if (eval(this.intermediateResult.concat(op)) > Number(this.maxVal)) {
          console.log(this.intermediateResult.concat(op));
          return i;
        }      
      }
      return 10
    },
    startWithPoint() {
      if (this.value.startsWith(".")) {
        this.value = "0" . concat(this.value)
        this.currentValue = this.value
      }
    },
    checkPrecision() {
      return Number(!(this.value.length - 1 - this.value.indexOf(".") === Number(this.precision)))
    },
    pushDigit(digit) {
      this.currentValue += digit;
      this.value = this.currentValue
      this.hasOperation = false
    },
    addPoint() {
      if (!this.hasPoint() && this.isActivePointButton()) {
        this.value = this.currentValue += this.pointChar;
        this.startWithPoint();
        this.handleActiveDigitButtons();
      }
    },
    hasPoint() {
      return this.value.includes(this.pointChar) && !this.hasOperation
    },
    isActivePointButton() {
      return !(
        Number(this.value) === Number(this.maxVal) ||
        this.precision <= 0 ||
        this.hasError()
      );
    },
    clearAll() {
      this.activeButtons.functional.sign = true;
      this.value = ''
      this.currentValue = ''
      this.intermediateResult = ''
      this.operationsHistory = ''
      this.handleActiveButtons()
      this.isActiveBackspaceButton()
    },
    activateAllDigits() {
      for (let i = 0; i < this.activeButtons.digits.length; i++) {
        this.activeButtons.digits.splice(i, 1, true);
      }
    },
    deactivateAllDigits() {
      for (let i = 0; i <= 9; i++) {
        this.activeButtons.digits.splice(i, 1, false);
      }
    },
    changeSign() {
      //todo reduce code by 40%
      if (this.value !== "") {
        if (this.value === "-") {
          this.value = this.currentValue = "";
          this.activeButtons.functional.sign = !this.activeButtons.functional.sign;
          return;
        }
        this.changeValueSign();
      } else if (this.activeButtons.functional.sign) {
        this.value = this.currentValue = "-";
        this.activeButtons.functional.sign = !this.activeButtons.functional.sign;
      }
      this.handleActiveDigitButtons();
    },
    changeValueSign() {
      //todo refactor
      if (this.activeButtons.functional.sign) {
        this.currentValue = (this.value * -1).toString();
        this.value = this.currentValue;
        this.activeButtons.functional.sign = !this.activeButtons.functional.sign;
      } else if (!this.isActiveSignButton()) {
        this.currentValue = (this.value * -1).toString();
        this.value = this.currentValue;
        this.activateAllDigits();
      }
    },
    isActiveSignButton() {
      if (
        this.value * -1 < Number(this.minVal) ||
        this.value * -1 > Number(this.maxVal) ||
        this.hasError()
      ) {
        this.activeButtons.functional.sign = false;
        return true;
      }
      return false;
    },
    backspace() {
      this.deleteOneChar();
      this.isActiveBackspaceButton();
      this.handleActiveDigitButtons();
    },
    deleteOneChar() {
      if(!this.isActiveBackspaceButton() || this.hasOperation){
        return
      }
      let charsToDelete = -1
      if (this.value === "0.") {
        charsToDelete = -2
      }
      this.value = this.value.slice(0, charsToDelete)
      this.currentValue = this.currentValue.slice(0, charsToDelete)
    },
    isActiveBackspaceButton() {
      return this.value !== ""
    },
    calculate(operation) {
      if (!this.isActiveArithmeticButtons()) {
        return
      }
      this.clickEqual = false;
      if(this.hasOperation){
        this.intermediateResult = this.intermediateResult.slice(0,-1)
        this.operationsHistory = this.operationsHistory.slice(0,-1)
      }
      this.emptyValue()
      this.hasOperation = true;
      this.operation = operation;
      this.intermediateResult += this.currentValue;
      if (this.intermediateResult.includes("--")) {
        this.intermediateResult = this.intermediateResult.replace("--", "+")
      }
      this.value = eval(this.intermediateResult).toString();
      this.operationsHistory = this.operationsHistory.concat(this.currentValue + operation)
      this.intermediateResult = this.value
      this.intermediateResult += operation
      this.currentValue = "";
      this.handleActiveButtons()
    },
    emptyValue () {
      if(this.value === ""){
        this.currentValue = "0"
      }
    },
    equal() {
      this.activateAllDigits()
      if (!this.isActiveEqualButton()) {
        return;
      }
      if (this.intermediateResult == "" || !this.isActiveArithmeticButtons())
        return;
      if (this.operation != "") {
        this.intermediateResult += this.value;
      }
      if (this.intermediateResult.includes("--")) {
        this.intermediateResult = this.intermediateResult.replace("--", "+");
      }
      this.value = eval(this.intermediateResult).toString();
      this.currentValue = "";
      this.operation = "";
      this.clickEqual = true;
      this.intermediateResult = this.value
      this.operationsHistory = this.value
      this.isActiveOkButton();
    },
    sendNumber() {
      if (!this.isActiveOkButton()) {
        this.getValue(this.value, false);
      }
    }
  }
}
</script>
<template>
  <div id="container">
    <v-flex xs12 sm6 md3>
      {{operationsHistory}}
      <v-text-field v-model="value" :rules="[rules.min, rules.max]" readonly outline></v-text-field>
    </v-flex>
    <ul id="keyboard">
      <li :class="{'letter':true, 'disabled':!activeButtons.digits[7]}" @click="getDigit(7)">7</li>
      <li :class="{'letter':true, 'disabled':!activeButtons.digits[8]}" @click="getDigit(8)">8</li>
      <li :class="{'letter':true, 'disabled':!activeButtons.digits[9]}" @click="getDigit(9)">9</li>
      <li :class="{'okBtn': true, 'disabled':!isActiveBackspaceButton()}" @click="backspace()">back</li>
      <li
        :class="{'letter':true, 'disabled':!isActiveArithmeticButtons()}"
        @click="calculate('+')"
      >+</li>
      <li
        :class="{'letter clearl':true, 'disabled':!activeButtons.digits[4]}"
        @click="getDigit(4)"
      >4</li>
      <li :class="{'letter':true, 'disabled':!activeButtons.digits[5]}" @click="getDigit(5)">5</li>
      <li :class="{'letter':true, 'disabled':!activeButtons.digits[6]}" @click="getDigit(6)">6</li>
      <li :class="{'okBtn': true, 'disabled':!isActiveBackspaceButton()}" @click="clearAll()">clear</li>
      <li
        :class="{'letter':true, 'disabled':!isActiveArithmeticButtons()}"
        @click="calculate('-')"
      >-</li>
      <li
        :class="{'letter clearl':true, 'disabled':!activeButtons.digits[1]}"
        @click="getDigit(1)"
      >1</li>
      <li :class="{'letter':true, 'disabled':!activeButtons.digits[2]}" @click="getDigit(2)">2</li>
      <li :class="{'letter':true, 'disabled':!activeButtons.digits[3]}" @click="getDigit(3)">3</li>
      <li :class="{'okBtn':true, 'disabled':isActiveOkButton()}" @click="sendNumber()">OK</li>
      <li
        :class="{'letter':true, 'disabled':!isActiveArithmeticButtons()}"
        @click="calculate('*')"
      >*</li>
      <li :class="{'switch':true, 'disabled':!activeButtons.digits[0]}" @click="getDigit(0)">0</li>
      <li
        :class="{'point': true, 'disabled': hasPoint() || !isActivePointButton()}"
        @click="addPoint()"
      >.</li>
      <li :class="{'clear': true, 'disabled': isActiveSignButton()}" @click="changeSign()">+/-</li>
      <li :class="{'okBtn':true, 'disabled':!isActiveEqualButton()}" @click="equal()">=</li>
      <li
        :class="{'letter':true, 'disabled':!isActiveArithmeticButtons()}"
        @click="calculate('/')"
      >/</li>
    </ul>
  </div>
</template>
<style scoped>
.disabled {
  color: #ddd;
}
#container {
  margin: 100px auto;
  width: 760px;
}
#keyboard {
  margin: 0;
  padding: 0;
  list-style: none;
}
#keyboard li {
  float: left;
  margin: 0 5px 5px 0;
  width: 60px;
  height: 60px;
  font-size: 24px;
  line-height: 60px;
  text-align: center;
  background: #fff;
  border: 1px solid #f9f9f9;
  border-radius: 5px;
}
.capslock,
.tab,
.left-shift,
.clearl,
.switch {
  clear: left;
}
#keyboard .tab,
#keyboard .okBtn {
  width: 70px;
}
#keyboard .capslock {
  width: 80px;
}
#keyboard .clear .point {
  width: 60px;
  font-size: 24px;
}
#keyboard .left-shift {
  width: 70px;
}

#keyboard .switch {
  width: 60px;
}
#keyboard .rightright-shift {
  width: 109px;
}
.lastitem {
  margin-right: 0;
}
.uppercase {
  text-transform: uppercase;
}
#keyboard .space {
  float: left;
  width: 556px;
}
#keyboard .switch,
#keyboard .space,
#keyboard .clear .point {
  font-size: 24px;
}
.on {
  display: none;
}
#keyboard li:hover {
  position: relative;
  top: 1px;
  left: 1px;
  border-color: #e5e5e5;
  cursor: pointer;
}
</style>