<template>
  <span>{{name}}</span>
</template>

<script>
import { projectFirestore } from '@/firebase/config';
import { ref } from '@vue/reactivity';
export default {
  props: ['path', 'objKey'],
  setup(props) {
    // แทนชื่อโรงงานแทน ID

  const name = ref("");
  let obj = {}
  projectFirestore.doc(props.path).get()
    .then(res => obj = {...res.data()})
    .then(() => {
      name.value = obj[props.objKey];
    })
  
  return { name }
  
  }
}
</script>

<style>

</style>