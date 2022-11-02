<template>
  <p>Test Page</p>
  <AddStock v-if="showItem" @close="showItem = !showItem" />
  <button @click="showItem = !showItem">Show</button>
</template>

<script>
import { ref } from '@vue/reactivity';
import AddStock from '../components/AddStock.vue'
export default {
  components: {
    AddStock
  },
  setup() {
    const showItem = ref(false)
    return {showItem}
  }
};
</script>

<style scoped>
img {
  width: 200px;
  margin-bottom: 20px;
}
</style>