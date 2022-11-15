<template>
  <div class="w-full h-screen overflow-y-auto p-4 bg-slate-200 grid gap-4">
    <div
      class="
        shadow-slate-500 shadow-lg
        bg-green-500
        rounded-full
        py-2
        px-8
        flex
        place-items-center
        gap-4
      "
    >
      <span class="text-white text-5xl material-symbols-outlined">
        category
      </span>
      <div>
        <h1 class="text-white text-2xl font-extrabold">Products</h1>
        <span class="text-gray-100"
          >ตุ๊กตาที่ถูก Checkout แล้วจะแสดงในหน้าส่วน Products</span
        >
      </div>
    </div>
    <div
      class="
        container-grid
        w-full
        h-full
        min-h-[48rem]
        fullhd:min-h-[48rem]
        2xl:min-h-[52rem]
        2k:min-h-[70rem]
        bg-gray-100
        rounded-3xl
        shadow-xl
        overflow-y-auto
        scollHide
        py-8
      "
    >
      <div
        class="
          grid grid-cols-1
          gap-y-10 gap-x-6
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          2xl:grid-cols-5
          xl:gap-x-8
          px-8
        "
      >
        <!-- กล่องบรรจุตุ๊กตา -->
        <doll-box v-for="payload in boxPayload" :key="payload.idOrder" :payload="payload" @clickEvent="handleSuppPayload" @delete="handleDeleteOrder"/>

        <!-- กล่องบรรจุตุ๊กตา -->
      </div>
    </div>
    <div class="zone3 grid grid-cols-2 gap-4">
      <div class="bg-purple-500 rounded-full py-2 px-5 flex justify-between place-items-center cursor-pointer relative">
        <span class="text-white font-bold z-10">เลือก Supplier</span><span class="z-10 text-white material-symbols-outlined"> expand_less </span>
        <div class="hidden absolute w-full bottom-6 left-0 rounded-t-2xl bg-purple-500 px-3 pt-4 pb-6">
          <ul class="text-white grid gap-2">
            <li class="hover:bg-purple-400 rounded-full py-1 px-2">บาส (ID)</li>
            <li class="hover:bg-purple-400 rounded-full py-1 px-2">บาส (ID)</li>
            <li class="hover:bg-purple-400 rounded-full py-1 px-2">บาส (ID)</li>
          </ul>
        </div>
      </div>
      <div class="flex gap-4 place-items-center">
        <div class="bg-yellow-300 py-2 px-5 rounded-full cursor-pointer hover:bg-yellow-400"><span class="text-lg font-bold">ส่งสินค้า</span></div>
        <div class="bg-red-500 hover:bg-red-600 py-2 px-5 rounded-full cursor-pointer"><span class="text-lg font-bold">ยกเลิก</span></div>
      </div>
    </div>
  </div>
</template>

<script>
import DollBox from "../components/DollBox.vue";
import getDolls from "../composibles/getDolls"
import getDollOrders from "../composibles/getDollOrder"
import getSuppliers from "../composibles/getSuppliers"
import { ref } from '@vue/reactivity';
export default {
  components: {
    DollBox,
  },
  setup() {
    const {dolls,loadDolls} = getDolls(); 
    const {dollOrders,loadOrders} = getDollOrders();
    const {supliers,loadSupliers} = getSuppliers();
    const boxPayload = ref([]);
    const supplierPayload = ref([])

    const load = async () => {
      await loadDolls();
      await loadOrders();
      await loadSupliers();
      dollOrders.value.forEach((order) => {
        // หาข้อมูลตุ๊กตาที่ตรงกันกับ Order
        dolls.value.forEach((doll) => {
          if(order.doll === `Doll/${doll.id}`) {
            let payload = {
              idDoll: doll.id,
              nameDoll: doll.name,
              imgDoll: doll.imgDoll,
              idOrder: order.id,
              quantity: order.quantity
            };
            boxPayload.value.push(payload);
          }
        })
      })
    }

    load();

    const handleSuppPayload = (payload) => {
      const check = supplierPayload.value.findIndex((supp) => {
        return supp.idOrder === payload.idOrder;
      })
      if(check === -1) {
        supplierPayload.value.push(payload)
      } else {
        supplierPayload.value[check].quantitySelect = payload.quantitySelect;
      }
    }

    const handleDeleteOrder = (idOrder) => {
      const check = supplierPayload.value.findIndex((supp) => {
        return supp.idOrder === idOrder
      })
      if(check === -1) {
        return;
      } else {
        supplierPayload.value.splice(check, 1);
      }
    }

    return {
      dolls,
      dollOrders,
      supliers,
      boxPayload,
      handleSuppPayload,
      supplierPayload,
      handleDeleteOrder
    }
  },
};
</script>

<style>
</style>