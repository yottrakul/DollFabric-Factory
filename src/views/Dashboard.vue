<template>
  <header>
    <h1 class="head">Dashboard</h1>
  </header>
  <main>
    <div class="flex flex-wrap">
      <div class="menu-box btn btn-1">
        <div class="box-head flex items-end justify-between m-9">
          <h2>Dashboard</h2>
          <span class="material-symbols-outlined text-7xl dashboard-icon">
            dashboard
          </span>
        </div>
        <p class="detail">See what’s happening At your company!</p>
        <span class="material-symbols-outlined text-5xl next-icon">
          arrow_right_alt
        </span>
      </div>
      <router-link :to="{ name: 'Stock' }">
      <div class="menu-box btn btn-2 pt-0.5">
        <div class="box-head flex items-end justify-between m-9">
          <h2>Fabric Stock</h2>
          <span class="material-symbols-outlined text-7xl storage-icon">
            storage
          </span>
        </div>
        <p class="detail">
          จัดการชุดข้อมูล, ดูชุดข้อมูลและรายงานข้อมูล
        </p>
        
          <span class="material-symbols-outlined text-5xl next-icon">
            arrow_right_alt
          </span>
      </div>
      </router-link>
      <router-link :to="{ name: 'Supplier' }">
      <div class="menu-box btn btn-3 pt-0.5">
        <div class="box-head flex items-end justify-between m-9">
          <h2>Supplier</h2>
          <span class="material-symbols-outlined text-7xl group-icon">
            group
          </span>
        </div>
        <p class="detail">จัดการคู่ค้า, ดูรายชื่อคู่ค้า, แก้ไขและเพิ่มข้อมูลคู่ค้า</p>
        
          <span class="material-symbols-outlined text-5xl next-icon">
            arrow_right_alt
          </span>
        
      </div>
      </router-link>
      <router-link  :to="{ name: 'Products' }">
        <div  class="menu-box btn btn-4 pt-0.5">
          <div class="box-head flex items-end justify-between m-9">
            <h2>Products</h2>
            <span class="material-symbols-outlined text-7xl function-icon">
              precision_manufacturing
            </span>
          </div>
          <p class="detail">ตุ๊กตาที่ถูก Checkout แล้วจะแสดงในหน้าส่วน Products</p>
          <span class="material-symbols-outlined text-5xl next-icon">
            arrow_right_alt
          </span>
        </div>
      </router-link>
      <router-link  :to="{ name: 'Dolls' }">
      <div class="menu-box btn btn-5 pt-0.5">
        <div class="box-head flex items-end justify-between m-9">
          <h2>Doll Pattern</h2>
          <span class="material-symbols-outlined text-7xl android-icon">
            android
          </span>
        </div>
        <p class="detail">ออกแบบโครงสร้างของตุ๊กตาและแก้ไขโครงสร้าง</p>
        <router-link :to="{ name: 'Dolls' }">
          <span class="material-symbols-outlined text-5xl next-icon">
            arrow_right_alt
          </span>
        </router-link>
      </div>
      </router-link>
      <router-link  :to="{ name: 'OrderManage' }">
      <div class="menu-box btn btn-6 pt-0.5">
        <div class="box-head flex items-end justify-between m-9">
          <h2 class="whitespace-nowrap">Orders</h2>
          <span class="material-symbols-outlined text-7xl delivery-icon">
            receipt_long
          </span>
        </div>
        <p class="detail">Order ที่ถูกสร้างขึ้นสามารถจัดการในหน้านี้</p>
        <span class="material-symbols-outlined text-5xl next-icon">
          arrow_right_alt
        </span>
      </div>
      </router-link>
    </div>
  </main>
</template>

<script>
export default {};
</script>

<style scoped>
/* ข้างใน box */

.dashboard-icon {
  color: #1d6d62;
}

.storage-icon {
  color: #b08928;
}

.group-icon {
  color: #b65456;
}

.function-icon {
  color: #622a95;
}

.android-icon {
  color: rgb(92, 139, 205);
}

.delivery-icon {
  color: #9c753e;
}

.next-icon {
  margin-left: 1.8rem;
  margin-top: 2rem;
  cursor: pointer;
}

.next-icon:hover {
  color: rgb(85, 85, 85);
  transition: 0.5s;
}

.detail {
  width: 50%;
  margin-left: 2.25rem;
  font-size: 1.1rem;
}

h2 {
  font-size: 1.68rem;
  font-weight: bold;
}

main {
  overflow: hidden;
}

main > div {
  max-width: 1200px;
  margin: 0 auto;
  justify-content: center;
  gap: 3rem;
}

.menu-box {
  /* width: 320px; */
  width: 20rem;
  height: 20rem;
  border-radius: 10px;
  color: #ffffff;
}

.btn {
  transition: 0.5s;
  background: linear-gradient(
      45deg,
      var(--c1, #f6d365),
      var(--c2, #fda085) 40%,
      var(--c1, #f6d365)
    )
    var(--x, 0) / 300%;
  /* text-shadow: 0px 0px 10px rgba(0,0,0,0.2);*/
  box-shadow: 0 0 20px #eee;
  border-radius: 8px;
}

.btn:hover {
  --x: 100%;
}

.btn-1 {
  --c1: #2aa090;
  --c2: #2aa09096;
}

.btn-2 {
  --c1: #f6d365;
  --c2: #f6d36596;
}

.btn-3 {
  --c1: #fda085;
  --c2: #fda08596;
}

.btn-4 {
  --c1: #956cbb;
  --c2: #be99e3;
}

.btn-5 {
  --c1: rgb(58, 97, 154);
  --c2: rgba(58, 97, 154, 0.5);
}

.btn-6 {
  --c1: #e9ae5b;
  --c2: #f6d36596;
}

::selection {
  outline: none;
}
</style>