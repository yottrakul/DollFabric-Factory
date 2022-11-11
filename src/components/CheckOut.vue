<template>
  <div class="overlay">
    <span
      @click="closeOverlay"
      class="
        material-symbols-outlined
        text-end text-white text-4xl
        absolute
        top-2
        right-2
        cursor-pointer
        hover:text-red-600
      "
    >
      close
    </span>
    <!-- Grid Container -->
    <div @click.self="closeOverlay" class="grid place-items-center h-screen">
      <!-- Container -->
      <div
        class="
          container
          w-full
          bg-slate-100
          rounded-md
          grid grid-cols-4
          h-[90%]
          max-h-[90%]
          overflow-hidden
        "
      >
        <div class="zone1 col-span-3 overflow-y-auto scollHide mr-2">
          <!-- กล่องค้นหาและโซนตุ๊กตา -->
          <div class="block pl-5 -mb-2.5 pt-8">
            <span class="text-6xl font-semibold">ค้นหา</span>
          </div>
          <div
            class="
              px-4
              py-4
              sticky
              top-0
              z-10
              grid grid-cols-5
              gap-x-5
              bg-white/30
              backdrop-blur
            "
          >
            <!-- กล่องค้นหา -->
            <input
              v-model="search"
              class="
                col-span-4
                w-full
                bg-slate-100
                rounded-full
                border-2 border-blue-500
                pt-2
              "
              placeholder="ค้นหาตุ๊กตาที่นี่..."
              type="text"
            />
            <div
              class="bg-slate-100 rounded-full border-2 border-green-500 flex"
            >
              <input
                @keypress.enter="reloadDoll"
                v-model="amount"
                class="
                  w-[80%]
                  bg-transparent
                  border-transparent
                  focus:border-transparent focus:ring-0
                  text-end
                  pt-2.5
                "
                placeholder="ต้องการกี่"
                type="number"
              />
              <span class="self-center text-lg font-medium">ตัว</span>
            </div>
          </div>
          <div
            v-if="showDoll"
            class="
              grid grid-cols-1
              gap-y-10 gap-x-6
              sm:grid-cols-2
              lg:grid-cols-4
              xl:gap-x-8
              px-5
            "
          >
            <!-- โซนตุ๊กตา -->

            <div v-for="doll in searchByName" :key="doll.id">
              <DollCard
                :stocksRef="stocksRef"
                :newDollDetails="newDollDetails"
                :amount="amount"
                :idDoll="doll.id"
                :imgDoll="doll.imgDoll"
                :nameDoll="doll.name"
                @confirm="handleConfirm"
                @notEnougt="handleNotEnougt"
                @setNameDoll="setNameDoll"
                @setIdDoll="setIdDoll"
              />
            </div>
          </div>
        </div>
        <div
          class="
            zone2
            gap-y-4
            grid
            h-full
            grid-cols-1 grid-rows-6
            bg-green-600
            outline-dashed outline-2 outline-offset-4
            p-4
            overflow-y-auto
            relative
          "
        >
          <!-- โชว์เมื่อมีการกดของไม่มี -->
          <transition
            enter-from-class="transition opacity-0 -translate-x-96"
            enter-to-class="opacity-100 translate-x-0"
            enter-active-class="duration-300 ease-out"
            leave-active-class="duration-300 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="transform opacity-0 -translate-x-96"
          >
            <div
              v-if="showError"
              class="
                absolute
                z-30
                bg-slate-500
                top-0
                w-full
                h-full
                grid grid-cols-1 grid-rows-6
                p-4
              "
            >
              <div class="header-cart text-center pt-6 row-span-1">
                <h1 class="text-4xl font-semibold text-white">
                  รายการที่<span class="text-red-400">ขาด</span>
                </h1>
                <h1 class="text-2xl font-semibold text-white">
                  {{ nameDollError }}
                </h1>
                <h1
                  class="
                    bg-yellow-400
                    rounded-full
                    text-lg
                    font-semibold
                    text-white
                  "
                >
                  <span class="align-sub mr-3 material-symbols-outlined">
                    key </span
                  >{{ idDollError }}
                </h1>
              </div>
              <div
                class="cart-zoner row-span-4 h-full overflow-y-auto scollHide"
              >
                <Pill
                  v-for="pill in pills"
                  :key="pill.id"
                  :amount="pill.want"
                  :name="pill.color"
                  :idStock="pill.id"
                />
              </div>
              <div class="btn-cart grid grid-rows-1 row-span-1">
                <button
                  @click="showError = false"
                  class="
                    bg-red-500
                    transition-colors
                    duration-200
                    hover:bg-white hover:text-red-500
                    text-white
                    w-full
                    rounded-xl
                  "
                >
                  ปิด
                </button>
              </div>
            </div>
          </transition>

          <!-- โชว์เมื่อมีการกดของไม่มี -->

          <!-- ตะกร้าสินค้า -->
          <div
            class="
              header-cart
              text-center
              row-span-1
              grid place-items-center
              pt-5
            "
          >
            <h1 class="text-4xl font-semibold text-white">Checkout</h1>
          </div>
          <div class="cart-zoner row-span-4 h-full overflow-y-auto scollHide">
            <!-- <Cart @cartDelete="handleDeleteCart" :items="inCart" /> -->
            <span v-if="inCart.length === 0" class=" text-white material-symbols-outlined"> category </span>
            <Item
              :amount="item.quantity"
              :name="item.name"
              @deleted="handleDeleteCart(item)"
              v-for="item in inCart"
              :key="item.id"
            />
          </div>
          <div class="btn-cart grid grid-rows-2 row-span-1">
            <button
              disabled
              v-if="isLoad"
              class="
                bg-black
                transition-colors
                duration-200
                text-white
                w-full
                rounded-t-xl
              "
            >
              <svg
                aria-hidden="true"
                role="status"
                class="inline mr-3 w-6 h-6 text-white animate-spin align-sub"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              กำลังดำเนินการ ...
            </button>
            <button
              v-if="!isLoad"
              @click="handleTransection"
              class="
                bg-black
                transition-colors
                duration-200
                hover:bg-white hover:text-black
                text-white
                w-full
                rounded-t-xl
              "
            >
              ตัด Stock
            </button>
            <button
              @click="closeOverlay"
              class="
                bg-red-500
                transition-colors
                duration-200
                hover:bg-white hover:text-red-500
                text-white
                w-full
                rounded-b-xl
              "
            >
              ยกเลิก
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DollCard from "../components/Card.vue";
import { ref } from "@vue/reactivity";
import getDolls from "../composibles/getDollDetails";
import { computed, provide, watchEffect } from "@vue/runtime-core";
import Pill from "../components/Pill.vue";
import { removeItemArray } from "@/composibles/rmInArray";
import Item from "../components/ItemInCart.vue";
import { projectUpdate } from "@/composibles/projectManage";
import { projectFirestore } from "@/firebase/config";
import { useRouter } from "vue-router";
export default {
  components: {
    DollCard,
    Pill,
    Item,
  },
  props: ["stocks", "dolls"],
  setup(props, context) {
    // router
    const router = useRouter();

    // console.log(props.dolls);
    // ประกาศตัวรับ Details ตุ๊กตาแต่ละตัว
    const { dollDetails, loadDetails, error } = getDolls();
    // closeOverlay
    const closeOverlay = () => {
      // console.log(saveStock);
      // stocksRef.value = saveStock;
      context.emit("close", saveStock);
    };

    // รับ props stocks
    const stocksRef = ref(props.stocks);
    let saveStock = stocksRef.value.map((stock) => {
      return { ...stock };
    });

    // Data Doll ที่มีการแทรกส่วนประกอบผ้าเรียบร้อย
    const newDollDetails = ref([]);

    // จำนวนที่สั่งตุ๊กตา (ตัว)
    const amount = ref(null);
    // กันลบ
    watchEffect(() => {
      amount.value = Math.abs(amount.value);
      if (amount.value === 0) {
        amount.value = null;
      }
    });

    // Loop Props Doll
    props.dolls.forEach(async (doll) => {
      let data = doll;
      data.fabrics = {};
      // console.log(data)

      // loadDollsDetails
      // ทำการ Map fabric obj ลง ใน data โดยดึง id ของ ผ้ามาเป็นชื่อ key
      await loadDetails(doll.id);
      dollDetails.value.forEach((fabric) => {
        // เอาค่าใน Fabric มาเป็น Object Key ของ data.fabric
        data.fabrics[fabric.Fabric] = fabric.Quantity;
      });

      newDollDetails.value.push(data);
      // Object.keys(doll).forEach(key => {
      //   data[key] = doll[key]
      // })
      // newDollDetails.value.push(data);
    });

    // console.log(newDollDetails.value);
    // console.log(stocksRef);

    // คำสั่งไว้เช็คของตุ๊กตากับ Stock
    // สิ่งที่ Return { 'IDผ้า': {isEnougt: true/false, want: 0-infinity} }
    const checkAvailable = (idDoll, amount) => {
      // ค้นหา doll ในก้อน dolls
      let doll = newDollDetails.value.find((item) => {
        return item.id === idDoll;
      });
      let detailsAv = {};
      Object.keys(doll.fabrics).forEach((key) => {
        let useFabric = doll.fabrics[key];
        // คำนวนคูณผ้าที่ใช้
        // คำนวน amount ก่อน
        // เช่น asdfasdasd: 100 * amount
        useFabric = useFabric * amount;
        const stock = stocksRef.value.find((stock) => {
          return stock.id === key;
        });
        // ถ้าผ้าใน stock มากกว่า
        if (stock.length >= useFabric) {
          detailsAv[key] = { isEnough: true, want: 0 };
        } else {
          detailsAv[key] = { isEnough: false, want: useFabric - stock.length };
        }
      });
      console.log(stocksRef.value);
      console.log(newDollDetails.value);
      console.log(detailsAv);

      // นำมาเช็คว่า จำนวนผ้าในตุ๊กตา ใน stock มีพอไหม
      return detailsAv;
    };

    // Reload Doll
    const showDoll = ref(true);
    const reloadDoll = () => {
      showDoll.value = false;
      const enableShowDoll = () => {
        showDoll.value = true;
      };
      setTimeout(enableShowDoll, 100);
    };

    // ระบบ Search
    const search = ref("");

    //computed Search
    const searchByName = computed(() => {
      let result = [];
      if (search.value === "") {
        result = props.dolls;
      } else {
        result = props.dolls.filter((doll) => {
          return doll.name.includes(search.value);
        });
      }
      return result;
    });

    // หน้าต่างแสดงสินค้าที่ขาด
    const showError = ref(false);
    const idDollError = ref("");
    const nameDollError = ref("");

    // setNameDoll
    const setNameDoll = (name) => {
      nameDollError.value = name;
    };
    // setIdDoll
    const setIdDoll = (id) => {
      idDollError.value = id;
    };

    // handleConfirm
    // In Cart
    const inCart = ref([]);
    const orderID = ref(1);
    // {id: 'zhPk98JGnS7oGKZwh6cn', name: 'โดราเอมอน', quantity: 1}
    const handleConfirm = (data) => {
      // ลด stock ก่อน
      const dollTarget = newDollDetails.value.find((doll) => {
        return doll.id === data.id;
      });
      // คำนวนผ้าที่ใช้แล้วตัด stock
      Object.keys(dollTarget.fabrics).forEach((key) => {
        let useFabric = dollTarget.fabrics[key] * data.quantity;

        stocksRef.value.forEach((stock) => {
          if (stock.id === key) {
            stock.length = stock.length - useFabric;
          }
        });
      });
      // แล้วใส่เข้าตะกร้า
      inCart.value.push({ ...data, orderID: orderID.value++ });
    };

    // handleNotEnougt
    const pills = ref([]);
    let tempFabrics = {};
    let temp2Fabrics = {};
    const handleNotEnougt = (fabrics) => {
      // เปิด showError
      showError.value = true;
      // แปลง obj ให้เป็น Array
      // console.log(name);
      const asArray = Object.entries(fabrics);
      const newMap = asArray.map((item) => {
        // แปลง item[0] เป็น name
        const stock = props.stocks.find((e) => {
          return e.id === item[0];
        });
        return {
          id: stock.id,
          color: stock.color,
          isEnough: item[1].isEnough,
          want: item[1].want,
        };
      });

      // ส่ง pills ไป loop
      pills.value = newMap;
    };

    // handleDeleteCart
    const handleDeleteCart = (data) => {
      const dollTarget = newDollDetails.value.find((doll) => {
        return doll.id === data.id;
      });
      // คำนวนผ้าที่ใช้แล้วเพิ่ม stock
      Object.keys(dollTarget.fabrics).forEach((key) => {
        let useFabric = dollTarget.fabrics[key] * data.quantity;

        stocksRef.value.forEach((stock) => {
          if (stock.id === key) {
            stock.length = stock.length + useFabric;
          }
        });
      });

      // เอาใน Cart ออก
      // Function
      const removeItemObj = (arr, orderID) => {
        const index = arr.findIndex((e) => e.orderID === orderID);
        if (index > -1) {
          arr.splice(index, 1);
        }
        return arr;
      };

      // ใช้ Function
      inCart.value = removeItemObj(inCart.value, data.orderID);
    };

    // handleTransection
    const isLoad = ref(false);
    const handleTransection = async () => {
      // เปิดโหลด
      isLoad.value = true;
      console.log("handleTransection");
      // หา Stock ที่มีการ Update
      const whatToUpdate = stocksRef.value.filter((stock) => {
        const targetStock = saveStock.find((sStock) => {
          return sStock.id === stock.id;
        });

        return stock.length !== targetStock.length;
      });
      // console.log(whatToUpdate);

      whatToUpdate.forEach(async (stock) => {
        await projectUpdate("Stock", stock.id, {
          length: stock.length,
        });
      });
      // ปิดโหลด
      setTimeout(() => {
        isLoad.value = false;
        // ปิดหน้าต่าง
        closeOverlay();
      }, 2000);
      // เปลี่ยนค่าใน saveStock
      // เพื่อให้ในหน้า Doll Update Stock แบบ Realtime
      saveStock = stocksRef.value.map((stock) => {
        return { ...stock };
      });

      // สร้าง DataBase เก็บตุ๊กตาที่ทำ CheckOut แล้ว
    };

    return {
      closeOverlay,
      amount,
      checkAvailable,
      newDollDetails,
      stocksRef,
      showDoll,
      reloadDoll,
      search,
      searchByName,
      showError,
      idDollError,
      nameDollError,
      handleConfirm,
      handleNotEnougt,
      pills,
      setNameDoll,
      setIdDoll,
      inCart,
      handleDeleteCart,
      saveStock,
      handleTransection,
      isLoad,
    };
  },
};
</script>

<style scoped>
/* * {
  border: 1px solid red;
} */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
  z-index: 10;
}
</style>