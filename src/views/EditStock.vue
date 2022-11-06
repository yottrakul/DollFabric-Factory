<template>
  <div @click.self="closeOverlay" class="grid place-items-center h-screen">
    <div class="w-4/5">
      <h1 class="text-dynamic">
        <button
          :disabled="loading"
          @click="back"
          class="
            material-symbols-outlined
            text-dynamic
            align-sub
            mr-5
            transition
            ease-in-out
            delay-150
            hover:-translate-x-3 hover:scale-105
          "
        >
          arrow_back </button
        >แก้ไข<span
          class="material-symbols-outlined text-dynamic align-baseline ml-3"
        >
          edit
        </span>
      </h1>
      <div
        class="
          container
          drop-shadow-xl
          bg-slate-100
          rounded-md
          p-10
          flex
          gap-10
        "
      >
        <div
          class="
            flex-1
            max-w-sm
            bg-white
            rounded-lg
            border border-gray-200
            shadow-md
            dark:bg-gray-800 dark:border-gray-700
          "
        >
          <a>
            <img class="rounded-t-lg" :src="imgSrc" alt="" />
          </a>
          <div class="p-5">
            <a href="#">
              <h5
                class="
                  text-2xl
                  font-bold
                  tracking-tight
                  text-gray-900
                  dark:text-white
                "
              >
                สรุปรายละเอียด
              </h5>
            </a>
            <div class="mb-3">
              <p>
                <span class="material-symbols-outlined align-sub"> key </span
                ><span class="ml-3 font-normal text-gray-700">a{{ id }}</span>
              </p>
              <p>
                <span class="material-symbols-outlined align-sub">
                  palette </span
                ><span class="ml-3 font-normal text-gray-700"
                  >สี{{ stock.color }}</span
                >
              </p>
              <p>
                <span class="material-symbols-outlined align-sub">
                  texture </span
                ><span class="ml-3 font-normal text-gray-700">{{
                  stock.type
                }}</span>
              </p>
              <p>
                <span class="material-symbols-outlined align-sub">
                  straighten </span
                ><span class="ml-3 font-normal text-gray-700"
                  >{{ stock.length }} หลา</span
                >
              </p>
              <p>
                <span class="material-symbols-outlined align-sub">
                  factory </span
                ><span class="ml-3 font-normal text-gray-700">{{
                  stock.factory
                }}</span>
              </p>
            </div>

            <button
              :disabled = "loading"
              @click="updateStock"
              class="
                inline-flex
                w-full
                items-center
                py-2
                px-3
                text-sm
                font-medium
                text-center text-white
                bg-green-700
                rounded-lg
                hover:bg-green-800
                focus:ring-4 focus:outline-none focus:ring-blue-300
                dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
              "
            >
              <span
                v-if="!loading"
                class="transition ease-in-out delay-150 hover:scale-105 w-full"
                >ยืนยันแก้ไข<svg
                  aria-hidden="true"
                  class="ml-2 -mr-1 w-4 h-4 inline-block align-sub"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path></svg
              ></span>
              <span
                v-else
                class="transition ease-in-out delay-150 hover:scale-105 w-full"
                >รอสักครู่.. กำลังบันทึก<svg
                  aria-hidden="true"
                  role="status"
                  class="inline ml-3 w-4 h-4 text-white animate-spin align-sub"
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
              ></span>
            </button>
          </div>
        </div>
        <form class="flex-1">
          <label
            class="
              block
              mb-2
              text-xl
              font-medium
              text-gray-900
              dark:text-gray-300
            "
            for="fabric_avatar"
            >อัปโหลดรูปสินค้า</label
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
            aria-describedby="fabric_help"
            id="fabric_avatar"
            type="file"
          />
          <div
            class="mt-1 text-sm text-gray-500 dark:text-gray-300 mb-5"
            id="fabric_help"
          >
            กรุณาเพิ่มรูปภาพ เนื้อ/สี ของผ้าเพื่อประโยชน์ในการระบุผ้า ( .jpg
            .png)
          </div>

          <div class="grid md:grid-cols-1 md:gap-3 mb-3">
            <div class="relative z-0 mb-6 w-full group">
              <input
                v-model="stock.color"
                type="text"
                name="fabric_color"
                id="fabric_color"
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
              <label
                for="fabric_color"
                class="
                  peer-focus:font-medium
                  absolute
                  text-lg text-gray-500
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
                >สีผ้า</label
              >
            </div>
            <div class="relative z-0 mb-6 w-full group">
              <input
                v-model="stock.type"
                type="text"
                name="type_fabric"
                id="type_fabric"
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
              <label
                for="type_fabric"
                class="
                  peer-focus:font-medium
                  absolute
                  text-lg text-gray-500
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
              >
                ลักษณะผ้า</label
              >
            </div>
          </div>
          <div class="grid md:grid-cols-1 md:gap-3">
            <div class="relative z-0 mb-6 w-full group">
              <input
                min="0"
                v-model="stock.length"
                type="number"
                name="length_fabric"
                id="length_fabric"
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
              <label
                for="length_fabric"
                class="
                  peer-focus:font-medium
                  absolute
                  text-lg text-gray-500
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
                >ความยาวผ้า (Y)</label
              >
            </div>
            <div class="relative z-0 mb-6 w-full group">
              <label for="factory_select" class="sr-only">Factory select</label>
              <select
                v-model="stock.factory"
                required
                id="factory_select"
                class="
                  block
                  py-2.5
                  px-0
                  w-full
                  text-lg text-gray-500
                  bg-transparent
                  border-0 border-b-2 border-gray-300
                  appearance-none
                  dark:text-gray-400 dark:border-gray-700
                  focus:outline-none focus:ring-0 focus:border-blue-600
                  peer
                "
              >
                <option selected value="">เลือกโรงงาน</option>
                <option
                  v-for="factory in factorys"
                  :key="factory.id"
                  :value="`Factory/${factory.id}`"
                >
                  {{ factory.Name }}
                </option>
              </select>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useRoute, useRouter } from "vue-router";
import getFactory from "../composibles/getFactorys";
import fabricImg from "../composibles/uploadImg";
import { projectUpdate } from "@/composibles/projectManage";
import { projectFirestore } from "@/firebase/config";
export default {
  setup() {
    //ประกาษใช้ useRoute และ useRouter
    const route = useRoute();
    const router = useRouter();

    // loadding
    const loading = ref(false);

    // รับ prop id
    const id = route.params.id;
    const stock = ref(route.params);

    // สร้างเพื่อเก็บ imgSrc ของ Component โดยเฉพาะ
    const imgSrc = ref(stock.value.imageFabric);

    if(stock.value.imageFabric === './noitem.webp'){
      imgSrc.value = '../../noitem.webp';
    }

    // เรียก Factorys
    const { factorys, loadFactory } = getFactory();
    loadFactory();

    // เรียก ImgFabric
    const { fr, upload, onFileSelected, seletedFile } = fabricImg();

    // // เก็บข้อมูล File เพื่อนำไป Preview ใน Card
    // const seletedFile = ref(null);
    // const fr = new FileReader();

    // const onFileSelected = (event) => {
    //   // console.log(event.target.files[0])
    //   seletedFile.value = event.target.files[0];
    //   fr.onload = () => {
    //   // เก็บใน imageFabric
    //     stock.value.imageFabric = fr.result;
    //   }
    //   fr.readAsDataURL(seletedFile.value);
    // };

    // Config fr.onload นำ Raw ลงไปใน imageFabric
    fr.onload = () => {
      stock.value.imageFabric = fr.result;
      imgSrc.value = fr.result;
    };

    // Method Update Stock
    const updateStock = async () => {
      // แสดงโหลด
      loading.value = true;
      // Upload ภาพขึ้น FireStore
      // เช็คว่ามีการเลือกภาพหรือไม่
      if (seletedFile) {
        // ดึง Url ภาพ
        const url = await upload("images", id);
        // Map ค่า Url ใหม่ใน stock.imageFabric
        stock.value.imageFabric = url;
      }

      // สร้าง Structure ใหม่
      const data = {
        color: stock.value.color,
        factory: projectFirestore.doc(stock.value.factory),
        imageFabric: stock.value.imageFabric,
        length: parseFloat(stock.value.length),
        type: stock.value.type,
      };
      // ส่ง Update ขึ้น Firestore
      await projectUpdate("Stock", id, data);
      // ปิดโหลด
      loading.value = false;
      // เสร็จสิ้นให้ส่งกลับไปยังหน้า Stock
      router.push({ name: "Stock" });
    };

    // ปุ่มกลับ
    const back = () => {
      router.back();
    };

    return { id, stock, factorys, onFileSelected, updateStock, back, loading, imgSrc };
  },
};
</script>

<style>
</style>