<template>
  <notifications position="top right" :max="3" :pauseOnHover="true" />
  <!-- <img class="block text-center" src="https://miro.medium.com/max/300/1*R4c8lHBHuH5qyqOtZb3h-w.png" alt="firebase">
<h5>Firebase</h5>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/stock">Stock</router-link> |
    <router-link to="/create">Create</router-link> |
    <router-link to="/invoice">Invoice</router-link> |
    <router-link to="/tailwind">Tailwind</router-link>
  </nav> -->
  <div
    v-motion-slide-left
    :delay="500"
    v-if="showNav"
    class="
      fixed
      top-0
      left-0
      bottom-0
      flex flex-col
      items-center
      w-60
      h-full
      overflow-hidden
      text-gray-400
      bg-gray-900
      rounded
      navbar
      z-10
    "
  >
    <a class="flex items-center w-full px-3 mt-3" href="/">
      <!-- w-8 h-8 -->
      <!-- <svg
        class="w-8 h-8 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"
        />
      </svg> -->
      <img class="w-8 h-8" src="../src/assets/logo.png" />
      <span class="ml-2 text-sm font-bold">Fabric Stock</span>
    </a>
    <div class="w-full px-2">
      <div
        class="flex flex-col items-center w-full mt-3 border-t border-gray-700"
      >
        <router-link
          class="
            flex
            items-center
            w-full
            h-12
            px-3
            mt-2
            rounded
            hover:bg-gray-700 hover:text-gray-300
          "
          :to="{ name: 'Dashboard' }"
        >
          <svg
            class="w-6 h-6 stroke-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <span class="ml-2 text-sm font-medium">Dasboard</span>
        </router-link>
        <router-link
          class="
            flex
            items-center
            w-full
            h-12
            px-3
            mt-2
            rounded
            hover:bg-gray-700 hover:text-gray-300
          "
          :to="{ name: 'Stock' }"
        >
          <!-- <svg
            class="w-6 h-6 stroke-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg> -->
          <span class="material-symbols-outlined"> database </span>
          <span class="ml-2 text-sm font-medium">Stock</span>
        </router-link>
        <router-link
          class="
            flex
            items-center
            w-full
            h-12
            px-3
            mt-2
            hover:bg-gray-700 hover:text-gray-300
            rounded
          "
          :to="{ name: 'Supplier' }"
        >
          <span class="material-symbols-outlined"> diversity_3 </span>
          <span class="ml-2 text-sm font-medium">Suppliers</span>
        </router-link>
        <router-link
          class="
            flex
            items-center
            w-full
            h-12
            px-3
            mt-2
            rounded
            hover:bg-gray-700 hover:text-gray-300
          "
          :to="{ name: 'Dolls' }"
        >
          <span class="material-symbols-outlined"> cruelty_free </span>
          <span class="ml-2 text-sm font-medium">Dolls Details</span>
        </router-link>
      </div>
      <div
        class="flex flex-col items-center w-full mt-2 border-t border-gray-700"
      >
        <router-link
          class="
            relative
            flex
            items-center
            w-full
            h-12
            px-3
            mt-2
            rounded
            hover:bg-gray-700 hover:text-gray-300
          "
          :to="{ name: 'Products' }"
        >
          <svg
            class="w-6 h-6 stroke-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <span class="ml-2 text-sm font-medium">Products</span>
          <!-- <span
            class="
              absolute
              top-0
              left-0
              w-2
              h-2
              mt-2
              ml-2
              bg-indigo-500
              rounded-full
            "
          ></span> -->
        </router-link>
        <router-link
          class="
            flex
            items-center
            w-full
            h-12
            px-3
            mt-2
            rounded
            hover:bg-gray-700 hover:text-gray-300
          "
          :to="{ name: 'OrderManage' }"
        >
          <span class="material-symbols-outlined"> checklist </span>
          <span class="ml-2 text-sm font-medium">Order Manage</span>
        </router-link>
      </div>
    </div>
    <!-- <a
      class="
        flex
        items-center
        justify-center
        w-full
        h-16
        mt-auto
        bg-gray-800
        hover:bg-gray-700 hover:text-gray-300
      "
      href="#"
    >
      <svg
        class="w-6 h-6 stroke-current"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span class="ml-2 text-sm font-medium">Account</span>
    </a> -->
    <div
      @click="handleLogout"
      class="
        flex
        items-center
        justify-center
        w-full
        h-16
        mt-auto
        bg-gray-800
        hover:bg-gray-700 hover:text-gray-300
        cursor-pointer
      "
    >
      <span class="material-symbols-outlined text-red-500"> logout </span>
      <span class="ml-2 text-sm font-medium">Logout</span>
    </div>
  </div>

  <!-- บรรจุ routerview -->
  <div class="router-view" :class="{ 'pl-0': !showNav }"><router-view /></div>
</template>

<script>
import { projectAuth } from "./firebase/config";
import useLogout from './composibles/useLogout'
import { useRouter } from 'vue-router';
import { ref } from '@vue/reactivity';
export default {
   setup() {
    const router = useRouter();
    const showNav = ref(false)
    const { logout, error } = useLogout();
    projectAuth.onAuthStateChanged((user) => {
      if(user) {
        showNav.value = true;
      } else {
        showNav.value = false
      }
    })

    const handleLogout = async () => {
      await logout();
      router.push({ name: 'Home'});
    }

    return { handleLogout, showNav };
  },
};
</script>

<style>
#app {
  font-family: "IBM Plex Sans Thai", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh;
  font-size: 16px;
  -webkit-tap-highlight-color: transparent;
}

.router-link-active,
.router-link-exact-active {
  background-color: rgb(55 65 81 / var(--tw-bg-opacity));
  color: rgb(209 213 219 / var(--tw-text-opacity));
}

.router-view {
  background-color: #f7f7f7;
  padding-left: 15rem;
  width: 100%;
  height: 100%;
  overflow: auto;
}

.head {
  padding: 1.2em 1em 1.5em;
  display: block;
}

.head {
  font-size: 2.5rem;
  font-weight: bold;
  color: #000;
}
.scollHide::-webkit-scrollbar {
  display: none;
}
.scollHide {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
.vue-notification-template {
  font-size: 5rem;
}
</style>
