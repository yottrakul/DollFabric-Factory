<template>
  <div
    class="
      bg-white
      w-fit
      h-fit
      py-4
      border-b-2
      px-6
      flex
      place-items-center
      justify-between
      hover:bg-slate-100
      gap-4
      whitespace-nowrap
    "
  >
    <div class="flex place-items-center gap-6 ">
      <span class="material-symbols-outlined text-4xl"> receipt_long </span>
      <span class="text-lg flex-initial w-52">{{transaction.id}}</span>
      <div>
        <span class="text-blue-500">วันที่สร้าง:</span>
        <span class="ml-2">{{createdAt}}</span>
      </div>
      <div>
        <span class="text-red-500">วันที่สิ้นสุด:</span>
        <span class="ml-2">{{deadline}}</span>
      </div>
    </div>
    <div>
      <span
        v-if="status === 'wait'"
        class="material-symbols-outlined text-yellow-600"
      >
        hourglass_empty
      </span>
      <span v-else-if="status === 'late'" class="material-symbols-outlined text-red-600"> timer_off </span>
      <span v-else-if="status === 'cancel'" class="material-symbols-outlined text-red-400"> cancel </span>
      <span v-else-if="status === 'finish'" class="material-symbols-outlined text-green-400">
        check_circle
      </span>
      <span v-else class="material-symbols-outlined"> help </span>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { ref } from "@vue/reactivity";
import { computed, watchEffect } from '@vue/runtime-core';
export default {
  props: ['transaction'],
  setup(props) {
    const createdAt = ref(moment(props.transaction.createdAt).format('Do MMM YYYY'));
    const deadline = ref(moment(props.transaction.deadline).format('Do MMM YYYY'));

    // console.log(moment(props.transaction.deadline).format('MMM Do YYYY'))

    // Computed
    const status = computed(() => {
      if(props.transaction.isCancel) {
        return 'cancel'
      }

      if(props.transaction.isFinish === true) {
        return 'finish'
      }

      if(props.transaction.deadline >= moment()) {
        return 'wait'
      } else {
        return 'late'
      }

    })

    return { status, createdAt, deadline };
  },
};
</script>

<style>
</style>