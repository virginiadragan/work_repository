<script>
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
    data () {
        return {
            value: '',
            activeButtons: {
                digits: [true, true, true, true, true, false, true, true, true, true],
                functional: {
                    ok: true,
                    backspace: true,
                    clear: true,
                    sign: true,
                    point: true
                }
            }    
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

            console.log('pressed', digit)
            this.pushDigit(digit)
            this.handleActiveButtons()            
        },
        handleActiveButtons () {
            this.handleActiveDigitButtons()
        },
        handleActiveDigitButtons () {
            const max = this.getMaxPossibleDigitValue()
            for(let i = 0; i <= max; i++) {
                this.activeButtons.digits.splice(i, 1, true)
            }
            for(let i = max + 1; i <= 9; i++) {
                this.activeButtons.digits.splice(i, 1, false)
            }
        },
        pushDigit(digit) {
            this.value += digit
            this.getValue(this.value)
        },
        getMaxPossibleDigitValue() {
            const valueDigitsCount = this.value.length
            
            if(Number(this.value) > Number(this.maxVal)) {
                return -1
            }

            if(Number(this.maxVal) <= 9 && valueDigitsCount === 0) {
                return Number(this.maxVal)
            }

            if(!isNaN(Number(this.maxVal[valueDigitsCount + 1]))) {
                return 9
            }            
            
            return isNaN(Number(this.maxVal[valueDigitsCount])) ? -1 : Number(this.maxVal[valueDigitsCount])
        },
        getMaxValueWithNextDigit() {}
    }
}
</script>
<template>
    <div id="container">
        <ul id="keyboard">   
            <li :class="{'letter':true, 'disabled':!activeButtons.digits[7]}" @click="getDigit(7)">7</li>  
            <li :class="{'letter':true, 'disabled':!activeButtons.digits[8]}" @click="getDigit(8)">8</li>  
            <li :class="{'letter':true, 'disabled':!activeButtons.digits[9]}" @click="getDigit(9)">9</li>
            <li :class="{'okBtn': true, 'disabled':!activeButtons.functional.backspace}" @click="backspase()">back</li>    
            <li :class="{'letter clearl':true, 'disabled':!activeButtons.digits[4]}" @click="getDigit(4)">4</li>  
            <li :class="{'letter':true, 'disabled':!activeButtons.digits[5]}" @click="getDigit(5)">5</li>  
            <li :class="{'letter':true, 'disabled':!activeButtons.digits[6]}" @click="getDigit(6)">6</li> 
            <li class="okBtn" @click="clearInput()">clear</li>  
            <li :class="{'letter clearl':true, 'disabled':!activeButtons.digits[1]}" @click="getDigit(1)">1</li>  
            <li :class="{'letter':true, 'disabled':!activeButtons.digits[2]}" @click="getDigit(2)">2</li>  
            <li :class="{'letter':true, 'disabled':!activeButtons.digits[3]}" @click="getDigit(3)">3</li>  
            <li :class="{'okBtn':true, 'disabled':!activeButtons.functional.ok}">OK</li>
            <li :class="{'switch':true, 'disabled':!activeButtons.digits[0]}" @click="getDigit(0)">0</li>  
            <li :class="{'point': true, 'disabled': !activeButtons.functional.point}"  @click="addPoint()">.</li>
            <li :class="{'clear': true, 'disabled': !activeButtons.functional.sign}" @click="changeSign()">+/-</li>
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