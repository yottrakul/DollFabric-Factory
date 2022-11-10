<template>
  <div class="overlay">
    <span
      @click="closeOverlay"
      class="
        material-symbols-outlined
        text-end text-white text-4xl
        absolute
        top-2
        right-2
        cursor-pointer
        hover:text-red-600
      "
    >
      close
    </span>
    <!-- อยู่ตรงกลางจอ -->
    <div @click.self="closeOverlay" class="grid place-items-center h-screen">
      <div class="container w-2/4 bg-slate-100 rounded-md p-10">
        <form autocomplete="off" @submit.prevent="addSuplier">
          <!-- โซนอัปโหลดรูป -->
          <div class="flex gap-5">
            <label class="cursor-pointer" for="suplier_avatar"
              ><img
                class="w-16 h-16 rounded-full bg-slate-300 hover:opacity-70"
                :src="imgSrc"
                alt="Rounded avatar"
                for="suplier_avatar"
            /></label>
            <div class="relative z-0 mb-6 w-full group flex-1 pt-3">
              <input
                v-model="nameSupplier"
                type="text"
                name="suplier_name"
                id="suplier_name"
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
                for="suplier_name"
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
                >ชื่อ Suplier</label
              >
            </div>
            <div class="relative z-0 mb-6 w-full group flex-1 pt-3">
              <input
                v-model="phoneNum"
                type="text"
                autocomplete="nope"
                pattern="[0-9]{10}"
                name="suplier_phone"
                id="suplier_phone"
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
                for="suplier_phone"
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
                >เบอร์โทรศัพท์ (0xxxxxxxxx)</label
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
            >อัปโหลดรูป Suplier</label
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
            id="suplier_avatar"
            type="file"
          />
          <div
            class="mt-1 text-sm text-gray-500 dark:text-gray-300 mb-5"
            id="img_help"
          >
            กรุณาเพิ่มรูปภาพของ Suplier เพื่อประโยชน์ในการเรียกดูข้อมูล ( .jpg
            .png)
          </div>
          <!-- โซนอัปโหลดรูป -->

          <!-- โซนใส่ที่อยู่ -->
          <div class="relative z-0 mb-6 w-full group">
            <input
              v-model="address"
              autocomplete="off"
              type="text"
              name="floating_address"
              id="floating_address"
              class="
                block
                py-2.5
                px-0
                w-full
                text-sm text-gray-900
                bg-transparent
                border-0 border-b-2 border-gray-300
                appearance-none
                dark:text-white dark:border-gray-600 dark:focus:border-blue-500
                focus:outline-none focus:ring-0 focus:border-blue-600
                peer
              "
              placeholder=" "
              required
            />
            <label
              for="floating_address"
              class="
                peer-focus:font-medium
                absolute
                text-sm text-gray-500
                dark:text-gray-400
                duration-300
                transform
                -translate-y-6
                scale-75
                top-3
                -z-10
                origin-[0]
                peer-focus:left-0
                peer-focus:text-blue-600
                peer-focus:dark:text-blue-500
                peer-placeholder-shown:scale-100
                peer-placeholder-shown:translate-y-0
                peer-focus:scale-75 peer-focus:-translate-y-6
              "
              >ที่อยู่</label
            >
          </div>
          <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-20 mb-6 w-full group">
              <input
                @click="useAutoComplete1 = true"
                autocomplete="off"
                v-model="district"
                type="text"
                name="floating_district"
                id="floating_district"
                class="
                  block
                  py-2.5
                  px-0
                  w-full
                  text-sm text-gray-900
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
              <div v-if="useAutoComplete1" class="drop-shadow-2xl scollHide rounded-lg absolute bg-white max-h-52 w-full overflow-y-auto">
                <ul>
                  <li class="cursor-pointer border-b-2 py-2 border-gray-500 hover:bg-slate-300" @click="addAddress" v-for="item in result_District" :key="item">
                    <!-- <span>{{item}}</span> -->
                    <span v-html="item"></span>
                    <!-- {{ item.district }} » {{ item.amphoe }} »
                    {{ item.province }} »
                    {{ item.zipcode }} -->
                  </li>
                </ul>
              </div>
              <label
                for="floating_district"
                class="
                  peer-focus:font-medium
                  absolute
                  text-sm text-gray-500
                  dark:text-gray-400
                  duration-300
                  transform
                  -translate-y-6
                  scale-75
                  top-3
                  -z-10
                  origin-[0]
                  peer-focus:left-0
                  peer-focus:text-blue-600
                  peer-focus:dark:text-blue-500
                  peer-placeholder-shown:scale-100
                  peer-placeholder-shown:translate-y-0
                  peer-focus:scale-75 peer-focus:-translate-y-6
                "
                >ตำบล / แขวง</label
              >
            </div>
            <div class="relative z-10 mb-6 w-full group">
              <input
                v-model="amphoe"
                @click="useAutoComplete2 = true"
                autocomplete="off"
                type="text"
                name="floating_amphoe"
                id="floating_amphoe"
                class="
                  block
                  py-2.5
                  px-0
                  w-full
                  text-sm text-gray-900
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
              <div v-if="useAutoComplete2" class="drop-shadow-2xl scollHide rounded-lg absolute bg-white max-h-52 w-full overflow-y-auto">
                <ul>
                  <li class="cursor-pointer border-b-2 py-2 border-gray-500 hover:bg-slate-300" @click="addAddress" v-for="item in result_Amphoe" :key="item">
                    <!-- <span>{{item}}</span> -->
                    <span v-html="item"></span>
                    <!-- {{ item.district }} » {{ item.amphoe }} »
                    {{ item.province }} »
                    {{ item.zipcode }} -->
                  </li>
                </ul>
              </div>
              <label
                for="floating_amphoe"
                class="
                  peer-focus:font-medium
                  absolute
                  text-sm text-gray-500
                  dark:text-gray-400
                  duration-300
                  transform
                  -translate-y-6
                  scale-75
                  top-3
                  -z-10
                  origin-[0]
                  peer-focus:left-0
                  peer-focus:text-blue-600
                  peer-focus:dark:text-blue-500
                  peer-placeholder-shown:scale-100
                  peer-placeholder-shown:translate-y-0
                  peer-focus:scale-75 peer-focus:-translate-y-6
                "
                >อำเภอ / เขต</label
              >
            </div>
          </div>
          <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-10 mb-6 w-full group">
              <input
                v-model="province"
                @click="useAutoComplete3 = true"
                autocomplete="off"
                type="text"
                name="floating_province"
                id="floating_province"
                class="
                  block
                  py-2.5
                  px-0
                  w-full
                  text-sm text-gray-900
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
              <div v-if="useAutoComplete3" class="drop-shadow-2xl scollHide rounded-lg absolute bg-white max-h-52 w-full overflow-y-auto">
                <ul>
                  <li class="cursor-pointer border-b-2 py-2 border-gray-500 hover:bg-slate-300" @click="addAddress" v-for="item in result_Province" :key="item">
                    <!-- <span>{{item}}</span> -->
                    <span v-html="item"></span>
                    <!-- {{ item.district }} » {{ item.amphoe }} »
                    {{ item.province }} »
                    {{ item.zipcode }} -->
                  </li>
                </ul>
              </div>
              <label
                for="floating_province"
                class="
                  peer-focus:font-medium
                  absolute
                  text-sm text-gray-500
                  dark:text-gray-400
                  duration-300
                  transform
                  -translate-y-6
                  scale-75
                  top-3
                  -z-10
                  origin-[0]
                  peer-focus:left-0
                  peer-focus:text-blue-600
                  peer-focus:dark:text-blue-500
                  peer-placeholder-shown:scale-100
                  peer-placeholder-shown:translate-y-0
                  peer-focus:scale-75 peer-focus:-translate-y-6
                "
                >จังหวัด</label
              >
            </div>
            <div class="relative z-0 mb-6 w-full group">
              <input
                v-model="zipcode"
                @click="useAutoComplete4 = true"
                autocomplete="off"
                type="text"
                pattern="[0-9]{5}"
                name="floating_zipcode"
                id="floating_zipcode"
                class="
                  block
                  py-2.5
                  px-0
                  w-full
                  text-sm text-gray-900
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
              <div v-if="useAutoComplete4" class="drop-shadow-2xl scollHide rounded-lg absolute bg-white max-h-52 w-full overflow-y-auto">
                <ul>
                  <li class="cursor-pointer border-b-2 py-2 border-gray-500 hover:bg-slate-300" @click="addAddress" v-for="item in result_Zipcode" :key="item">
                    <!-- <span>{{item}}</span> -->
                    <span v-html="item"></span>
                    <!-- {{ item.district }} » {{ item.amphoe }} »
                    {{ item.province }} »
                    {{ item.zipcode }} -->
                  </li>
                </ul>
              </div>
              <label
                for="floating_zipcode"
                class="
                  peer-focus:font-medium
                  absolute
                  text-sm text-gray-500
                  dark:text-gray-400
                  duration-300
                  transform
                  -translate-y-6
                  scale-75
                  top-3
                  -z-10
                  origin-[0]
                  peer-focus:left-0
                  peer-focus:text-blue-600
                  peer-focus:dark:text-blue-500
                  peer-placeholder-shown:scale-100
                  peer-placeholder-shown:translate-y-0
                  peer-focus:scale-75 peer-focus:-translate-y-6
                "
                >รหัสไปรษณีย์</label
              >
            </div>
          </div>
          <!-- โซนใส่ที่อยู่ -->
          <!-- โซนปุ่ม -->
          <div class="text-end">
            <button
              v-if="!isLoad"
              type="submit"
              class="
                text-white
                bg-green-500
                hover:bg-green-600
                focus:ring-4 focus:outline-none focus:ring-blue-300
                font-medium
                rounded-lg
                text-sm
                w-full
                sm:w-auto
                px-5
                py-2.5
                text-center
                dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
                mr-3
              "
            >
              บันทึก
            </button>
            <button
              v-if="isLoad"
              disabled
              type="button"
              class="
                text-white
                bg-green-500
                hover:bg-green-600
                focus:ring-4 focus:outline-none focus:ring-blue-300
                font-medium
                rounded-lg
                text-sm
                w-full
                sm:w-auto
                px-5
                py-2.5
                text-center
                dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
                mr-3
              "
            >
              <svg
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
                />
              </svg>
              รอสักครู่
            </button>
            <button
              @click="resetForm"
              type="reset"
              class="
                text-white
                bg-yellow-600
                hover:bg-yellow-700
                focus:ring-4 focus:outline-none focus:ring-blue-300
                font-medium
                rounded-lg
                text-sm
                w-full
                sm:w-auto
                px-5
                py-2.5
                text-center
                dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
              "
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { searchAddressByDistrict, searchAddressByAmphoe, searchAddressByProvince, searchAddressByZipcode } from "thai-address-database";
import { computed, ref } from "@vue/runtime-core";
import imgSuplier from "../composibles/uploadImg";
import { projectFirestore } from '@/firebase/config';
import { projectUpdate } from '@/composibles/projectManage';

export default {
  setup(props, context) {
    // ตัวแปรเก็บค่าใน Form
    const nameSupplier = ref("");
    const address = ref("");
    const amphoe = ref("");
    const phoneNum = ref("");
    const province = ref("");
    const district = ref("");
    const zipcode = ref("");

    // isLoad
    const isLoad = ref(false);

    // closeOverlay
    const closeOverlay = () => {
      context.emit("close");
    };

    // imgSrc
    const imgSrc = ref(require('@/assets/User-Profile.png'));


    // ค้นหาที่อยู่ พร้อมทำตัวหนาคำที่ค้นหา ชนิดการค้นหา แขวง
    const result_District = computed(() => {
      const result = searchAddressByDistrict(district.value);
      let words = [];
      // Check คำ
      const check = new RegExp(district.value, "ig");
      // Map ข้อความปกติ
      words = result.map(item => {
        return (`${item.district} » ${item.amphoe} » ${item.province} » ${item.zipcode}`);
      })
      // เอาข้อความปกติมา Map
      const hignResult = words.map((item) => {
        return item.replace(check, (matchedText, a, b) => {
           return ('<strong>' + matchedText + '</strong>');
        })
      })
      return hignResult;
    });

    const result_Amphoe = computed(() => {
      const result = searchAddressByAmphoe(amphoe.value);
      let words = [];
      // Check คำ
      const check = new RegExp(amphoe.value, "ig");
      // Map ข้อความปกติ
      words = result.map(item => {
        return (`${item.district} » ${item.amphoe} » ${item.province} » ${item.zipcode}`);
      })
      // เอาข้อความปกติมา Map
      const hignResult = words.map((item) => {
        return item.replace(check, (matchedText, a, b) => {
           return ('<strong>' + matchedText + '</strong>');
        })
      })
      return hignResult;
    })

    const result_Province = computed(() => {
      const result = searchAddressByProvince(province.value);
      let words = [];
      // Check คำ
      const check = new RegExp(province.value, "ig");
      // Map ข้อความปกติ
      words = result.map(item => {
        return (`${item.district} » ${item.amphoe} » ${item.province} » ${item.zipcode}`);
      })
      // เอาข้อความปกติมา Map
      const hignResult = words.map((item) => {
        return item.replace(check, (matchedText, a, b) => {
           return ('<strong>' + matchedText + '</strong>');
        })
      })
      return hignResult;
    })

    const result_Zipcode = computed(() => {
      const result = searchAddressByZipcode(zipcode.value);
      let words = [];
      // Check คำ
      const check = new RegExp(zipcode.value, "ig");
      // Map ข้อความปกติ
      words = result.map(item => {
        return (`${item.district} » ${item.amphoe} » ${item.province} » ${item.zipcode}`);
      })
      // เอาข้อความปกติมา Map
      const hignResult = words.map((item) => {
        return item.replace(check, (matchedText, a, b) => {
           return ('<strong>' + matchedText + '</strong>');
        })
      })
      return hignResult;
    })

    // ระบบจัดการรูปของ Suplier
    let { fr, upload, onFileSelected, refSelect } = imgSuplier();
    fr.onload = () => {
      imgSrc.value = fr.result;
    };

    // useAutoComplete
      // ทำ 4 ตัวแยกแต่ละช่อง
      const useAutoComplete1 = ref(false);
      const useAutoComplete2 = ref(false);
      const useAutoComplete3 = ref(false);
      const useAutoComplete4 = ref(false);


    // ใส่ค่าที่อยู่ลงช่องอื่นๆ
    const addAddress = (e) => {
      const raw = e.target.innerText;
      // console.log(raw)
      const result = raw.split(" » ")
      // console.log(result)
      // [0] = ตำบล, [1] = อำเภอ, [2] = จังหวัด, [3] = zipCode
      
      // Set ค่าลงในแต่ละฟิล
      // แก้บัค undentify
      if(result.length > 1) {
        district.value = result[0];
        amphoe.value = result[1];
        province.value = result[2];
        zipcode.value = result[3];
      }
      

      // ปิด AutoComplete
      useAutoComplete1.value = false;
      useAutoComplete2.value = false;
      useAutoComplete3.value = false;
      useAutoComplete4.value = false;
    }

    // Reset Form
    const resetForm = () => {
      console.log('Press')
      // ยกเลิกการเลือกไฟล์
      refSelect.value = null;
      if(imgSrc.value !== require('@/assets/User-Profile.png')){
        // console.log('change')
        imgSrc.value = require('@/assets/User-Profile.png');
      }
    }

    // addSuplier
    const addSuplier = async () => {
      // เปิดโหลด
      isLoad.value = true;
      // รับค่าที่ได้จาก component และ map ลงใน obj
      //TODO ระวังสับสนอำเภอ
      const suplier = {
        address: address.value,
        district: amphoe.value,
        img: "",
        nameSupplier: nameSupplier.value,
        phoneNum: phoneNum.value,
        province: province.value,
        subDistrict: district.value,
        zipcode: parseInt(zipcode.value)
      }
      // ส่งค่าขึ้น FireStore เพื่อรับ PrimaryKey
      const sup = await projectFirestore.collection("Supplier").add(suplier);
      // เช็คว่ารูปมีการเปลี่ยนหรือไม่
      // ถ้าเปลี่ยนให้อัปรูปโดยตั้งชื่อเป็น {PrimaryKey}.jpg
      if(refSelect.value) {
        // console.log('Selected');
        // อัปรูปขึ้น ถ้า Error ให้ส่ง ""
        const url = await upload('supImg', sup.id);
        // Update ค่า img ใน FireStore
        await projectUpdate("Supplier", sup.id, { img: url});
        // แก้ไข img
        suplier.img = url;
      }

      // เพิ่ม ID
      suplier.id = sup.id;
      
      // ปิดโหลด
      isLoad.value = false
      // ส่ง Emit finished
      context.emit('finished', suplier);
      context.emit('close');
    };


    return {
      closeOverlay,
      result_District,
      result_Amphoe,
      result_Province,
      result_Zipcode,
      addSuplier,
      onFileSelected,
      imgSrc,
      nameSupplier,
      address,
      amphoe,
      phoneNum,
      province,
      district,
      zipcode,
      addAddress,
      isLoad,
      resetForm,
      useAutoComplete1,
      useAutoComplete2,
      useAutoComplete3,
      useAutoComplete4,
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