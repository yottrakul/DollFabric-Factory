<template>
  <Overlay
    :imgSrc="imgSrc"
    v-if="showOverlay"
    @close="showOverlay = !showOverlay"
  />
  <div class="main">
    <div v-if="error" class="error">{{ error }}</div>
    <div class="text-end">
      <button
      type="button"
      class="
        text-white
        bg-green-600
        hover:bg-green-700
        focus:ring-4 focus:outline-none focus:ring-blue-300
        font-medium
        rounded-lg
        text-sm
        px-3
        py-2
        text-center
        inline-flex
        items-center
        mb-3
      "
    >
      <span class="material-symbols-outlined"> add </span>
    </button>
    </div>
    
    <EasyDataTable
      buttons-pagination
      :headers="headers"
      :items="stocks"
      :loading="stocks.length === 0"
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
      <template #item-factory="{ factory }">
        <FactoryName :path="factory" :objKey="'Name'" />
      </template>
    </EasyDataTable>
  </div>

  <!-- DebugZone -->
  <!-- <div v-for="stock in stocks" :key="stock.id">
    <p>{{stock.id}}</p>
    <p>{{stock.color}}</p>
    <p>{{stock.type}}</p>
    <p>{{stock.factory}}</p>
    <hr/>
  </div> -->
</template>

<script>
import { ref } from "@vue/reactivity";
import Overlay from "../components/Overlay.vue";
import getStock from "../composibles/getStock";
import FactoryName from "../components/FkRef.vue";

export default {
  components: {
    Overlay,
    FactoryName,
  },
  setup() {
    // เก็บค่า Src ของ Img และ Overlay
    const imgSrc = ref("");
    const showOverlay = ref(false);

    // เรียกใช้ getStock
    const { stocks, error, loadStock } = getStock();
    loadStock();

    const headers = ref([
      { text: "รูปภาพ", value: "imageFabric" },
      { text: "ID_Fabric", value: "id" },
      { text: "สีผ้า", value: "color" },
      { text: "ลักษณะผ้า", value: "type" },
      { text: "ความยาวผ้า (Y)", value: "length", sortable: true },
      { text: "โรงงาน", value: "factory" },
    ]);

    // Add ค่า item
    // items.value = [
    //     {
    //       imageFabric:
    //         "https://ninefivewearing.com/wp-content/uploads/2020/07/%E0%B8%9C%E0%B9%89%E0%B8%B2%E0%B8%84%E0%B8%AD%E0%B8%95%E0%B8%95%E0%B8%AD%E0%B8%99-%E0%B8%AA%E0%B8%B5%E0%B8%9F%E0%B9%89%E0%B8%B2.jpg",
    //       id: "BjxE3sC0pUkdZClnOnFK",
    //       color: "ฟ้า",
    //       type: "Spandex",
    //       length: 170,
    //       factory: "บริษัท สุรศักดิ์ จำกัด",
    //     }
    //   ];

    // สร้างฟังก์ชัน showImage เพื่อเก็บค่า Src ของ Img
    const showImage = (item) => {
      imgSrc.value = item;
      showOverlay.value = !showOverlay.value;
    };

    return {
      headers,
      stocks,
      showOverlay,
      imgSrc,
      error,
      showImage,
    };
  },
};
</script>

<style scoped>
.main {
  margin: 50px auto;
  width: 80%;
}

.fabric {
  margin-right: 10px;
  display: inline-block;
  width: 100%;
  height: 5rem;
  object-fit: cover;
  object-position: 0px 70%;
  box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 10%);
}

.fabric {
  cursor: pointer;
}

.fabric:hover {
  opacity: 0.7;
  transition: 0.25s;
}
</style>