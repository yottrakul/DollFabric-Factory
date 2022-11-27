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
        v-if="roleAccess.owner"
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
      :filter-options="filterOptions"
    >
      <template #loading>
        <img
          src="../assets/bongocat-funny.gif"
          style="width: 80px; height: 50px"
        />
      </template>
      <!-- headerzone -->
      <template #header-nameSupplier="header">
        <div class="filter-column relative flex place-items-center gap-2">
        <span @click.stop="showNameSupplierFilter = !showNameSupplierFilter" class="material-symbols-outlined cursor-default hover:text-gray-300">search</span>
        {{ header.text }}
        <div class="flex gap-4 place-items-center filter-menu absolute top-10 left-0 px-4 py-2 bg-white border-2 shadow-xl rounded-lg" v-if="showNameSupplierFilter">
          <span class="material-symbols-outlined text-4xl">search</span><input class="border-2 font-normal p-2 text-2xl" placeholder="กรอกชื่อคู่ค้า..." v-model="nameSupplierCriteria"/>
          <span @click.stop="resetShow" class="material-symbols-outlined text-red-600 transition-all hover:scale-150 hover:-translate-y-1 cursor-pointer">close</span>
        </div>
      </div>
      </template>
      <template #header-subDistrict="header">
        <div class="filter-column relative flex place-items-center gap-2">
        <span @click.stop="showSubDistrictFilter = !showSubDistrictFilter" class="material-symbols-outlined cursor-default hover:text-gray-300">filter_list</span>
        {{ header.text }}
        <div class="flex gap-4 place-items-center filter-menu absolute top-10 -left-40 px-4 py-2 bg-white border-2 shadow-xl rounded-lg" v-if="showSubDistrictFilter">
          <span class="material-symbols-outlined text-4xl">alternate_email</span><select class="border-2 font-normal p-2 text-2xl w-56" v-model="subDistrictCriteria">
            <option value="all">ทั้งหมด</option>
            <option v-for="subDistrict in subDistrictList" :key="subDistrict">{{subDistrict}}</option>
          </select>
          <span @click.stop="resetShow" class="material-symbols-outlined text-red-600 transition-all hover:scale-150 hover:-translate-y-1 cursor-pointer">close</span>
        </div>
      </div>
      </template>
      <template #header-district="header">
        <div class="filter-column relative flex place-items-center gap-2">
        <span @click.stop="showDistrictFilter = !showDistrictFilter" class="material-symbols-outlined cursor-default hover:text-gray-300">filter_list</span>
        {{ header.text }}
        <div class="flex gap-4 place-items-center filter-menu absolute top-10 -left-40 px-4 py-2 bg-white border-2 shadow-xl rounded-lg" v-if="showDistrictFilter">
          <span class="material-symbols-outlined text-4xl">alternate_email</span><select class="border-2 font-normal p-2 text-2xl w-56" v-model="districtCriteria">
            <option value="all">ทั้งหมด</option>
            <option v-for="district in districtList" :key="district">{{district}}</option>
          </select>
          <span @click.stop="resetShow" class="material-symbols-outlined text-red-600 transition-all hover:scale-150 hover:-translate-y-1 cursor-pointer">close</span>
        </div>
      </div>
      </template>
      <template #header-province="header">
        <div class="filter-column relative flex place-items-center gap-2">
        <span @click.stop="showProvinceFilter = !showProvinceFilter" class="material-symbols-outlined cursor-default hover:text-gray-300">filter_list</span>
        {{ header.text }}
        <div class="flex gap-4 place-items-center filter-menu absolute top-10 -left-40 px-4 py-2 bg-white border-2 shadow-xl rounded-lg" v-if="showProvinceFilter">
          <span class="material-symbols-outlined text-4xl">alternate_email</span><select class="border-2 font-normal p-2 text-2xl w-56" v-model="provinceCriteria">
            <option value="all">ทั้งหมด</option>
            <option v-for="province in provinceList" :key="province">{{province}}</option>
          </select>
          <span @click.stop="resetShow" class="material-symbols-outlined text-red-600 transition-all hover:scale-150 hover:-translate-y-1 cursor-pointer">close</span>
        </div>
      </div>
      </template>
      <!-- headerzone -->
      <template #item-nameSupplier="{ img, nameSupplier }">
        <div class="supplier-wrapper">
          <img class="supplier" :src="img" alt="" />
          <div>{{ nameSupplier }}</div>
        </div>
      </template>
      <template v-if="roleAccess.owner" #item-operation="item">
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
import { computed } from '@vue/runtime-core';
import getRole from '../composibles/getRole'

export default {
  components: {
    AddSuplier, DeleteBtn, EditSuplier
  },
  setup() {
    const nameSupplierCriteria = ref("");
    const showNameSupplierFilter = ref(false);
    const subDistrictCriteria = ref("all");
    const showSubDistrictFilter = ref(false);
    const districtCriteria = ref("all");
    const showDistrictFilter = ref(false);
    const provinceCriteria = ref("all");
    const showProvinceFilter = ref(false);
    const zipcodeCriteria = ref("");
    const showZipcodeFilter = ref(false);
    //ประกาศและเรียกใช้ getSupliers
    const { supliers, error, loadSupliers } = getSupliers();
    loadSupliers();

    // เช็ค DAC
    const { getUserRole, roleAccess } = getRole();
    getUserRole();


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

    const resetShow = () => {
      showZipcodeFilter.value = false;
      showProvinceFilter.value = false;
      showDistrictFilter.value = false;
      showSubDistrictFilter.value = false;
      showNameSupplierFilter.value = false;
    }

    //Query Data
    const subDistrictList = computed(() => {
      let listArray = [];
      let listSet = new Set();
      if(supliers.value.length !== 0) {
        supliers.value.forEach(supplier => {
          listSet.add(supplier.subDistrict);
        })
        listArray = Array.from(listSet);
      }
      return listArray;
    })
    const districtList = computed(() => {
      let listArray = [];
      let listSet = new Set();
      if(supliers.value.length !== 0) {
        supliers.value.forEach(supplier => {
          listSet.add(supplier.district);
        })
        listArray = Array.from(listSet);
      }
      return listArray;
    })
    const provinceList = computed(() => {
      let listArray = [];
      let listSet = new Set();
      if(supliers.value.length !== 0) {
        supliers.value.forEach(supplier => {
          listSet.add(supplier.province);
        })
        listArray = Array.from(listSet);
      }
      return listArray;
    })
    const filterOptions = computed(() => {
      const filterOptionsArray = [];
      if (subDistrictCriteria.value !== 'all') {
        filterOptionsArray.push({
          field: 'subDistrict',
          comparison: '=',
          criteria: subDistrictCriteria.value,
        });
      }
      if (districtCriteria.value !== 'all') {
        filterOptionsArray.push({
          field: 'district',
          comparison: '=',
          criteria: districtCriteria.value,
        });
      }
      if (provinceCriteria.value !== 'all') {
        filterOptionsArray.push({
          field: 'province',
          comparison: '=',
          criteria: provinceCriteria.value,
        });
      }
      filterOptionsArray.push({
        field: 'nameSupplier',
        criteria: nameSupplierCriteria.value,
        comparison: (value, criteria) => (value != null && criteria != null &&
          typeof value === 'string' && value.includes(`${criteria}`)),
      });

      return filterOptionsArray;
    })

    return { headers, supliers, error, isAdd, handleAddSuplier, handleDelete, isEdit, handleEdit, itemEdit, editData, resetShow, nameSupplierCriteria, showNameSupplierFilter, subDistrictCriteria, showSubDistrictFilter, districtCriteria, showDistrictFilter, showZipcodeFilter, zipcodeCriteria, showProvinceFilter, provinceCriteria, provinceList, districtList, subDistrictList, filterOptions,roleAccess };
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