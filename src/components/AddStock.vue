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
        <form>
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
            กรุณาเพิ่มรูปภาพ เนื้อ/สี ของผ้าเพื่อประโยชน์ในการระบุผ้า
          </div>

          <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 mb-6 w-full group">
              <input
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
                <option selected>เลือกโรงงาน</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="FR">France</option>
                <option value="DE">Germany</option>
              </select>
            </div>
          </div>
          <div class="text-end">
            <button
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
export default {
  setup(props, context) {
    // คำสั่ง
    const closeOverlay = () => {
      context.emit('close');
    };
    return { closeOverlay };
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