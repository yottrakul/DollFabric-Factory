<template>
    <input v-model="search" class="w-full bg-slate-100 rounded-full border-2 border-blue-500 pt-2" placeholder="ค้นหาตุ๊กตาที่นี่..." type="text">
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
setup(props, context) {
    const search = ref("");
    return { search }
}
}
</script>

<style>

</style>