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
  <transition
    enter-from-class="transition opacity-0"
    enter-to-class="opacity-100 translate-y-0"
    enter-active-class="duration-150 ease-out"
    leave-active-class="duration-150 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="transform opacity-0"
  >
    <EditSuplier
      v-if="isEdit"
      @close="isEdit = false; itemEdit = null;"
      @finished="handleEdit"
      :suplierProp="itemEdit"
    />
  </transition>
  <div class="main">
    <div class="text-end">
      <button
        @click="isAdd = true"
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
      <template #item-operation="item">
        <div class="flex gap-5">
          <span @click="editData(item)"
              class="
                material-symbols-outlined
                mr-3
                text-neutral-500
                cursor-pointer
                hover:bg-green-400
                rounded-full
                p-2
                transition
                ease-in-out
                delay-150
                hover:-translate-y-1 hover:scale-110
              "
            >
              edit
            </span>
          <DeleteBtn :item="item" @confirm="handleDelete" />
        </div>
      </template>
    </EasyDataTable>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import getSupliers from "../composibles/getSuppliers";
import AddSuplier from "../components/AddSuplier.vue";
import DeleteBtn from "../components/DeleteButton.vue"
import { removeItemArray } from '@/composibles/rmInArray';
import { projectDelete } from '@/composibles/projectManage';
import { projectStorage } from '@/firebase/config';
import EditSuplier from '../components/EditSuplier.vue'

export default {
  components: {
    AddSuplier, DeleteBtn, EditSuplier
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
      { text: "", value: "operation" },
    ]);

    // isAdd isEdit
    const isAdd = ref(false);
    const isEdit = ref(false);

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

    // เมื่อลบ
    const handleDelete = async (id) => {
      // console.log(id)
      try {
        // ลบข้อมูลใน collection
        await projectDelete("Supplier", id);
        // // TODO ถ้ามี imgRef
        // if()
        const storageRef = projectStorage.ref();
        const imgRef = storageRef.child(`supImg/${id}.jpg`);
        await imgRef.delete();
        // ลบข้อมูลใน Array
        supliers.value = removeItemArray(supliers.value, id);
      } catch (error) {
        switch (error.code) {
          case "storage/object-not-found":
            supliers.value = removeItemArray(supliers.value, id);
            break;
          default:
            console.log(error.code);
            break;
        }
      }
    }

    // เมื่อแก้ไข
    const handleEdit = (item) => {
      // console.log(item);
      itemEdit.value = null;
      // เช็คว่า Img เป็น "" ไหม
      if(item.img === "") {
        item.img === require('@/assets/User-Profile.png');
      }

      // หา suplier ที่เหมือนกับ item
      const index = supliers.value.findIndex(suplier => {
        return suplier.id === item.id;
      })

      // console.log(index);
      // console.log(supliers.value[1]);
      // เปลี่ยนค่าใน suplier ที่ index นั้นเป็น item
      supliers.value[index] = item;
    }

    // ปุ่มแก้ไขในตาราง
    const itemEdit = ref(null);
    const editData = (item) => {
      isEdit.value = true;
      itemEdit.value = item;
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

    return { headers, supliers, error, isAdd, handleAddSuplier, handleDelete, isEdit, handleEdit, itemEdit, editData };
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