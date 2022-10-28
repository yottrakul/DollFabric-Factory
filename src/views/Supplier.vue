<template>
  <div class="main">
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
import { ref } from '@vue/reactivity';
import getSupliers from '../composibles/getSuppliers'

export default {
  setup() {
    //ประกาศและเรียกใช้ getSupliers
    const {supliers,error,loadSupliers} = getSupliers();
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

    return { headers, supliers, error }
  }
}
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