<template>
  <h1>หน้า Add Factory</h1>
</template>

<script>
import { projectFirestore } from '@/firebase/config';
import { ref } from '@vue/reactivity';
export default {
  setup() {

    const post = ref({});

    post.value = {
      content: "content...",
      title: "impressive title",
      user: projectFirestore.doc("Factory/cuhxc883234asd"),
    };

    console.log(post.value)

    const test = (post) => {
      projectFirestore.collection("posts").add(post);
    }

  }
};
</script>

<style>
</style>