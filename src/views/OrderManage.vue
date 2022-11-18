<template>
  <div
    @click.self="showModel = false"
    v-if="showModel"
    class="
      fixed
      top-0
      right-0
      left-0
      z-20
      w-screen
      h-screen
      bg-slate-900/70
      grid
      place-content-center
    "
  >
    <Model @closeModel="showModel = false">
      <p class="font-normal leading-relaxed">
        Supplier ที่รับผิดชอบ ==>
        <supplier-name-ref
          class="font-semibold"
          :objKey="'nameSupplier'"
          :path="supplierDetails.idSupp"
        />
        ({{ supplierDetails.idSupp }})
      </p>
      <p class="leading-relaxed">
        <span class="text-green-500">สร้างเมื่อ:</span> {{supplierDetails.createdAt}}
        <span class="text-red-400 ml-4">เส้นตาย:</span> {{supplierDetails.deadline}}
      </p>
      <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table
          class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <thead
            class="
              text-xs text-gray-700
              uppercase
              bg-gray-50
              dark:bg-gray-700 dark:text-gray-400
            "
          >
            <tr>
              <th scope="col" class="py-3 px-6">ชื่อตุ๊กตา</th>
              <th scope="col" class="py-3 px-6">หมายเลข Order</th>
              <th scope="col" class="py-3 px-6">จำนวน (ตัว)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in supplierDetails.orders" :key="order.idOrder" class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
              <th
                scope="row"
                class="
                  py-4
                  px-6
                  font-medium
                  text-gray-900
                  whitespace-nowrap
                  dark:text-white
                "
              >
                <SupplierNameRef :objKey="'name'" :path="order.idDoll"/>
              </th>
              <td class="py-4 px-6">{{order.idOrder}}</td>
              <td class="py-4 px-6">{{order.quantity}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Model>
  </div>
  <div
    class="
      min-w-fit
      w-full
      h-screen
      overflow-y-auto
      p-4
      bg-slate-200
      flex flex-col
      gap-4
    "
  >
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
        h-fit
        min-w-fit
        whitespace-nowrap
      "
    >
      <span class="text-white text-5xl material-symbols-outlined">
        checklist
      </span>
      <div>
        <h1 class="text-white text-2xl font-extrabold">Orders Manage</h1>
        <span class="text-gray-100"
          >Order ที่ถูกสร้างขึ้นมาใน Products จะแสดงในส่วนนี้และสามารถจัดการ
          ยืนยัน / ยกเลิก Order ได้</span
        >
      </div>
    </div>
    <div
      v-motion-slide-top
      class="
        shadow-slate-500 shadow-lg
        rounded-full
        flex
        place-items-center
        min-w-fit min-h-[2rem]
        whitespace-nowrap
        overflow-hidden
        text-white
      "
    >
      <div
        @click="current = 'wait'"
        class="
          cursor-pointer
          bg-blue-500
          flex-1
          text-center
          py-1
          flex
          h-full
          justify-center
          place-items-center
        "
        :class="{ active: current === 'wait' }"
      >
        <span class="material-symbols-outlined"> hourglass_top </span
        ><span>รอดำเนินการ</span>
      </div>
      <div
        @click="current = 'late'"
        class="
          cursor-pointer
          bg-yellow-400
          flex-1
          text-center
          py-1
          flex
          h-full
          justify-center
          place-items-center
        "
        :class="{ active: current === 'late' }"
      >
        <span class="material-symbols-outlined"> hourglass_disabled </span
        ><span>ล่าช้า</span>
      </div>
      <div
        @click="current = 'cancel'"
        class="
          cursor-pointer
          bg-red-500
          flex-1
          text-center
          py-1
          flex
          h-full
          justify-center
          place-items-center
        "
        :class="{ active: current === 'cancel' }"
      >
        <span class="material-symbols-outlined"> cancel_schedule_send </span
        ><span>ถูกยกเลิก</span>
      </div>
      <div
        @click="current = 'finish'"
        class="
          cursor-pointer
          bg-green-400
          flex-1
          text-center
          py-1
          flex
          h-full
          justify-center
          place-items-center
        "
        :class="{ active: current === 'finish' }"
      >
        <span class="material-symbols-outlined"> recommend </span
        ><span>สำเร็จ</span>
      </div>
    </div>
    <div
      class="
        container-flex
        flex-auto
        bg-gray-100
        rounded-3xl
        shadow-xl
        overflow-y-auto
        scollHide
      "
      :class="{ grid: resetBox, 'place-items-center': resetBox }"
    >
      <div class="flex flex-col">
        <!-- เริ่ม Loop -->
        <div
          @click="showDetails(transaction)"
          v-for="transaction in formattedTransactions"
          :key="transaction.id"
          class="flex"
        >
          <Order :transaction="transaction" class="flex-1" />
          <div class="btnProcess flex">
            <div
              v-motion-slide-right
              v-if="current === 'wait' || current === 'late'"
              class="
                bg-green-400
                h-full
                flex flex-col
                place-items-center place-content-center
                px-4
                whitespace-nowrap
                text-white
              "
            >
              <span class="material-symbols-outlined"> done </span>
              <span>Order สำเร็จ</span>
            </div>
            <div
              v-motion-slide-right
              v-if="current === 'wait' || current === 'late'"
              class="
                bg-red-500
                h-full
                flex flex-col
                place-items-center place-content-center
                px-4
                whitespace-nowrap
                text-white
              "
            >
              <span class="material-symbols-outlined"> cancel </span>
              <span>ยกเลิก Order</span>
            </div>
          </div>
        </div>
        <!-- สิ้นสุด Loop -->
      </div>
    </div>
  </div>
</template>

<script>
import getTransactions from "../composibles/getTransactions";
import moment from "moment";
import Order from "../components/Order.vue";
import { reactive, ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import Model from "../components/Model.vue";
import SupplierNameRef from "../components/FkRef.vue";
export default {
  components: {
    Order,
    Model,
    SupplierNameRef,
  },
  setup() {
    const resetBox = ref(false);
    const current = ref("all");
    const showModel = ref(false);
    const { documents, error } = getTransactions("Supplier_transaction");
    const supplierDetails = reactive({
      idSupp: null,
      orders: [],
      id: null,
      createdAt: null,
      deadline: null
    });
    moment.locale("th");

    // แปลง Format Doc
    const formattedTransactions = computed(() => {
      if (documents.value) {
        return documents.value.map((transaction) => {
          let dateCreateObj = transaction.createdAt.toDate();
          let dateDeadLineObj = transaction.deadline.toDate();
          let suppId = transaction.Supplier.path;
          let OrderFormat = transaction.Orders.map((order) => {
            return {
              ...order,
              idOrder: order.idOrder.path,
              idDoll: order.idDoll.path,
            };
          });
          return {
            ...transaction,
            createdAt: dateCreateObj,
            Supplier: suppId,
            Orders: OrderFormat,
            deadline: dateDeadLineObj,
          };
        });
      }
    });

    const showDetails = (transaction) => {
      supplierDetails.idSupp = transaction.Supplier;
      supplierDetails.orders = transaction.Orders;
      supplierDetails.id = transaction.id;
      supplierDetails.createdAt = moment(transaction.createdAt).fromNow();
      supplierDetails.deadline = moment(transaction.deadline).fromNow();
      showModel.value = true;
    };

    return {
      resetBox,
      current,
      formattedTransactions,
      error,
      showModel,
      showDetails,
      supplierDetails,
    };
  },
};
</script>

<style scoped>
div.active {
  @apply bg-slate-300 text-blue-600;
}
</style>