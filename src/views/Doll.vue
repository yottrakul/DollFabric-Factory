<template>
  <!-- <OverlayDetails/> -->
  <OverlayImg
    :imgSrc="imgSrc"
    v-if="showOverlay"
    @close="showOverlay = !showOverlay"
  />
  <div class="main">
    <div v-if="error" class="error">{{ error }}</div>
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
          <span @click="showDetails(item)" class="material-symbols-outlined operation-icon">
            inventory_2
          </span>
        </div>
      </template>
    </EasyDataTable>
  </div>

  <!-- นี่คือหน้าแสดง Patern ตุ๊กตา -->
  <p v-if="error">{{ error }}</p>
  <p>{{ dolls }}</p>
</template>

<script>
import Overlay from "../components/Overlay.vue";
import getDolls from "../composibles/getDolls";
import { ref } from "@vue/reactivity";
import OverlayDetails from "../components/OverlayDetails.vue";

export default {
  components: {
    Overlay, OverlayDetails
  },
  setup() {
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

    // แก้ไข Item
    const showDetails = (doll) => {
      console.log('showDetails');
      console.log(doll)
    }

    return { dolls, error, showImage, headers, showDetails, showOverlay, imgSrc };
  },
};
</script>

<style>
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
</style>