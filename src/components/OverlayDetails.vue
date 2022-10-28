<template>
  <div class="overlay">
    <div class="container">
      <!-- Easy Table -->
      <EasyDataTable
        buttons-pagination
        :headers="headers"
        :items="fabrics"
        :loading="fabrics.length === 0"
      >
        <template #loading>
          <img
            src="../assets/bongocat-funny.gif"
            style="width: 80px; height: 50px"
          />
        </template>
        <template #item-imageFabric="{ imageFabric }">
          <div class="fabric_wrapper">
            <img
              @click="showImage(imageFabric)"
              class="fabric"
              :src="imageFabric"
              alt=""
            />
          </div>
        </template>
        <!-- <template #item-factory="{ factory }">
          <FactoryName :path="factory" :objKey="'Name'" />
        </template> -->
      </EasyDataTable>
      <span @click="closeOverlay" class="material-symbols-outlined">
        close
      </span>
    </div>
  </div>
</template>

<script>
import getDollDetails from '../composibles/getDollDetails'
import FabricImgRef from '../components/FkRef.vue'
import FabricNameRef from '../components/FkRef.vue'
import { ref } from '@vue/reactivity';
export default {
  components: {
    FabricImgRef, FabricNameRef
  },
  setup() {

    //ประกาศและเรียกใช้ getDollsDetails
    const { dollDetails, error, loadDetails } = getDollDetails();
    loadDetails();

    // เก็บค่า Src ของ Img และ Overlay boolean
    const imgSrc = ref("");
    const showOverlay = ref(false);

    // สร้างฟังก์ชัน showImage เพื่อเก็บค่า Src ของ Img
    const showImage = (item) => {
      imgSrc.value = item;
      showOverlay.value = !showOverlay.value;
    };

    // Header ตาราง & Item ในตาราง
    const headers = ref([
      { text: "รูปภาพ", value: "imgDoll" },
      { text: "ID_Doll", value: "id" },
      { text: "ชื่อตุ๊กตา", value: "name" },
      { text: "รายละเอียด", value: "operation" },
    ]);


    return { dollDetails, error, imgSrc, showOverlay, showImage, headers}
  }
};
</script>

<style scoped>
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

.container {
  position: relative;
  margin: 5rem auto;
  width: 100%;
  height: 80%;
  border-radius: 10px;
  overflow: hidden;
  background-color: #fff;
}

span {
  cursor: pointer;
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 2.5rem;
  color: #2b2b2b;
}

span:hover {
  color: #ff0000;
  transition: 0.25s;
}
</style>