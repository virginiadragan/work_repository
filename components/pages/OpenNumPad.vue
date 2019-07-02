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
        <Input minVal="-3.33" maxVal="0.979"/>
    </div>
</template>