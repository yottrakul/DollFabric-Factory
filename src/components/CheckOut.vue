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
            <span class="text-6xl font-semibold">ค้นหา</span
            ><button @click="checkAvailable('DiOhaBeei5F4sa0ZoM6w', 30)">
              Test
            </button>
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
            <SearchBox class="col-span-4" />
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

            <div v-for="doll in dolls" :key="doll.id">
              <DollCard
                :stocksRef="stocksRef"
                :newDollDetails="newDollDetails"
                :amount="amount"
                :idDoll="doll.id"
                :imgDoll="doll.imgDoll"
                :nameDoll="doll.name"
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
          "
        >
          <!-- ตะกร้าสินค้า -->
          <div
            class="
              header-cart
              text-center
              pt-20
              row-span-1
              sm:pt-5
              lg:pt-10
              xl:pt-20
            "
          >
            <h1 class="text-4xl font-semibold text-white">Checkout</h1>
          </div>
          <div class="cart-zoner row-span-4 h-full overflow-y-auto scollHide">
            <Cart />
          </div>
          <div class="btn-cart grid grid-rows-2 row-span-1">
            <button
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
import SearchBox from "../components/SearchBox.vue";
import Cart from "../components/Cart.vue";
import DollCard from "../components/Card.vue";
import { ref } from "@vue/reactivity";
import getDolls from "../composibles/getDollDetails";
import { watchEffect } from '@vue/runtime-core';
export default {
  components: {
    SearchBox,
    Cart,
    DollCard,
  },
  props: ["stocks", "dolls"],
  setup(props, context) {
    // console.log(props.dolls);
    // ประกาศตัวรับ Details ตุ๊กตาแต่ละตัว
    const { dollDetails, loadDetails, error } = getDolls();
    // closeOverlay
    const closeOverlay = () => {
      context.emit("close");
    };

    // รับ props stocks
    const stocksRef = ref(props.stocks);

    // Data Doll ที่มีการแทรกส่วนประกอบผ้าเรียบร้อย
    const newDollDetails = ref([]);

    // จำนวนที่สั่งตุ๊กตา (ตัว)
    const amount = ref(null);
    // กันลบ
    watchEffect(() => {
      amount.value = Math.abs(amount.value)
      if(amount.value === 0) {
        amount.value = null
      } 
    })


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
    const showDoll = ref(true)
    const reloadDoll = () => {
      showDoll.value = false;
      const enableShowDoll = () => {
        showDoll.value = true
      }
      setTimeout(enableShowDoll, 100);
    }

    return { closeOverlay, amount, checkAvailable, newDollDetails, stocksRef, showDoll, reloadDoll };
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