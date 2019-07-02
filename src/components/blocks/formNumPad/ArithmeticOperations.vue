<script>
export default {
    name: "ArithmeticOperations",
    props: {
        getCalculatedValue: {
            type: Function,
            required: true
        },
        value: {
            type: String,
            required: true
        }
    },
    data () {
        return {
            calculatedValue: '',
            firstValue: ''
        }
    },
    methods: {
        plus () {
            
        },
        minus () {

        },
        multiply () {

        },
        divide () {

        },
        equal () {

        }
    }
}
</script>

<template>
    <div id="container">
        <ul id="keyboard">   
            <li class="letter" @click="plus()">+</li>  
            <li class="letter" @click="minus()">-</li>  
            <li class="letter" @click="multiply()">*</li>
            <li class="letter" @click="divide()">/</li>    
            <li class="letter" @click="equal()">=</li>  
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