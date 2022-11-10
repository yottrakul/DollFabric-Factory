<template>
<div class="bg-slate-100 rounded-full border-2 border-green-500 flex">
  <input v-model="amount" class="w-[80%] bg-transparent border-transparent focus:border-transparent focus:ring-0 text-end pt-2.5" placeholder="ต้องการกี่" type="number">
  <span class="self-center text-lg font-medium">ตัว</span>
</div>
</template>

<script>
import { ref, watchEffect } from '@vue/runtime-core'
export default {
props: ['amount'],
setup(props, context) {
}
}
</script>

<style>

</style>