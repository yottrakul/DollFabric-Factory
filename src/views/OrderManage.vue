<template>
  <div
    @click.self="showModel = false; resetDetailModel(); resetSupplierDetails();"
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
    <Model
      v-motion-pop
      v-if="detailModel.orderDetail === true"
      @closeModel="
        showModel = false;
        detailModel.orderDetail = false;
        resetSupplierDetails();
      "
    >
      <template #header>รายละเอียด 📜</template>
      <div class="text-xl">
        หมายเลขใบเสร็จ: <span class="font-light">{{ supplierDetails.id }}</span>
      </div>
      <hr />
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
        <span class="text-green-500">สร้างเมื่อ:</span>
        {{ supplierDetails.createdAt }}
        <span class="text-red-400 ml-4">กำหนดส่ง:</span>
        {{ supplierDetails.deadline }}
      </p>
      <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
        <h1 class="text-xl font-semibold">รายการตุ๊กตา</h1>
        <table
          class="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-2"
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
            <tr
              v-for="order in supplierDetails.orders"
              :key="order.idOrder"
              class="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
            >
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
                <SupplierNameRef :objKey="'name'" :path="order.idDoll" />
              </th>
              <td class="py-4 px-6">{{ order.idOrder }}</td>
              <td class="py-4 px-6">{{ order.quantity }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
        <h1 class="text-xl font-semibold">รายการผ้า</h1>
        <table
          class="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-2"
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
              <th scope="col" class="py-3 px-6">ผ้า</th>
              <th scope="col" class="py-3 px-6">ชนิดผ้า</th>
              <th scope="col" class="py-3 px-6">หมายเลข Fabric</th>
              <th scope="col" class="py-3 px-6 whitespace-nowrap">จำนวน (หลา)</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-motion-slide-bottom
              v-for="item in supplierDetails.fabricUse"
              :key="item.idFabric"
              class="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
            >
              <th
                scope="row"
                class="
                  py-4
                  px-6
                  font-medium
                  text-gray-900
                  whitespace-nowrap
                  dark:text-white
                  flex
                  place-items-center
                  gap-4
                "
              >
                <div class="w-16 h-16 rounded-2xl overflow-hidden"><img class="w-full h-full" :src="item.fabricDetails.imageFabric" alt=""/></div><span>{{ item.fabricDetails.color }}</span>
              </th>
              <td class="py-4 px-6">{{ item.fabricDetails.type }}</td>
              <td class="py-4 px-6">{{ `Stock/${item.idFabric}` }}</td>
              <td class="py-4 px-6">{{ item.useQuantity }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <template #btn>
        <button
          @click="showModel = false; resetDetailModel(); resetSupplierDetails();"
          type="button"
          class="
            w-full
            text-white
            bg-blue-700
            hover:bg-blue-800
            focus:ring-4 focus:outline-none focus:ring-blue-300
            font-medium
            rounded-lg
            text-sm
            px-5
            py-2.5
            text-center
            dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
          "
        >
          เรียบร้อย
        </button>
      </template>
    </Model>
    <Model
      v-motion-pop
      v-if="detailModel.confirmCancelStock === true"
      @closeModel="
        showModel = false;
        detailModel.confirmCancelStock = false;
        confirmCancelStock.idTransaction = null
      "
    >
      <template #header>แจ้งเตือน ⚠️</template>
      <p>
        <span>ต้องการยกเลิกใบเสร็จหมายเลข</span
        ><span class="mx-4 font-semibold">{{ confirmCancelStock.idTransaction }}</span
        ><span>หรือไม่?</span>
      </p>
      <template #btn>
        <button
          @click="orderCancel(confirmCancelStock.idTransaction, true)"
          type="button"
          class="
            w-full
            text-white
            bg-yellow-400
            hover:bg-yellow-800
            focus:ring-4 focus:outline-none focus:ring-blue-300
            font-medium
            rounded-lg
            text-sm
            px-5
            py-2.5
            text-center
            dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
          "
        >
          ยกเลิก และ คืน Stock</button
        ><button
          @click="orderCancel(confirmCancelStock.idTransaction, false);"
          type="button"
          class="
            w-full
            text-white
            bg-red-600
            hover:bg-red-800
            focus:ring-4 focus:outline-none focus:ring-blue-300
            font-medium
            rounded-lg
            text-sm
            px-5
            py-2.5
            text-center
            dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
            whitespace-nowrap
          "
        >
          ยกเลิก และ ไม่ต้องคืน Stock
        </button>
      </template>
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
        @click="current = 'all'"
        class="
          cursor-pointer
          bg-orange-500
          flex-1
          text-center
          py-1
          flex
          h-full
          justify-center
          place-items-center
        "
        :class="{ active: current === 'all' }"
      >
        <span class="material-symbols-outlined"> receipt_long </span>
        <span>ทั้งหมด</span>
      </div>
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
      :class="{
        grid: resetBox,
        'place-items-center': resetBox,
        grid: !formattedTransactions,
        'place-items-center': !formattedTransactions,
      }"
    >
      <div
        v-motion-slide-bottom
        class="flex flex-col"
        v-if="!formattedTransactions"
      >
        <span class="material-symbols-outlined text-7xl"> inbox </span>
        <span>ไม่มีรายการ</span>
      </div>

      <div v-motion-slide-top v-else class="flex flex-col">
        <!-- เริ่ม Loop -->
        <div
          v-for="transaction in formattedTransactions"
          :key="transaction.id"
          class="flex select-none"
        >
          <Order
            @click="showDetails(transaction)"
            :transaction="transaction"
            class="flex-1"
          />
          <div
            v-if="current === 'wait' || current === 'late'"
            v-motion-pop
            class="btnProcess flex"
          >
            <div
              @click="orderFinish(transaction.id)"
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
              @click="showModel = true; detailModel.confirmCancelStock = true; confirmCancelStock.idTransaction = transaction.id"
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
import { projectSet, projectUpdate } from "@/composibles/projectManage";
import { projectIncrement } from "@/firebase/config";
import getFabricUse from '../composibles/getFabricUse'
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
    const detailModel = reactive({
      orderDetail: false,
      confirmCancelStock: false,
    });
    const { documents, error } = getTransactions("Supplier_transaction");
    const { docFabrics, loadUseFabrics } = getFabricUse();
    loadUseFabrics('V2JmB4niNybg3UTptpsm', 5);

    const supplierDetails = reactive({
      idSupp: null,
      orders: [],
      id: null,
      createdAt: null,
      deadline: null,
      fabricUse: []
    });
    const confirmCancelStock = reactive({
      idTransaction: null,
    });
    moment.locale("th");

    // Reset supplierDetails
    const resetSupplierDetails = () => {
      supplierDetails.idSupp = null;
      supplierDetails.orders = [];
      supplierDetails.id = null;
      supplierDetails.createdAt = null;
      supplierDetails.deadline = null;
      supplierDetails.fabricUse = [];
    }

    // Reset to false All in detailModel
    const resetDetailModel = () => {
      Object.keys(detailModel).forEach(key => {
        detailModel[key] = false
      })
    }

    // แปลง Format Doc
    const formattedTransactions = computed(() => {
      if (documents.value) {
        // Center Of Docs
        let docs = documents.value.map((transaction) => {
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

        if (current.value === "all") {
          return docs;
        }

        if (current.value === "wait") {
          let result = docs.filter((doc) => {
            return (
              doc.deadline >= moment() &&
              doc.isFinish === false &&
              (doc.isCancel === false || !doc.isCancel)
            );
          });
          if (result.length === 0) {
            return undefined;
          }
          return result;
        }

        if (current.value === "late") {
          let result = docs.filter((doc) => {
            return (
              doc.deadline < moment() &&
              doc.isFinish === false &&
              (doc.isCancel === false || !doc.isCancel)
            );
          });
          if (result.length === 0) {
            return undefined;
          }
          return result
        }

        if (current.value === "finish") {
          let result = docs.filter((doc) => {
            return doc.isFinish === true;
          });
          if (result.length === 0) {
            return undefined;
          }
          return result
        }

        if (current.value === "cancel") {
          let result = docs.filter((doc) => {
            return doc.isCancel === true;
          });
          if (result.length === 0) {
            return undefined;
          }
          return result
        }
      }
    });

    
    const showDetails = async (transaction) => {
      supplierDetails.idSupp = transaction.Supplier;
      supplierDetails.orders = transaction.Orders;
      supplierDetails.id = transaction.id;
      supplierDetails.createdAt = `${moment(transaction.createdAt).format('Do MMMM YYYY')} (${moment(transaction.createdAt).fromNow()})`;
      supplierDetails.deadline = `${moment(transaction.deadline).format('Do MMMM YYYY')} (${moment(transaction.deadline).fromNow()})`;
      detailModel.orderDetail = true;
      showModel.value = true;
      // ทำการคำนวณผ้าที่ใช้ในตุ๊กตาแต่ละตัวแล้วเก็บใน rawFabricUse
      let rawFabricUse = await Promise.all(transaction.Orders.map(async (order) => {
        // แยก ID
        let idDoll = order.idDoll.split("/");
        idDoll = idDoll[1];
        // คำนวนตุ๊กตา order.quantity ตัว จะใช้ fabric แต่ละอย่างเท่าไหร่
        await loadUseFabrics(idDoll, order.quantity);
        return { ...docFabrics.value }
      }))

      // ทำการกรอง fabric ให้มีอย่างละ id
      let setFabrics = new Set();
      rawFabricUse.forEach((raw) => {
        raw.fabrics.forEach((fabric) => {
          setFabrics.add(fabric.fabricDetails.id);
        })
      })
      
      // แปลง Obj Set เป็น Array set
      setFabrics = Array.from(setFabrics);

      // ทำการนำ key แต่ละตัวมาเปรียบเทียบใน rawFabricUse แล้วทำการเก็บผลรวมความยาวที่ต้องใช้ของ fabric
      setFabrics.forEach((key) => {
        let payload = {
          idFabric: key,
          useQuantity: 0,
          fabricDetails: null
        }
        rawFabricUse.forEach((raw) => {
          raw.fabrics.forEach((fabric) => {
            if(fabric.fabricDetails.id === key ) {
              payload.useQuantity += fabric.quantity
              if(!payload.fabricDetails) {
                payload.fabricDetails = fabric.fabricDetails;
              }
            }
          })
        });

        if(payload.fabricDetails.imageFabric === "") {
          payload.fabricDetails.imageFabric = require('@/assets/noitem.webp');
        }
        // เก็บการคำนวณที่ supplierDetails.fabricUse
        supplierDetails.fabricUse.push(payload);
      })

    };

    const orderFinish = (id) => {
      // แก้ที่ doucument
      const docSelectIndex = documents.value.findIndex((doc) => {
        return doc.id === id;
      });
      if (docSelectIndex !== -1) {
        documents.value[docSelectIndex].isFinish = true;
      }

      // แก้ที่ Firestore
      projectUpdate("Supplier_transaction", id, { isFinish: true });
    };

    const closeCancalConfirmModel = () => {
        showModel.value = false;
        detailModel.confirmCancelStock = false;
        confirmCancelStock.idTransaction = null
    }

    const orderCancel = (id, stockReturn) => {
      // แก้ที่ doucument
      const docSelectIndex = documents.value.findIndex((doc) => {
        return doc.id === id;
      });
      if (docSelectIndex !== -1) {
        documents.value[docSelectIndex].isCancel = true;
      }

      // กรณีต้องการคืน Stock ด้วย
      if (stockReturn) {
        documents.value[docSelectIndex].Orders.forEach((order) => {
          // ใช้ orderPath[1] เพื่อเอาเลข id
          let orderPath = order.idOrder.path.split("/");
          let orderID = orderPath[1];
          projectUpdate("Doll_order", orderID, {
            quantity: projectIncrement(order.quantity),
          });
        });
      }

      projectSet("Supplier_transaction", id, { isCancel: true });
      closeCancalConfirmModel();
    };

    return {
      docFabrics,
      resetBox,
      current,
      formattedTransactions,
      error,
      showModel,
      showDetails,
      supplierDetails,
      orderFinish,
      documents,
      orderCancel,
      detailModel,
      confirmCancelStock,
      resetDetailModel,
      resetSupplierDetails,
    };
  },
};
</script>

<style scoped>
div.active {
  @apply bg-slate-300 text-blue-600;
}
</style>