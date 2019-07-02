    
<script>
import Input from '@/components/blocks/form/Input'
import Select from '@/components/blocks/form/Select'
import Submit from '@/components/blocks/form/Submit'
import Reset from '@/components/blocks/form/Reset'
import MultiSelect from '@/components/blocks/form/MultiSelect'
  export default {
    name: 'Form',
    components: {
        Input,
        Select,
        Submit,
        Reset,
        MultiSelect
    },
    data: () => ({
      rules: {
        name: [
            v => !!v || 'Name is required',
            v => v.length <= 10 || 'Name must be less than 10 characters'
        ],
        age: [
            v => !!v || 'Name is required',
            v => v.length <= 5 || 'Name must be less than 5 characters'
        ]
      }
    })
  }
</script>

<template>
    <div>
        <Input :fieldName="'name'" :fieldRules="rules.name" />
        <Input :fieldName="'age'" :fieldRules="rules.age"/>
        <Select :fieldNmae="'product'"/>
        <MultiSelect/>
        <Submit/>
        <Reset/>
    </div>
</template>