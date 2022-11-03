<template>
  <div class="relative">
    <span
      @click="showConfirm = !showConfirm"
      class="
        material-symbols-outlined
        text-neutral-500
        cursor-pointer
        hover:bg-red-600 hover:text-white
        rounded-full
        p-2
        transition
        ease-in-out
        delay-150
        hover:-translate-y-1 hover:scale-110
      "
    >
      delete
    </span>
    <transition
      enter-from-class="transition opacity-0 translate-y-3"
      enter-to-class="opacity-100 translate-y-0"
      enter-active-class="duration-300 ease-out"
      leave-active-class="duration-300 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="transform opacity-0 -translate-y-3"
    >
      <div
        v-if="showConfirm"
        class="
          absolute
          -top-3.5
          -right-16
          z-10
          flex
          gap-3
          bg-slate-100
          p-3
          rounded-full
          drop-shadow-xl
        "
      >
        <div
        @click="confirmDelete"
          class="
            flex-initial flex
            gap-2
            text-neutral-500
            cursor-pointer
            hover:bg-green-600 hover:text-white
            rounded-full
            p-2
            transition
            ease-in-out
            delay-150
            hover:scale-110
          "
        >
          <span class="material-symbols-outlined"> done </span>
          <span class="self-center">ยืนยัน</span>
        </div>

        <div
          @click="showConfirm = !showConfirm"
          class="
            flex-initial flex
            gap-2
            text-neutral-500
            cursor-pointer
            hover:bg-red-600 hover:text-white
            rounded-full
            p-2
            transition
            ease-in-out
            delay-150
            hover:scale-110
          "
        >
          <span class="material-symbols-outlined"> close </span>
          <span class="self-center">ยกเลิก</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
  props: ['item'],
  setup(props, context) {
    const showConfirm = ref(false);
    // console.log(props.item.id)

    const confirmDelete = () => {
      context.emit('confirm', props.item.id)
      showConfirm.value = false
    };

    return { confirmDelete, showConfirm };
  },
};
</script>

<style scoped>
</style>