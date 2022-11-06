<template>
  <transition
    enter-from-class="transition opacity-0"
    enter-to-class="opacity-100 translate-y-0"
    enter-active-class="duration-150 ease-out"
    leave-active-class="duration-150 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="transform opacity-0"
  >
    <AddSuplier
      v-if="isAdd"
      @close="isAdd = !isAdd"
      @finished="handleAddSuplier"
    />
  </transition>
  <div class="main">
    <div class="text-end">
      <button
        @click="isAdd = !isAdd"
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
      show-index
      buttons-pagination
      :headers="headers"
      :items="supliers"
      :loading="supliers.length === 0"
    >
      <template #loading>
        <img
          src="../assets/bongocat-funny.gif"
          style="width: 80px; height: 50px"
        />
      </template>
      <template #item-nameSupplier="{ img, nameSupplier }">
        <div class="supplier-wrapper">
          <img class="supplier" :src="img" alt="" />
          <div>{{ nameSupplier }}</div>
        </div>
      </template>
    </EasyDataTable>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import getSupliers from "../composibles/getSuppliers";
import AddSuplier from "../components/AddSuplier.vue";

export default {
  components: {
    AddSuplier,
  },
  setup() {
    //ประกาศและเรียกใช้ getSupliers
    const { supliers, error, loadSupliers } = getSupliers();
    loadSupliers();


    const headers = ref([
      { text: "ชื่อคู่ค้า", value: "nameSupplier" },
      { text: "ID_Suplier", value: "id" },
      { text: "ที่อยู่", value: "address" },
      { text: "ตำบล/แขวง", value: "subDistrict" },
      { text: "อำเภอ/เขต", value: "district" },
      { text: "จังหวัด", value: "province" },
      { text: "รหัสไปรษณีย์", value: "zipcode" },
      { text: "เบอร์โทรศัพท์", value: "phoneNum" },
    ]);

    // isAdd
    const isAdd = ref(false);

    // handleAddSuplier
    const handleAddSuplier = (item) => {
      // รับค่ามาจาก props
      // ถ้า img เป็น "" ให้เอาภาพ Default
      if(item.img === "") {
        item.img = require('@/assets/User-Profile.png');
      }

      // push เข้า supliers
      supliers.value.push(item);
    }

    // const items = ref([]);

    // items.value = [
    //   {
    //     img: "https://i.insider.com/624ca2abf5c9cc00184f0c63?width=600&format=jpeg&auto=webp",
    //     id: "xczioxcjiojdd",
    //     nameSupplier: "ป้ากาญ",
    //     address: "100/190 ซอยคู้บอน",
    //     subDistrict: "บางชัน",
    //     district: "คลองสามวา",
    //     province: "กรุงเทพมหานคร",
    //     zipcode: 10510,
    //     phoneNum: "0988939093"
    //   },
    //   {
    //     img: "https://i.insider.com/624ca2abf5c9cc00184f0c63?width=600&format=jpeg&auto=webp",
    //     id: "xczioxcjiojdd",
    //     nameSupplier: "ป้ากาญ",
    //     address: "100/190 ซอยคู้บอน",
    //     subDistrict: "บางชัน",
    //     district: "คลองสามวา",
    //     province: "กรุงเทพมหานคร",
    //     zipcode: 10510,
    //     phoneNum: "0988939093"
    //   },
    //   {
    //     img: "https://i.insider.com/624ca2abf5c9cc00184f0c63?width=600&format=jpeg&auto=webp",
    //     id: "xczioxcjiojdd",
    //     nameSupplier: "ป้ากาญ",
    //     address: "100/190 ซอยคู้บอน",
    //     subDistrict: "บางชัน",
    //     district: "คลองสามวา",
    //     province: "กรุงเทพมหานคร",
    //     zipcode: 10510,
    //     phoneNum: "0988939093"
    //   },
    // ]

    return { headers, supliers, error, isAdd, handleAddSuplier };
  },
};
</script>

<style scoped>
.main {
  margin: 50px auto;
  width: 80%;
}
.supplier-wrapper {
  padding: 5px;
  display: flex;
  align-items: center;
  justify-items: center;
}
.supplier {
  margin-right: 10px;
  display: inline-block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 10%);
}
</style>