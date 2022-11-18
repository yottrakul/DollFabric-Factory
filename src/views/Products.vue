<template>
  <div class="w-full h-screen overflow-y-auto p-4 bg-slate-200 grid gap-4">
    <div
      v-motion-slide-top
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
      :class="{ grid: resetBox, 'place-items-center': resetBox }"
    >
      <div
        v-if="!resetBox"
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
        <doll-box
          v-motion-slide-bottom
          :delay="payload.delay"
          v-for="payload in boxPayload"
          :key="payload.idOrder"
          :payload="payload"
          @clickEvent="handleSuppPayload"
          @delete="handleDeleteOrder"
        />

        <!-- กล่องบรรจุตุ๊กตา -->
      </div>
      <div class="flex flex-col place-items-center gap-4" v-else>
        <img :src="require('@/assets/bongocat-funny.gif')" alt="loadding..." />
        <span>รอสักครู่</span>
      </div>
    </div>
    <div class="zone3 grid grid-cols-2 gap-4">
      <div
        v-motion-fade
        @click="showList = !showList"
        class="
          bg-purple-500
          rounded-full
          py-2
          px-5
          flex
          justify-between
          place-items-center
          cursor-pointer
          relative
        "
      >
        <span v-if="!selectSupplier" class="text-white font-bold z-10"
          >เลือก Supplier</span
        ><span v-else class="text-white font-bold z-10"
          >{{ selectSupplier.nameSupplier }} ({{ selectSupplier.id }})</span
        ><span
          v-if="!showList"
          class="z-10 text-white material-symbols-outlined"
        >
          expand_less </span
        ><span v-else class="z-10 text-white material-symbols-outlined">
          expand_more
        </span>
        <div
          class="
            absolute
            w-full
            bottom-6
            left-0
            rounded-t-2xl
            bg-purple-500
            px-3
            pt-4
            pb-6
            max-h-52
            overflow-y-auto
          "
          :class="{ hidden: !showList }"
        >
          <ul class="text-white grid gap-2">
            <li
              @click="selectSupplier = suplier"
              v-for="suplier in supliers"
              :key="suplier.id"
              class="
                hover:bg-purple-400
                rounded-full
                py-1
                px-2
                inline-flex
                place-items-center
                gap-4
              "
            >
              <div>
                <img
                  class="rounded-full object-cover h-10 w-10"
                  alt=""
                  :src="suplier.img"
                />
              </div>
              <span>{{ suplier.nameSupplier }} ({{ suplier.id }})</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="flex gap-4 place-items-center">
        <div class="py-2 px-5 flex place-items-center gap-4">
          <h4 class="cursor-context-menu">วันกำหนดส่ง</h4>
          <DatePicker v-model:value="dataEnd" value-type="date"></DatePicker>
        </div>
        <div v-if="showBtn"
          @click="commitTransaction"
          class="
            bg-yellow-300
            py-2
            px-5
            rounded-full
            cursor-pointer
            hover:bg-yellow-400
          "
        >
          <span class="text-lg font-bold">ส่งสินค้า</span>
        </div>
        <div v-if="showBtn"
          @click="resetProduct"
          class="
            bg-red-500
            hover:bg-red-600
            py-2
            px-5
            rounded-full
            cursor-pointer
          "
        >
          <span class="text-lg font-bold">รีเฟรช</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DollBox from "../components/DollBox.vue";
import getDolls from "../composibles/getDolls";
import getDollOrders from "../composibles/getDollOrder";
import getSuppliers from "../composibles/getSuppliers";
import DatePicker from "vue-datepicker-next";
import "vue-datepicker-next/index.css";
import { ref } from "@vue/reactivity";
import { projectFirestore, timestamp } from "@/firebase/config";
import { projectAdd, projectUpdate } from "@/composibles/projectManage";
import { notify } from "@kyvg/vue3-notification";
export default {
  components: {
    DollBox,
    DatePicker,
  },
  setup() {
    const { dolls, loadDolls } = getDolls();
    const { dollOrders, loadOrders } = getDollOrders();
    const { supliers, loadSupliers } = getSuppliers();
    const boxPayload = ref([]);
    const supplierPayload = ref([]);
    const showList = ref(false);
    const dataEnd = ref(null);
    const selectSupplier = ref(null);
    const resetBox = ref(false);
    const showBtn = ref(true);

    const load = async () => {
      resetBox.value = true;
      await loadDolls();
      await loadOrders();
      await loadSupliers();
      let delayStart = 0;
      let increment = 100;
      dollOrders.value.forEach((order) => {
        // หาข้อมูลตุ๊กตาที่ตรงกันกับ Order
        dolls.value.forEach((doll) => {
          if (order.doll === `Doll/${doll.id}`) {
            let payload = {
              idDoll: doll.id,
              nameDoll: doll.name,
              imgDoll: doll.imgDoll,
              idOrder: order.id,
              quantity: order.quantity,
              delay: delayStart,
            };
            delayStart += increment;
            boxPayload.value.push(payload);
          }
        });
      });
      resetBox.value = false;
    };

    load();

    const handleSuppPayload = (payload) => {
      const check = supplierPayload.value.findIndex((supp) => {
        return supp.idOrder === payload.idOrder;
      });
      if (check === -1) {
        supplierPayload.value.push(payload);
      } else {
        supplierPayload.value[check].quantitySelect = payload.quantitySelect;
      }
    };

    const handleDeleteOrder = (idOrder) => {
      const check = supplierPayload.value.findIndex((supp) => {
        return supp.idOrder === idOrder;
      });
      if (check === -1) {
        return;
      } else {
        supplierPayload.value.splice(check, 1);
      }
    };

    const resetProduct = () => {
      // Reset วันที่
      dataEnd.value = null;
      selectSupplier.value = null;
      supplierPayload.value = [];
      resetBox.value = true;
      setTimeout(() => {
        resetBox.value = false;
      }, 1000);
    };

    const commitTransaction = async () => {
      // ดัก eror
      try {
        if(dataEnd.value === null || selectSupplier.value === null || supplierPayload.value.length === 0) {
          throw new Error('ไม่สามารถทำรายการได้: โปรดใส่ข้อมูลให้ครบถ้วน')
        }
        // แปลงเป็น Referrence
        let newMap = supplierPayload.value.map((sup) => {
          return {
            quantity: sup.quantitySelect,
            idDoll: projectFirestore.doc(`Doll/${sup.idDoll}`),
            idOrder: projectFirestore.doc(`Doll_order/${sup.idOrder}`),
          };
        });
        // สร้าง Payload ที่จะขึ้น Firestore
        let payload = {
          createdAt: timestamp(),
          deadline: dataEnd.value,
          Supplier: projectFirestore.doc(`Supplier/${selectSupplier.value.id}`),
          Orders: newMap,
          isFinish: false,
        };

        // แก้ไข Order
        supplierPayload.value.forEach((order) => {
          const selectOrderIndex = dollOrders.value.findIndex((dollOrder) => {
            return dollOrder.id === order.idOrder;
          });
          const selectBoxIndex = boxPayload.value.findIndex((dollBox) => {
            return dollBox.idOrder === order.idOrder;
          });
          let resultQuantity =
            dollOrders.value[selectOrderIndex].quantity - order.quantitySelect;
          projectUpdate("Doll_order", order.idOrder, {
            quantity: resultQuantity,
          });
          resetProduct();
          dollOrders.value[selectOrderIndex].quantity = resultQuantity;
          boxPayload.value[selectOrderIndex].quantity = resultQuantity;
        });

        // เพิ่มข้อมูลลง firestore
        const res = await projectAdd("Supplier_transaction", payload);
        notify({
          title: "Transaction completed successfully! 🎉",
          type: "success",
          text: `เลขที่ใบเสร็จ : ${res.id}`,
        });
      } catch (error) {
        notify({
          title: "ข้อผิดพลาด⚠️",
          type: "error",
          text: error.message,
        });
      }
    };

    return {
      dolls,
      dollOrders,
      showList,
      supliers,
      selectSupplier,
      boxPayload,
      handleSuppPayload,
      supplierPayload,
      handleDeleteOrder,
      commitTransaction,
      dataEnd,
      resetProduct,
      resetBox,
      showBtn
    };
  },
};
</script>

<style scoped>
::selection {
  color: none;
  background: none;
}
</style>