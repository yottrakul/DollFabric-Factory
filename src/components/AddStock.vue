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
        <form @submit.prevent="addStock">
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
            กรุณาเพิ่มรูปภาพ เนื้อ/สี ของผ้าเพื่อประโยชน์ในการระบุผ้า ( .jpg .png)
          </div>

          <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 mb-6 w-full group">
              <input
                v-model="color"
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
                >สีผ้า</label
              >
            </div>
            <div class="relative z-0 mb-6 w-full group">
              <input
                v-model="typeFab"
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
              >
                ลักษณะผ้า</label
              >
            </div>
          </div>
          <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 mb-6 w-full group">
              <input
                v-model="lengthFab"
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
                >ความยาวผ้า (Y)</label
              >
            </div>
            <div class="relative z-0 mb-6 w-full group">
              <label for="factory_select" class="sr-only">Factory select</label>
              <select
                v-model="factory"
                required
                id="factory_select"
                class="
                  block
                  py-2.5
                  px-0
                  w-full
                  text-sm text-gray-500
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
                  :value="factory.id"
                >
                  {{ factory.Name }}
                </option>
              </select>
            </div>
          </div>
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
              เพิ่มสินค้า
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
              @click="seletedFile = null"
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
import { ref } from "@vue/reactivity";
import { projectFirestore, projectStorage } from "@/firebase/config";
import getFactorys from "../composibles/getFactorys";
export default {
  setup(props, context) {
    // คำสั่ง
    const closeOverlay = () => {
      context.emit("close");
    };

    // โหลด Factorys
    const { factorys, loadFactory } = getFactorys();
    loadFactory();

    // เก็บข้อมูล File
    const seletedFile = ref(null);
    const fr = new FileReader();

    const onFileSelected = (event) => {
      // console.log(event.target.files[0])
      seletedFile.value = event.target.files[0];
      fr.readAsDataURL(seletedFile.value);
    };

    // Upload File
    const uploadFile = async (name) => {
      const storageRef = projectStorage.ref();
      const imageRef = storageRef.child(`images/${name}.jpg`);
      try {
        // upload รูป
        await imageRef.putString(fr.result, "data_url");
        // รอลิงค์รูป
        const url = await storageRef.child(`images/${name}.jpg`).getDownloadURL();
        // ส่งลิงค์ออกไป url
        return url;
        // console.log("Uploaded");
      } catch (error) {
        console.log(error);
      }
    };

    // Add Stock method
    const isLoad = ref(false);
    const color = ref("");
    const lengthFab = ref(null);
    const factory = ref("");
    const typeFab = ref("");
    let fabric = {};
    const addStock = async () => {
      try {
        isLoad.value = true;
        // สร้าง Structure ของ Database
        fabric = {
          color: color.value,
          factory: projectFirestore.doc(`Factory/${factory.value}`),
          imageFabric: "./noitem.webp",
          length: lengthFab.value,
          type: typeFab.value,
        };
        // Up ขึ้น Firebase ใน collection Stock
        const fabId = await projectFirestore.collection("Stock").add(fabric);
        // console.log(fabId.id);

        // upload ไฟล์รูปขึ้น firebase
          // TODO เช็คว่ามี ไฟล์รูปมั้ย?
          if (seletedFile.value) {
            // console.log('Have File');
            // upload
            const url = await uploadFile(fabId.id)
            fabric.imageFabric = url;
            const imgUrl = {
              imageFabric: url
            }
            await projectFirestore.collection("Stock").doc(fabId.id).update(imgUrl);
          }

        // เพิ่ม Id และเปลี่ยน factory เป็น path เข้าไปใน fabric
        fabric.id = fabId.id;
        fabric.factory = projectFirestore.doc(`Factory/${factory.value}`).path;
        // console.log(fabric)
        isLoad.value = false;
        context.emit('finished', fabric)
      } catch (error) {
        isLoad.value = false;
        console.log(error);
      }
    };

    return {
      closeOverlay,
      onFileSelected,
      uploadFile,
      factorys,
      addStock,
      color,
      lengthFab,
      factory,
      typeFab,
      fabric,
      isLoad,
      seletedFile
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