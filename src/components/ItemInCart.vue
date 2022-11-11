<template>
  <div class="bg-white rounded-full w-full inline-flex justify-between overflow-hidden h-12 border-2 border-black mb-2">
    <div class="detail flex-auto w-64 self-center pl-4 flex justify-between">
      <span >{{name}}</span>
      <span class="pr-4">{{amount}} ตัว</span>
    </div>
    <div @click="deleteInCart" class="deleteBtn bg-red-500 flex-auto w-10 self-center text-center h-full grid place-items-center hover:bg-red-600 cursor-pointer transition-colors delay-150">
      <span class="material-symbols-outlined text-white align-sub"> delete </span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['name', 'amount'],
  setup(props, context) {
    const deleteInCart = () => {
      context.emit("deleted");
    }

    return {deleteInCart}
  }
}
</script>

<style>

</style>