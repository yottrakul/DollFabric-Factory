<template>
  <div @click.self="closeOverlay" class="overlay">
    <div class="container">
      <p v-if="error">{{ error }}</p>
      <div class="table">
        <h1 class="text-3xl">
          <NameDollRef
            :collectionName="'Doll'"
            :docId="idDoll"
            :isImg="false"
            :objKey="'name'"
          />
          <span v-if="fabricInDoll.length !== 0" class="text-lg">
            ({{ idDoll }})</span
          >
        </h1>
        <EasyDataTable
          buttons-pagination
          :headers="headers"
          :items="fabricInDoll"
          :loading="fabricInDoll.length === 0"
        >
          <template #loading>
            <img
              src="../assets/bongocat-funny.gif"
              style="width: 80px; height: 50px"
            />
          </template>
          <template #item-imageFabric="{ imageFabric }">
            <div class="fabric_wrapper">
              <img class="fabric" :src="imageFabric" alt="" />
            </div>
          </template>
          <template #item-factory="{ factory }">
            <FactoryName :path="factory" :objKey="'Name'" />
          </template>
        </EasyDataTable>
      </div>
      <span @click="closeOverlay" class="material-symbols-outlined close">
        close
      </span>
    </div>
  </div>
</template>

<script>
import getDollDetails from "../composibles/getDollDetails";
import { ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import FactoryName from "../components/FkRef.vue";
import NameDollRef from "../components/FkCollRef.vue";
export default {
  props: ["idDoll", "stocks"],
  components: {
    FactoryName,
    NameDollRef,
  },
  setup(props, context) {
    // // New Stocks
    // const newStock = props.stocks;

    //ประกาศและเรียกใช้ getDollsDetails
    const { dollDetails, error, loadDetails } = getDollDetails();
    loadDetails(props.idDoll);

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
      { text: "รูปภาพ", value: "imageFabric" },
      { text: "ID_Fabric", value: "id" },
      { text: "สีผ้า", value: "color" },
      { text: "ลักษณะผ้า", value: "type" },
      { text: "ผ้าในสต็อก (Y)", value: "length", sortable: true },
      { text: "โรงงาน", value: "factory" },
      { text: "จำนวนผ้าที่ใช้ (Y)", value: "Quantity" },
    ]);

    // CloseOverlay
    const closeOverlay = () => {
      context.emit("close");
    };

    // Computed Method
    // กรอง id Fabric ที่อยู่ในตุ๊กตาให้ตรงกับค่าที่อยู่ใน Stock
    const fabricInDoll = computed(() => {
      let result = [];
      dollDetails.value.forEach((doll) => {
        result.push(
          ...props.stocks.filter((stock) => {
            return stock.id === doll.Fabric;
          })
        );

        // จำนวนผ้าที่ใช้ในตุ๊กตานำไปเปลี่ยนค่า
        result.forEach((fabric) => {
          dollDetails.value.forEach((doll) => {
            if (doll.Fabric === fabric.id) {
              fabric.Quantity = doll.Quantity;
            }
          });
        });
      });
      return result;
    });

    return {
      dollDetails,
      error,
      imgSrc,
      showOverlay,
      showImage,
      headers,
      closeOverlay,
      fabricInDoll,
    };
  },
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
  margin: 3rem auto;
  width: 100%;
  overflow: auto;
  border-radius: 10px;
  background-color: #fff;
}

.close {
  cursor: pointer;
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 2.5rem;
  color: #2b2b2b;
  z-index: 10;
}

.close:hover {
  color: #ff0000;
  transition: 0.25s;
}

.table {
  width: 87rem;
  margin: 1rem auto;
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

/* .fabric {
  cursor: pointer;
} */

.fabric:hover {
  opacity: 0.7;
  transition: 0.25s;
}
</style>