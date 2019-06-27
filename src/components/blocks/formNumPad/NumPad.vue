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
            pointChar: '.',
            negativeSign: false,
            backspaseDisable: false //TODO replace with if (negativeValue)
        }
    },
    computed: {
        isDisable () {
            return [false, false, false, false, false, false, false, false, false, false]
        } 
    },
    created () {
        if(this.value === ''){
            this.backspaseDisable = true
            if(Number(this.maxVal) <= 9){
                this.makeDisable(Number(this.maxVal))
            }
            this.signDisable()
            this.okBtnDisable()
        }
    },
    methods: {

        disableButton(button){
            
        },
        getDigit (digit) {
            //TODO this.disableButton('OK')
            this.okBtnDisable()
            //TODO this.disableButton('<')
            this.backspaseDisable = false
            if(!this.isDisable[digit]){
                this.value += digit
            }
            if(Number(this.maxVal) <= 9){
                //TODO move in function
                if(this.value.length === 1 && digit > this.maxVal[0]){
                    this.makeDisable(undefined)
                }
            }else{
                //TODO function
                if(Number(this.value[0]) == Number(this.maxVal[0])){
                    if(this.value.length < this.maxVal.length){
                        this.checkDigit(digit)
                    }else{
                        this.makeDisable(undefined)
                    }
                }else if(Number(this.value[0]) > Number(this.maxVal[0]) && this.value.length == this.maxVal.length - 1){//TODO function
                    this.makeDisable(undefined)//TODO 9
                }else{
                    if(this.value.length >= this.maxVal.length){
                        this.makeDisable(undefined)
                    }else{
                        this.makeActive()
                    }
                }
            }
            if(this.value.startsWith('.')){
                this.value = '0'.concat(this.value)
            }
            this.getValue(this.value)
        },
        addPoint () {
            if(!this.hasPoint()){
                this.value += this.pointChar 
                this.getValue(this.value)
            }
        },
        backspase () {
            this.value = this.value.slice(0, -1)
            //this.makeActive()
            if(this.value != ''){
                this.isDisable[this.value[this.value.length-1]] = true
                this.getDigit(this.value[this.value.length-1])   
            }else{
                this.makeActive() 
                this.backspaseDisable = true
            }
            this.getValue(this.value)
        },
        clearInput () {
            this.negativeSign = false
            this.value = ''
            this.makeActive() 
            this.getValue(this.value)
        },
        changeSign () {
            this.negativeSign = !this.negativeSign
            if(this.value != '' && !this.signDisable()){
                console.log(!this.signDisable())
                if(this.negativeSign){
                    this.value = '-'.concat(this.value)
                }else{
                    this.value = this.value.slice(1)
                }
            }
            this.getValue(this.value)
        },
        hasPoint() {
            return this.value.includes(this.pointChar)
        },
        makeDisable (maxValue) {//TODO change signature disableDigits(lessThan)
            if(maxValue != undefined && maxValue >= 0){
                for(let i = maxValue+1; i < this.isDisable.length; i++){
                    this.isDisable[i] = true
                }
            }else{
                for(let i = 0; i < this.isDisable.length; i++){
                    this.isDisable[i] = true
                }
            }
        },
        checkDigit (digit) {//TODO change signature nextDigitPossibleValues
            if(digit === this.maxVal[this.value.length - 1]){
                this.makeActive() 
                this.makeDisable(Number(this.maxVal[this.value.length]))
            }else{
                this.makeActive() 
            }
        },
        makeActive () {//TODO change signature activateAll()
            for(let i = 0; i < this.isDisable.length; i++){
                this.isDisable[i] = false
            }
        },
        signDisable () {
            console.log(-Number(this.value))
            if(-Number(this.value) < Number(this.minVal) || Number(this.minVal) >= 0){
                return true
            }else{
                return false
            }
        },
        okBtnDisable () {
            if(Number(this.value) < Number(this.minVal) || this.value == ''){
                return true
            }else{
                return false
            }
        }
    }
}
</script>
<template>
    <div id="container">  
        <ul id="keyboard">   
            <li :class="{'letter':true, 'disabled':isDisable[7]}" @click="getDigit(7)">7</li>  
            <li :class="{'letter':true, 'disabled':isDisable[8]}" @click="getDigit(8)">8</li>  
            <li :class="{'letter':true, 'disabled':isDisable[9]}" @click="getDigit(9)">9</li>
            <li :class="{'okBtn': true, 'disabled':backspaseDisable}" @click="backspase()">back</li>    
            <li :class="{'letter clearl':true, 'disabled':isDisable[4]}" @click="getDigit(4)">4</li>  
            <li :class="{'letter':true, 'disabled':isDisable[5]}" @click="getDigit(5)">5</li>  
            <li :class="{'letter':true, 'disabled':isDisable[6]}" @click="getDigit(6)">6</li> 
            <li class="okBtn" @click="clearInput()">clear</li>  
            <li :class="{'letter clearl':true, 'disabled':isDisable[1]}" @click="getDigit(1)">1</li>  
            <li :class="{'letter':true, 'disabled':isDisable[2]}" @click="getDigit(2)">2</li>  
            <li :class="{'letter':true, 'disabled':isDisable[3]}" @click="getDigit(3)">3</li>  
            <li :class="{'okBtn':true, 'disabled':okBtnDisable()}">OK</li>
            <li :class="{'switch':true, 'disabled':isDisable[0]}" @click="getDigit(0)">0</li>  
            <li :class="{'point': true, 'disabled': hasPoint()}"  @click="addPoint()">.</li>
            <li :class="{'clear': true, 'disabled': signDisable()}" @click="changeSign()">+/-</li>
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