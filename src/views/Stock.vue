<template>
  <Overlay
    :imgSrc="imgSrc"
    v-if="showOverlay"
    @close="showOverlay = !showOverlay"
  />
  <transition
    enter-from-class="transition opacity-0"
    enter-to-class="opacity-100 translate-y-0"
    enter-active-class="duration-150 ease-out"
    leave-active-class="duration-150 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="transform opacity-0"
  >
    <AddStock v-if="isAdd" @close="isAdd = !isAdd" @finished="handleAddStock" />
  </transition>
  <div class="main">
    <div v-if="error" class="error">{{ error }}</div>
    <div class="text-end">
      <button
        v-if="roleAccess.owner"
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
      buttons-pagination
      :headers="headers"
      :items="stocks"
      :loading="stocks.length === 0"
      :filter-options="filterOptions"
    >
      <template #loading>
        <img
          src="../assets/bongocat-funny.gif"
          style="width: 80px; height: 50px"
        />
      </template>
      <!-- headerzone -->
      <template #header-color="header">
        <div class="filter-column relative flex place-items-center gap-2">
        <span @click.stop="showColorFilter = !showColorFilter" class="material-symbols-outlined cursor-default hover:text-gray-300">search</span>
        {{ header.text }}
        <div class="flex gap-4 place-items-center filter-menu absolute top-10 -left-40 px-4 py-2 bg-white border-2 shadow-xl rounded-lg" v-if="showColorFilter">
          <span class="material-symbols-outlined text-4xl">search</span><input class="border-2 font-normal p-2 text-2xl" placeholder="กรอกสีผ้าที่ต้องการ..." v-model="colorCriteria"/>
          <span @click.stop="resetShow" class="material-symbols-outlined text-red-600 transition-all hover:scale-150 hover:-translate-y-1 cursor-pointer">close</span>
        </div>
      </div>
      </template>
      <template #header-type="header">
        <div class="filter-column relative flex place-items-center gap-2">
        <span @click.stop="showTypeFilter = !showTypeFilter" class="material-symbols-outlined cursor-default hover:text-gray-300">filter_list</span>
        {{ header.text }}
        <div class="flex gap-4 place-items-center filter-menu absolute top-10 -left-40 px-4 py-2 bg-white border-2 shadow-xl rounded-lg" v-if="showTypeFilter">
          <span class="material-symbols-outlined text-4xl">gradient</span><select class="border-2 font-normal p-2 text-2xl w-56" v-model="typeCriteria">
            <option value="all">ทั้งหมด</option>
            <option v-for="type in typeList" :key="type" :value="type">{{type}}</option>
          </select>
          <span @click.stop="resetShow" class="material-symbols-outlined text-red-600 transition-all hover:scale-150 hover:-translate-y-1 cursor-pointer">close</span>
        </div>
      </div>
      </template>
      <template #header-length="header">
        <div class="filter-column relative flex place-items-center gap-2">
        <span @click.stop="showLengthFilter = !showLengthFilter" class="material-symbols-outlined cursor-default hover:text-gray-300">filter_list</span>
        {{ header.text }}
        <div class="w-[40rem] flex gap-4 place-items-center filter-menu absolute top-14 -right-20 px-4 py-2 bg-white border-2 shadow-xl rounded-lg" v-if="showLengthFilter">
          <span class="material-symbols-outlined text-4xl">straighten</span><Silder class="flex-1" :max="maxSlider" v-model="lengthCriteria"/><span>(หลา)</span>
          <span @click.stop="resetShow" class="material-symbols-outlined text-red-600 transition-all hover:scale-150 hover:-translate-y-1">close</span>
        </div>
      </div>
      </template>
      <template #header-factory="header">
        <div class="filter-column relative flex place-items-center gap-2">
        <span @click.stop="showFactoryFilter = !showFactoryFilter" class="material-symbols-outlined cursor-default hover:text-gray-300">filter_list</span>
        {{ header.text }}
        <div class="flex gap-4 place-items-center filter-menu absolute top-10 -left-40 px-4 py-2 bg-white border-2 shadow-xl rounded-lg" v-if="showFactoryFilter">
          <span class="material-symbols-outlined text-4xl">factory</span><select class="border-2 font-normal p-2 text-2xl w-56" v-model="factoryCriteria">
            <option value="all">ทั้งหมด</option>
            <option v-for="factory in factoryList" :key="factory" :value="factory">
              <FactoryName :path="factory" :objKey="'Name'" />
            </option>
          </select>
          <span @click.stop="resetShow" class="material-symbols-outlined text-red-600 transition-all hover:scale-150 hover:-translate-y-1 cursor-pointer">close</span>
        </div>
      </div>
      </template>
      <!-- headerzone -->
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
      <template v-if="roleAccess.owner" #item-operation="item">
        <div class="flex">
          <router-link :to="{name: 'EditStock', params: item}">
            <span
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
          </router-link>

          <DeleteBtn :item="item" @confirm="handleDelete" />
        </div>
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
import { reactive, ref } from "@vue/reactivity";
import Overlay from "../components/Overlay.vue";
import getStock from "../composibles/getStock";
import FactoryName from "../components/FkRef.vue";
import AddStock from "../components/AddStock.vue";
import DeleteBtn from "../components/DeleteButton.vue";
import { projectDelete } from "../composibles/projectManage";
import { removeItemArray } from "../composibles/rmInArray.js";
import { projectAuth, projectStorage } from "@/firebase/config";
import { computed, watchEffect } from '@vue/runtime-core';
import Silder from "@vueform/slider"
import "@vueform/slider/themes/default.css";
import getRole from '../composibles/getRole';

export default {
  components: {
    Overlay,
    FactoryName,
    AddStock,
    DeleteBtn,
    Silder
  },
  setup() {
    const showColorFilter = ref(false);
    const colorCriteria = ref("");
    const typeCriteria = ref("all");
    const showTypeFilter = ref(false);
    const lengthCriteria = ref([0,999999999]);
    const showLengthFilter = ref(false);
    const factoryCriteria = ref("all");
    const showFactoryFilter = ref(false);

    // Add Mode
    const isAdd = ref(false);

    // เก็บค่า Src ของ Img และ Overlay
    const imgSrc = ref("");
    const showOverlay = ref(false);

    // เรียกใช้ getStock
    const { stocks, error, loadStock } = getStock();
    loadStock();

    // เช็ค DAC
    const { getUserRole, roleAccess } = getRole();
    getUserRole();



    const headers = ref([
      { text: "รูปภาพ", value: "imageFabric" },
      { text: "ID_Fabric", value: "id" },
      { text: "สีผ้า", value: "color" },
      { text: "ลักษณะผ้า", value: "type" },
      { text: "ความยาวผ้า (Y)", value: "length", sortable: true },
      { text: "โรงงาน", value: "factory" },
      { text: "", value: "operation" },
    ]);

    // สร้างฟังก์ชัน showImage เพื่อเก็บค่า Src ของ Img
    const showImage = (item) => {
      imgSrc.value = item;
      showOverlay.value = !showOverlay.value;
    };

    // Handle AddStock
    const handleAddStock = (fabric) => {
      // console.log(fabric);
      stocks.value.push(fabric);
      isAdd.value = !isAdd.value;
    };

    //Handle Delete
    const handleDelete = async (id) => {
      // console.log(id)
      try {
        // ลบข้อมูลใน collection
        await projectDelete("Stock", id);
        // // TODO ถ้ามี imgRef
        // if()
        const storageRef = projectStorage.ref();
        const imgRef = storageRef.child(`images/${id}.jpg`);
        await imgRef.delete();
        // ลบข้อมูลใน Array
        stocks.value = removeItemArray(stocks.value, id);
      } catch (error) {
        switch (error.code) {
          case "storage/object-not-found":
            stocks.value = removeItemArray(stocks.value, id);
            break;
          default:
            console.log(error.code);
            break;
        }
      }
    };

    // Query Data
    const typeList = computed(() => {
      let typeListArray = [];
      let typeSet = new Set();
      if(stocks.value.length !== 0) {
        stocks.value.forEach(stock => {
          typeSet.add(stock.type);
        })
        typeListArray = Array.from(typeSet);
      }
      return typeListArray;
    })
    const factoryList = computed(() => {
      let factoryListArray = [];
      let factorySet = new Set();
      if(stocks.value.length !== 0) {
        stocks.value.forEach(stock => {
          factorySet.add(stock.factory);
        })
        factoryListArray = Array.from(factorySet);
      }
      return factoryListArray;
    })
    const maxSlider = computed(() => {
      let maxNum = 500;
      let minNum = 0;
      let numberArray = [];
      if(stocks.value.length !== 0) {
        stocks.value.forEach(stock => {
          numberArray.push(stock.length);
        })
        maxNum = Math.max(...numberArray);
        minNum = Math.min(...numberArray);
      }
      lengthCriteria.value = [minNum,maxNum];
      
      return maxNum
    })

    const filterOptions = computed(() => {
      const filterOptionsArray = [];
      if (typeCriteria.value !== 'all') {
        filterOptionsArray.push({
          field: 'type',
          comparison: '=',
          criteria: typeCriteria.value,
        });
      }
      if (factoryCriteria.value !== 'all') {
        filterOptionsArray.push({
          field: 'factory',
          comparison: '=',
          criteria: factoryCriteria.value,
        });
      }
      if(stocks.value.length !== 0) {
        filterOptionsArray.push({
        field: 'length',
        comparison: 'between',
        criteria: lengthCriteria.value,
      });
      }
      filterOptionsArray.push({
        field: 'color',
        criteria: colorCriteria.value,
        comparison: (value, criteria) => (value != null && criteria != null &&
          typeof value === 'string' && value.includes(`${criteria}`)),
      });

      
      return filterOptionsArray;
    })

    const resetShow = () => {
      showColorFilter.value = false;
      showTypeFilter.value = false;
      showLengthFilter.value = false;
      showFactoryFilter.value = false;
    }
    return {
      headers,
      stocks,
      showOverlay,
      imgSrc,
      error,
      showImage,
      isAdd,
      handleAddStock,
      handleDelete,
      colorCriteria,
      showColorFilter,
      typeCriteria,
      showTypeFilter,
      typeList,
      lengthCriteria,
      showLengthFilter,
      factoryList,
      showFactoryFilter,
      factoryCriteria,
      filterOptions,
      maxSlider,
      resetShow,
      roleAccess,
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