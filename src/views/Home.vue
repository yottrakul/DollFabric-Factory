<template>
  <div class="w-full h-screen grid place-items-center bg-gray-900">
    <div class=" bg-transparent max-w-fit">

      <div class="flex justify-center mb-16 place-items-center gap-16">
        <img :src="require('@/assets/logo.png')"/>
        <h1 class="font-semibold text-8xl whitespace-nowrap">Login ㅇㅅㅇ</h1>
      </div>

      <form class="p-10 rounded-xl outline outline-offset-4" @submit.prevent="handleSubmit">
        <div class="mb-6">
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-400 dark:text-white"
            >Your email</label
          >
          <input
            v-model="user.email"
            type="email"
            id="email"
            class="
              bg-gray-50
              border border-gray-300
              text-gray-900 text-sm
              rounded-lg
              focus:ring-blue-500 focus:border-blue-500
              block
              w-full
              p-2.5
              dark:bg-gray-700
              dark:border-gray-600
              dark:placeholder-gray-400
              dark:text-white
              dark:focus:ring-blue-500
              dark:focus:border-blue-500
            "
            placeholder="name@youremail.com"
            required
          />
        </div>
        <div class="mb-6">
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-400 dark:text-white"
            >Your password</label
          >
          <input
            v-model="user.password"
            type="password"
            id="password"
            class="
              bg-gray-50
              border border-gray-300
              text-gray-900 text-sm
              rounded-lg
              focus:ring-blue-500 focus:border-blue-500
              block
              w-full
              p-2.5
              dark:bg-gray-700
              dark:border-gray-600
              dark:placeholder-gray-400
              dark:text-white
              dark:focus:ring-blue-500
              dark:focus:border-blue-500
            "
            required
          />
        </div>
        <div class="flex justify-end">
          <button
          :disabled="isLoad"
          type="submit"
          :class="{ 'cursor-wait': isLoad}"
          class="
            flex
            justify-center
            gap-1
            overflow-hidden
            min-w-fit
            text-white
            bg-blue-700
            hover:bg-blue-800
            focus:ring-4 focus:outline-none focus:ring-blue-300
            font-medium
            rounded-lg
            text-sm
            w-1/4
            px-5
            py-2.5
            text-center
            dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
          "
        >
        <div v-motion-slide-right v-if="isLoad">
          <svg  aria-hidden="true" role="status" class="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
    </svg>
        </div>
        
          Login
        </button>
        </div>
        
      </form>

      <div class="mt-10 w-full text-center">Powered by YottraKung <a href="https://github.com/yottrakul" target="_blank"  class="hover:text-white place-items-center flex h-fit mx-auto w-10 gap-1 place-content-center"><span>GitHub</span><img class="aspect-square" src="https://img-01.stickers.cloud/packs/00cb69bb-34cd-49d5-bca4-a1705a44ebff/webp/c192a0d8-3a45-4c32-80f3-4b80a8f90fea.webp"/></a></div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "@vue/reactivity";
import useLogin from '../composibles/useLogin'
import { useRouter } from 'vue-router';
import { notify } from '@kyvg/vue3-notification';
export default {
  setup() {
    const router = useRouter();
    const isLoad = ref(false);
    const {login, error} = useLogin();
    const user = reactive({
      email: "",
      password: ""
    })

    const handleSubmit = async () => {
      isLoad.value = true;
      await login(user.email, user.password);
      if(!error.value) {
        router.push({ name: "Dashboard"});
      } else {
        isLoad.value = false;
        notify({
          title: "ข้อผิดพลาด ⚠️",
          text: error.value,
          type: "error",
        });
      }
    }

    return { user,error, handleSubmit, isLoad }
  },
};
</script>

<style scoped>
img {
  width: 200px;
  margin-bottom: 20px;
}

::selection {
  outline: none;
}
</style>