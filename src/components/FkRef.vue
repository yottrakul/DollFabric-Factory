<template>
  <img v-if="isImg" :src="name" alt="">
  <span v-else>{{name}}</span>
</template>

<script>
import { projectFirestore } from '@/firebase/config';
import { ref } from '@vue/reactivity';
export default {
  props: ['path', 'objKey'],
  setup(props) {
    // แทนชื่อโรงงานแทน ID
  const isImg = ref(false);
  const name = ref("");
  let obj = {}
  projectFirestore.doc(props.path).get()
    .then(res => obj = {...res.data()})
    .then(() => {
      name.value = obj[props.objKey];
      //เมื่อมีการเรียก Key ชื่อ imageFabric ให้แสดงเป็นภาพ
      if(props.objKey === "imageFabric") {
        isImg.value = true;
      }
    })
  
  return { name, isImg }
  
  }
}
</script>

<style>

</style>