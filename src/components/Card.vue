<template>
  <button @click="addToCart" class="group relative">
    <div
      class="
        min-h-80
        aspect-w-1 aspect-h-1
        w-full
        overflow-hidden
        rounded-md
        bg-gray-200
        group-hover:opacity-75
        lg:aspect-none lg:h-80
        relative
      "
    >
      <div
        v-if="!checkAllHave"
        class="
          z-50
          absolute
          top-0
          bg-slate-800/80
          w-full
          h-full
          grid
          place-items-center
        "
      >
        <div>
          <span
            class="
              block
              text-center
              material-symbols-outlined
              text-red-500 text-6xl
              mb-1
            "
          >
            error
          </span>
          <span class="text-white text-center">Stock ไม่เพียงพอ</span>
        </div>
      </div>
      <img
        :src="imgDoll"
        alt=""
        class="h-full w-full object-cover object-center lg:h-full lg:w-full"
      />
    </div>
    <div class="mt-4 flex justify-between">
      <div>
        <h3 class="text-sm text-gray-700">
          <a href="#">
            <span aria-hidden="true" class="absolute inset-0" />
            {{nameDoll}}
          </a>
        </h3>
        <!-- <p class="mt-1 text-sm text-gray-500">{{ product.color }}</p> -->
      </div>
      <p class="text-sm font-medium text-gray-900">{{ amountRef }} ตัว</p>
    </div>
    <!-- debug -->
  </button>
</template>

<script>
import { ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
export default {
  props: ["newDollDetails", "stocksRef", "amount", "idDoll", "imgDoll", "nameDoll"],
  setup(props, context) {
    // ข้อมูลตุ๊กตาทั้งหมด default []
    const dollDetails = ref(props.newDollDetails ? props.newDollDetails : []);
    //ข้อมูล Stock ทั้งหมด
    const stocks = ref(props.stocksRef);
    // ข้อมูลตุ๊กตาที่เป็นเป้าหมาย
    const idDoll = ref(props.idDoll);
    // จำนวนที่ผลิต defalut 1
    const amountRef = ref(props.amount ? props.amount : 1);

    const disBtn = ref(true);

    // คำสั่งไว้เช็คของตุ๊กตากับ Stock
    // สิ่งที่ Return { 'IDผ้า': {isEnougt: true/false, want: 0-infinity} }
    const checkAvailable = (idDoll, amount) => {
      // ค้นหา doll ในก้อน dolls
      let doll = dollDetails.value.find((item) => {
        return item.id === idDoll;
      });
      let detailsAv = {};
      // กัน error ต้องดักว่ามี doll ก่อน
      if (doll) {
        Object.keys(doll.fabrics).forEach((key) => {
          let useFabric = doll.fabrics[key];
          // คำนวนคูณผ้าที่ใช้
          // คำนวน amount ก่อน
          // เช่น asdfasdasd: 100 * amount
          useFabric = useFabric * amount;
          // หา stock เป้าหมาย
          const stock = stocks.value.find((stock) => {
            return stock.id === key;
          });
          // ถ้าผ้าใน stock มากกว่า
          if (stock.length >= useFabric) {
            detailsAv[key] = { isEnough: true, want: 0 };
          } else {
            detailsAv[key] = {
              isEnough: false,
              want: useFabric - stock.length,
            };
          }
        });
      }

      // console.log(detailsAv);

      // นำมาเช็คว่า จำนวนผ้าในตุ๊กตา ใน stock มีพอไหม
      return detailsAv;
    };

    // computed
    const checkAllHave = computed(() => {
      const result = checkAvailable(idDoll.value, amountRef.value);
      let resultBool = true;
      // ดูว่ามี false ที่ isEnough หรือไม่
      if (result !== {}) {
        Object.keys(result).forEach((key) => {
          if (!result[key].isEnough) {
            //เมื่อพบ isEnough = false resultBool = false
            resultBool = false;
          }
        });
      }
      // ถ้ามีเพียงแค่ตัวเดียว return false
      // ถ้าไม่มีเลย return true
      return resultBool;
    });

    // Add tocart เมื่อเจอว่าของขาด จะส่ง notEnought ไป แต่ถ้าครบจะส่ง confirm ไป
    const addToCart = () => {
      if(checkAllHave.value) {
        const newMap = {
          id: props.idDoll,
          name: props.nameDoll,
          quantity: amountRef.value
        }
        context.emit('confirm', newMap)
      } else {
        // console.log('notEnougt', checkAvailable(idDoll.value, amountRef.value))
        context.emit('notEnougt', checkAvailable(idDoll.value, amountRef.value));
        context.emit('setNameDoll', props.nameDoll);
        context.emit('setIdDoll', props.idDoll);
      }
    };

    return {
      dollDetails,
      stocks,
      idDoll,
      amountRef,
      checkAvailable,
      checkAllHave,
      addToCart,
      disBtn,
    };
  },
};
</script>

<style>
</style>