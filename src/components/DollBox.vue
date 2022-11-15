<template>
  <div
    class="
      min-h-80
      aspect-w-1 aspect-h-1
      w-full
      overflow-hidden
      rounded-2xl
      bg-gray-200
      group-hover:opacity-75
      aspect-square
      relative
      shadow-md
    "
  >
    <img
      :src="payload.imgDoll"
      alt=""
    />
    <div
      class="
        bg-white
        absolute
        bottom-0
        left-0
        w-full
        h-1/2
        rounded-t-[1rem]
        shadow-xl shadow-slate-700
      "
    >
      <div class="header px-4 py-2 flex justify-between">
        <div>
          <h2 class="text-2xl">{{payload.nameDoll}}</h2>
          <span class="text-sm text-gray-400">{{payload.idDoll}}</span>
        </div>
        <div class="pt-2">
          <span
            class="
              bg-slate-400
              text-gray-200
              rounded-lg
              p-1
              material-symbols-outlined
              cursor-context-menu
            "
          >
            done_outline
          </span>
        </div>
      </div>
      <div class="sub px-4 mt-6 2k:mt-20 flex justify-between">
        <div><span class="text-4xl ">{{payload.quantity}}</span><span class="font-bold">ตัว</span></div>
        <div class="self-center inline-flex gap-3 place-items-center">
          <span @click="quantitySelect++; clickEvent();" class="material-symbols-outlined font-bold cursor-pointer"> add </span>
          <div><input @change="clickEvent" class="bg-gray-300 rounded-full max-w-[2.5rem] text-center" v-model="quantitySelect"/></div>
          <span @click="quantitySelect--; clickEvent();" class="material-symbols-outlined font-bold cursor-pointer"> remove </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { watchEffect } from '@vue/runtime-core';
import { notify } from '@kyvg/vue3-notification';
export default {
  props: ["payload"],
  setup(props,context) {
    const isSelect = ref(false);
    const quantitySelect = ref(0);

    watchEffect(() => {
      if(quantitySelect.value <= 0) {
        quantitySelect.value = 0
      }
    })

    watchEffect(() => {
      if(quantitySelect.value > props.payload.quantity) {
        quantitySelect.value = props.payload.quantity
      }
    })

    const clickEvent = () => {
      try {
        if(!(Number.isInteger(parseInt(quantitySelect.value))) || (parseInt(quantitySelect.value) > props.payload.quantity)){
          quantitySelect.value = 0;
          context.emit('delete', props.payload.idOrder)
          throw new Error('ค่าที่กรอกไม่ถูกต้อง กรุณากรอกเป็นตัวเลข')
        }
        quantitySelect.value = parseInt(quantitySelect.value);
        if(quantitySelect.value === 0) {
        context.emit('delete', props.payload.idOrder)
      } else{
        let payload = {
          idOrder: props.payload.idOrder,
          idDoll: props.payload.idDoll,
          quantitySelect: parseInt(quantitySelect.value)
        }
        context.emit('clickEvent', payload)
      }
      } catch (error) {
        notify({
          title: "ข้อผิดพลาด⚠️",
          type: "error",
          text: error.message,
        })
      }
    }

    

    return {isSelect, quantitySelect, clickEvent}
  },
};
</script>

<style scoped>
::selection {
    color: none;
    background: none;
}
</style>