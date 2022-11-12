<template>
  <OverlayDetails
    @close="idDoll = null"
    v-if="idDoll"
    :idDoll="idDoll"
    :stocks="stocks"
  />
  <transition
            enter-from-class="transition opacity-0"
            enter-to-class="opacity-100"
            enter-active-class="duration-150 ease-out"
            leave-active-class="duration-150 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="transform opacity-0"
          >
  <AddDoll v-if="isAdd" @close="isAdd = false" :stocks="stocks"/>
  </transition>
  <transition
            enter-from-class="transition opacity-0"
            enter-to-class="opacity-100"
            enter-active-class="duration-150 ease-out"
            leave-active-class="duration-150 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="transform opacity-0"
          >
  <CheckOut :stocks="stocks" :dolls="dolls" v-if="isCO" @close="handleClose" />
  </transition>
  <Overlay
    :imgSrc="imgSrc"
    v-if="showOverlay"
    @close="showOverlay = !showOverlay"
  />
  <div class="main">
    <div v-if="error" class="error">{{ error }}</div>
    <div class="flex justify-end mb-5 gap-3">
      <transition
            enter-from-class="transition opacity-0 translate-y-96"
            enter-to-class="opacity-100 translate-x-0"
            enter-active-class="duration-300 ease-out"
            leave-active-class="duration-300 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="transform opacity-0 translate-y-96"
          >
      <div
        v-if="dolls.length !== 0"
        @click="isCO = true"
        class="btn-hover color-1 inline-flex justify-center items-center gap-2"
      >
        <span class="material-symbols-outlined"> point_of_sale </span>
        <span>Check Out</span>
      </div>
      </transition>
      <button
        @click="isAdd = true"
        type="button"
        class="
          focus:outline-none
          text-white
          bg-green-700
          hover:bg-green-800
          focus:ring-4 focus:ring-green-300
          font-medium
          rounded-lg
          text-sm
          px-5
          py-2.5
          dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800
        "
      >
        เพิ่มตุ๊กตา
      </button>
    </div>
    <EasyDataTable
      buttons-pagination
      :headers="headers"
      :items="dolls"
      :loading="dolls.length === 0"
    >
      <template #loading>
        <img
          src="../assets/bongocat-funny.gif"
          style="width: 80px; height: 50px"
        />
      </template>
      <template #item-imgDoll="{ imgDoll }">
        <div class="doll_wrapper">
          <img @click="showImage(imgDoll)" class="doll" :src="imgDoll" alt="" />
        </div>
      </template>
      <template #item-operation="item">
        <div class="operation_wrapper">
          <span
            @click="showDetails(item)"
            class="material-symbols-outlined operation-icon"
          >
            inventory_2
          </span>
        </div>
      </template>
    </EasyDataTable>
  </div>

  <!-- นี่คือหน้าแสดง Patern ตุ๊กตา -->
  <p v-if="error">{{ error }}</p>
  <!-- <p>{{ dolls }}</p> -->
</template>

<script>
import Overlay from "../components/Overlay.vue";
import getDolls from "../composibles/getDolls";
import { ref } from "@vue/reactivity";
import OverlayDetails from "../components/OverlayDetails.vue";
import getStock from "@/composibles/getStock";
import CheckOut from "../components/CheckOut.vue";
import AddDoll from "../components/AddDoll.vue"

export default {
  components: {
    Overlay,
    OverlayDetails,
    CheckOut,
    AddDoll
  },
  setup() {
    // หน้าต่าง Add ตุ๊กตา
    const isAdd = ref(false);
    // เมื่อมีการ CheckOut
    const isCO = ref(false);

    // เก็บค่า Src ของ Img และ Overlay boolean
    const imgSrc = ref("");
    const showOverlay = ref(false);

    // สร้างฟังก์ชัน showImage เพื่อเก็บค่า Src ของ Img
    const showImage = (item) => {
      imgSrc.value = item;
      showOverlay.value = !showOverlay.value;
    };

    //ประกาศและเรียกใช้ getDolls
    const { dolls, error, loadDolls } = getDolls();
    loadDolls();

    // Header ตาราง & Item ในตาราง
    const headers = ref([
      { text: "รูปภาพ", value: "imgDoll" },
      { text: "ID_Doll", value: "id" },
      { text: "ชื่อตุ๊กตา", value: "name" },
      { text: "รายละเอียด", value: "operation" },
    ]);

    // ดูรายละเอียด Item
    const idDoll = ref(null);
    const showDetails = (doll) => {
      idDoll.value = doll.id;
      console.log(doll.id);
    };

    //เรียก Stock ทั้งหมด
    const { stocks, loadStock } = getStock();
    loadStock();

    // Handle Close
    const handleClose = (item) => {
      isCO.value = false;
      // แก้บัค stock ไม่อัปเดท
      stocks.value = item;
    }

    return {
      dolls,
      error,
      showImage,
      headers,
      showDetails,
      showOverlay,
      imgSrc,
      idDoll,
      stocks,
      isCO,
      handleClose,
      isAdd
    };
  },
};
</script>

<style scoped>
.main {
  margin: 50px auto;
  width: 80%;
}

.doll {
  margin-right: 10px;
  display: inline-block;
  width: 100%;
  height: 8rem;
  object-fit: cover;
  object-position: 0px -40px;
  box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 10%);
}

.doll {
  cursor: pointer;
}

.doll:hover {
  opacity: 0.7;
  transition: 0.25s;
}

.operation-icon {
  font-size: 2rem;
  cursor: pointer;
}

.btn-hover {
  width: 10rem;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  height: 2.5rem;
  text-align: center;
  border: none;
  background-size: 300% 100%;

  border-radius: 0.5rem;
  -o-transition: all 0.4s ease-in-out;
  -webkit-transition: all 0.4s ease-in-out;
  transition: all 0.4s ease-in-out;
}

.btn-hover:hover {
  background-position: 100% 0;
  -o-transition: all 0.4s ease-in-out;
  -webkit-transition: all 0.4s ease-in-out;
  transition: all 0.4s ease-in-out;
}

.btn-hover:focus {
  outline: none;
}

.btn-hover.color-1 {
  background-image: linear-gradient(
    to right,
    #25aae1,
    #40e495,
    #30dd8a,
    #2bb673
  );
  box-shadow: 0 4px 15px 0 rgba(49, 196, 190, 0.75);
}
</style>