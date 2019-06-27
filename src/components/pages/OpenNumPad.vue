<script>
import Input from '@/components/blocks/formNumPad/Input'
export default {
  name: 'OpenNumPad',
  components: {
    Input
  }
}
//TODO add default value
</script>

<template>  
    <div>
        <Input minVal="-6" maxVal="123456" value="23"/>
    </div>
</template>