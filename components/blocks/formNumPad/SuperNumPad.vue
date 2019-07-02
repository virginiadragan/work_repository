<script>
import ArithmeticOperations from "@/components/blocks/formNumPad/ArithmeticOperations"
export default {
    name:'NumPad',
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
        }
    },
    components: {
        ArithmeticOperations
    },
    data () {
        return {
            value: '',
            pointChar: '.',
            activeButtons: {
                digits: [true, true, true, true, true, true, true, true, true, true],
                functional: {
                    ok: true,
                    sign: true
                }
            },
            show: false    
        }
    },
    computed: {
        isActiveDigitButton() {
            return this.activeButtons.digits
        }
    },
    mounted () {
        this.handleActiveButtons()
    },
    methods: {
        getDigit(digit) {
            
            if(!this.activeButtons.digits[digit]) {
                return
            }
            this.pushDigit(digit)
            this.handleActiveButtons()    
        },
        handleActiveButtons () {
            this.handleActiveDigitButtons()
            this.handleActiveSignButton()  
            this.handleActivePointButton() 
            this.handleActiveBackspaceButton() 
            this.handleActiveOkButton()
        },
        handleActiveOkButton () {
            if(this.value < this.minVal) {
                return true
            }else{
                return false
            }
        },
        handleActiveDigitButtons () {
            let max = this.getMaxPossibleDigitValue()
             if(this.value === '0'){
                max = 0
            }
            for(let i = 0; i <= max; i++) {
                this.activeButtons.digits.splice(i, 1, true)
            }
            console.log(max)
            for(let i = max; i <= 9; i++) {
                this.activeButtons.digits.splice(i, 1, false)
            }
        },
        startWithiPoint () {
            if(this.value.startsWith('.')){
                this.value = '0'.concat(this.value)
            }
        },
        pushDigit(digit) {
            this.value += digit
            this.startWithiPoint()   
            this.getValue(this.value)
        },
        getMaxPossibleDigitValue() {
            this.activateAllDigits()
            for (let i = 0; i <= 9; i++) {
               if(Number(this.value.concat(i)) > Number(this.maxVal)){
                    return i
               }           
           }
        },
        addPoint () { 
            if(!this.hasPoint() && this.handleActivePointButton()){
                this.activateAllDigits()
                this.value += this.pointChar 
                this.handleActiveDigitButtons()
                this.getValue(this.value)
            }
        },
        hasPoint () {
            return this.value.includes(this.pointChar)
        },
        handleActivePointButton () {
            if(Number(this.value) === Number(this.maxVal)){
                return false
            }else{
                return true
            }
        },
        clearAll () {
            this.activeButtons.functional.sign = true
            this.value = ''
            this.activateAllDigits()
            this.handleActiveBackspaceButton()
            this.getValue(this.value)
        },
        activateAllDigits () {
            for(let i = 0; i < this.activeButtons.digits.length; i++){
                this.activeButtons.digits.splice(i, 1, true)
            }
        },
        changeSign () {
            if(this.value != ''){
                this.removeOrAddSign()
            }else{
                this.value = '-'
                this.activeButtons.functional.sign = !this.activeButtons.functional.sign
            }
            this.handleActiveDigitButtons()
            this.getValue(this.value)
        },
        removeOrAddSign () {
            if(this.value === '-'){
                this.value = ''
            }else{
                this.changeValueSign()
            }
        },
        changeValueSign () {
            if(this.activeButtons.functional.sign){
                this.value = (this.value*(-1)).toString()
                this.activeButtons.functional.sign = !this.activeButtons.functional.sign
            }else if(!this.handleActiveSignButton()){
                this.value = (this.value*(-1)).toString()
                this.activateAllDigits()
            }  
        },
        handleActiveSignButton () {
            if(this.value*(-1) < Number(this.minVal)){
                this.activeButtons.functional.sign = false
                return true
            }
        },
        backspace () {
            this.value = this.value.slice(0, -1)
            this.handleActiveBackspaceButton()
            this.handleActiveDigitButtons()
            this.getValue(this.value)
        },
        handleActiveBackspaceButton () {
            if(this.value != ''){
                return false
            }else{
                return true
            }
        },
        getCalculatedValue (calculatedValue) {
            this.value = calculatedValue;
        }
    }
}
</script>
<template>
    <div id="container">
        <ul id="keyboard">   
            <li :class="{'letter':true, 'disabled':!activeButtons.digits[7]}" @click="getDigit(7)">7</li>  
            <li :class="{'letter':true, 'disabled':!activeButtons.digits[8]}" @click="getDigit(8)">8</li>  
            <li :class="{'letter':true, 'disabled':!activeButtons.digits[9]}" @click="getDigit(9)">9</li>
            <li :class="{'okBtn': true, 'disabled':handleActiveBackspaceButton()}" @click="backspace()">back</li>    
            <li :class="{'letter clearl':true, 'disabled':!activeButtons.digits[4]}" @click="getDigit(4)">4</li>  
            <li :class="{'letter':true, 'disabled':!activeButtons.digits[5]}" @click="getDigit(5)">5</li>  
            <li :class="{'letter':true, 'disabled':!activeButtons.digits[6]}" @click="getDigit(6)">6</li> 
            <li :class="{'okBtn': true, 'disabled':handleActiveBackspaceButton()}" @click="clearAll()">clear</li>  
            <li :class="{'letter clearl':true, 'disabled':!activeButtons.digits[1]}" @click="getDigit(1)">1</li>  
            <li :class="{'letter':true, 'disabled':!activeButtons.digits[2]}" @click="getDigit(2)">2</li>  
            <li :class="{'letter':true, 'disabled':!activeButtons.digits[3]}" @click="getDigit(3)">3</li>  
            <li :class="{'okBtn':true, 'disabled':handleActiveOkButton()}">OK</li>
            <li :class="{'switch':true, 'disabled':!activeButtons.digits[0]}" @click="getDigit(0)">0</li>  
            <li :class="{'point': true, 'disabled': hasPoint() || !handleActivePointButton()}"  @click="addPoint()">.</li>
            <li :class="{'clear': true, 'disabled': handleActiveSignButton()}" @click="changeSign()">+/-</li>
            <li :class="{'okBtn':true, 'disabled':false}" @click="show = !show">Calc</li>
            <arithmetic-operations v-if="show" :value="value" :getCalculatedValue="getCalculatedValue"/>
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
        .capslock, .tab, .left-shift, .clearl, .switch {  
        clear: left;  
        }  
            #keyboard .tab, #keyboard .okBtn {  
            width: 70px;  
            }  
            #keyboard .capslock {  
            width: 80px;  
            }  
            #keyboard .clear .point {  
            width: 60px;  
            font-size: 24px;
            }  
            #keyboard .left-shift{  
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
        #keyboard .switch, #keyboard .space, #keyboard .clear .point{
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