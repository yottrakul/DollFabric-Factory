<template>
  <div class="overlay">


    <div @click.self="closeOverlay" class="grid place-items-center h-screen">
      <div class="container w-2/4 bg-slate-100 rounded-md p-10 min-w-fit">
        <form autocomplete="off" @submit.prevent="addDoll">
          <!-- โซนอัปโหลดรูป -->
          <div class="flex gap-5">
            <label class="cursor-pointer" for="doll_avatar"
              ><img
                class="w-16 h-16 rounded-full bg-slate-300 hover:opacity-70"
                :src="imgSrc"
                alt="Rounded avatar"
                for="doll_avatar"
            /></label>
            <div class="relative z-0 mb-6 w-full group flex-1 pt-3">
              <input
                v-model="nameDoll"
                type="text"
                name="doll_name"
                id="doll_name"
                class="
                  block
                  py-2.5
                  px-0
                  w-full
                  text-lg text-gray-900
                  font-medium
                  bg-transparent
                  border-0 border-b-2 border-gray-300
                  appearance-none
                  dark:text-white
                  dark:border-gray-600
                  dark:focus:border-blue-500
                  focus:outline-none focus:ring-0 focus:border-blue-600
                  peer
                "
                placeholder=" "
                required
              />
              <label
                for="doll_name"
                class="
                  peer-focus:font-medium
                  absolute
                  text-lg text-gray-500
                  dark:text-gray-400
                  duration-300
                  transform
                  -translate-y-6
                  scale-75
                  top-5
                  -z-10
                  origin-[0]
                  peer-focus:left-0
                  peer-focus:text-blue-600
                  peer-focus:dark:text-blue-500
                  peer-placeholder-shown:scale-100
                  peer-placeholder-shown:translate-y-0
                  peer-focus:scale-75 peer-focus:-translate-y-6
                "
                >ชื่อตุ๊กตา</label
              >
            </div>
          </div>

          <label
            class="
              block
              mb-2
              text-xl
              font-medium
              text-gray-900
              dark:text-gray-300
            "
            >อัปโหลดรูปตุ๊กตา</label
          >
          <input
            accept="image/*"
            @change="onFileSelected"
            class="
              block
              w-full
              text-sm text-gray-900
              bg-gray-50
              rounded-lg
              border border-gray-300
              cursor-pointer
              dark:text-gray-400
              focus:outline-none
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
            "
            aria-describedby="img_help"
            id="doll_avatar"
            type="file"
          />
          <div
            class="mt-1 text-sm text-gray-500 dark:text-gray-300 mb-5"
            id="img_help"
          >
            กรุณาเพิ่มรูปภาพของตุ๊กตาเพื่อประโยชน์ในการเรียกดูข้อมูล ( .jpg
            .png)
          </div>
          <!-- ส่วน Input Fabric -->
          <div class="relative flex">
            <button
              @click="dropDownStock = !dropDownStock"
              id="dropdownUsersButton"
              data-dropdown-toggle="dropdownUsers"
              data-dropdown-placement="bottom"
              class="
                text-white
                bg-blue-700
                hover:bg-blue-800
                focus:ring-4 focus:outline-none focus:ring-blue-300
                font-medium
                rounded-l-lg
                text-sm
                px-4
                py-2.5
                text-center
                inline-flex
                items-center
                dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
              "
              type="button"
            >
              <span v-if="!fabricSelect">เลือกชิ้นส่วนผ้า</span
              ><span v-else>{{ fabricSelect }}</span>
              <svg
                class="ml-2 w-4 h-4"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
            <input
              v-model="fabricUse"
              class="
                bg-gray-50
                border border-gray-300
                text-gray-900 text-sm
                focus:ring-blue-500 focus:border-blue-500
                w-auto
                flex-1
                pl-5
              "
              placeholder=". . . จำนวนผ้าที่ใช้"
              type="number"
              min="0"
            />
            <div
              @click="fabricAdd"
              class="
                bg-green-500
                grid
                place-items-center
                rounded-r-lg
                w-14
                cursor-pointer
                hover:bg-green-600
              "
            >
              <span class="material-symbols-outlined text-white"> add </span>
            </div>
            <!-- Dropdown menu -->
            <div
              v-if="dropDownStock"
              id="dropdownUsers"
              class="
                absolute
                top-12
                z-50
                w-60
                bg-white
                rounded
                shadow
                dark:bg-gray-700
              "
              data-popper-reference-hidden=""
              data-popper-escaped=""
              data-popper-placement="bottom"
            >
              <ul
                class="
                  scollHide
                  overflow-y-auto
                  py-1
                  h-48
                  text-gray-700
                  dark:text-gray-200
                "
                aria-labelledby="dropdownUsersButton"
              >
                <li
                  @click="
                    fabricSelect = stock.id;
                    dropDownStock = false;
                  "
                  v-for="stock in stocks"
                  :key="stock.id"
                >
                  <a
                    href="#"
                    class="
                      flex
                      items-center
                      py-2
                      px-4
                      hover:bg-gray-100
                      dark:hover:bg-gray-600 dark:hover:text-white
                    "
                  >
                    <img
                      class="mr-2 w-6 h-6 rounded-full"
                      :src="stock.imageFabric"
                      alt=""
                    />
                    {{ stock.color }}
                  </a>
                </li>
              </ul>
              <router-link
                :to="{ name: 'Stock' }"
                class="
                  flex
                  items-center
                  p-3
                  text-sm
                  font-medium
                  text-blue-600
                  bg-gray-50
                  border-t border-gray-200
                  dark:border-gray-600
                  hover:bg-gray-100
                  dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-blue-500
                  hover:underline
                "
              >
                <span class="material-symbols-outlined"> assignment_add </span>
                เพิ่มผ้า
              </router-link>
            </div>
          </div>

          <div class="h-52 mt-6 grid grid-cols-2 gap-4">
            <div class="max-w-lg overflow-y-auto">
              <div v-if="fabricSelected.length === 0" class="w-full h-full grid place-items-center">
                <div class="flex flex-col items-center">
                  <svg
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    width="80.035px"
                    height="80.035px"
                    viewBox="0 0 462.035 462.035"
                    style="enable-background: new 0 0 462.035 462.035"
                    xml:space="preserve"
                  >
                    <path
                      d="M457.83,158.441c-0.021-0.028-0.033-0.058-0.057-0.087l-50.184-62.48c-0.564-0.701-1.201-1.305-1.879-1.845
		c-2.16-2.562-5.355-4.225-8.967-4.225H65.292c-3.615,0-6.804,1.661-8.965,4.225c-0.678,0.54-1.316,1.138-1.885,1.845l-50.178,62.48
		c-0.023,0.029-0.034,0.059-0.057,0.087C1.655,160.602,0,163.787,0,167.39v193.07c0,6.5,5.27,11.771,11.77,11.771h438.496
		c6.5,0,11.77-5.271,11.77-11.771V167.39C462.037,163.787,460.381,160.602,457.83,158.441z M408.516,134.615l16.873,21.005h-16.873
		V134.615z M384.975,113.345v42.274H296.84c-2.514,0-4.955,0.805-6.979,2.293l-58.837,43.299l-58.849-43.305
		c-2.023-1.482-4.466-2.287-6.978-2.287H77.061v-42.274H384.975z M53.523,155.62H36.65l16.873-21.005V155.62z M438.498,348.69H23.54
		V179.16h137.796l62.711,46.148c4.15,3.046,9.805,3.052,13.954-0.005l62.698-46.144h137.799V348.69L438.498,348.69z"
                    />
                  </svg>
                  <span>ว่างเปล่า</span>
                </div>
              </div>

              <Item
                v-for="fabric in fabricSelected"
                :key="fabric.id"
                :name="fabric.name"
                :amount="fabric.quantity"
                :idStock="fabric.id"
              />
            </div>
            <div class="grid grid-rows-2 gap-4">
              <button
                v-if="!isLoad"
                @click="addDoll"
                type="submit"
                class="
                  focus:outline-none
                  text-white
                  bg-green-700
                  hover:bg-green-800
                  focus:ring-4 focus:ring-green-300
                  font-medium
                  rounded-lg
                  text-lg
                  px-5
                  py-2.5
                "
              >
                สร้างแบบ
              </button>
              <button
                v-else
                disabled
                type="button"
                class="
                  focus:outline-none
                  text-white
                  bg-green-700
                  font-medium
                  rounded-lg
                  text-lg
                  px-5
                  py-2.5
                "
              >
                <svg
                  aria-hidden="true"
                  role="status"
                  class="inline mr-3 w-4 h-4 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  /></svg
                >รอสักครู่ ...
              </button>
              <button
                @click="closeOverlay"
                type="button"
                class="
                  focus:outline-none
                  text-white
                  bg-red-700
                  hover:bg-red-800
                  focus:ring-4 focus:ring-green-300
                  font-medium
                  rounded-lg
                  text-lg
                  px-5
                  py-2.5
                "
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import imgDoll from "../composibles/uploadImg";
import Item from "../components/Pill.vue";
import { notify } from "@kyvg/vue3-notification";
import uploadImg from "../composibles/uploadImg";
import {
  projectAdd,
  projectAddInside,
  projectUpdate,
} from "@/composibles/projectManage";
import { projectFirestore } from "@/firebase/config";
export default {
  components: {
    Item,
  },
  props: ["stocks"],
  setup(props, context) {
    // imgSrc
    const imgSrc = ref(require("@/assets/doll.png"));
    const dropDownStock = ref(false);
    const fabricSelected = ref([]);
    const nameDoll = ref(null);
    const fabricUse = ref(null);
    const fabricSelect = ref("");
    const errorState = ref(null);
    const isLoad = ref(false);
    let { fr, upload, onFileSelected, refSelect } = imgDoll();
    fr.onload = () => {
      imgSrc.value = fr.result;
    };

    // closeOverlay
    const closeOverlay = () => {
      context.emit("close");
    };

    const fabricAdd = () => {
      try {
        const name = props.stocks.find((stock) => {
          return stock.id === fabricSelect.value;
        });
        if(!name) {
          throw new Error('ไม่สามารถเพิ่มรายการได้: ไม่ได้เลือกผ้าไว้')
        }
        let fabricData = {
          id: fabricSelect.value,
          quantity: fabricUse.value,
          name: name.color,
        };
        if(fabricData.quantity <= 0 || fabricData.quantity === null) {
          throw new Error('กรุณากรอกจำนวนผ้าให้ถูกต้อง!')
        }
        const isHave = fabricSelected.value.find((fabric) => {
          return fabric.id === fabricData.id;
        });
        if (!isHave) {
          fabricSelected.value.push(fabricData);
        } else {
          fabricSelected.value.forEach((fabric) => {
            if (fabric.id === fabricData.id) {
              fabric.quantity += fabricData.quantity;
            }
          });
        }

        fabricSelect.value = "";
        fabricUse.value = null;
      } catch (error) {
        errorState.value = error.message;
        notify({
          title: "ข้อผิดพลาด ⚠️",
          text: error.message,
          type: "error",
        });
      }
    };

    // addDoll สร้างแบบ
    const addDoll = async () => {
      try {
        let fabricsPayload = [];
        const updateInside = async () => {
          fabricsPayload.forEach(async (fabric) => {
            await projectAddInside("Doll", res.id, "Fabrics", fabric);
          });
        };
        isLoad.value = true;
        if(!nameDoll.value) {
          isLoad.value = false;
          throw new Error('โปรดระบุชื่อตุ๊กตา!');
        }

        if(fabricSelected.value.length === 0) {
          isLoad.value = false
          throw new Error('โปรดเพิ่มชิ้นส่วนตุ๊กตา')
        } 

        let dollPayload = {
          imgDoll: "",
          name: nameDoll.value,
        };

        const res = await projectAdd("Doll", dollPayload);
        

        if (refSelect.value) {
          const url = await upload("dolls", res.id);
          await projectUpdate("Doll", res.id, { imgDoll: url });
          dollPayload.imgDoll = url;
        }

        // Emit Event
        if(dollPayload.imgDoll === "") {
          dollPayload.imgDoll = require('@/assets/doll.png');
        }
        context.emit('renderDoll', { ...dollPayload, id: res.id });

        fabricSelected.value.forEach((fabric) => {
          let fabricPayload = {
            Fabric: projectFirestore.doc(`Stock/${fabric.id}`),
            Quantity: fabric.quantity,
          };
          fabricsPayload.push(fabricPayload);
        });

        await updateInside();
        isLoad.value = false;
        closeOverlay();
      } catch (error) {
        notify({
          title: "ข้อผิดพลาด⚠️",
          type: "error",
          text: error.message,
        });
        console.log(error.message);
      }
    };

    return {
      closeOverlay,
      addDoll,
      imgSrc,
      nameDoll,
      onFileSelected,
      dropDownStock,
      fabricSelected,
      fabricAdd,
      fabricUse,
      fabricSelect,
      errorState,
      isLoad,
      refSelect,
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
</style>